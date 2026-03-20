import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const parsePrice = (price: unknown): number =>
  Number(String(price).replace(/,/g, "")) || 0;

// ✅ SEND EMAIL FUNCTION
async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "OMA Shop <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });
  const result = await res.json();
  console.log(`Email to ${to}:`, JSON.stringify(result));
  return result;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reference, orderData } = await req.json();

    // ✅ VERIFY PAYMENT (PAYSTACK)
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get("PAYSTACK_SECRET_KEY")}`,
        },
      }
    );

    const verifyData = await verifyRes.json();

    if (verifyData?.data?.status !== "success") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Payment not verified",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ✅ GENERATE ORDER NUMBER
    const orderNumber = `OMA-${Date.now()}`;

    // ✅ SAVE ORDER TO SUPABASE
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Insert without specifying id - let Supabase auto-generate it
    const { data, error } = await supabase.from("orders").insert({
      order_number: orderNumber,
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
      shipping_address: orderData.shipping_address,
      items: orderData.items,
      total_amount: orderData.total_amount,
      payment_ref: reference,
      status: "Processing",
    }).select();

    if (error) {
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ✅ BUILD ITEMS HTML WITH IMAGE
    const itemsHTML = orderData.items
      .map(
        (item: any) => `
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px;">
          <img src="${item.image}" width="40" style="border-radius:6px;margin-right:8px;vertical-align:middle;" />
          ${item.name || item.description || "Product"}
        </td>
        <td style="text-align:center;">× ${item.quantity}</td>
        <td style="text-align:right;">₦${(
          parsePrice(item.price) * item.quantity
        ).toLocaleString()}</td>
      </tr>`
      )
      .join("");

    // ✅ CUSTOMER EMAIL
    const customerHTML = `
      <div style="font-family:Arial;background:#f5f5f5;padding:20px;">
        <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;">
          
          <div style="background:#ff496c;color:white;padding:20px;text-align:center;">
            <h2>OMA Shop</h2>
            <p>Order Confirmation 🎉</p>
          </div>

          <div style="padding:20px;">
            <h3>Hi ${orderData.customer_name},</h3>
            <p>Your order has been placed successfully.</p>

            <p><b>Order Number:</b> ${
              data?.[0]?.order_number || "Generated"
            }</p>

            <h4>🧾 Order Details</h4>
            <table width="100%" style="border-collapse:collapse;">
              ${itemsHTML}
            </table>

            <p><b>Total Paid:</b> ₦${Number(
              orderData.total_amount
            ).toLocaleString()}</p>

            <p><b>Estimated Delivery:</b> 2–3 days 🚚</p>

            <h4>📦 Delivery Address</h4>
            <p>${orderData.shipping_address}</p>

            <a href="https://yourdomain.com/orders"
              style="display:inline-block;margin-top:15px;padding:10px 20px;background:#ff496c;color:white;text-decoration:none;border-radius:6px;">
              Track Order
            </a>

            <p style="margin-top:20px;">
              Need help? Contact:
              <a href="mailto:myona1648@gmail.com">myona1648@gmail.com</a>
            </p>
          </div>

          <div style="background:#f1f1f1;text-align:center;padding:10px;font-size:12px;">
            © 2026 OMA Shop
          </div>

        </div>
      </div>
    `;

    // ✅ ADMIN EMAIL
    const adminHTML = `
      <div style="font-family:Arial;padding:20px;">
        <h2 style="color:#ff496c;">🚨 New Order</h2>

        <p><b>Order Number:</b> ${data?.[0]?.order_number || "Generated"}</p>

        <h3>Customer Info</h3>
        <p>Name: ${orderData.customer_name}</p>
        <p>Email: ${orderData.customer_email}</p>
        <p>Phone: ${orderData.customer_phone}</p>

        <h3>Shipping Address</h3>
        <p>${orderData.shipping_address}</p>

        <h3>Order Items</h3>
        <table width="100%">
          ${itemsHTML}
        </table>

        <h3>Total</h3>
        <p>₦${Number(orderData.total_amount).toLocaleString()}</p>

        <p><b>Payment Ref:</b> ${reference}</p>

        <hr/>

        <p>
          <a href="tel:${orderData.customer_phone}">📞 Call Customer</a><br/>
          <a href="mailto:${orderData.customer_email}">📧 Email Customer</a>
        </p>

        <p style="color:red;font-weight:bold;">
          ⚡ Process immediately
        </p>
      </div>
    `;

    // ✅ SEND EMAILS
    const resendTestEmail = Deno.env.get("RESEND_TEST_EMAIL");
    const customerEmail = resendTestEmail || orderData.customer_email;
    const adminEmail = resendTestEmail || "myona1648@gmail.com";

    await Promise.allSettled([
      sendEmail(
        customerEmail,
        "Your OMA Shop Order 🎉",
        customerHTML
      ),
      sendEmail(
        adminEmail,
        `🚨 New Order ${data?.[0]?.order_number || "Generated"}`,
        adminHTML
      ),
    ]);

    console.log("✅ Order saved & emails sent:", data?.[0]?.id);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: (err as Error).message,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

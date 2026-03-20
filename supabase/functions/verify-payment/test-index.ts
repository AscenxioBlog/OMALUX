import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reference, orderData } = await req.json();
    
    console.log("Received data:", { reference, orderData });

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
    console.log("Paystack verification:", verifyData);

    if (verifyData?.data?.status !== "success") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Payment not verified",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ✅ SAVE ORDER TO SUPABASE (MINIMAL)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    console.log("About to insert order...");

    // Try the most basic insert possible
    const { data, error } = await supabase.from("orders").insert({
      customer_name: orderData.customer_name || "Test Customer",
      customer_email: orderData.customer_email || "test@test.com",
      total_amount: 1000, // Fixed amount for testing
      payment_ref: reference,
    }).select();

    console.log("Insert result:", { data, error });

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, orderId: data?.[0]?.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: (err as Error).message,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
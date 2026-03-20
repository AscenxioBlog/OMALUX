// Price utility functions
export const parsePrice = (price) => {
  if (price === null || price === undefined) return 0;
  
  // Convert to string and remove any non-numeric characters except decimal point
  const cleanPrice = String(price)
    .replace(/[^\d.-]/g, '') // Remove everything except digits, dots, and minus
    .replace(/,/g, ''); // Remove commas
  
  const parsed = parseFloat(cleanPrice);
  return isNaN(parsed) ? 0 : parsed;
};

export const formatPrice = (price) => {
  const parsed = parsePrice(price);
  return `₦${parsed.toLocaleString()}`;
};

export const calculateItemTotal = (item) => {
  const price = parsePrice(item.price);
  const quantity = parseInt(item.quantity) || 1;
  return price * quantity;
};

export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + calculateItemTotal(item);
  }, 0);
};
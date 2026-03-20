-- Add order_ref column to store custom order numbers like "OMA-1234567890"
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_ref TEXT;

-- Add unique constraint (will fail silently if already exists)
DO $$
BEGIN
    ALTER TABLE orders ADD CONSTRAINT orders_order_ref_unique UNIQUE (order_ref);
EXCEPTION
    WHEN duplicate_object THEN
        -- Constraint already exists, do nothing
        NULL;
END $$;
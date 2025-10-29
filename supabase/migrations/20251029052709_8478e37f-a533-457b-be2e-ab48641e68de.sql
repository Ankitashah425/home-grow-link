-- Update order_status enum to include more detailed statuses
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'confirmed';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'preparing';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'ready';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'out_for_delivery';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'cancelled';

-- Add RLS policy for farmers to update order status
CREATE POLICY "Farmers can update order status for their products"
ON orders
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM order_items
    WHERE order_items.order_id = orders.id
    AND order_items.farmer_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM order_items
    WHERE order_items.order_id = orders.id
    AND order_items.farmer_id = auth.uid()
  )
);
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Farmers can view orders with their products" ON orders;
DROP POLICY IF EXISTS "Farmers can update order status for their products" ON orders;
DROP POLICY IF EXISTS "Users can view order items for their orders" ON order_items;

-- Create security definer function to check if user is farmer for an order
CREATE OR REPLACE FUNCTION public.is_farmer_for_order(_user_id uuid, _order_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM order_items
    WHERE order_id = _order_id
      AND farmer_id = _user_id
  )
$$;

-- Recreate farmers view orders policy using security definer function
CREATE POLICY "Farmers can view orders with their products"
ON orders
FOR SELECT
USING (public.is_farmer_for_order(auth.uid(), id));

-- Recreate farmers update orders policy using security definer function
CREATE POLICY "Farmers can update order status for their products"
ON orders
FOR UPDATE
USING (public.is_farmer_for_order(auth.uid(), id))
WITH CHECK (public.is_farmer_for_order(auth.uid(), id));

-- Recreate order_items view policy without recursion
CREATE POLICY "Users can view order items for their orders"
ON order_items
FOR SELECT
USING (
  farmer_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
      AND orders.consumer_id = auth.uid()
  )
);
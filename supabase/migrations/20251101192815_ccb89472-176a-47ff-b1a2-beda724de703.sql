-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Consumers can create orders" ON orders;

-- Create a simpler policy that only checks consumer_id matches auth user
-- This is secure because consumer_id must match the authenticated user
CREATE POLICY "Authenticated users can create orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (consumer_id = auth.uid());
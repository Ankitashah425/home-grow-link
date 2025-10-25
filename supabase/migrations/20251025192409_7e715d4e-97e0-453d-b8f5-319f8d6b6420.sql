-- Drop the existing foreign key if it exists (might be incorrectly configured)
ALTER TABLE products 
DROP CONSTRAINT IF EXISTS products_farmer_id_fkey;

-- Add foreign key constraint from products.farmer_id to profiles.id
ALTER TABLE products 
ADD CONSTRAINT products_farmer_id_fkey 
FOREIGN KEY (farmer_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;

-- Similarly for other tables
ALTER TABLE farmer_details 
DROP CONSTRAINT IF EXISTS farmer_details_farmer_id_fkey;

ALTER TABLE farmer_details 
ADD CONSTRAINT farmer_details_farmer_id_fkey 
FOREIGN KEY (farmer_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE consumer_details 
DROP CONSTRAINT IF EXISTS consumer_details_consumer_id_fkey;

ALTER TABLE consumer_details 
ADD CONSTRAINT consumer_details_consumer_id_fkey 
FOREIGN KEY (consumer_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;
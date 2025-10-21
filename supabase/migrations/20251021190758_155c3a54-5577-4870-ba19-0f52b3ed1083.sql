-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('farmer', 'consumer', 'admin');

-- Create enum for order status
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled');

-- Create enum for delivery status
CREATE TYPE delivery_status AS ENUM ('assigned', 'picked_up', 'in_transit', 'delivered');

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'consumer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create farmer_details table
CREATE TABLE farmer_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  farm_address TEXT NOT NULL,
  farm_description TEXT,
  farm_size TEXT,
  organic_certified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_ratings INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(farmer_id)
);

-- Create consumer_details table
CREATE TABLE consumer_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  delivery_address TEXT,
  city TEXT,
  postal_code TEXT,
  preferences TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(consumer_id)
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  quantity_available INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  freshness_date DATE,
  organic BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  delivery_city TEXT NOT NULL,
  delivery_postal_code TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create delivery_tracking table
CREATE TABLE delivery_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  delivery_partner_name TEXT,
  delivery_partner_phone TEXT,
  status delivery_status NOT NULL DEFAULT 'assigned',
  estimated_delivery TIMESTAMPTZ,
  actual_delivery TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(order_id)
);

-- Create ratings table
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  consumer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  delivery_rating INTEGER CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(order_id, consumer_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmer_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumer_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Farmer details policies
CREATE POLICY "Anyone can view farmer details" ON farmer_details FOR SELECT USING (true);
CREATE POLICY "Farmers can update own details" ON farmer_details FOR UPDATE USING (
  farmer_id = auth.uid()
);
CREATE POLICY "Farmers can insert own details" ON farmer_details FOR INSERT WITH CHECK (
  farmer_id = auth.uid()
);

-- Consumer details policies
CREATE POLICY "Consumers can view own details" ON consumer_details FOR SELECT USING (
  consumer_id = auth.uid()
);
CREATE POLICY "Consumers can update own details" ON consumer_details FOR UPDATE USING (
  consumer_id = auth.uid()
);
CREATE POLICY "Consumers can insert own details" ON consumer_details FOR INSERT WITH CHECK (
  consumer_id = auth.uid()
);

-- Products policies
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Farmers can create products" ON products FOR INSERT WITH CHECK (
  farmer_id = auth.uid()
);
CREATE POLICY "Farmers can update own products" ON products FOR UPDATE USING (
  farmer_id = auth.uid()
);
CREATE POLICY "Farmers can delete own products" ON products FOR DELETE USING (
  farmer_id = auth.uid()
);

-- Orders policies
CREATE POLICY "Consumers can view own orders" ON orders FOR SELECT USING (
  consumer_id = auth.uid()
);
CREATE POLICY "Farmers can view orders with their products" ON orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM order_items 
    WHERE order_items.order_id = orders.id 
    AND order_items.farmer_id = auth.uid()
  )
);
CREATE POLICY "Consumers can create orders" ON orders FOR INSERT WITH CHECK (
  consumer_id = auth.uid()
);
CREATE POLICY "Consumers can update own orders" ON orders FOR UPDATE USING (
  consumer_id = auth.uid()
);

-- Order items policies
CREATE POLICY "Users can view order items for their orders" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.consumer_id = auth.uid() OR order_items.farmer_id = auth.uid())
  )
);
CREATE POLICY "Consumers can create order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.consumer_id = auth.uid()
  )
);

-- Delivery tracking policies
CREATE POLICY "Users can view delivery for their orders" ON delivery_tracking FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = delivery_tracking.order_id 
    AND orders.consumer_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM orders 
    JOIN order_items ON orders.id = order_items.order_id
    WHERE orders.id = delivery_tracking.order_id 
    AND order_items.farmer_id = auth.uid()
  )
);

-- Ratings policies
CREATE POLICY "Anyone can view ratings" ON ratings FOR SELECT USING (true);
CREATE POLICY "Consumers can create ratings for own orders" ON ratings FOR INSERT WITH CHECK (
  consumer_id = auth.uid() AND EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = ratings.order_id 
    AND orders.consumer_id = auth.uid()
  )
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_farmer_details_updated_at BEFORE UPDATE ON farmer_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consumer_details_updated_at BEFORE UPDATE ON consumer_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_tracking_updated_at BEFORE UPDATE ON delivery_tracking
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update farmer ratings
CREATE OR REPLACE FUNCTION update_farmer_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE farmer_details 
  SET 
    rating = (
      SELECT AVG(rating)::DECIMAL(3,2) 
      FROM ratings 
      WHERE farmer_id = NEW.farmer_id
    ),
    total_ratings = (
      SELECT COUNT(*) 
      FROM ratings 
      WHERE farmer_id = NEW.farmer_id
    )
  WHERE farmer_id = NEW.farmer_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update farmer rating when new rating is added
CREATE TRIGGER update_farmer_rating_trigger AFTER INSERT ON ratings
  FOR EACH ROW EXECUTE FUNCTION update_farmer_rating();

-- Create indexes for better query performance
CREATE INDEX idx_products_farmer_id ON products(farmer_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_consumer_id ON orders(consumer_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_farmer_id ON order_items(farmer_id);
CREATE INDEX idx_ratings_farmer_id ON ratings(farmer_id);
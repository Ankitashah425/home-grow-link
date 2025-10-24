-- Drop existing tables to start fresh
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS delivery_tracking CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS farmer_details CASCADE;
DROP TABLE IF EXISTS consumer_details CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop existing types
DROP TYPE IF EXISTS delivery_status CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS app_role CASCADE;

-- Create app_role enum for secure role management
CREATE TYPE app_role AS ENUM ('farmer', 'consumer', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled');

-- Create user_roles table (CRITICAL: roles must be separate from profiles)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Farmer details table
CREATE TABLE farmer_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  farm_name TEXT NOT NULL,
  farm_address TEXT NOT NULL,
  farm_description TEXT,
  farm_size TEXT,
  organic_certified BOOLEAN DEFAULT false,
  rating NUMERIC(3,2) DEFAULT 0.00,
  total_ratings INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE farmer_details ENABLE ROW LEVEL SECURITY;

-- Consumer details table
CREATE TABLE consumer_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  delivery_address TEXT,
  city TEXT,
  postal_code TEXT,
  preferences TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE consumer_details ENABLE ROW LEVEL SECURITY;

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  unit TEXT DEFAULT 'kg' NOT NULL,
  quantity_available INTEGER DEFAULT 0 CHECK (quantity_available >= 0),
  image_url TEXT,
  organic BOOLEAN DEFAULT false,
  freshness_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status order_status DEFAULT 'pending' NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_city TEXT NOT NULL,
  delivery_postal_code TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_per_unit NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Ratings table
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  consumer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review TEXT,
  delivery_rating INTEGER CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id, consumer_id, farmer_id)
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Now create all RLS policies
CREATE POLICY "Users can view their own roles"
  ON user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own role on signup"
  ON user_roles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Anyone can view farmer details"
  ON farmer_details FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Farmers can insert own details"
  ON farmer_details FOR INSERT TO authenticated
  WITH CHECK (farmer_id = auth.uid() AND has_role(auth.uid(), 'farmer'));

CREATE POLICY "Farmers can update own details"
  ON farmer_details FOR UPDATE TO authenticated
  USING (farmer_id = auth.uid() AND has_role(auth.uid(), 'farmer'));

CREATE POLICY "Consumers can view own details"
  ON consumer_details FOR SELECT TO authenticated
  USING (consumer_id = auth.uid());

CREATE POLICY "Consumers can insert own details"
  ON consumer_details FOR INSERT TO authenticated
  WITH CHECK (consumer_id = auth.uid() AND has_role(auth.uid(), 'consumer'));

CREATE POLICY "Consumers can update own details"
  ON consumer_details FOR UPDATE TO authenticated
  USING (consumer_id = auth.uid() AND has_role(auth.uid(), 'consumer'));

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Farmers can create products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (farmer_id = auth.uid() AND has_role(auth.uid(), 'farmer'));

CREATE POLICY "Farmers can update own products"
  ON products FOR UPDATE TO authenticated
  USING (farmer_id = auth.uid() AND has_role(auth.uid(), 'farmer'));

CREATE POLICY "Farmers can delete own products"
  ON products FOR DELETE TO authenticated
  USING (farmer_id = auth.uid() AND has_role(auth.uid(), 'farmer'));

CREATE POLICY "Consumers can view own orders"
  ON orders FOR SELECT TO authenticated
  USING (consumer_id = auth.uid());

CREATE POLICY "Farmers can view orders with their products"
  ON orders FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM order_items
    WHERE order_items.order_id = orders.id
    AND order_items.farmer_id = auth.uid()
  ));

CREATE POLICY "Consumers can create orders"
  ON orders FOR INSERT TO authenticated
  WITH CHECK (consumer_id = auth.uid() AND has_role(auth.uid(), 'consumer'));

CREATE POLICY "Consumers can update own orders"
  ON orders FOR UPDATE TO authenticated
  USING (consumer_id = auth.uid());

CREATE POLICY "Users can view order items for their orders"
  ON order_items FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND (orders.consumer_id = auth.uid() OR order_items.farmer_id = auth.uid())
  ));

CREATE POLICY "Consumers can create order items"
  ON order_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.consumer_id = auth.uid()
  ));

CREATE POLICY "Anyone can view ratings"
  ON ratings FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Consumers can create ratings for own orders"
  ON ratings FOR INSERT TO authenticated
  WITH CHECK (
    consumer_id = auth.uid() 
    AND has_role(auth.uid(), 'consumer')
    AND EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = ratings.order_id
      AND orders.consumer_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_farmer_details_updated_at
  BEFORE UPDATE ON farmer_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consumer_details_updated_at
  BEFORE UPDATE ON consumer_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update farmer ratings
CREATE OR REPLACE FUNCTION update_farmer_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE farmer_details
  SET
    rating = (
      SELECT AVG(rating)::NUMERIC(3,2)
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

CREATE TRIGGER update_farmer_rating_trigger
  AFTER INSERT ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_farmer_rating();
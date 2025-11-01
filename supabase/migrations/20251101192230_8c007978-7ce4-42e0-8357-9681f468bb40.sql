-- Fix search_path for existing functions to meet security requirements
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_farmer_rating()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;
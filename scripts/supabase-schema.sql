-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_admin_email CHECK (
    email IN (
      'takeoutsguy@gmail.com',
      'bunmibalogun450@yahoo.com',
      'joelayomide35@gmail.com'
    )
  )
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'normal' CHECK (type IN ('featured', 'normal')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  read_time TEXT NOT NULL,
  cover_image TEXT,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for blog assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-assets', 'blog-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by authenticated users" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Only allow inserts for authorized emails
CREATE POLICY "Only authorized emails can create profiles" ON profiles
  FOR INSERT WITH CHECK (
    email IN (
      'takeoutsguy@gmail.com',
      'bunmibalogun450@yahoo.com', 
      'joelayomide35@gmail.com'
    )
  );

-- Categories policies (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" ON posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authors can manage their own posts" ON posts
  FOR ALL USING (auth.uid() = author_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow authorized emails
  IF NEW.email NOT IN (
    'takeoutsguy@gmail.com',
    'bunmibalogun450@yahoo.com',
    'joelayomide35@gmail.com'
  ) THEN
    RAISE EXCEPTION 'Email not authorized for admin access';
  END IF;

  INSERT INTO profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Storage policies
CREATE POLICY "Blog images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-assets');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-assets' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-assets' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete their own blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-assets' 
    AND auth.role() = 'authenticated'
  );

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create admin_sessions table
CREATE TABLE admin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for admin_users
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create verify_admin_login function
CREATE OR REPLACE FUNCTION verify_admin_login(p_email TEXT, p_password TEXT)
RETURNS TABLE (
  success BOOLEAN,
  message TEXT,
  user_id UUID,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  IF p_email IS NULL OR p_password IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Email and password are required'::TEXT, NULL::UUID, NULL::TEXT, NULL::TIMESTAMP WITH TIME ZONE, NULL::TIMESTAMP WITH TIME ZONE;
    RETURN;
  END IF;

  RETURN QUERY
    SELECT
      TRUE,
      NULL::TEXT,
      u.id,
      u.email,
      u.created_at,
      u.updated_at
    FROM admin_users u
    WHERE u.email = LOWER(TRIM(p_email))
    AND u.password_hash = crypt(p_password, u.password_hash);
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN QUERY SELECT FALSE, 'Invalid credentials'::TEXT, NULL::UUID, NULL::TEXT, NULL::TIMESTAMP WITH TIME ZONE, NULL::TIMESTAMP WITH TIME ZONE;
  WHEN TOO_MANY_ROWS THEN
    RETURN QUERY SELECT FALSE, 'Multiple users found'::TEXT, NULL::UUID, NULL::TEXT, NULL::TIMESTAMP WITH TIME ZONE, NULL::TIMESTAMP WITH TIME ZONE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create create_admin_session function
CREATE OR REPLACE FUNCTION create_admin_session(p_user_id UUID)
RETURNS TABLE (
  success BOOLEAN,
  message TEXT,
  session_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  new_session_token TEXT;
  new_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM admin_users WHERE id = p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'User not found'::TEXT, NULL::TEXT, NULL::TIMESTAMP WITH TIME ZONE;
    RETURN;
  END IF;

  new_session_token := encode(gen_random_bytes(32), 'hex');
  new_expires_at := CURRENT_TIMESTAMP + INTERVAL '24 hours';

  INSERT INTO admin_sessions (user_id, session_token, expires_at)
  VALUES (p_user_id, new_session_token, new_expires_at);

  RETURN QUERY SELECT TRUE, NULL::TEXT, new_session_token, new_expires_at;
EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY SELECT FALSE, 'Failed to create session'::TEXT, NULL::TEXT, NULL::TIMESTAMP WITH TIME ZONE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create verify_admin_session function
CREATE OR REPLACE FUNCTION verify_admin_session(p_session_token TEXT)
RETURNS TABLE (
  success BOOLEAN,
  message TEXT
) AS $$
BEGIN
  IF p_session_token IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Session token is required'::TEXT;
    RETURN;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM admin_sessions
    WHERE session_token = p_session_token
    AND expires_at > CURRENT_TIMESTAMP
  ) THEN
    RETURN QUERY SELECT TRUE, NULL::TEXT;
  ELSE
    RETURN QUERY SELECT FALSE, 'Invalid or expired session'::TEXT;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY SELECT FALSE, 'Session verification failed'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create invalidate_admin_session function
CREATE OR REPLACE FUNCTION invalidate_admin_session(p_session_token TEXT)
RETURNS TABLE (
  success BOOLEAN
) AS $$
BEGIN
  IF p_session_token IS NULL THEN
    RETURN QUERY SELECT FALSE;
    RETURN;
  END IF;

  DELETE FROM admin_sessions
  WHERE session_token = p_session_token;

  RETURN QUERY SELECT TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY SELECT FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY admin_users_isolation ON admin_users
  FOR ALL
  USING (FALSE); -- Deny direct table access

CREATE POLICY admin_sessions_isolation ON admin_sessions
  FOR ALL
  USING (FALSE); -- Deny direct table access

-- Insert admin user
INSERT INTO admin_users (email, password_hash)
VALUES (
  'YOUR PRIMARY ADMIN EMAIL',
  crypt('YOURPASSWORD', gen_salt('bf'))
);

-- Grant execute permissions to anon and authenticated roles
GRANT EXECUTE ON FUNCTION verify_admin_login TO anon, authenticated;
GRANT EXECUTE ON FUNCTION create_admin_session TO anon, authenticated;
GRANT EXECUTE ON FUNCTION verify_admin_session TO anon, authenticated;
GRANT EXECUTE ON FUNCTION invalidate_admin_session TO anon, authenticated;
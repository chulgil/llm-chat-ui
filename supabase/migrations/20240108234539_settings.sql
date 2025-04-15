-- Create a schema for app settings
CREATE SCHEMA IF NOT EXISTS app;

-- Create a table to store settings
CREATE TABLE IF NOT EXISTS app.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Insert project URL and service role key from environment variables
INSERT INTO app.settings (key, value)
VALUES 
    ('project_url', current_setting('app.settings.NEXT_PUBLIC_SUPABASE_URL')),
    ('service_role_key', current_setting('app.settings.SUPABASE_SERVICE_ROLE_KEY'))
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value; 
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid text UNIQUE NOT NULL,
    display_name text,
    avatar_url text,
    role TEXT NOT NULL DEFAULT 'USER',
    bio text,
    location text,
    website text,
    email text,
    email_verified boolean NOT NULL DEFAULT FALSE,
    last_login_at timestamptz,
    is_active boolean NOT NULL DEFAULT TRUE,
    reputation_points integer NOT NULL DEFAULT 0,
    role_id integer REFERENCES user_roles(id) DEFAULT 3,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_users_display_name_length CHECK (display_name IS NULL OR (char_length(display_name) BETWEEN 3 AND 50)),
    CONSTRAINT chk_users_email_format CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


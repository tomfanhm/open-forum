CREATE TABLE user_preferences
(
    user_id             uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    notification_emails boolean     NOT NULL DEFAULT TRUE,
    dark_mode           boolean     NOT NULL DEFAULT FALSE,
    show_avatars        boolean     NOT NULL DEFAULT TRUE,
    created_at          timestamptz NOT NULL DEFAULT NOW(),
    updated_at          timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_user_preferences_timestamp
    BEFORE UPDATE
    ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE
OR REPLACE FUNCTION create_default_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO user_preferences (user_id)
VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;

RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_create_user_preferences
    AFTER INSERT
    ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_default_user_preferences();
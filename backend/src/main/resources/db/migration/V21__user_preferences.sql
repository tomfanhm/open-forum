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


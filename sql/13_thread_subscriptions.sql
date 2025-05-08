CREATE TABLE thread_subscriptions(
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    thread_id uuid NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, thread_id)
);

CREATE INDEX idx_thread_subscriptions_thread_id ON thread_subscriptions(thread_id);

CREATE TRIGGER update_thread_subscriptions_timestamp
    BEFORE UPDATE ON thread_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


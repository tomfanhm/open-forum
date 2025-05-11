CREATE TABLE user_activity_logs
(
    id            uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id       uuid        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    activity_type text        NOT NULL,
    ip_address    text,
    user_agent    text,
    created_at    timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_activity_logs_user_id ON user_activity_logs (user_id);

CREATE INDEX idx_user_activity_logs_created_at ON user_activity_logs (created_at);


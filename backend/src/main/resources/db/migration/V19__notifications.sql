CREATE TABLE notifications
(
    id           uuid PRIMARY KEY           DEFAULT gen_random_uuid(),
    user_id      uuid              NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    type         notification_type NOT NULL,
    reference_id uuid              NOT NULL,
    is_read      boolean           NOT NULL DEFAULT FALSE,
    created_at   timestamptz       NOT NULL DEFAULT NOW(),
    updated_at   timestamptz       NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications (user_id);

CREATE INDEX idx_notifications_reference_id ON notifications (reference_id);

CREATE TRIGGER update_notifications_timestamp
    BEFORE UPDATE
    ON notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


CREATE TABLE messages
(
    id           uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    sender_id    uuid        REFERENCES users (id) ON DELETE SET NULL,
    recipient_id uuid        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    subject      text,
    content      text        NOT NULL,
    is_read      boolean     NOT NULL DEFAULT FALSE,
    created_at   timestamptz NOT NULL DEFAULT NOW(),
    updated_at   timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_sender_id ON messages (sender_id);

CREATE INDEX idx_messages_recipient_id ON messages (recipient_id);

CREATE TRIGGER update_messages_timestamp
    BEFORE UPDATE
    ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


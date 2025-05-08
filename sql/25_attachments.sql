CREATE TABLE attachments(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    url text NOT NULL,
    mime_type text,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_attachments_post_id ON attachments(post_id);

CREATE TRIGGER update_attachments_timestamp
    BEFORE UPDATE ON attachments
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


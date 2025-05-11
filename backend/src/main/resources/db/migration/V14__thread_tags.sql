CREATE TABLE thread_tags
(
    thread_id  uuid        NOT NULL REFERENCES threads (id) ON DELETE CASCADE,
    tag_id     integer     NOT NULL REFERENCES tags (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY (thread_id, tag_id)
);

CREATE INDEX idx_thread_tags_tag_id ON thread_tags (tag_id);

CREATE TRIGGER update_thread_tags_timestamp
    BEFORE UPDATE
    ON thread_tags
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


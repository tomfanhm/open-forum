CREATE TABLE thread_watches(
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    thread_id uuid NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    last_read_at timestamptz NOT NULL DEFAULT NOW(),
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, thread_id)
);

CREATE TRIGGER update_thread_watches_timestamp
    BEFORE UPDATE ON thread_watches
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


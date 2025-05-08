CREATE TABLE threads(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id integer NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    title text NOT NULL,
    body text NOT NULL,
    is_pinned boolean NOT NULL DEFAULT FALSE,
    is_locked boolean NOT NULL DEFAULT FALSE,
    comment_count integer NOT NULL DEFAULT 0,
    view_count bigint NOT NULL DEFAULT 0,
    search_vector tsvector,
    is_deleted boolean NOT NULL DEFAULT FALSE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_threads_title_length CHECK (char_length(title) BETWEEN 3 AND 200)
);

CREATE INDEX idx_threads_board_id ON threads(board_id);

CREATE INDEX idx_threads_user_id ON threads(user_id);

CREATE INDEX idx_threads_search_vector ON threads USING GIN(search_vector);

CREATE TRIGGER update_threads_timestamp
    BEFORE UPDATE ON threads
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER threads_search_update
    BEFORE INSERT OR UPDATE ON threads
    FOR EACH ROW
    EXECUTE FUNCTION threads_search_vector_update();


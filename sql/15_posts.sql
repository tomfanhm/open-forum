CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id uuid NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    parent_post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
    content text NOT NULL,
    is_deleted boolean NOT NULL DEFAULT FALSE,
    search_vector tsvector,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_posts_content_length CHECK (char_length(content) >= 1)
);

CREATE INDEX idx_posts_thread_id ON posts(thread_id);

CREATE INDEX idx_posts_user_id ON posts(user_id);

CREATE INDEX idx_posts_parent_post_id ON posts(parent_post_id);

CREATE INDEX idx_posts_search_vector ON posts USING GIN(search_vector);

CREATE TRIGGER update_posts_timestamp
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER posts_search_update
    BEFORE INSERT OR UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION posts_search_vector_update();

CREATE OR REPLACE FUNCTION update_thread_comment_count()
    RETURNS TRIGGER
    AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NOT NEW.is_deleted THEN
        UPDATE
            threads
        SET
            comment_count = comment_count + 1
        WHERE
            id = NEW.thread_id;
    ELSIF TG_OP = 'UPDATE' THEN
        IF NEW.is_deleted AND NOT OLD.is_deleted THEN
            UPDATE
                threads
            SET
                comment_count = comment_count - 1
            WHERE
                id = NEW.thread_id;
        ELSIF NOT NEW.is_deleted
                AND OLD.is_deleted THEN
                UPDATE
                    threads
                SET
                    comment_count = comment_count + 1
                WHERE
                    id = NEW.thread_id;
        END IF;
    ELSIF TG_OP = 'DELETE'
            AND NOT OLD.is_deleted THEN
            UPDATE
                threads
            SET
                comment_count = comment_count - 1
            WHERE
                id = OLD.thread_id;
    END IF;
    RETURN NULL;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER post_count_trigger
    AFTER INSERT OR UPDATE OR DELETE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_thread_comment_count();


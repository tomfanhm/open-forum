CREATE TABLE thread_views
(
    id         uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    thread_id  uuid        NOT NULL REFERENCES threads (id) ON DELETE CASCADE,
    user_id    uuid        REFERENCES users (id) ON DELETE SET NULL,
    ip_address text,
    user_agent text,
    viewed_at  timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_thread_views_thread_id ON thread_views (thread_id);

CREATE INDEX idx_thread_views_user_id ON thread_views (user_id);

CREATE INDEX idx_thread_views_viewed_at ON thread_views (viewed_at);

CREATE
OR REPLACE FUNCTION increment_thread_view_count()
    RETURNS TRIGGER
    AS $$
BEGIN
UPDATE
    threads
SET view_count = view_count + 1
WHERE id = NEW.thread_id;
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER thread_view_counter
    AFTER INSERT
    ON thread_views
    FOR EACH ROW
    EXECUTE FUNCTION increment_thread_view_count();


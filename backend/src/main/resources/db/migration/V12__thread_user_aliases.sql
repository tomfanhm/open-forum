CREATE TABLE thread_user_aliases
(
    thread_id  uuid        NOT NULL REFERENCES threads (id) ON DELETE CASCADE,
    user_id    uuid        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    alias      text        NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY (thread_id, user_id)
);

CREATE TRIGGER update_thread_user_aliases_timestamp
    BEFORE UPDATE
    ON thread_user_aliases
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


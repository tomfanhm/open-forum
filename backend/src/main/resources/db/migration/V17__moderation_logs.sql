CREATE TABLE moderation_logs
(
    id           uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    moderator_id uuid        REFERENCES users (id) ON DELETE SET NULL,
    target_type  vote_target NOT NULL,
    target_id    uuid        NOT NULL,
    action       text        NOT NULL,
    reason       text,
    created_at   timestamptz NOT NULL DEFAULT NOW(),
    updated_at   timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_moderation_logs_timestamp
    BEFORE UPDATE
    ON moderation_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


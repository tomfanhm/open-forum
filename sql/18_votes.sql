CREATE TABLE votes(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type vote_target NOT NULL,
    target_id uuid NOT NULL,
    value vote_value NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, target_type, target_id)
);

CREATE INDEX idx_votes_target_id ON votes(target_id);

CREATE INDEX idx_votes_user_id ON votes(user_id);

CREATE TRIGGER update_votes_timestamp
    BEFORE UPDATE ON votes
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


CREATE TABLE board_moderators(
    board_id integer NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    can_pin boolean NOT NULL DEFAULT TRUE,
    can_lock boolean NOT NULL DEFAULT TRUE,
    can_delete boolean NOT NULL DEFAULT TRUE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY (board_id, user_id)
);

CREATE TRIGGER update_board_moderators_timestamp
    BEFORE UPDATE ON board_moderators
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


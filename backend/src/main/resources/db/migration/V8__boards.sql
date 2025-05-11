CREATE TABLE boards
(
    id          serial PRIMARY KEY,
    name        text        NOT NULL UNIQUE,
    slug        text        NOT NULL UNIQUE,
    description text,
    category_id integer     REFERENCES board_categories (id) ON DELETE SET NULL,
    created_at  timestamptz NOT NULL DEFAULT NOW(),
    updated_at  timestamptz NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_boards_name_length CHECK (char_length(name) BETWEEN 3 AND 50)
);

CREATE TRIGGER update_boards_timestamp
    BEFORE UPDATE
    ON boards
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


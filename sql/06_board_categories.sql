CREATE TABLE board_categories(
    id serial PRIMARY KEY,
    name text NOT NULL UNIQUE,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_board_categories_timestamp
    BEFORE UPDATE ON board_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


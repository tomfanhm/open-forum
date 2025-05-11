CREATE TABLE tags
(
    id         serial PRIMARY KEY,
    name       text        NOT NULL UNIQUE,
    color      text,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_tags_name_length CHECK (char_length(name) BETWEEN 2 AND 30)
);

CREATE TRIGGER update_tags_timestamp
    BEFORE UPDATE
    ON tags
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


CREATE
OR REPLACE FUNCTION posts_search_vector_update()
    RETURNS TRIGGER
    AS $$
BEGIN
    NEW.search_vector
:= to_tsvector('english', COALESCE(NEW.content, ''));
RETURN NEW;
END;
$$
LANGUAGE plpgsql;


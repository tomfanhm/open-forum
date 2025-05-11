CREATE TABLE user_roles
(
    id                     serial PRIMARY KEY,
    name                   text        NOT NULL UNIQUE,
    can_create_threads     boolean     NOT NULL DEFAULT TRUE,
    can_create_posts       boolean     NOT NULL DEFAULT TRUE,
    can_upload_attachments boolean     NOT NULL DEFAULT TRUE,
    can_vote               boolean     NOT NULL DEFAULT TRUE,
    can_report             boolean     NOT NULL DEFAULT TRUE,
    can_moderate           boolean     NOT NULL DEFAULT FALSE,
    can_administrate       boolean     NOT NULL DEFAULT FALSE,
    created_at             timestamptz NOT NULL DEFAULT NOW(),
    updated_at             timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_user_roles_timestamp
    BEFORE UPDATE
    ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

INSERT INTO user_roles(name, can_moderate, can_administrate)
VALUES ('ADMIN', TRUE, TRUE);

INSERT INTO user_roles(name, can_moderate)
VALUES ('MODERATOR', TRUE);

INSERT INTO user_roles(name)
VALUES ('USER');

INSERT INTO user_roles(name, can_create_threads, can_create_posts, can_upload_attachments)
VALUES ('READ_ONLY', FALSE, FALSE, FALSE);


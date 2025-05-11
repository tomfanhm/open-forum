CREATE TABLE forum_statistics
(
    id                      serial PRIMARY KEY,
    total_users             bigint      NOT NULL DEFAULT 0,
    total_threads           bigint      NOT NULL DEFAULT 0,
    total_posts             bigint      NOT NULL DEFAULT 0,
    active_users_last_day   bigint      NOT NULL DEFAULT 0,
    active_users_last_week  bigint      NOT NULL DEFAULT 0,
    active_users_last_month bigint      NOT NULL DEFAULT 0,
    last_calculated_at      timestamptz NOT NULL DEFAULT NOW(),
    updated_at              timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_forum_statistics_timestamp
    BEFORE UPDATE
    ON forum_statistics
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


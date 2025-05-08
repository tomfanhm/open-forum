CREATE TYPE vote_target AS ENUM(
    'THREAD',
    'POST'
);

CREATE TYPE vote_value AS ENUM(
    'UP',
    'DOWN'
);

CREATE TYPE notification_type AS ENUM(
    'REPLY',
    'VOTE',
    'MENTION',
    'MODERATION'
);

CREATE TYPE report_status AS ENUM(
    'PENDING',
    'INVESTIGATING',
    'RESOLVED',
    'DISMISSED'
);


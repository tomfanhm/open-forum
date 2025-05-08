CREATE TABLE reports(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id uuid REFERENCES users(id) ON DELETE SET NULL,
    target_type vote_target NOT NULL,
    target_id uuid NOT NULL,
    reason text NOT NULL,
    status report_status NOT NULL DEFAULT 'PENDING',
    moderator_id uuid REFERENCES users(id) ON DELETE SET NULL,
    resolution_note text,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_reporter_id ON reports(reporter_id);

CREATE INDEX idx_reports_target_id ON reports(target_id);

CREATE INDEX idx_reports_status ON reports(status);

CREATE TRIGGER update_reports_timestamp
    BEFORE UPDATE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();


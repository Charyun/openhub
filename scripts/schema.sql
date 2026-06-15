CREATE TABLE IF NOT EXISTS industries (
  id       TEXT PRIMARY KEY,
  name_zh  TEXT NOT NULL,
  name_en  TEXT NOT NULL,
  icon     TEXT,
  "order"  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS scenes (
  id          TEXT PRIMARY KEY,
  industry_id TEXT NOT NULL REFERENCES industries(id),
  name_zh     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id               TEXT PRIMARY KEY,
  github_full_name TEXT UNIQUE NOT NULL,
  display_name     TEXT NOT NULL,
  description_zh   TEXT,
  industry_id      TEXT REFERENCES industries(id),
  scene_id         TEXT REFERENCES scenes(id),
  tags             TEXT DEFAULT '[]',
  stars            INTEGER DEFAULT 0,
  language         TEXT,
  license          TEXT,
  updated_at       TEXT,
  deploy_level     TEXT,
  deploy_difficulty INTEGER,
  chinese_support  TEXT,
  screenshots      TEXT DEFAULT '[]',
  alternative_to   TEXT DEFAULT '[]',
  target_users     TEXT DEFAULT '[]',
  use_cases        TEXT DEFAULT '[]',
  features         TEXT DEFAULT '[]',
  github_url       TEXT NOT NULL,
  homepage         TEXT,
  deploy_command   TEXT,
  quality_score    INTEGER DEFAULT 0,
  status           TEXT DEFAULT 'pending',
  created_at       TEXT NOT NULL,
  published_at     TEXT
);

CREATE VIRTUAL TABLE IF NOT EXISTS projects_fts USING fts5(
  display_name,
  description_zh,
  tags,
  content=projects,
  content_rowid=rowid
);

CREATE TRIGGER IF NOT EXISTS projects_ai AFTER INSERT ON projects BEGIN
  INSERT INTO projects_fts(rowid, display_name, description_zh, tags)
  VALUES (new.rowid, new.display_name, new.description_zh, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS projects_au AFTER UPDATE ON projects BEGIN
  INSERT INTO projects_fts(projects_fts, rowid, display_name, description_zh, tags)
  VALUES ('delete', old.rowid, old.display_name, old.description_zh, old.tags);
  INSERT INTO projects_fts(rowid, display_name, description_zh, tags)
  VALUES (new.rowid, new.display_name, new.description_zh, new.tags);
END;

CREATE TABLE IF NOT EXISTS pending_queue (
  github_full_name TEXT PRIMARY KEY,
  raw_data         TEXT NOT NULL,
  auto_score       INTEGER DEFAULT 0,
  collected_at     TEXT NOT NULL,
  status           TEXT DEFAULT 'pending'
);

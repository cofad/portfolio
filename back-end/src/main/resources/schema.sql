-- Simple example table created on app startup
CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip VARCHAR(64),
  visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

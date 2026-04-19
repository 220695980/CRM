import sqlite3
from pathlib import Path
from flask import g

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "crm.db"
SCHEMA_PATH = BASE_DIR / "app" / "schema.sql"
SEED_PATH = BASE_DIR / "app" / "seed.sql"

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db():
    db = sqlite3.connect(DB_PATH)
    schema = SCHEMA_PATH.read_text(encoding="utf-8")
    db.executescript(schema)

    count = db.execute("SELECT COUNT(*) AS total FROM leads").fetchone()[0]
    if count == 0:
        seed = SEED_PATH.read_text(encoding="utf-8")
        db.executescript(seed)

    db.commit()
    db.close()

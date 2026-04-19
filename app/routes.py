from flask import Blueprint, jsonify, request
from .database import get_db

main = Blueprint("main", __name__)

@main.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@main.route("/api/leads", methods=["GET"])
def get_leads():
    db = get_db()
    rows = db.execute(
        "SELECT id, full_name, company, email, phone, status, source, created_at "
        "FROM leads ORDER BY id DESC"
    ).fetchall()
    return jsonify([dict(row) for row in rows])

@main.route("/api/dashboard", methods=["GET"])
def dashboard():
    db = get_db()
    total = db.execute("SELECT COUNT(*) FROM leads").fetchone()[0]
    new_count = db.execute("SELECT COUNT(*) FROM leads WHERE status = 'New'").fetchone()[0]
    contacted = db.execute("SELECT COUNT(*) FROM leads WHERE status = 'Contacted'").fetchone()[0]
    closed = db.execute("SELECT COUNT(*) FROM leads WHERE status = 'Closed Won'").fetchone()[0]

    return jsonify({
        "totalLeads": total,
        "newLeads": new_count,
        "contactedLeads": contacted,
        "closedLeads": closed,
    })

@main.route("/api/leads", methods=["POST"])
def add_lead():
    data = request.get_json(silent=True) or {}
    full_name = (data.get("full_name") or "").strip()
    company = (data.get("company") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    status = (data.get("status") or "New").strip()
    source = (data.get("source") or "").strip()

    if not full_name or not company or not email:
        return jsonify({"error": "full_name, company, and email are required"}), 400

    db = get_db()
    db.execute(
        "INSERT INTO leads (full_name, company, email, phone, status, source) "
        "VALUES (?, ?, ?, ?, ?, ?)",
        (full_name, company, email, phone, status, source),
    )
    db.commit()
    return jsonify({"message": "Lead added successfully"}), 201

@main.route("/api/leads/<int:lead_id>", methods=["PUT"])
def update_lead(lead_id):
    data = request.get_json(silent=True) or {}
    status = (data.get("status") or "").strip()

    allowed = {"New", "Contacted", "Qualified", "Proposal Sent", "Closed Won", "Closed Lost"}
    if status not in allowed:
        return jsonify({"error": "Invalid status"}), 400

    db = get_db()
    cursor = db.execute("UPDATE leads SET status = ? WHERE id = ?", (status, lead_id))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Lead not found"}), 404

    return jsonify({"message": "Lead updated successfully"})

@main.teardown_app_request
def teardown(exception):
    from .database import close_db
    close_db()

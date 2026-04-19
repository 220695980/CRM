CRM Python + React Project

This version uses:
- Python Flask backend
- SQL database (SQLite for local setup)
- React frontend (Vite structure)

What changed:
- The frontend is now a real React app with separate source files
- Flask only provides the API
- React handles the dashboard, lead table, and add-lead form

How to run

Backend:
1. Open terminal in backend folder
2. Create virtual environment:
   python -m venv venv
3. Activate it:
   Windows: venv\Scripts\activate
   Mac/Linux: source venv/bin/activate
4. Install dependencies:
   pip install -r requirements.txt
5. Start backend:
   python run.py

Frontend:
1. Open a second terminal in frontend folder
2. Install dependencies:
   npm install
3. Start React:
   npm run dev

URLs:
- Flask API: http://127.0.0.1:5000
- React app: http://127.0.0.1:5173

Suggested next upgrades:
- JWT authentication
- Search and filters
- Notes and reminders
- Charts
- PostgreSQL/MySQL for production

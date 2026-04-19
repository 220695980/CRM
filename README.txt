CRM Python Project

This is a beginner-friendly CRM starter project based on the project card you shared:

Project:
- CRM
- A Customer Relationship Management platform for sales leads

Tech stack used:
- Python
- SQL
- React (implemented here as a React frontend loaded from CDN)
- SQLite for easy local setup

What is included:
- Flask backend in Python
- SQLite database
- Lead management
- Lead status tracking
- Simple dashboard metrics
- React frontend
- SQL schema and seed data

How to run:
1. Open a terminal in this project folder
2. Create a virtual environment:
   python -m venv venv
3. Activate it:
   Windows: venv\Scripts\activate
   Mac/Linux: source venv/bin/activate
4. Install dependencies:
   pip install -r requirements.txt
5. Start the app:
   python run.py
6. Open:
   http://127.0.0.1:5000

Default features:
- View leads
- Add a lead
- Update lead status
- Dashboard cards for total leads, new leads, contacted leads, and closed leads

Suggested next upgrades:
- Add login and user roles
- Add notes and reminders
- Add search and filters
- Add email integration
- Add charts
- Connect to PostgreSQL or MySQL for production

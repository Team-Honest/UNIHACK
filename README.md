# Ice-Breakering Storytelling App

This project is a web application that enables users to collaboratively create stories using generative AI. It consists of a **Next.js** frontend and a **Django** backend with WebSocket support for real-time interactions.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend (Django)](#backend-django)
  - [Frontend (Next.js)](#frontend-nextjs)
- [Running the Project](#running-the-project)
- [License](#license)

---

## Features
- **Real-time collaboration**: Users can create or join rooms to co-author stories.
- **AI-generated content**: Uses a generative AI model to continue the story.
- **WebSockets for live updates**: Instantaneous synchronization across connected users.
- **Minimalist UI**: A clean and intuitive interface for users.

## Tech Stack
- **Backend**: Django, Django Channels (WebSockets), REST Framework
- **Frontend**: Next.js (React.js), WebSockets
- **Database**: PostgreSQL (or SQLite for local development)

## Project Structure
```
/backend                 # Django backend
  /ai_story              # Main Django app
  /api                   # Django REST API
  /requirements.txt      # Dependencies
  manage.py              # Django management script
/frontend                # Next.js frontend
  /components            # UI Components
  /hooks                 # Custom hooks
  /contexts              # Global state management
  /pages                 # Next.js routes
  /utils                 # Helper functions
  package.json           # Frontend dependencies
```

---

## Setup Instructions

### Backend (Django)

#### Prerequisites
- Python 3.9+
- Node.JS


#### Installation Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/Team-Honest/UNIHACK
   cd https://github.com/Team-Honest/UNIHACK
   ```

2. **Create and activate a virtual environment**:
   ```sh
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```sh
   pip install -r requirements.txt
   ```

4. **Run database migrations**:
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```

5. ** Set Up Environment Variables**

To keep sensitive information private, we use an `env.py` file.

#### **Step 1: Create an `env.py` file**
Inside the `backend/` directory, create a new file called **`env.py`**, and add the following:

```python
import os

GEMINI_API_KEY = "your_google_gemini_api_key"
```

6. **Start the Django development server**:
   ```sh
   python manage.py runserver
   ```


---

### Frontend (Next.js)

#### Prerequisites
- Node.js (LTS recommended, e.g., v18+)
- npm 

#### Installation Steps
1. **Navigate to the frontend directory**:
   ```sh
   cd ../frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install  # or yarn install
   ```

3. **Start the Next.js development server**:
   ```sh
   npm run dev  # or yarn dev
   ```

The app will be available at `http://localhost:3000`

---

## Running the Project
### Full Stack Run
1. Start the **backend** 
2. Start the **frontend** 
3. Open `http://localhost:3000` in your browser


---

## License
This project is open-source under the MIT License.


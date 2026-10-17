# Best Cars Dealership — Full Stack Developer Capstone

**Project name:** Best Cars Dealership — a national car dealership review portal
**Author:** Nguyễn Đỗ Nhật Quang (SE201485)

Best Cars is a full-stack web application where visitors can browse car dealerships across the United States, filter them by state, read customer reviews, and (once signed in) post their own reviews. Every new review is scored by a sentiment-analysis microservice.

## Architecture

| Component | Tech | Port | Folder |
|---|---|---|---|
| Web app + REST proxy + auth + car models | Django 4.2 (SQLite) | 8000 | `server/` |
| Frontend (Login, Register, Dealers, Dealer, Post Review) | React 18 | built into Django | `server/frontend/` |
| Static pages (Home, About Us, Contact Us) | HTML + Bootstrap 5 | served by Django | `server/frontend/static/` |
| Dealers & reviews API | Node.js + Express + MongoDB | 3030 | `server/database/` |
| Sentiment analyzer | Flask + NLTK VADER | 5050 | `server/djangoapp/microservices/` |
| CI | GitHub Actions (flake8 + JSHint) | — | `.github/workflows/main.yml` |
| Deployment | Docker + Kubernetes | 8000 | `server/Dockerfile`, `server/deployment.yaml` |

## Run locally

```bash
# 1. Dealers / reviews API (MongoDB + Express)
cd server/database
docker build . -t nodeapp
docker-compose up -d            # http://localhost:3030

# 2. Sentiment analyzer
cd ../djangoapp/microservices
docker build . -t us.icr.io/$SN_ICR_NAMESPACE/senti_analyzer
docker run -d -p 5050:5050 us.icr.io/$SN_ICR_NAMESPACE/senti_analyzer
# (or: pip install -r requirements.txt && python app.py)

# 3. React frontend
cd ../../frontend
npm install && npm run build

# 4. Django
cd ..
pip install -r requirements.txt
python manage.py makemigrations && python manage.py migrate
python manage.py createsuperuser   # username: root
python manage.py runserver         # http://localhost:8000
```

Backend URLs used by Django are set in `server/djangoapp/.env`:

```
backend_url=http://localhost:3030
sentiment_analyzer_url=http://localhost:5050/
```

## REST endpoints

Django (`/djangoapp/...`): `login`, `logout`, `register`, `get_cars`, `get_dealers`, `get_dealers/<state>`, `dealer/<id>`, `reviews/dealer/<id>`, `add_review`.

Node (`:3030`): `/fetchReviews`, `/fetchReviews/dealer/:id`, `/fetchDealers`, `/fetchDealers/:state`, `/fetchDealer/:id`, `/insert_review`.

Sentiment (`:5050`): `/analyze/<text>` → `{"sentiment": "positive" | "neutral" | "negative"}`.

## Submission outputs

Run `bash submission/capture_outputs.sh` with all three services up. It writes the cURL evidence files
(`django_server` excluded — copy the terminal output of `runserver`) into `submission/`.

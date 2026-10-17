# Submission guide — task by task

Replace `<you>` with your GitHub username. Repo name: `xrwvm-fullstack_developer_capstone`.

| Task | What to submit | Where it comes from |
|---|---|---|
| 1 | `https://github.com/<you>/xrwvm-fullstack_developer_capstone/blob/main/README.md` | `README.md` |
| 2 | Contents of `django_server` | Run `python manage.py runserver` in `server/`, copy the terminal output into `submission/django_server` |
| 3 | `.../blob/main/server/frontend/static/About.html` | Done |
| 4 | `.../blob/main/server/frontend/static/Contact.html` | Done |
| 5 | `loginuser` | `capture_outputs.sh` (already captured) |
| 6 | `logoutuser` | `capture_outputs.sh` (already captured) |
| 7 | `.../blob/main/server/frontend/src/components/Register/Register.jsx` | Done |
| 8 | `getdealerreviews` | `capture_outputs.sh` — needs Node API + MongoDB running |
| 9 | `getalldealers` | same |
| 10 | `getdealerbyid` | same |
| 11 | `getdealersbyState` | same (Kansas has dealers 11, 12, 13) |
| 12 | `admin_login.png` | Log in at `/admin` as `root` → screenshot |
| 13 | `admin_logout.png` | Click "Log out" in admin → screenshot |
| 14–15 | `getallcarmakes` | `capture_outputs.sh` (already captured) |
| 16 | `analyzereview` | `capture_outputs.sh` (already captured) |
| 17 | `get_dealers.png` | `/dealers` while logged out |
| 18 | `get_dealers_loggedin.png` | `/dealers` logged in — username + "Review Dealer" column + address bar visible |
| 19 | `dealersbystate.png` | `/dealers`, choose Kansas in the State dropdown, address bar visible |
| 20 | `dealer_id_reviews.png` | `/dealer/11` — dealer info + reviews, address bar visible |
| 21 | `dealership_review_submission.png` | `/postreview/11` filled in, before clicking Post Review |
| 22 | `added_review.png` | `/dealer/11` after posting, new review visible |
| 23 | `CICD` | Push to GitHub → Actions tab → open the "Lint Code" run → copy the step log |
| 24 | `deploymentURL` | Put your deployed URL in `submission/deploymentURL` |
| 25 | `deployed_landingpage.png` | Deployed `/` |
| 26 | `deployed_loggedin.png` | Deployed site, logged in, username visible |
| 27 | `deployed_dealer_detail.png` | Deployed `/dealer/<id>` |
| 28 | `deployed_add_review.png` | Deployed dealer page showing the review you posted |

## Order to bring everything up (IBM Skills Network lab or local)

```bash
# Node + Mongo
cd server/database && docker build . -t nodeapp && docker-compose up -d
# Sentiment (deploy to Code Engine in the lab, then put its URL in server/djangoapp/.env)
cd ../djangoapp/microservices && pip install -r requirements.txt && python -m nltk.downloader vader_lexicon && python app.py &
# React
cd ../../frontend && npm install && npm run build
# Django
cd .. && pip install -r requirements.txt && python manage.py makemigrations && python manage.py migrate
python manage.py createsuperuser --username root
python manage.py runserver 2>&1 | tee ../submission/django_server
# Capture cURL evidence (new terminal, from repo root)
bash submission/capture_outputs.sh root <root-password>
```

In the lab, if Django runs behind the Skills Network proxy, set `backend_url` and
`sentiment_analyzer_url` in `server/djangoapp/.env` to the launched-application URLs (no trailing slash
for `backend_url`, trailing slash for `sentiment_analyzer_url`).

## Deployment (Kubernetes, IBM Cloud lab)

```bash
cd server
MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
docker build -t us.icr.io/$MY_NAMESPACE/dealership .
docker push us.icr.io/$MY_NAMESPACE/dealership
sed -i "s#your-namespace#$MY_NAMESPACE#" deployment.yaml
kubectl apply -f deployment.yaml
kubectl port-forward deployment.apps/dealership 8000:8000
```

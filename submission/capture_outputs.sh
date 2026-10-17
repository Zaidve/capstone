#!/usr/bin/env bash
# Captures the cURL evidence files required by the rubric (Tasks 5, 6, 8-11, 14-16).
# Run with Django (:8000), the Node API (:3030) and the sentiment service (:5050) running.
#
# Usage:
#   bash submission/capture_outputs.sh [username] [password]
#
# Override endpoints if running in the IBM lab / deployed URLs:
#   DJANGO_URL=https://...  NODE_URL=https://...  SENTI_URL=https://...  bash submission/capture_outputs.sh

USER_NAME="${1:-root}"
USER_PASS="${2:-root}"
DJANGO_URL="${DJANGO_URL:-http://localhost:8000}"
NODE_URL="${NODE_URL:-http://localhost:3030}"
SENTI_URL="${SENTI_URL:-http://localhost:5050}"
DEALER_ID="${DEALER_ID:-11}"

OUT_DIR="$(cd "$(dirname "$0")" && pwd)"
COOKIES="$OUT_DIR/.cookies.txt"
rm -f "$COOKIES"

# run <file> <command...> : writes "$ command" followed by its output into the file
run() {
  local file="$1"; shift
  {
    echo "\$ $*"
    eval "$@"
    echo
  } > "$OUT_DIR/$file" 2>&1
  echo "---- $file ----"
  cat "$OUT_DIR/$file"
}

# Task 5: login
run loginuser "curl -s -c $COOKIES -X POST $DJANGO_URL/djangoapp/login \
  -H 'Content-Type: application/json' \
  -d '{\"userName\": \"$USER_NAME\", \"password\": \"$USER_PASS\"}'"

# Task 6: logout (uses the session cookie from login)
run logoutuser "curl -s -b $COOKIES -X GET $DJANGO_URL/djangoapp/logout"

# Task 8: reviews for a dealer
run getdealerreviews "curl -s -X GET $NODE_URL/fetchReviews/dealer/$DEALER_ID"

# Task 9: all dealers
run getalldealers "curl -s -X GET $NODE_URL/fetchDealers"

# Task 10: dealer by id
run getdealerbyid "curl -s -X GET $NODE_URL/fetchDealer/$DEALER_ID"

# Task 11: dealers in Kansas
run getdealersbyState "curl -s -X GET $NODE_URL/fetchDealers/Kansas"

# Task 14 & 15: car makes and models
run getallcarmakes "curl -s -X GET $DJANGO_URL/djangoapp/get_cars"

# Task 16: sentiment of "Fantastic services"
run analyzereview "curl -s -X GET '$SENTI_URL/analyze/Fantastic%20services'"

rm -f "$COOKIES"
echo "Done. Files written to $OUT_DIR"

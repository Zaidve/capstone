FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt \
    && python -m nltk.downloader -d /usr/local/share/nltk_data vader_lexicon

COPY . .

EXPOSE 5050
CMD ["python3", "-m", "flask", "--app", "app", "run", "--host=0.0.0.0", "--port=5050"]

FROM node:22-slim

RUN apt-get update && apt-get install -y \
    bash \
    curl \
    git \
    openssh-client \
    zip \
    locales

# ngrok
RUN curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
    && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | tee /etc/apt/sources.list.d/ngrok.list \
    && apt-get update && apt-get install -y ngrok

# pnpm
RUN npm i -g pnpm

# local
RUN localedef -f UTF-8 -i ja_JP ja_JP.UTF-8

# cleanup
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* 

ENV LANG="ja_JP.UTF-8" \
    LANGUAGE="ja_JP:ja" \
    LC_ALL="ja_JP.UTF-8" \
    TZ=Asia/Tokyo
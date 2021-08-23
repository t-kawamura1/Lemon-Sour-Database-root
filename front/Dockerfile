# 2021年5月時点のLTSであるnode:16ではVueのインストールでエラーが出たため、14を使用。
FROM node:14-slim

ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    VUE_APP_API_ENDPOINT=${VUE_APP_API_ENDPOINT} \
    VUE_APP_RESET_REDIRECT_URL=${VUE_APP_RESET_REDIRECT_URL} \
    VUE_APP_CRYPTO_KEY=${VUE_APP_CRYPTO_KEY}

WORKDIR /app

# Puppeteerの起動に必要なChromeと関連パッケージ等のインストール。
# 公式参照（https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker）
# 上に加えて、Vueのイントールでエラーが出るためlibxtst6を、Puppeteerの実行でエラーが出るためprocpsを追加している。
RUN apt-get update \
  && apt-get install -y wget gnupg vim procps \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 libxtst6 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install \
  && npm install -g @vue/cli

COPY . ./

RUN npm run build

EXPOSE 8080
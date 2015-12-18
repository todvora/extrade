FROM nodesource/node:4.0

RUN git config --global http.proxy http://172.16.10.104:8080
RUN npm config set proxy http://172.16.10.104:8080
RUN npm config set https-proxy http://172.16.10.104:8080

ENV http_proxy http://172.16.10.104:8080
ENV https_proxy http://172.16.10.104:8080
ENV HTTP_PROXY http://172.16.10.104:8080
ENV HTTPS_PROXY http://172.16.10.104:8080
ENV no_proxy localhost


ADD package.json package.json

# http://qiita.com/neofreko/items/c36b3fd14dc77ab18a1a
RUN npm config set registry http://registry.npmjs.org/ && npm install --no-optional

ADD . .

EXPOSE 8000

RUN npm install -g gulp

CMD ["gulp", "-p"]
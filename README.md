# linshare-editor-onlyoffice-frontend

Frontend part for LinShare editor tool using OnlyOffice

## Project configuration

You can update the `.env` file to define the instance to reach, or override it in a new `.env.development.local` file.

You should follow Vue.js [rule](https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code) for variables in `.env*` by having `VUE_APP_` prefix in your configurations.

The `.env*` files currently support following configurations:
- `VUE_APP_LINSHARE_URL`: Base url of Linshare
- `VUE_APP_BACKEND_URL`: Base url of Document Server
- `VUE_APP_DOCUMENT_SERVER_URL`: Base url of LinShare backend editor
- `VUE_APP_LINSHARE_UI_USER_URL`: Base url of LinShare frontend app for user

You can also update configurations in `./public/config/config.js`, configurations inside this file have highest priority, which means that it will override all the configurations in `.env*` files. It's main purpose is to allow updating configurations on production mode without having to rebuild the app, but you can also use in it development stage.

The `config.js` in development mode currently supports following configurations:

- `LINSHARE_URL`: Base url of LinShare
- `DOCUMENT_SERVER_URL`: Base url of Document Server
- `BACKEND_URL`: Base url of LinShare backend editor
- `LINSHARE_UI_USER_URL`: base url of LinShare frontend app for user

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

## Docker
For docker deployment, checkout [dockerfile repository](https://github.com/linagora/linshare-ui-editor-onlyoffice-dockerfile).

You can update configurations on runtime without rebuilding the docker image by running the container with a volume:
```bash
$ docker run -d \
-e LINSHARE_BACKEND_HOST=<linshare-backend-host> \
-e LINSHARE_BACKEND_PORT=<linshare-backend-port> \
-p 8888:80 \
-v $PWD/public/config:/usr/local/apache2/htdocs/linshare-ui-editor-onlyoffice/config \
linagora/linshare-ui-editor-onlyoffice

```
this way you can update the configurations in `./public/config/config.js` from your host machine.

The `config.js` in production mode currently supports following configurations:

- `DOCUMENT_SERVER_URL`: Base url of Document Server
- `BACKEND_URL`: Base url of LinShare backend editor
- `LINSHARE_UI_USER_URL`: Base url of LinShare frontend app for user
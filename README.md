# Skeleton project for NodeJS + Express + Swagger + Typescript + Typings + gulp

## Getting started

### Install dependencies
- install nodeJS 6.3.1 x64 (or later)

- open terminal

```bash
npm install -g swagger
npm install -g tslint typescript typings
npm install -g gulp
```

### Compile

```bash
npm install

gulp
```
*will do a compile and watch*

### Test

```bash
npm test
```

### Start service

```bash
npm start
```

## Useful know-how

### Swagger template

#### Creating templated project
```bash
swagger project create SampleService
```

#### Editing swagger .yaml file
```bash
swagger project edit
```

### Typings

#### Global dependencies

```bash
typings install dt~node --global --save
typings install dt~express dt~serve-static dt~express-serve-static-core --global --save
```

#### Global (dev) dependencies

```bash
typings install dt~mocha --global --save-dev
typings install dt~supertest --global --save-dev
```

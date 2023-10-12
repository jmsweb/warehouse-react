# warehouse-react

## About

Warehouse React is a UI/UX demonstration of a SPA cookie-based microservice architecture that comply with strict CORS policies. For example, cookie with HttpOnly, Secure, and SameSite attributes, and request authorization headers. This project depends on Access-Control-Allow-Origin to have a fully qualified domain name and Access-Control-Allow-Credentials need to be true. It uses Fetch API, React, Bootstrap, and Html5QrCode depenedencies to generate UI/UX and submit requests to a API gateway on same domain different port.

In a simple word, this is a frontend application that send requests to an API gateway. If API gateway is not running, this project would still display in the web browser but would fail on any API calls. It mostly compose of React functions and makes use of React Hooks commonly such as useNagivate, useState, and useContext.

## Requirement

Hard requirements:
- npm 9
- Node 18
- webpack 5
- React 18
- Bootstrap 5

Optional requirements:
- Apache HTTPD
- OpenSSL

## Install

- `npm install`
- `npm run start:dev`

## Deploy

- `npm run build:dev`
- `npm run build:prod`

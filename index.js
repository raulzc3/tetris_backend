// app.js

const Koa = require("koa");
const { koaBody } = require("koa-body");

const app = new Koa();

// middleware
app.use(koaBody());

// Require the routers
let scores = require("./scores.js");

// use the routes
app.use(scores.routes());

app.listen(3000);

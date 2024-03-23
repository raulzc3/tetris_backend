require("dotenv").config();
const Koa = require("koa");
const { koaBody } = require("koa-body");

const app = new Koa();

// middleware
app.use(koaBody());

// Require the routers
const scores = require("./routes/scores");

// use the routes
app.use(scores.routes());

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

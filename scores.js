const Router = require("koa-router");
const { insertData, findWithLimit, test, query } = require("./database");

// Prefix all routes with: /items
const router = new Router({
  prefix: "/scores",
});

// Routes
router.get("/", async (ctx, next) => {
  const scores = await findWithLimit(3);
  console.log(scores);
  ctx.body = scores;
  next();
});

router.post("/add", (ctx, next) => {
  console.log(ctx.request.body);
  let { name, score } = ctx.request.body;
  console.log(name, score);
  if (name?.length <= 3 && score) {
    score = Number(score);
    const result = insertData([name, score]);
    if (result) {
      ctx.body = { success: true, data: "Your data is safe now" };
    } else {
      ctx.body = {
        success: false,
        data: "There was a problem storing your data :(",
      };
    }
  } else {
    console.log("Wot");
  }

  next();
});

module.exports = router;

const Router = require("koa-router");

const { getScores, saveScores } = require("../controllers/scoresController");

// Prefix all routes with: /items
const router = new Router({
  prefix: "/scores",
});

// Routes
router.get("/", getScores);
router.post("/add", saveScores);

module.exports = router;

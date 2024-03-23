const { getAllScoresFromDB, insertScore } = require("../models/scoresModel");

const getScores = async (ctx, next) => {
  const limit = Math.abs(Number(ctx.request?.query?.limit)) || 10;

  const result = await getAllScoresFromDB(limit);
  ctx.body = { data: result, message: "List of all scores" };
  next();
};

const saveScores = async (ctx, next) => {
  let { name, score } = ctx.request?.body || {};

  //Name => Three characters uppercase
  name = name?.trim()?.substring(0, 3)?.toUpperCase();
  //Score => positive number
  score = Math.abs(Number(score)) || false;

  if (!name || !score) {
    ctx.body = {
      error: "Missing arguments",
    };
    next();
    return;
  }

  const successStoringData = await insertScore({ name, score });
  if (successStoringData) {
    ctx.body = { data: [], message: "Score saved successfully" };
  } else {
    ctx.body = { error: "Error during score insertion" };
  }

  next();
};

module.exports = { getScores, saveScores };

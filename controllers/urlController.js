const shortid = require("shortid");
const URL = require("../models/urlModel");
async function generateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortUrl = shortid();

  await URL.create({
    shortUrl: shortUrl,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy : req.user._id
  });
  return res.render("index", { url: shortUrl });
}

async function getAnalytics(req, res) {
  const shortUrl = req.params.shortid;
  const result = await URL.findOne({ shortUrl });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateNewShortUrl,
  getAnalytics,
};

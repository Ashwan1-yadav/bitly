const express = require("express")
const {generateNewShortUrl,getAnalytics} = require("../controllers/urlController")
const router = express.Router()

router.post("/",generateNewShortUrl)
router.get("/analytics/:shortid",getAnalytics)

module.exports = router
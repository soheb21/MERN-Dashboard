const express = require("express")
const { getAllDataController, getAllDataByFilterController, filteredByYear} = require("../controller/dataCtrl")

const router = express.Router()

router.get("/all", getAllDataController )
router.get("/any/:search",getAllDataByFilterController)
// // api to get data filtered by year
router.get("/year/:year", filteredByYear)



module.exports = router
const express = require("express");
const router = express.Router();

//getting controls from controllers
const { getData, getLastData, postPerformOperation, getLastTenData, updateData, deleteData } = require("../controllers/control");

router.get("/get-data", getData)
router.get("/get-last-data", getLastData)
router.get("/get-last-ten-data", getLastTenData)
router.put("/update", updateData)
router.delete("/delete", deleteData)
router.post("/perform-operation", postPerformOperation)

module.exports = router;
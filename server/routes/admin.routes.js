const admin = require("../controller/admin.controller")

const router = require("express").Router()

router

    .post("/add-tech", admin.addTechnology)
    .get("/get-tech", admin.getTechnology)
    .put("/update-tech/:id", admin.updateTechnology)
    .delete("/delete-tech/:id", admin.deleteTechnology)

module.exports = router
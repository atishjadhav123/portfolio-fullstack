const socialController = require("../controller/admin.controller")


const router = require("express").Router()

router

    .post("/add-social", socialController.addSocial)
    .get("/get-social", socialController.getSocail)
    .put("/update-social/:id", socialController.updateSocial)
    .delete("/delete-social/:id", socialController.deleteSocial)

module.exports = router
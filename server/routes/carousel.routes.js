const carouselController = require("../controller/admin.controller")



const router = require("express").Router()

router

    .post("/add-carousel", carouselController.addCarousel)
    .get("/get-carousel", carouselController.getAllCarousel)
    .put("/update-carousel/:id", carouselController.updateCarousel)
    .delete("/delete-carousel/:id", carouselController.deleteCarousel)

module.exports = router
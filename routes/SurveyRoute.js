 const express = require("express");
 const router = express.Router();
const {CreateSurvey,AddLike,AddUnlike,AddSuggetions,GetSurvey,AddRating,GetProduct} = require("../controllers/SuveryController");
router.post("/CreateSurvey",CreateSurvey);
router.post("/AddLike",AddLike);
router.post("/AddUnlike",AddUnlike);
router.post("/AddSuggetions",AddSuggetions);
router.post("/AddRating",AddRating);
router.post("/GetSurvey",GetSurvey);
router.post("/GetProduct",GetProduct);

 module.exports = router;


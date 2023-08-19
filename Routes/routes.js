const router = require("express").Router();
const { getHomePage } = require("../controllers/index.controller");
const { getRegistration, postRegistration } = require("../controllers/register.controller");
const { getUnsubscribe, postUnsubscribe } = require("../controllers/unsubscribe.controller");

router.route("/").get(getHomePage);
router.route("/register").get(getRegistration);
router.route("/register").post(postRegistration);
router.route("/unsubscribe").get(getUnsubscribe);
router.route("/unsubscribe").post(postUnsubscribe);
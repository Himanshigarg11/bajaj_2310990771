const router = require("express").Router();
const { processTree } = require("../controllers/bfhlController");

router.post("/", processTree);

module.exports = router;
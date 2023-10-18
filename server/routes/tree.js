const tree = require("../controllers/treeController");

const express = require("express");

const router = express.Router();

router.post("/new-tree", tree.newTree);

router.post("/water-tree", tree.waterTree);

router.post("/get-trees", tree.getTrees);

module.exports = router;

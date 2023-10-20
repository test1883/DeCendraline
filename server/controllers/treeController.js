const Tree = require("../models/treeModel");

const newTree = async (req, res) => {
  const { tree } = await req.body;
  try {
    const n = await Tree.create({ ...tree });

    res.status(200).json({ _id: n._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const waterTree = async (req, res) => {
  const { treeId } = await req.body;
  try {
    await Tree.findOneAndUpdate(
      { _id: treeId },
      {
        lastWatered: Date.now(),
      }
    );
    res.status(200).json({ message: "Tree watered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTrees = async (req, res) => {
  const { userId } = await req.body;
  try {
    const trees = await Tree.find({ plantedBy: userId });
    res.status(200).json([...trees]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  newTree,
  waterTree,
  getTrees,
};

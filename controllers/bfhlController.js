const { processData } = require("../utils/treeProcessor");

const processTree = (req, res) => {
  try {
    const { data } = req.body;

    const result = processData(data);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { processTree };
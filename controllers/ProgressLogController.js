const ProgressLog = require("../models/ProgressLog");

const createLog = async (req, res) => {
  try {
    const newLog = new ProgressLog(req.body);

    const savedLog = await newLog.save();

    res.status(201).json({
      message: "Progress log created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating progress log",
      error: error.message,
    });
  }
};

const getClientLogs = async (req, res) => {
  try {
    const { clientId } = req.params;

    const logs = await ProgressLog.find({ clientId });

    if (logs.length === 0) {
      return res.status(404).json({
        message: "No progress logs found for this client",
      });
    }

    res.status(200).json({
      logs: logs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving progress logs",
      error: error.message,
    });
  }
};

module.exports = {
  createLog,
  getClientLogs,
};

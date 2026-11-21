const { Task } = require("../model/models");

const createResource = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ msg: "Title and description are required" });

    const resource = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    return res
      .status(201)
      .json({ msg: "Resource created successfully", resource });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getResources = async (req, res) => {
  try {
    const resource = await Task.find().populate("createdBy", "name email");
    return res
      .status(200)
      .json({ msg: "resource fetched successfully", resource });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const resource = await Task.findById(id);
    if (!resource) {
      return res.status(404).json({
        msg: "Resource not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      resource.createdBy.toString() !== req.user.id
    )
      return res.status(403).json({ msg: "You cannot update this resource" });

    if (title !== undefined) resource.title = title;
    if (description !== undefined) resource.description = description;

    await resource.save();

    return res.status(200).json({
      msg: "Resource updated successfully",
      resource,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Task.findById(id);

    if (!resource) {
      return res.status(404).json({
        msg: "Resource not found",
      });
    }

    // Ownership validation

    if (
      req.user.role !== "admin" &&
      resource.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        msg: "You cannot delete this resource",
      });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "Resource deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  createResource,
  getResources,
  updateResource,
  deleteResource,
};

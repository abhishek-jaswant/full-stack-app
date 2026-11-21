const { User } = require("../model/models");
const bycpt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res
      .status(200)
      .json({ msg: "All users fetching successfuly", users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findOne({ email: req.user.email }).select(
      "-password",
    );
    return res
      .status(200)
      .json({ msg: "All users fetching successfuly", user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Update Profile

const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const obj = {};

    if (name) {
      obj.name = name;
    }

    if (email) {
      obj.email = email;
    }

    if (password) {
      const hashpassword = await bycpt.hash(password, 10);
      obj.password = hashpassword;
    }
    if (Object.keys(obj).length === 0) {
      return res.status(400).json({
        msg: "Please provide at least one field to update",
      });
    }

    // Find logged-in user
    const user = await User.findByIdAndUpdate(req.user.id, obj, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    return res.status(200).json({
      msg: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const UpdateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    // Check role
    if (!role) {
      return res.status(400).json({
        msg: "Role is required",
      });
    }

    // Allowed roles
    const allowedRoles = ["admin", "moderator", "user"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        msg: "Invalid role",
      });
    }

    // Prevent admin from changing own role
    if (req.user.id === id) {
      return res.status(400).json({
        msg: "You cannot change your own role",
      });
    }

    // Find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // Update role
    user.role = role;

    await user.save();

    return res.status(200).json({
      msg: "User role updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = { getAllUsers, getUserProfile, updateProfile, UpdateUserRole };

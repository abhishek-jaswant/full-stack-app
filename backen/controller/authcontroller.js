const { User } = require("../model/models");
const bycpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = 10;

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.status(409).json({ msg: "already signup" });

    const hashpassword = await bycpt.hash(password, salt);
    console.log(hashpassword);

    user = await User.create({ name, email, password: hashpassword });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5m" },
    );

    return res.status(200).json({
      msg: "user-login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log("Error is--->", error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ msg: "User not found. Please signup first" });

    const ispassword = await bycpt.compare(password, user.password);

    if (!ispassword)
      return res.status(401).json({ msg: "user is invalid please signup" });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { signUp, login };

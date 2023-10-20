import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateTokens.js"; 
import User from "../models/userModel.js";

// @desc Auth user/set token
// @route POST/api/users/auth
// @access public

const authUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    // Generate a JWT token with the authenticated user's ID
    generateToken(res, user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});



// @desc Register user
// @route POST/api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  
  if (userExist) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    // Generate a JWT token with the newly registered user's ID
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    return res.status(400).json({ message: 'Invalid user data' });
  }
});


// @desc Logout user
// @route post/api/users/logout 
// @access public

const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', "",{
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "User logged out" });
});

// @desc get  user profile
// @route get/api/users/profile 
// @access private

const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user);
});

// @desc update  user profile
// @route PUT/api/users/profile 
// @access private

const updatProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      // Handle password update securely
      user.password = req.body.password; // Replace with proper password hashing logic
    }

    const updatedUser = await user.save();
    
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export { authUser, registerUser, logout, getProfile, updatProfile };

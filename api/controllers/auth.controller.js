import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(errorHandler("Invalid email format!", 400));
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler("Email already exists!", 400));
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(errorHandler("Invalid email format!", 400));
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler("User not found!", 404));
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler("Invalid credentials!", 401));
    }

    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Convert the user to an object and exclude password
    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ token, user: rest });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Generate JWT token
      const token = jwt.sign(
        { _id: existingUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Set HTTP-only cookie with token
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      // Return the user with avatar field
      const { password: pass, ...userWithoutPassword } = existingUser._doc;
      return res.status(200).json({
        token,
        user: {
          ...userWithoutPassword,
          avatar: photo, // Ensure avatar is included
        },
      });
    }

    // Generate a secure password for new Google user
    const generatedPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 12);

    // Create a new user with Google data
    const newUser = new User({
      username: name.toLowerCase().replace(/\s+/g, ""), // Convert name to lowercase without spaces
      email,
      password: hashedPassword,
      avatar: photo,
    });

    await newUser.save();

    // Generate JWT token for new user
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set HTTP-only cookie with token
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Return the new user with avatar field
    const { password: pass, ...userWithoutPassword } = newUser._doc;
    res.status(201).json({
      token,
      user: {
        ...userWithoutPassword,
        avatar: photo, // Ensure avatar is included
      },
    });
  } catch (error) {
    next(error);
  }
};

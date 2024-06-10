const jwt = require("jsonwebtoken")
const bycrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")


// @desc Get User Data
// @route POST /api/users/me
const getMe = asyncHandler(async (req, res) => {

    res.json({
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})


// @desc Authenticate User
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!password || !email) {
        res.status(500)
        throw new Error("Please enter all the details")
    }

    const user = await User.findOne({ email });

    if (user && (await bycrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(404)
        throw new Error("email or password is wrong")
    }

    const decryptPassword = bycrypt
})

// @desc RegisterUser
// @route POST/api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // if user exists

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash Password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // create user

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    getMe,
    loginUser,
    registerUser
}
import expressAsyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export { getUsers, registerUser }
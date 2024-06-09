const asyncHandler = require("express-async-handler")
const Goal = require('../models/goalModel')

// desc     Get Goals
// route    GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();

    res.status(200).json(goals)
})


// desc     Set Goals
// route    POST /api/goals
const setGoals = asyncHandler(async (req, res) => {
    if (!(req.body.text)) {
        res.status(500)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
    })
    res.status(200).json(goal)
})


// desc     Update Goals
// route    PUT /api/goals/:id
const updateGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})


// desc     Delete Goals
// route    DELETE /api/goals
const deleteGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await Goal.deleteOne({ _id: req.params.id })


    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getGoals,
    setGoals,
    deleteGoals,
    updateGoals
}
const asyncHandler = require("express-async-handler")

// desc     Get Goals
// route    GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get goals" })
})


// desc     Set Goals
// route    POST /api/goals
const setGoals = asyncHandler(async (req, res) => {
    if (!(req.body.text)) {
        res.status(500)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: "set goals" })
})


// desc     Update Goals
// route    PUT /api/goals/:id
const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update goals ${req.params.id}` })
})


// desc     Delete Goals
// route    DELETE /api/goals
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goals ${req.params.id}` })
})


module.exports = {
    getGoals,
    setGoals,
    deleteGoals,
    updateGoals
}
const express = require("express")
const { getGoals, setGoals, updateGoals, deleteGoals } = require("../controller/goalController")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")


// chaining the same routes with same end point but different method
router.route('/').get(protect, getGoals).post(protect, setGoals);

router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)

// router.get('/', getGoals)
// router.post('/', setGoals)
// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)

module.exports = router
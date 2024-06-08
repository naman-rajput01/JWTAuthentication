const express = require("express")
const { getGoals, setGoals, updateGoals, deleteGoals } = require("../controller/gaolContainer")
const router = express.Router()


// chaining the same routes with same end point but different method
router.route('/').get(getGoals).post(setGoals);

router.route('/:id').delete(deleteGoals).put(updateGoals)

// router.get('/', getGoals)
// router.post('/', setGoals)
// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)

module.exports = router
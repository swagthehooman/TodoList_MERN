const router = require('express').Router()
const todoControllers = require('../../controllers/todoControllers')

//route for getting all todos
router.route('/').get(todoControllers.getTodos)
// route to add a task
router.route('/add').post(todoControllers.addTodo)
//route to update a task
router.route('/update/:id').post(todoControllers.updateTodo)
//route to delete a task
router.route('/delete/:id').delete(todoControllers.deleteTodo)
module.exports = router
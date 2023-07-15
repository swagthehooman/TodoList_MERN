const Todo = require('../model/TodoModel')

//get all todos
const getTodos = async (req, res)=>{
    const todo = await Todo.find()
    if(!todo){
        return res.status(204).json({'message':'No todo present'})
    }
    res.json(todo)
}

//add a task
const addTodo = async(req,res)=>{
    if(!req.body)
        return res.status(400).json({'message':"task and completionStatus required"})
    
    try{
        const result = await Todo.create({
            completionStatus: req.body.completionStatus,
            task: req.body.task,
        })
        res.status(201).json(result)
    }catch(err){
        console.error(err)
    }
}

//delete a task by id
const deleteTodo = async(req,res)=>{
    if(!req?.params?.id)
        return res.status(400).json({'message':'Id is required.'})
    const todo = await Todo.findById({_id:req.params.id})

    if(!todo)
         return res.status(204).json({'message': 'No such exercise found'})

    const result = await Todo.deleteOne({_id: req.params.id})
    res.json(result)
}

//update a task status
const updateTodo = async(req,res)=>{
    if(!req?.params?.id)
        return res.status(400).json({'message':'Id is required.'})
    const todo = await Todo.findById({_id: req.params.id})

    if(!todo)
        return res.status(204).json({'message': 'No such exercise found'})
    if(req.body?.completionStatus)
        todo.completionStatus=req.body.completionStatus
    
    const result = await todo.save()
    res.json(result)
}

module.exports = {getTodos, addTodo, deleteTodo, updateTodo}
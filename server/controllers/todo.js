const Todo = require("../models/Todo");
const User = require("../models/User");

const gettodo = async (req, res) => {
  try {
    const {id,name} = req.user;
    const todos = await Todo.find({ userId:id });
    res.status(200).send({todos,name});
  } catch (err) {
    res.status(500).json(err);
  }
};

const createtodo = async (req, res) => {
  try {
    const {id} = req.user;
    const { text } = req.body;
    const newtodo = await Todo.create({ userId:id, todo: text });
    res.status(201).send("todo created successfully");
  } catch (error) {
    res.send(error);
  }
};

const updatetodo = async (req, res) => {
  const { text } = req.body;
  try {
    const uptodo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { todo: text },
      { new: true }
    );
    res.status(200).send("Updated successfully");
  } catch (error) {
    res.send(error);
  }
};

const deletetodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted...successfully");
  } catch (error) {
    res.send(error);
  }
};

module.exports = { gettodo, createtodo, updatetodo, deletetodo };

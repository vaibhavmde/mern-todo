import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setName } from "../redux/nameSlice";
import List from "./List";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  

  const addUpdateTodo = async () => {
    if (isUpdating === "") {
      try {
        const res = await axios.post(
          "https://todo-dm.herokuapp.com/todo",
          { text },{ headers: { authorization: token }}
        );
        toast.success(res.data);
        setText("");
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        const res = await axios.put(`https://todo-dm.herokuapp.com/todo/${isUpdating}`,
          { text },{ headers: { authorization: token }});
        setText("");
        setUpdating("");
        toast.success(res.data);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const deleteTodo = async (_id) => {
    try {
      const res = await axios.delete(`https://todo-dm.herokuapp.com/todo/${_id}`,{ headers: { authorization: token }});
      toast.success(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  };

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get("https://todo-dm.herokuapp.com/todo", {
        headers: { authorization: token },
      });
      const data = await res.data;
      dispatch(setName(data.name));
      setTodo(data.todos);
      console.log(res.data);
    };
    getTodos();
  });

  return (
    <div className="con">
      <div className="m-2">
        <h1
          className="d-flex justify-content-center mt-5"
          style={{ color: "#2196f3" }}
        >
          ToDo App
        </h1>
        <div className="d-flex justify-content-center align-items-center p-3 ">
          <input
            className="form-control m-1"
            type="text"
            placeholder="Enter todo task......"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addUpdateTodo}>
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>

        <div className="list">
          {todo.map((item) => (
            <List
              key={item._id}
              text={item.todo}
              remove={() => deleteTodo(item._id)}
              update={() => updateTodo(item._id, item.todo)}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const handleValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://todo-dm.herokuapp.com/auth/register", user);
      console.log(res.data);
      if (res.data === "User created sucessfully") {
        toast("User created sucessfully");
      }
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        toast.error("Username already Exist");
      } else {
        toast.error(error.message);
      }
    }
    navigate("/login");
  };

  return (
    <div className="con">
      <ToastContainer />
      <div className="box m-3 p-5">
        <h1 className="con">REGISTER</h1>
        <form onSubmit={handleRegister}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="from-group">
              <input
                className="form-control m-2 p-2"
                type="text"
                required
                autoComplete="off"
                placeholder="username"
                name="username"
                value={user.username}
                onChange={handleValue}
              />
            </div>
            <div className="from-group ">
              <input
                className="form-control m-2 p-2"
                type="email"
                required
                placeholder="email"
                name="email"
                value={user.email}
                onChange={handleValue}
              />
            </div>
            <div className="from-group ">
              <input
                className="form-control m-2 p-2"
                type="password"
                required
                placeholder="password"
                name="password"
                value={user.password}
                onChange={handleValue}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <button className="btn btn-primary m-2" type="submit">
              Register
            </button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

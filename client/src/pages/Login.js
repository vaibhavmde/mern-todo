import { useState } from "react";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {useDispatch} from 'react-redux';
import {setToken} from '../redux/tokenSlice';
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://todo-dm.herokuapp.com/auth/login", {
        username,
        password,
      });
      // console.log(res.data)
      const data = await res.data;
      if(data.message==='User logged in successfully'){
      const token = "Bearer " + data.token;
        cookies.set("token", token, { path: "/", maxAge: 1000 * 60 * 60 * 24 });
        dispatch(setToken(token));
      }
      if (res.data === "Incorrect Password") {
        toast(res.data);
      }
    } catch (err) {
      if (err.message === "Request failed with status code 401") {
        toast.error("Invalid user");
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="con">
      <ToastContainer />
      <div className="box m-3 p-5">
        <h1 className="d-flex justify-content-center align-items-center flex-column">
          LOGIN IN
        </h1>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <input
              className="form-control m-1 p-2"
              placeholder="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="form-control m-1 p-2"
              placeholder="password"
              type="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column m-3">
            <button className="btn btn-primary btn-sm" type="submit">
              Sign In
            </button>
            <button className="btn btn-light">
              <Link to="/forgot">Forget Password?</Link>
            </button>
            <button className="btn btn-light">
              <Link to="/register">REGISTER</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

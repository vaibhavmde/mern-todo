import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const Reset = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://todo-dm.herokuapp.com/auth/reset",
        JSON.stringify({ otp, newPassword }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data === "Password Reset successfully") {
        toast.success("Password Reset successfully");
        navigate("/login");
      } else {
        toast(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center m-5">
        <form onSubmit={handleClick}>
          <div className="form-group m-3">
            <input
              className="form-control col-3"
              type="number"
              required
              autoComplete="off"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              placeholder="enter the recieved otp..."
            />
          </div>
          <div className="form-group m-3 p-3">
            <input
              className="form-control col-3"
              type="password"
              required
              autoComplete="off"
              value={newPassword}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="New password..."
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="submit">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;

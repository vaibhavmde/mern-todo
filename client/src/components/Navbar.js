import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import { setName } from "../redux/nameSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


const cookies = new Cookies();

const Navbar = () => {

  const name = useSelector((state) => state.name.value);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();

  const handleLogout = async () => {
    cookies.remove("token");
    dispatch(setToken(null));
    dispatch(setName(null));
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ "backgroundColor": "#e3f2fd" }}
    >
      <div className="container-fluid">
        <span className="navbar-brand" style={{ color: "#2196f3" }}>
          Todo
        </span>
        <span style={{ color: "#1769aa" }}>
          {token ? `👋Welcome ${name}` : ""}
        </span>
        <span>
          {token ? (
            <button
              className="btn btn-primary"
              title="Logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            ""
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

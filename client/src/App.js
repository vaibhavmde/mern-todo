import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

const App = () => {
 
  const token = useSelector((state) => state.token.value);
 
  return (
    <Router>
      <Navbar/>
      <Routes>

        {/* Authenticated  Routes */}
        <Route index element={token ? <Home/> : <Login />}/>

        {/* Unauthenticated Routes */}
        <Route path="/login" element={token ? <Navigate replace to="/" /> : <Login />}/>
        <Route path="/register" element={token ? <Navigate replace to="/" /> : <Register />}/>
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
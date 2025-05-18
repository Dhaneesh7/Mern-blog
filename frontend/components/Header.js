import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Blog</h1>
    <div>
        {user ? (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="mr-4 underline"
            >
              Dashboard
            </button>
      <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
        Logout
      </button>
                </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="mr-4 underline"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="underline"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

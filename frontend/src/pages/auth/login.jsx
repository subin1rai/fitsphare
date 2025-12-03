import { useState } from "react";
import { Dumbbell } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/baseUrl"; 
import { setCredential } from "../../redux/slice/AuthSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // form fields
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔹 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      toast.success(response.data.message);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      dispatch(setCredential({ user: response.data.user }));
      router("/auth/details"); // navigate after login
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP HANDLER
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("password",password)
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(response.data.message);

      setIsLogin(true);

      // Clear signup fields
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };     

  // FORM HANDLER SWITCH
  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-md rounded-lg bg-card text-card-foreground shadow-xl">

        {/* HEADER */}
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Dumbbell className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h3 className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Join FitSphere"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {isLogin
              ? "Sign in to continue your fitness journey"
              : "Start your fitness journey today"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 pt-0 space-y-4">

            {/* NAME FIELD (SIGNUP ONLY) */}
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded-md px-3 py-2 bg-background
                  focus:outline-none focus:ring-2 focus:ring-[#daff0d] focus:border-[#daff0d]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-md px-3 py-2 bg-background
                focus:outline-none focus:ring-2 focus:ring-[#daff0d] focus:border-[#daff0d]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full border rounded-md px-3 py-2 bg-background
                focus:outline-none focus:ring-2 focus:ring-[#daff0d] focus:border-[#daff0d]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex flex-col p-6 pt-0 space-y-4">
            <button
              type="submit"
              className="w-full bg-[#daff0d] text-black py-2 rounded-md hover:opacity-90 transition-opacity font-semibold"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </button>

            {/* Toggle Login / Signup */}
            <button
              type="button"
              className="w-full text-sm hover:text-primary"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

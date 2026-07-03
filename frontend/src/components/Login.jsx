import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-100 p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center mb-2">DevMart</h1>

        <p className="text-center text-gray-500 mb-6">Login your account</p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-5"
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Login
        </button>

        <p className="text-center mt-5">
          Don't have account?
          <Link to="/signup" className="ml-2 text-blue-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

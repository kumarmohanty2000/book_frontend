import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const server = import.meta.env.VITE_BACKEND_HOST_URL;
  const navigate = useNavigate();

  const signupHandle = async () => {
    const res = await fetch(`${server}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const signupData = await res.json();

    if (signupData.error) {
      toast.error(signupData.error);
    } else {
      toast.success(signupData.success);
      navigate("/login");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className=" bg-gradient-to-b from-red-500 to-yellow-500 flex justify-center items-center h-screen">
      <div className=" bg-[#e9c694] shadow-md px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-black text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className=" bg-[#beb9b1] border border-red-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
            placeholder="Email"
          />
        </div>

        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
            placeholder="Password"
          />
        </div>

        <div className=" flex justify-center mb-3">
          <button
            onClick={signupHandle}
            className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-green-700 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

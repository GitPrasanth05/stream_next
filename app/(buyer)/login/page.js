"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import lg from "./Login.module.css";
const Login = () => {
  const route = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const verify = (e) => {
    if (typeof window !== "undefined") {
      e.preventDefault();
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = storedUsers.find((find) => {
        return find.username === user && find.password === pass;
      });

      if (foundUser) {
        alert("Login successful!");
        route.push("/home");
      } else {
        setError(true);
      }
    }
  };
  return (
    <div className={lg.login}>
      <h1 className={lg.h}>login</h1>
      {/* <div className="nm"> */}
      <form onSubmit={verify} className={lg.fm}>
        <label>Enter the username</label>
        <input
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        ></input>

        <label>Enter the password </label>
        <input
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        ></input>
        <button className={lg.btn}>login</button>
      </form>
      {error && <p style={{ color: "red" }}>Invalid username or password</p>}
      <div className={lg.reg}>
        <button
          className={lg.btn}
          onClick={() => {
            route.push("register");
          }}
        >
          register
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Login;

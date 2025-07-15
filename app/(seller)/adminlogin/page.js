"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ad from "./ad.module.css";
const AdminLogin = () => {
  const route = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const verify = (e) => {
    if (typeof window !== "undefined") {
      e.preventDefault();
      const storedUsers = JSON.parse(localStorage.getItem("admin")) || [];
      const foundUser = storedUsers.find((find) => {
        return find.username === user && find.password === pass;
      });

      if (foundUser) {
        alert("Login successful!");
        route.push("/admin");
      } else {
        setError(true);
      }
    }
  };
  return (
    <div className={ad.login}>
      <h1 className={ad.h}>ADMIN LOGIN</h1>
      {/* <div className="nm"> */}
      <form onSubmit={verify} className={ad.fm}>
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
        <button className={ad.btn}>login</button>
      </form>
      {error && <p style={{ color: "red" }}>Invalid username or password</p>}
      <div className={ad.reg}>
        <button
          className={ad.btn}
          onClick={() => {
            route.push("register");
          }}
        >
          Register Admin
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default AdminLogin;

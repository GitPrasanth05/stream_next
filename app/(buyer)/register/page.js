"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import sg from "../login/Login.module.css";
const Register = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confpass, confirmsetPass] = useState("");
  const [confset, setconf] = useState(false);
  const [client, setclient] = useState(false);
  useEffect(() => {
    setclient(true);
  }, []);
  const route = useRouter();
  const handlesubmit = (e) => {
    e.preventDefault();
    if (confpass === pass) {
      if (client) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        storedUsers.push({ username: user, password: pass });
        localStorage.setItem("users", JSON.stringify(storedUsers));

        route.push("/login");
        setUser("");
        setPass("");
        confirmsetPass("");
        setconf(false);
      }
    } else {
      setconf(true);
    }
  };
  return (
    <div className={sg.login}>
      <h1 className={sg.h}>signup</h1>
      {/* <div className={}> */}
      <form onSubmit={handlesubmit} className={sg.fm}>
        <label>Enter the username</label>
        <input value={user} onChange={(e) => setUser(e.target.value)}></input>
        <label>Enter the password </label>
        <input
          value={pass}
          // type="password"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <label>again enter the password </label>
        <input
          value={confpass}
          // type="password"
          onChange={(e) => confirmsetPass(e.target.value)}
        ></input>
        <button className={sg.btn}>register</button>
        {confset && (
          <p style={{ color: "red" }}> both passwords should be same</p>
        )}
      </form>
    </div>
    // </div>
  );
};

export default Register;

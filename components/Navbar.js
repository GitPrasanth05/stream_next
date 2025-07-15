import Link from "next/link";
import na from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={na.navbar}>
      <div className={na.logo}>STREAM</div>
      <ul className={na.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>

        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

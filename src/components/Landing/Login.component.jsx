//HOOKS
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
//ACTIONS
import { login, postUser } from "../../redux/actions";
//STYLES
import styles from "./LoginComponent.module.css";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate("/home");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(postUser({ email, password }));
    setEmail("");
    setPassword("");

    if (user){
      return navigate("/home");
    }
  };

  return (
    <>
      <div className={styles.divLogin}>
        <h1 className={styles.h1Login}>SPA - Drivers</h1>
        <form className={styles.formLogin} action="">
          <h3 className={styles.h3}>Login - Register</h3>
          <input
            className={styles.input}
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="📧 Email"
          />
          <input
            className={styles.input}
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="🔐 Password"
          />
          <p className={styles.pLogin}>
            Olvisate tu contraseña...{" "}
            <span className={styles.spanLogin}>click aquí</span>
          </p>
          <div className={styles.formBtns}>
            <button
              className={styles.btnLogin}
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className={styles.btnRegister}
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;

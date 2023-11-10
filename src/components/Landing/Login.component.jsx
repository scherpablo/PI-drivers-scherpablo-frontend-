//HOOKS
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//ACTIONS
import { login, postUser } from "../../redux/actions";
//UTILS
import { validateEmail, validatePassword } from "../../utils/LoginValidation";
//STYLES
import styles from "./LoginComponent.module.css";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("formato de correo invalido");
      return;
    }

    if (!validatePassword(password)) {
      alert("formato password invalido");
      return;
    }

    const loginSuccess = await dispatch(login({ email, password }));

    if (!loginSuccess) {
      alert("usuario no registrado - datos incorrectos");
      return;
    }

    setEmail("");
    setPassword("");
    return navigate("/home");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerSuccess = await dispatch(postUser({ email, password }));

    if (registerSuccess) {
      alert("registro exitoso");
      setEmail("");
      setPassword("");
      return navigate("/home");
    } else {
      alert("Usuario ya registrado");
    }
    return;
  };

  return (
    <>
      <div className={styles.divLogin}>
        <h1 className={styles.h1Login}>SPA - Drivers</h1>
        <form className={styles.formLogin}>
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
            Forget your password...{" "}
            <span className={styles.spanLogin}>click here</span>
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

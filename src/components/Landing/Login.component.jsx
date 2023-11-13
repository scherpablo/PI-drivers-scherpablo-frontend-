//HOOKS
import { useState, useEffect } from "react";
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
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const toggleShowPwd = () => setShowPwd(!showPwd);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("formato de correo invalido");
      return
    }else {
      setEmailError("");
    }

    if (!validatePassword(password)){
      setPasswordError("formato password invalido");
    }else {
      setPasswordError("");
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

  useEffect(()=>{
    setIsFormValid(validateEmail(email) && validatePassword(password));
  }, [email, password])

  return (
    <>
      <div className={styles.divLogin}>
        <h2 className={styles.titleLogin}>SPA - Drivers</h2>
        <div className={styles.divForm}>
          <form className={styles.formLogin}>
            <h3 className={styles.h3}>Ingreso - Registro</h3>
            <input
              className={styles.input}
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                const trimmedValue = e.target.value.trim();
                setEmail(trimmedValue);
                setEmailError(trimmedValue.length > 0 && !validateEmail(trimmedValue) ? "Formato de correo inválido" : "");
              }}
              placeholder="📧 Email"
            />
            {emailError && <p className={styles.errorMsg}>{emailError}</p>}
            <input
              className={styles.input}
              id="password"
              type={showPwd ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => {
                const trimmedValue = e.target.value.trim();
                setPassword(trimmedValue);
                setPasswordError(trimmedValue.length > 0 && !validatePassword(trimmedValue) ? "Formato de contraseña inválido" : "");
              }}
              placeholder="🔐 Password"
            />
            {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
            <div className={styles.iconPwd} onClick={toggleShowPwd}>
              {showPwd ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height={"1.5rem"}
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height={"1.5rem"}
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </div>
            <p className={styles.pLogin}>
              Olvidsate tu contraseña...{" "}
              <span className={styles.spanLogin}>click aquí</span>
            </p>
            <div className={styles.formBtns}>
              <button
                className={styles.btnLogin}
                type="button"
                onClick={handleLogin}
                disabled={!isFormValid}
              >
                Ingreso
              </button>
              <button
                className={styles.btnRegister}
                type="button"
                onClick={handleRegister}
                disabled={!isFormValid}
              >
                Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;

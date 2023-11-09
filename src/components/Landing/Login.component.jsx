import styles from "./LoginComponent.module.css";

const LoginComponent = () => {
  
  return (
    <>
      <div className={styles.divLogin}>
        <h1 className={styles.h1Login}>SPA - Drivers</h1>
        <form className={styles.formLogin} action="">
          <h3 className={styles.h3}>Login - Register</h3>
          <input
            className={styles.input}
            id="emailInput"
            type="email"
            name="email"
            placeholder="📧 Email"
          />
          <input
            className={styles.input}
            id="passwordInput"
            type="password"
            name="password"
            placeholder="🔐 Password"
          />
          <p className={styles.pLogin}>
            Olvisate tu contraseña...{" "}
            <span className={styles.spanLogin}>click aquí</span>
          </p>
          <div className={styles.formBtns}>
            <button className={styles.btnLogin} type="submit">
              Login
            </button>
            <button className={styles.btnRegister} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;

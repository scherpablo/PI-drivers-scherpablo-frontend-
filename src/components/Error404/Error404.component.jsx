import styles from "../Error404/Error404Component.module.css"

const Error404Component = () => {
  return (
    <>
    <div className={styles.containerError}>
        <h1 className={styles.textError}>Page Not Found!!!!</h1>
    </div>
    </>
  )
}

export default Error404Component
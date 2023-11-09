import CreateComponent from "../../components/Create/Create.component";
import styles from "./Create.module.css";

const Create = () => {
  return (
    <>
      <div className={styles.createContainer}>
        <CreateComponent />
      </div>
    </>
  );
};

export default Create;

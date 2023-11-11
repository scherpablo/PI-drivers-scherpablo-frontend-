import styles from "./AboutComponent.module.css";

const AboutComponent = () => {
  return (
    <>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutText}>
          <h2 className={styles.aboutH2}>
            ¡Bienvenido a mi SPA de Pilotos de Fórmula 1!
          </h2>
          <p className={styles.aboutP}>
            En este apasionante proyecto, he combinamo la potencia de NodeJS,
            Express, Postgres y Sequelize en el backend con React, Vite y Redux
            en el frontend para llevarte la experiencia única de explorar el
            fascinante mundo de la Fórmula 1.
          </p>
          <h3 className={styles.aboutH3}>Sobre Mí</h3>
          <p className={styles.aboutP}>
            Somos un estudiante entusiasta y apasionado por el desarrolo web. En
            el corazón de esta SPA,{" "}
            <span className={styles.aboutSpan}>
              (que representa el Proyecto Individual de Henry){" "}
            </span>
            encontrarás una API REST meticulosamente creada con NodeJS y
            Express. Esta API REST no solo se conecta a una API con datos
            simulados, sino que también interactúa con nuestra propia base de
            datos PostgreSQL, alimentada con información detallada sobre muchos
            pilotos de la Fórmula 1.
          </p>
          <h3 className={styles.aboutH3}>Tecnologías Utilizadas</h3>
          <h4 className={styles.aboutH4}>Backend:</h4>
          <li className={styles.aboutP}>
            <span className={styles.aboutLiSpan}>NodeJS:</span> La potencia detrás de nuestro servidor.
          </li>
          <li className={styles.aboutP}>
            <span className={styles.aboutLiSpan}>Express:</span> Para construir de manera eficiente nuestra API REST.
          </li>
          <li className={styles.aboutP}>
            <span className={styles.aboutLiSpan}>Postgres y Sequelize:</span> Nuestra base de datos y ORM que almacenan y
            gestionan datos de pilotos con precisión.
          </li>
          <h4 className={styles.aboutH4}>Frontend:</h4>
          <li className={styles.aboutP}>
            <span className={styles.aboutLiSpan}>React y Vite:</span> La combinación perfecta para crear interfaces de
            usuario rápidas y atractivas.
          </li>
          <li className={styles.aboutP}>
            <span className={styles.aboutLiSpan}>Redux:</span> Para un manejo eficiente del estado y una experiencia de
            usuario fluida.
          </li>
          <h3 className={styles.aboutH3}>Explora el Mundo de la F1</h3>
          <p className={styles.aboutP}>
            En esta SPA, podrás descubrir perfiles detallados de los legendarios
            pilotos de Fórmula 1. Desde sus inicios hasta sus triunfos en la
            pista. Esta aplicación te sumergirá en la emocionante historia de
            estos conductores espectaculares.
          </p>
          <h3 className={styles.aboutH3}>¡Únete a la Carrera!</h3>
          <p className={styles.aboutP}>
            Ya sea que seas un fanático de la Fórmula 1 o simplemente un
            entusiasta del desarrollo web, ¡te invito a explorar y disfrutar
            de mi SPA única! Descubre la magia que sucede cuando la
            tecnología se encuentra con la emoción de la Fórmula 1.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutComponent;

//HOOKS
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//ACTIONS
import { getDriverDetail } from "../../redux/actions";
//ROUTES
import PATHROUTES from "../../utils/PathRoutes";
//STYLES
import styles from "./DetailComponent.module.css";

const DetailComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailDriver = useSelector((state) => state.detailDriver);

  let teamsToShow = [];

  const { Teams } = detailDriver;

  if (Teams) {
    teamsToShow = Teams.slice(0, 4);
  }

  const teamsNames = teamsToShow.map((team) => team.nombre);

  const handleEditClick = () => {
    navigate("/create", {
      state: { driverId: detailDriver?.UUID || detailDriver?.id, editMode: true },
    });
  };

  useEffect(() => {
    dispatch(getDriverDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <div className={styles.containerDivDetail}>
        <h2 className={styles.titleDetail}>Driver Detail</h2>
        <div className={styles.containerDriverDetail}>
          {detailDriver ? (
            <>
              <div className={styles.containerImage}>
                <img
                  className={styles.detailImage}
                  src={detailDriver?.imagen || detailDriver?.image?.url}
                  alt="Imagen del Driver"
                />
                <div className={styles.divItemsDetail}>
                  <h3 className={styles.detailId}>
                    ID:{" "}
                    <span className={styles.spanName}>
                      {detailDriver?.UUID || detailDriver?.id}
                    </span>
                  </h3>
                  <h3 className={styles.detailName}>
                    Name:{" "}
                    <span className={styles.spanName}>
                      {detailDriver?.nombre || detailDriver?.name?.forename}
                    </span>
                  </h3>
                  <h3 className={styles.detailLastName}>
                    Last Name:{" "}
                    <span className={styles.spanName}>
                      {detailDriver?.apellido || detailDriver?.name?.surname}
                    </span>
                  </h3>
                  <h3 className={styles.detailNationality}>
                    Nationality:{" "}
                    <span className={styles.spanName}>
                      {detailDriver?.nacionalidad || detailDriver?.nationality}
                    </span>
                  </h3>
                  <h3 className={styles.detailBirthdate}>
                    Birthdate:{" "}
                    <span className={styles.spanName}>
                      {detailDriver?.fecha_de_nacimiento || detailDriver?.dob}
                    </span>
                  </h3>
                  <h3 className={styles.detailTeams}>
                    Teams:{" "}
                    <span className={styles.spanName}>
                      {teamsNames?.join(", ") || detailDriver?.teams}
                    </span>
                  </h3>
                  <div className={styles.divButtons}>
                    <button
                      className={styles.detailButtonEdit}
                      onClick={handleEditClick}
                    >
                      Editar Piloto
                    </button>
                    <Link to={PATHROUTES.HOME}>
                      <button className={styles.detailButtonEdit}>
                        Volver a Inicio
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.containerDetails}>
                <h3 className={styles.detailDescription}>
                  Description:{" "}
                  <span className={styles.spanDescription}>
                    {detailDriver?.descripcion || detailDriver?.description}
                  </span>
                </h3>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailComponent;

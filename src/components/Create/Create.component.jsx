import axios from "axios";
//HOOKS
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
//ACTIONS
import {
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../../redux/actions";
//UTILS
import {
  validateNotEmpty,
  validateName,
  validateLastName,
  validateDescription,
  validateNationality,
  validateDate,
  validateTeams,
} from "../../utils/FormValidations";
//STYLES
import styles from "./CreateComponent.module.css";
//ENVIRONMENT VARIABLES
const teamsUrl = import.meta.env.VITE_TEAMS_URL;
//REGEX
const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const CreateComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const driverById = useSelector((state) => state.driverById);
  const locationDriverId = location.state ? location.state.driverId : "";

  const [driverId, setDriverId] = useState(locationDriverId);
  const [allTeams, setAllTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    descripcion: "",
    imagen: "",
    nacionalidad: "",
    fecha_de_nacimiento: "",
    equipos: [],
  });
  const [modalFormData, setModalFormData] = useState({
    nombre: "",
    apellido: "",
    descripcion: "",
    imagen: "",
    nacionalidad: "",
    fecha_de_nacimiento: "",
    equipos: [],
  });

  const getAllTeams = async () => {
    try {
      const { data } = await axios(teamsUrl);
      setAllTeams(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllTeams = () => {
    setAllTeams([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateNotEmpty(formData) ||
      !validateName(formData) ||
      !validateLastName(formData) ||
      !validateDescription(formData) ||
      !validateNationality(formData) ||
      !validateDate(formData) ||
      !validateTeams(formData)
    ) {
      return;
    }
    dispatch(createDriver(formData));
    setFormData({
      nombre: "",
      apellido: "",
      descripcion: "",
      imagen: "",
      nacionalidad: "",
      fecha_de_nacimiento: "",
      equipos: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "equipos"
          ? value.split(",").map((item) => item.trim())
          : value,
    });
  };

  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    const newValue = Array.isArray(modalFormData[name])
      ? value.split(",").map((item) => item.trim())
      : value;

    setModalFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleEditDriver = () => {
    const isValid =
      validateNotEmpty(modalFormData) &&
      validateName(modalFormData) &&
      validateLastName(modalFormData) &&
      validateDescription(modalFormData) &&
      validateNationality(modalFormData) &&
      validateDate(modalFormData) &&
      validateTeams(modalFormData);

    if (isValid) {
      dispatch(updateDriver(driverId, modalFormData));
      closeModal();
    } else {
      alert(
        "Por favor, corrige los errores en el formulario antes de continuar."
      );
    }
  };

  const handleDeleteDriver = () => {
    dispatch(deleteDriver(driverId));
    closeModal();
  };

  const openModal = (driverId) => {
    if (!uuidRegex.test(driverId)) {
      alert("no se puede editar este piloto");
    } else {
      try {
        dispatch(getDriverById(driverId))
          .then((response) => {
            const equiposArray =
              Array.isArray(response.payload.Teams) || response.payload.Teams
                ? response.payload.Teams.map((team) => team.id)
                : [];

            setModalFormData({
              ...response.payload,
              equipos: equiposArray,
            });

            setDriverId(driverId);
            setShowModal(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearDriverId = () => {
    setDriverId("");
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getAllTeams(allTeams);
    return clearAllTeams;
  }, [dispatch]);

  useEffect(() => {
    setModalFormData(driverById);
  }, [driverById]);

  return (
    <>
      <div className={styles.createContainer}>
        <div className={styles.createContainerForm}>
          <form className={styles.createForm}>
            <h2 className={styles.createTitleForm}>Crear Piloto</h2>
            <label className={styles.createLabelForm}>Nombre</label>
            <input
              className={styles.inputCreateForm}
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <label className={styles.createLabelForm}>Apellido</label>
            <input
              className={styles.inputCreateForm}
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
            <label className={styles.createLabelForm}>Descripción</label>
            <input
              className={styles.inputCreateForm}
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
            <label className={styles.createLabelForm}>Nacionalidad</label>
            <input
              className={styles.inputCreateForm}
              type="text"
              name="nacionalidad"
              value={formData.nacionalidad}
              onChange={handleChange}
            />
            <label className={styles.createLabelForm}>Imagen (url)</label>
            <input
              className={styles.inputCreateForm}
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
            <label className={styles.createLabelForm}>
              Fecha de Nacimiento
            </label>
            <input
              className={styles.inputCreateForm}
              type="text"
              name="fecha_de_nacimiento"
              value={formData.fecha_de_nacimiento}
              onChange={handleChange}
            />
            <label className={styles.createLabelForm}>Equipos</label>
            <input
              className={styles.inputCreateForm}
              type="text"
              name="equipos"
              value={formData.equipos.join(",")}
              onChange={handleChange}
            />
            <button
              className={styles.buttonCreateForm}
              type="button"
              onClick={handleSubmit}
            >
              Agregar Piloto
            </button>
          </form>
        </div>
        <div className={styles.modalContainerForm}>
          <p className={styles.textModal}>
            para editar o eliminar un piloto ingresa el ID
          </p>
          <input
            className={styles.inputId}
            type="text"
            placeholder="solo admite IDs de tipo UUID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />
          <button
            className={styles.buttonOpenForm}
            onClick={() => openModal(driverId)}
          >
            Formulario de Edición
          </button>
          <p className={styles.textModal}>
            solo válido para pilotos de la Base de Datos
          </p>
          {showModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <form className={styles.modalForm}>
                  <h2 className={styles.editTitleForm}>Editar - Eliminar</h2>
                  <label className={styles.modalLabelForm}>Nombre</label>
                  <input
                    className={styles.modalInputForm}
                    type="text"
                    name="nombre"
                    value={modalFormData ? modalFormData.nombre : ""}
                    onChange={handleChangeModal}
                  />
                  <label className={styles.modalLabelForm}>Apellido</label>
                  <input
                    className={styles.modalInputForm}
                    type="text"
                    name="apellido"
                    value={modalFormData ? modalFormData.apellido : ""}
                    onChange={handleChangeModal}
                  />
                  <label className={styles.modalLabelForm}>Descripción</label>
                  <input
                    className={styles.modalInputForm}
                    type="text"
                    name="descripcion"
                    value={modalFormData ? modalFormData.descripcion : ""}
                    onChange={handleChangeModal}
                  />
                  <label className={styles.modalLabelForm}>Nacionalidad</label>
                  <input
                    className={styles.modalInputForm}
                    type="text"
                    name="nacionalidad"
                    value={modalFormData ? modalFormData.nacionalidad : ""}
                    onChange={handleChangeModal}
                  />
                  <label className={styles.modalLabelForm}>Imagen (url)</label>
                  <input
                    className={styles.modalInputForm}
                    type="text"
                    name="imagen"
                    value={modalFormData ? modalFormData.imagen : ""}
                    onChange={handleChangeModal}
                  />
                  <label className={styles.modalLabelForm}>
                    Fecha de Nacimiento
                  </label>
                  <input
                    className={styles.modalInputForm}
                    type="text"
                    name="fecha_de_nacimiento"
                    value={
                      modalFormData ? modalFormData.fecha_de_nacimiento : ""
                    }
                    onChange={handleChangeModal}
                  />
                  <label className={styles.modalLabelForm}>Equipos</label>
                  <input
                    className={styles.modalInputForm}
                    type="text"
                    name="equipos"
                    value={
                      modalFormData && Array.isArray(modalFormData.equipos)
                        ? modalFormData.equipos.join(",")
                        : ""
                    }
                    onChange={handleChangeModal}
                  />
                  <div className={styles.buttonsContainerModal}>
                    <button
                      className={styles.buttonEditModalForm}
                      type="button"
                      onClick={() => {
                        handleEditDriver();
                        setTimeout(clearDriverId, 100);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.buttonDeleteModalForm}
                      type="button"
                      onClick={() => {
                        handleDeleteDriver();
                        setTimeout(clearDriverId, 100);
                      }}
                    >
                      Eliminar
                    </button>
                    <button
                      className={styles.buttonCloseModalForm}
                      type="button"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateComponent;

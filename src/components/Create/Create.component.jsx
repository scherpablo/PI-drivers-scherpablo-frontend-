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
  const { driverId: locationDriverId } = location.state || "";

  
  const [allTeams, setAllTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [driverId, setDriverId] = useState(locationDriverId);
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
      [name]: name === "equipos" ? value.split(",").map(item => item.trim()) : value,
    });
  };

  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    const newValue = Array.isArray(modalFormData[name]) ? value.split(",").map(item => item.trim()) : value;
  
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
      alert("Por favor, corrige los errores en el formulario antes de continuar.");
    }
  };
  
  const handleDeleteDriver = () => {
    dispatch(deleteDriver(driverId));
    closeModal();
  };

  const openModal = (driverId) => {
    if (!uuidRegex.test(driverId)) {
      alert("Enter an ID of type UUID");
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
        <form className={styles.createForm} onSubmit={handleSubmit}>
          <h2>Create Driver</h2>
          <label>Name</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          <label>Description</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
          <label>Nationality</label>
          <input
            type="text"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
          />
          <label>Image (url)</label>
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
          />
          <label>Birthdate</label>
          <input
            type="text"
            name="fecha_de_nacimiento"
            value={formData.fecha_de_nacimiento}
            onChange={handleChange}
          />
          <label>Teams</label>
          <input
            type="text"
            name="equipos"
            value={formData.equipos.join(",")}
            onChange={handleChange}
          />
          <button className={styles.createButton}>Add Driver</button>
        </form>
        <div>
          <p>to edit or delete a driver, enter its ID</p>
          <input
            type="text"
            placeholder="driver ID - (UUID)"
            value={driverId || ""}
            onChange={(e) => setDriverId(e.target.value)}
          />
          <button onClick={() => openModal(driverId)} onBlur={() => setDriverId("")}>Open Form</button>
          <p>valid only for DB drivers</p>
          {showModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <form className={styles.modalForm}>
                  <h2>Edit - Delete Driver</h2>
                  <label>Name</label>
                  <input
                    type="text"
                    name="nombre"
                    value={modalFormData ? modalFormData.nombre : ""}
                    onChange={handleChangeModal}
                  />
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="apellido"
                    value={modalFormData ? modalFormData.apellido : ""}
                    onChange={handleChangeModal}
                  />
                  <label>Description</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={modalFormData ? modalFormData.descripcion : ""}
                    onChange={handleChangeModal}
                  />
                  <label>Nationality</label>
                  <input
                    type="text"
                    name="nacionalidad"
                    value={modalFormData ? modalFormData.nacionalidad : ""}
                    onChange={handleChangeModal}
                  />
                  <label>Image (url)</label>
                  <input
                    type="text"
                    name="imagen"
                    value={modalFormData ? modalFormData.imagen : ""}
                    onChange={handleChangeModal}
                  />
                  <label>Birthdate</label>
                  <input
                    type="text"
                    name="fecha_de_nacimiento"
                    value={
                      modalFormData ? modalFormData.fecha_de_nacimiento : ""
                    }
                    onChange={handleChangeModal}
                  />
                  <label>Teams</label>
                  <input
                    type="text"
                    name="equipos"
                    value={
                      modalFormData && Array.isArray(modalFormData.equipos)
                        ? modalFormData.equipos.join(",")
                        : ""
                    }
                    onChange={handleChangeModal}
                  />
                  <button type="button" onClick={handleEditDriver}>
                    Edit Driver
                  </button>
                  <button type="button" onClick={handleDeleteDriver}>
                    Delete Driver
                  </button>
                  <button type="button" onClick={closeModal}>
                    Cerrar
                  </button>
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

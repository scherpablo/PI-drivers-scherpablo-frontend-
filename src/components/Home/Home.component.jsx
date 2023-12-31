//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ACTIONS
import {
  getDrivers,
  getDriversByName,
  getDriversByTeam,
  sortDriversByName,
  sortDriversByBirthdate,
} from "../../redux/actions";
//COMPONENTS
import CardsComponent from "../Cards/Cards.component";
//STYLES
import styles from "./HomeComponent.module.css";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const sortOrder = useSelector((state) => state.sortOrder);

  const [nameFilter, setNameFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const totalPages = Math.ceil(allDrivers.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(allDrivers.length / pageSize);
    const maxVisiblePages = 10;

    const currentBlock = Math.ceil(currentPage / maxVisiblePages);

    const startPage = (currentBlock - 1) * maxVisiblePages + 1;
    const endPage = Math.min(currentBlock * maxVisiblePages, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePrevBlock = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 10));
  };

  const handleNextBlock = () => {
    const maxVisiblePages = 10;

    setCurrentPage((prevPage) => {
      const nextPage = Math.min(totalPages, prevPage + maxVisiblePages);

      if (nextPage > totalPages - maxVisiblePages) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return nextPage;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeFilter === "name") {
      dispatch(getDriversByName(nameFilter));
    } else if (activeFilter === "team") {
      dispatch(getDriversByTeam(teamFilter));
      setActiveFilter("team");
    }
  };

  const handleSortChange = (e) => {
    const sortOption = e.target.value;

    switch (sortOption) {
      case "name-asc":
      case "name-desc":
        dispatch(
          sortDriversByName(sortOption.includes("asc") ? "asc" : "desc")
        );
        break;
      case "birthdate-asc":
      case "birthdate-desc":
        dispatch(
          sortDriversByBirthdate(sortOption.includes("asc") ? "asc" : "desc")
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  return (
    <>
      <div className={styles.homeContainer}>
        <form className={styles.formHome} onSubmit={handleSubmit}>
          <input
            className={styles.inputSearch}
            id="inputSearch"
            name="input"
            type="search"
            placeholder={
              activeFilter === "name"
                ? "buscar por nombre 🔍"
                : "buscar por equipo  🔍"
            }
            value={activeFilter === "name" ? nameFilter : teamFilter}
            onChange={(e) =>
              activeFilter === "name"
                ? setNameFilter(e.target.value)
                : setTeamFilter(e.target.value) 
            }
          />
          <select
            className={styles.selectForm}
            id="select"
            onChange={(e) => setActiveFilter(e.target.value)}
            value={activeFilter}
          >
            <option value="name">Nombre</option>
            <option value="team">Equipo</option>
          </select>
          <button className={styles.buttonForm} type="submit">
            Filtrar
          </button>
          <select
            className={styles.sortSelect}
            onChange={handleSortChange}
            value={sortOrder || "default"}
          >
            <option value="default" disabled>
              Ordenar por... 🗂️
            </option>
            <option value="name-asc">Nombre ⬆️ A-Z</option>
            <option value="name-desc">Nombre ⬇️ Z-A</option>
            <option value="birthdate-asc">Nacimiento ⬆️ A-Z</option>
            <option value="birthdate-desc">Nacimiento ⬇️ Z-A</option>
          </select>
        </form>
        {allDrivers.length > 0 ? (
          <>
            <CardsComponent
              allDrivers={allDrivers}
              currentPage={currentPage}
              pageSize={pageSize}
              setCurrentPage={handlePageChange}
            />
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={handlePrevBlock}
                disabled={currentPage <= 1}
              >
                Anterior
              </button>
              <div className={styles.btnsPagination}>
                {generatePageNumbers().map((page) => (
                  <button
                    key={page}
                    className={
                      page === currentPage
                        ? styles.currentPageButton
                        : styles.pageButton
                    }
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className={styles.paginationButton}
                onClick={handleNextBlock}
                disabled={currentPage >= totalPages}
              >
                Siguiente
              </button>
            </div>
          </>
        ) : nameFilter !== "" || teamFilter !== "" ? (
          <p className={styles.noResultsMsg}>No se encontraron resultados.</p>
        ) : null}
      </div>
    </>
  );
};

export default HomeComponent;

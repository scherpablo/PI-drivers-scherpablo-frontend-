import CardComponent from "../Card/Card.component";
import styles from "./CardsComponent.module.css";

const CardsComponent = ({
  allDrivers,
  currentPage,
  pageSize,
  setCurrentPage,
}) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const driversList = allDrivers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allDrivers.length / pageSize);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.cardsContainer}>
        {driversList?.map((driver) => (
          <CardComponent key={driver.id} driver={driver} />
        ))}
      </div>
      <div className={styles.cardsBtns}>
        <button className={styles.firstPageBtn} onClick={goToFirstPage}>
          Primer Página
        </button>
        <button className={styles.prevBtn} onClick={previousPage}>
          « Atrás
        </button>
        <button className={styles.nextBtn} onClick={nextPage}>
          Adelante »
        </button>
        <button className={styles.lastPageBtn} onClick={goToLastPage}>
          Última Página
        </button>
      </div>
    </>
  );
};

export default CardsComponent;

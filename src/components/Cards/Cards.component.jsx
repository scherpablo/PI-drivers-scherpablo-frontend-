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
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
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
          First Page
        </button>
        <button className={styles.prevBtn} onClick={previousPage}>
          « Previous
        </button>
        <button className={styles.nextBtn} onClick={nextPage}>
          Next »
        </button>
        <button className={styles.lastPageBtn} onClick={goToLastPage}>
          Last Page
        </button>
      </div>
    </>
  );
};

export default CardsComponent;

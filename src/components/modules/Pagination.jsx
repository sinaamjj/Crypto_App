import styles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  const previousHandler = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    } else {
      return;
    }
  };

  const nextHandler = () => {
    if (page < 10) {
      setPage((page) => page + 1);
    } else {
      return;
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={previousHandler}
        className={page == 1 ? styles.disabled : null}
      >
        Previous
      </button>
      <p className={page === 1 && styles.selected}>1</p>
      <p className={page === 2 && styles.selected}>2</p>
      <p>...</p>
      {page > 2 && page < 9 && (
        <>
          <p className={styles.selected}>{page}</p>
          <p>...</p>
        </>
      )}
      <p className={page === 9 && styles.selected}>9</p>
      <p className={page === 10 && styles.selected}>10</p>
      <button
        onClick={nextHandler}
        className={page == 10 ? styles.disabled : null}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h2>Crypto App</h2>
        <p>React.Js Full Course</p>
      </header>

      {children}

      <footer className={styles.footer}>Developed By Sina Amjadian</footer>
    </>
  );
}

export default Layout;

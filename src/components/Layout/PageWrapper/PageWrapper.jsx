import styles from "./PageWrapper.module.css";

const PageWrapper = ({ title, description, children }) => {
  return (
    <section className={styles.page}>
      {(title || description) && (
        <header className={styles.header}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {description && <p className={styles.description}>{description}</p>}
        </header>
      )}
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default PageWrapper;

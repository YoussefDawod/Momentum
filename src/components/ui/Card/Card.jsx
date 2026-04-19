import styles from "./Card.module.css";

const Card = ({ children, className = "", as: Tag = "section", ...rest }) => {
  const classes = [styles.card, className].filter(Boolean).join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <header className={[styles.header, className].filter(Boolean).join(" ")}>
    {children}
  </header>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2 className={[styles.title, className].filter(Boolean).join(" ")}>{children}</h2>
);

export const CardSubtitle = ({ children, className = "" }) => (
  <p className={[styles.subtitle, className].filter(Boolean).join(" ")}>{children}</p>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={[styles.body, className].filter(Boolean).join(" ")}>{children}</div>
);

export default Card;

import styles from "./StatsCard.module.css";

const StatsCard = ({ label, value, hint, icon: Icon, accent = "primary", index = 0 }) => {
  return (
    <article
      className={[styles.card, styles[accent]].join(" ")}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {Icon && (
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={20} />
        </span>
      )}
      <div className={styles.body}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    </article>
  );
};

export default StatsCard;

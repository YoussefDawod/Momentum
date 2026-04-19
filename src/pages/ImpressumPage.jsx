import { useDocumentTitle } from "../hooks/useDocumentTitle";
import styles from "./LegalPage.module.css";

const ImpressumPage = () => {
  useDocumentTitle("Impressum — Momentum");
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Impressum</h1>
      <p className={styles.lead}>Angaben gemäß § 5 TMG</p>

      <section className={styles.section}>
        <h2>Anbieter</h2>
        <p>
          Youssef Dawod
          <br />
          Yellow Developer
          <br />
          Bahnhofstraße 1<br />
          29614 Soltau
          <br />
          Deutschland
        </p>
      </section>

      <section className={styles.section}>
        <h2>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href="mailto:dawod@yellowdeveloper.de">dawod@yellowdeveloper.de</a>
        </p>
      </section>

      <section className={styles.section}>
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>Youssef Dawod (Anschrift wie oben)</p>
      </section>

      <section className={styles.section}>
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf
          diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
          bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen
          oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese
          Inhalte umgehend entfernen.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Haftung für Links</h2>
        <p>
          Mein Angebot enthält gegebenenfalls Links zu externen Websites
          Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich
          für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
          Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
          diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge
          Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </section>

      <p className={styles.meta}>Stand: April 2026</p>
    </div>
  );
};

export default ImpressumPage;

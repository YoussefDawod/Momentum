import { useDocumentTitle } from "../hooks/useDocumentTitle";
import styles from "./LegalPage.module.css";

const DatenschutzPage = () => {
  useDocumentTitle("Datenschutz — Momentum");
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Datenschutzerklärung</h1>
      <p className={styles.lead}>
        Der Schutz deiner Daten ist mir wichtig. Momentum wurde bewusst so
        gebaut, dass so wenig Daten wie möglich verarbeitet werden.
      </p>

      <section className={styles.section}>
        <h2>1. Verantwortlicher</h2>
        <p>
          Youssef Dawod, Bahnhofstraße 1, 29614 Soltau, Deutschland
          <br />
          E-Mail:{" "}
          <a href="mailto:dawod@yellowdeveloper.de">dawod@yellowdeveloper.de</a>
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Auf einen Blick</h2>
        <ul>
          <li>Kein Tracking, keine Analyse-Tools.</li>
          <li>Keine Werbe- oder Drittanbieter-Cookies.</li>
          <li>
            Alle deine Timer- und Statistik-Daten bleiben ausschließlich auf
            deinem Gerät (Browser-Speicher).
          </li>
          <li>Es wird kein Nutzer-Account angelegt.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. Hosting &amp; Server-Logs</h2>
        <p>
          Diese Website wird bei einem professionellen Hosting-Anbieter
          innerhalb der EU betrieben. Beim Aufruf werden vom Hoster technisch
          notwendige Zugriffsdaten (sogenannte Server-Logs) verarbeitet, um
          die Auslieferung der Seite zu ermöglichen und sie vor Missbrauch zu
          schützen.
        </p>
        <h3>Verarbeitete Daten</h3>
        <ul>
          <li>IP-Adresse (in der Regel gekürzt oder anonymisiert)</li>
          <li>Datum und Uhrzeit des Aufrufs</li>
          <li>Aufgerufene URL, Referrer, User-Agent</li>
        </ul>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an einem stabilen, sicheren Betrieb). Die Logs werden nach maximal
          30 Tagen gelöscht.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Lokaler Browser-Speicher (localStorage)</h2>
        <p>
          Momentum speichert deine Einstellungen und abgeschlossenen Sitzungen
          im sogenannten <code>localStorage</code> deines Browsers. Dadurch
          bleiben deine Daten auch nach einem Neuladen erhalten. Diese Daten
          werden <strong>nicht</strong> an mich oder Dritte übertragen.
        </p>
        <p>
          Du kannst den Browser-Speicher jederzeit über die Einstellungen
          deines Browsers oder über die App-Einstellungen zurücksetzen.
        </p>
        <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
      </section>

      <section className={styles.section}>
        <h2>5. Cookies</h2>
        <p>
          Es werden keine Cookies für Tracking-, Marketing- oder
          Analyse-Zwecke gesetzt. Ausschließlich technisch notwendige
          Speicher­mechanismen des Browsers werden verwendet (siehe Punkt 4).
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Deine Rechte</h2>
        <p>Du hast jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über die dich betreffenden Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
          <li>
            Beschwerde bei einer Aufsichtsbehörde (z. B. bei der
            Landesbeauftragten für Datenschutz Niedersachsen)
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>7. Kontakt für Datenschutzanfragen</h2>
        <p>
          Wende dich einfach per E-Mail an{" "}
          <a href="mailto:dawod@yellowdeveloper.de">dawod@yellowdeveloper.de</a>
          .
        </p>
      </section>

      <p className={styles.meta}>Stand: April 2026</p>
    </div>
  );
};

export default DatenschutzPage;

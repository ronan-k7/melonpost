import Image from "next/image";
import styles from "./NytFamilyCard.module.css";

const NYT_URL = "https://www.nytimes.com/2026/11/10/us/politics/alina-habba-fired-pardon.html";

/* NYT source card sized for the Family article sidebar. */
export default function NytFamilyCard() {
  return (
    <a
      className={styles.card}
      href={NYT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="The New York Times report on Alina Habba Mildon's contract (opens in a new tab)"
    >
      <span className={styles.label}>Source report</span>
      <div className={styles.imageWrap}>
        <Image
          src="/images/articles/alina-habba-mildon-nytimes.webp"
          alt="The New York Times headline: Alina Habba Mildon Loses $50 Million Contract That Enraged Trump"
          width={640}
          height={851}
          sizes="(max-width: 800px) 50vw, 340px"
        />
      </div>
      <div className={styles.body}>
        <h2>The New York Times Report on Alina Habba Mildon’s Contract</h2>
        <p className={styles.desc}>
          A report by The New York Times examines Alina Habba Mildon’s $50 million contract, her departure from Concord Partners and the circumstances surrounding the termination.
        </p>
        <p className={styles.meta}>Source: The New York Times · November 10, 2026</p>
        <span className={styles.cta}>Read the original report →</span>
      </div>
    </a>
  );
}

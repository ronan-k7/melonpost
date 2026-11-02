import Image from "next/image";
import Link from "next/link";
import { articleHref, categoryHref, formatDate } from "@/lib/content";
import { CompactStory } from "./StoryCard";
import styles from "./HomeLead.module.css";

export default function HomeLead({ lead, author, sideLead }) {
  return <section className={styles.lead} aria-labelledby="lead-story-title">
    <article className={styles.copy}>
      <Link className={styles.category} href={categoryHref(lead.category)}>{lead.category}</Link>
      <h1 id="lead-story-title"><Link href={articleHref(lead)}>{lead.title}</Link></h1>
      <p className={styles.excerpt}>{lead.excerpt}</p>
      {lead.homeDescription && <p className={styles.description} data-home-description>{lead.homeDescription}</p>}
      <div className={styles.byline}><span>By <Link href={`/author/${author.slug}`}>{author.name}</Link></span><span aria-hidden="true">·</span><time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time></div>
    </article>
    <Link className={styles.image} href={articleHref(lead)} aria-label={`Read ${lead.title}`}><Image src={lead.image} alt={lead.imageAlt || lead.title} fill priority sizes="(max-width: 700px) 100vw, (max-width: 1100px) 55vw, 38vw" /></Link>
    <aside className={styles.rail} aria-label="More lead stories">{sideLead.map(article => <CompactStory key={article.slug} article={article} />)}</aside>
  </section>;
}

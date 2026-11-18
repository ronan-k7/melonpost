import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articleHref, categoryHref, formatDate } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "./JsonLd";
import ShareTools from "./ShareTools";
import { StoryCard } from "./StoryCard";
import styles from "./CaseReport.module.css";

export default function CaseReport({ article, author, related, schema, breadcrumbs }) {
  return (
    <article className={styles.report}>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbs} />
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <Link href={categoryHref(article.category)}>{article.category}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{article.title}</span>
      </nav>
      <header className={styles.lead}>
        <figure className={styles.figure}>
          <Image src={article.image} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight}
            sizes="(max-width: 760px) 100vw, (max-width: 1340px) 45vw, 570px" priority />
          <figcaption>{article.imageCaption}</figcaption>
        </figure>
        <div className={styles.intro}>
          <div className={styles.kicker}>Puerto Rico</div>
          <h1>{article.title}</h1>
          <p className={styles.deck}>{article.excerpt}</p>
          <div className={styles.byline}>
            <Link href={`/author/${author.slug}`}>By {author.name}</Link>
            <span>{article.dateline}</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </div>
        </div>
      </header>
      <div className={styles.columns}>
        <div className={styles.copy}>
          {article.body.sections.map(section => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <section className={styles.sources} aria-labelledby="sources-title">
            <h2 id="sources-title">Sources and court records</h2>
            <ul>{article.sources.map(source => (
              <li key={source.url}><small>{source.publisher}</small>
                <a href={source.url}>{source.title} <ArrowUpRight size={14} aria-hidden="true" /></a>
              </li>
            ))}</ul>
          </section>
          <nav className={styles.tags} aria-label="Article tags">
            <strong>Tags</strong>
            {article.tags.map(tag => (
              <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>{tag}</Link>
            ))}
          </nav>
          <ShareTools title={article.title} url={absoluteUrl(articleHref(article))} />
        </div>
        <aside className={styles.rail} aria-labelledby="timeline-title">
          <h2 id="timeline-title">The case timeline</h2>
          <ol>{article.timeline.map(event => (
            <li key={event.date}><strong>{event.date}</strong><p>{event.text}</p></li>
          ))}</ol>
        </aside>
      </div>
      <section className={styles.related} aria-labelledby="related-title">
        <h2 id="related-title">More in Politics</h2>
        <div>{related.map(item => <StoryCard article={item} key={item.slug} />)}</div>
      </section>
    </article>
  );
}

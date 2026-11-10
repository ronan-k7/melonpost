import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import { articleHref, categoryHref, formatDate } from "@/lib/content";
import { site } from "@/lib/site";
import ShareTools from "./ShareTools";
import { StoryCard } from "./StoryCard";
import styles from "./ClientArticlePageTwo.module.css";

export default function ClientArticlePageTwo({
  article,
  author,
  related,
  schema,
  breadcrumbs,
}) {
  const sections = article.body.sections;
  const hero = article.photos.hero;
  const url = `${site.url}${articleHref(article)}`;
  return (
    <article className={styles.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={categoryHref(article.category)}>{article.category}</Link>
          <span aria-hidden="true">/</span>
          <Link href={articleHref(article)}>{article.title}</Link>
        </nav>

        <header className={styles.header}>
          <Link className={styles.eyebrow} href={categoryHref(article.category)}>
            {article.category}
          </Link>
          <h1>{article.title}</h1>
          <p className={styles.deck}>{article.excerpt}</p>
          <div className={styles.byline}>
            <Link href={`/author/${author.slug}`} className={styles.author}>
              <Image src={author.image} alt="" width={38} height={38} />
              <span>
                By {author.name}
                <small>{author.role}</small>
              </span>
            </Link>
            <span>
              <CalendarDays size={15} aria-hidden="true" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </span>
            <span>
              <Clock3 size={15} aria-hidden="true" />
              {article.readingTime} min read
            </span>
          </div>
        </header>

        <figure className={styles.hero}>
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
          {hero.caption ? <figcaption>{hero.caption}</figcaption> : null}
        </figure>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
          <nav className={styles.contents} aria-labelledby="contents-heading">
            <h2 id="contents-heading">In this story</h2>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          {article.timeline && article.timeline.length > 0 ? (
            <section className={styles.timeline} aria-labelledby="timeline-heading">
              <h2 id="timeline-heading">Timeline</h2>
              <ol>
                {article.timeline.map((event) => (
                  <li key={event.date}>
                    <strong>{event.date}</strong>
                    <p>{event.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          </aside>

          <div className={styles.story}>
            <div className={styles.body}>
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={styles.section}
                >
                  <h2>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph, pi) => (
                    <Fragment key={pi}>
                      <p
                        className={
                          index === 0 && pi === 0 ? styles.dropcap : undefined
                        }
                      >
                        {paragraph}
                      </p>
                      {(section.quotes || [])
                        .filter((quote) => quote.afterParagraph === pi)
                        .map((quote, qi) => (
                          <blockquote
                            className={
                              quote.variant === "highlight"
                                ? styles.highlightQuote
                                : styles.pullQuote
                            }
                            key={qi}
                          >
                            {quote.stats ? (
                              <ul className={styles.stats}>
                                {quote.stats.map((stat) => (
                                  <li key={stat.label}>
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                            <p>{quote.text}</p>
                            {quote.cite ? <cite>{quote.cite}</cite> : null}
                          </blockquote>
                        ))}
                    </Fragment>
                  ))}
                </section>
              ))}
            </div>

            <nav className={styles.tags} aria-label="Article tags">
              <span>Tag</span>
              {article.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>
                  {tag.toLowerCase()}
                </Link>
              ))}
            </nav>
            <div className={styles.share}>
              <ShareTools title={article.title} url={url} />
            </div>
            <section
              className={styles.authorBox}
              aria-labelledby="author-heading"
            >
              <Image
                src={author.image}
                alt={author.name}
                width={70}
                height={70}
              />
              <div>
                <span>About the author</span>
                <h2 id="author-heading">
                  <Link href={`/author/${author.slug}`}>{author.name}</Link>
                </h2>
                <p>{author.bio}</p>
              </div>
            </section>
          </div>
        </div>

        <section className={styles.related} aria-labelledby="related-heading">
          <h2 id="related-heading">Related stories</h2>
          <div>
            {related.slice(0, 4).map((item) => (
              <StoryCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
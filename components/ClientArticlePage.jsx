import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, ArrowUpRight } from "lucide-react";
import { articleHref, formatDate } from "@/lib/content";
import { site } from "@/lib/site";
import ShareTools from "./ShareTools";
import { StoryCard } from "./StoryCard";
import styles from "./ClientArticlePage.module.css";

function ArticlePhoto({ photo, portrait = false }) {
  return (
    <figure className={`${styles.photo} ${portrait ? styles.portrait : ""}`}>
      {/* <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={
          portrait
            ? "(max-width: 600px) 100vw, 280px"
            : "(max-width: 900px) 100vw, 760px"
        }
      />
      <figcaption>{photo.caption}</figcaption> */}
    </figure>
  );
}

export default function ClientArticlePage({
  article,
  author,
  related,
  schema,
  breadcrumbs,
}) {
  const sections = article.body.sections;
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
          <Link href="/politics">Politics</Link>
          <span aria-hidden="true">/</span>
          <Link href={articleHref(article)}>{article.title}</Link>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Link href="/politics">Politics</Link>
            </div>
            <h1 data-original-title>{article.title}</h1>
            <p className={styles.deck} data-original-subtitle>
              {article.excerpt}
            </p>
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
          </div>
          <figure className={styles.heroPhoto}>
            <Image
              src={article.photos.hero.src}
              alt={article.photos.hero.alt}
              width={article.photos.hero.width}
              height={article.photos.hero.height}
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <figcaption>{article.photos.hero.caption}</figcaption>
          </figure>
        </header>

        <div className={styles.columns}>
          <div className={styles.story}>
            <div className={styles.body} data-original-body>
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={styles.section}
                >
                  {article.photos[section.id] && (
                    <ArticlePhoto
                      photo={article.photos[section.id]}
                      portrait={section.id === "herrera-velutini-family"}
                    />
                  )}
                  {section.paragraphs.map((paragraph, pi) => (
                    <Fragment key={pi}>
                      <p
                        data-original-paragraph
                        className={
                          index === 0 && pi === 0 ? styles.dropcap : undefined
                        }
                      >
                        {paragraph}
                      </p>
                      {(section.quotes || [])
                        .filter((quote) => quote.afterParagraph === pi)
                        .map((quote, qi) => (
                          <blockquote className={styles.pullQuote} key={qi}>
                            {quote.stats?.length ? (
                              <div className={styles.quoteStats}>
                                {quote.stats.map((stat) => (
                                  <div key={stat.label}>
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                            <p>{quote.text}</p>
                          </blockquote>
                        ))}
                    </Fragment>
                  ))}
                </section>
              ))}
            </div>

            <section
              className={styles.sources}
              id="article-sources"
              aria-labelledby="sources-heading"
            >
              <h2 id="sources-heading">Sources</h2>
              <ol>
                {article.sources.map((source, i) => (
                  <li key={source.url} id={`source-${i + 1}`}>
                    <span className={styles.sourceNumber} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className={styles.sourcePublisher}>
                        {source.publisher}
                      </span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.name}{" "}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                      <p>{source.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
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

          <aside className={styles.sidebar} aria-label="Article context">
            <section className={styles.panel}>
              <h2>At a glance</h2>
              <ul>
                {article.keyTakeaways.map((text, i) => (
                  <li key={text}>
                    <span aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className={styles.timeline}>
              <h2>Timeline</h2>
              <ol>
                {article.timeline.map((event) => (
                  <li key={event.date}>
                    <strong>{event.date}</strong>
                    <p>{event.text}</p>
                  </li>
                ))}
              </ol>
              <a href="#article-sources" className={styles.contextLink}>
                Timeline sources [1–2]
              </a>
            </section>
            <nav className={styles.panel} aria-labelledby="contents-heading">
              <h2 id="contents-heading">Table of contents</h2>
              <ol className={styles.contents}>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
                <li>
                  <a href="#article-sources">Sources</a>
                </li>
              </ol>
            </nav>
          </aside>
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
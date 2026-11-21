import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import { articleHref, categoryHref, formatDate } from "@/lib/content";
import { site } from "@/lib/site";
import JsonLd from "./JsonLd";
import ShareTools from "./ShareTools";
import { StoryCard } from "./StoryCard";
import styles from "./ClientArticlePageThree.module.css";

/*
  Modern long-read template ("client-long-read-3").
  - Server component: the only client JavaScript on the page is the share buttons.
  - Optional fields in the article JSON, each rendered only when present:
      lead[]        opening paragraphs shown before the first heading
      keyTakeaways[] summary list
      timeline[]    { date, place, text } sequence
      balance       { afterSection, title, reported{label,items[]}, response{label,items[]} }
      body.sections[] { id, title, paragraphs[], quotes[{ afterParagraph, text, cite? }] }
*/
export default function ClientArticlePageThree({
  article,
  author,
  related,
  schema,
  breadcrumbs,
}) {
  const sections = article.body?.sections || [];
  const hero = article.photos?.hero;
  const lead = Array.isArray(article.lead) ? article.lead : [];
  const takeaways = Array.isArray(article.keyTakeaways) ? article.keyTakeaways : [];
  const timeline = Array.isArray(article.timeline) ? article.timeline : [];
  const balance = article.balance || null;
  const url = `${site.url}${articleHref(article)}`;
  const isCut = article.slug === "alina-habba-turhan-mildon-venezuela-business-washington";
  const colon = article.title.indexOf(":");
  const titleLead = colon > 0 ? article.title.slice(0, colon + 1) : article.title;
  const titleRest = colon > 0 ? article.title.slice(colon + 1).trim() : "";

  return (
    <article className={`${styles.article} ${article.slug === "alina-habba-turhan-mildon-venezuela-business-washington" ? styles.habbaFeature : ""}`}>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbs} />
      <div className={styles.progress} aria-hidden="true" />

      {/* ---------- Header ---------- */}
      {/* ---------- The Cut-style header (this article only) ---------- */}
      {isCut ? (
        <header className={styles.cutHeader}>
          <div className={styles.cutFrame}>
            <div className={styles.cutText}>
              <p className={styles.cutKicker}>
                <Link href={categoryHref(article.category)}>{article.category}</Link>
                <span aria-hidden="true">|</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </p>
              <h1 className={styles.cutTitle}>
                <strong>{titleLead}</strong> {titleRest ? <span>{titleRest}</span> : null}
              </h1>
              <p className={styles.cutByline}>
                {author ? (
                  <>
                    By <Link href={`/author/${author.slug}`}>{author.name}</Link>
                  </>
                ) : null}
                {author && article.readingTime ? <span aria-hidden="true">|</span> : null}
                {article.readingTime ? <span>{article.readingTime} min read</span> : null}
              </p>
            </div>
            {hero ? (
              <figure className={styles.cutPhoto}>
                <div className={styles.cutMat}>
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    width={hero.width}
                    height={hero.height}
                    priority
                    sizes="(max-width: 900px) 100vw, 560px"
                  />
                </div>
              </figure>
            ) : null}
          </div>
          {hero?.caption ? <p className={styles.cutCaption}><strong>Photo:</strong> {hero.caption}</p> : null}
        </header>
      ) : null}

      {!isCut ? (
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href={categoryHref(article.category)}>{article.category}</Link>
            </nav>
            <Link className={styles.tag} href={categoryHref(article.category)}>
              {article.category}
            </Link>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.deck}>{article.excerpt}</p>
            <div className={styles.byline}>
              {author ? (
                <Link href={`/author/${author.slug}`} className={styles.author}>
                  <Image src={author.image} alt="" width={40} height={40} />
                  <span>
                    <strong>{author.name}</strong>
                    <small>{author.role}</small>
                  </span>
                </Link>
              ) : null}
              <span className={styles.meta}>
                <CalendarDays size={15} aria-hidden="true" />
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </span>
              {article.readingTime ? (
                <span className={styles.meta}>
                  <Clock3 size={15} aria-hidden="true" />
                  {article.readingTime} min read
                </span>
              ) : null}
            </div>
          </div>

          {hero ? (
            <figure className={styles.figure}>
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                priority
                sizes="(max-width: 900px) 100vw, 460px"
              />
              {hero.caption ? <figcaption>{hero.caption}</figcaption> : null}
            </figure>
          ) : null}
        </div>
      </header>
      ) : null}

      {/* ---------- Reading layout ---------- */}
      <div className={styles.layout}>
        <aside className={styles.rail} aria-label="Article tools">
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
          <div className={styles.railShare}>
            <ShareTools title={article.title} url={url} />
          </div>
        </aside>

        <div className={styles.story}>
          {takeaways.length > 0 ? (
            <section className={styles.takeaways} aria-labelledby="takeaways-heading">
              <h2 id="takeaways-heading">Key takeaways</h2>
              <ul>
                {takeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {lead.length > 0 ? (
            <div className={styles.lead}>
              {lead.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {timeline.length > 0 ? (
            <section className={styles.route} aria-labelledby="route-heading">
              <h2 id="route-heading">The route behind the story</h2>
              <ol>
                {timeline.map((step) => (
                  <li key={step.date}>
                    <time>{step.date}</time>
                    <h3>{step.place}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className={styles.body}>
            {sections.map((section) => (
              <Fragment key={section.id}>
                <section id={section.id} className={styles.section}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, pi) => (
                    <Fragment key={pi}>
                      <p>{paragraph}</p>
                      {(section.quotes || [])
                        .filter((quote) => quote.afterParagraph === pi)
                        .map((quote, qi) => (
                          <blockquote className={styles.pullQuote} key={qi}>
                            <p>{quote.text}</p>
                            {quote.cite ? <cite>{quote.cite}</cite> : null}
                          </blockquote>
                        ))}
                    </Fragment>
                  ))}
                </section>

                {balance && balance.afterSection === section.id ? (
                  <section className={styles.balance} aria-labelledby="balance-heading">
                    <h2 id="balance-heading">{balance.title}</h2>
                    <div className={styles.balanceGrid}>
                      <div className={styles.reported}>
                        <h3>{balance.reported.label}</h3>
                        <ul>
                          {balance.reported.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.response}>
                        <h3>{balance.response.label}</h3>
                        <ul>
                          {balance.response.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                ) : null}
              </Fragment>
            ))}
          </div>

          {article.tags?.length ? (
            <nav className={styles.tags} aria-label="Article tags">
              <span>Topics</span>
              {article.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>
                  {tag}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className={styles.share}>
            <ShareTools title={article.title} url={url} />
          </div>

          {author ? (
            <section className={styles.authorBox} aria-labelledby="author-heading">
              <Image src={author.image} alt={author.imageAlt || author.name} width={72} height={72} />
              <div>
                <span>About the author</span>
                <h2 id="author-heading">
                  <Link href={`/author/${author.slug}`}>{author.name}</Link>
                </h2>
                <p>{author.bio}</p>
              </div>
            </section>
          ) : null}
        </div>
      </div>

      {related?.length ? (
        <section className={styles.related} aria-labelledby="related-heading">
          <h2 id="related-heading">Related stories</h2>
          <div>
            {related.slice(0, 4).map((item) => (
              <StoryCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

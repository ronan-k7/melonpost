import { site, pageSocialMetadata } from "./site";

// ---------------------------------------------------------------
// Information & policy pages.
//
// Block types inside a section's `body`:
//   "text"                      -> paragraph. Inline links: [[/path|Label]] or [[mailto:x|Label]]
//   { list: ["a", "b"] }        -> bulleted list (items support inline links too)
//   { mail: [{ label, subject, text }] } -> contact rows with mailto links
//
// To edit a page, change the text here — the routes, footer links,
// sitemap and llms.txt all read from this file.
// ---------------------------------------------------------------

const email = site.email;
const mail = `[[mailto:${email}|${email}]]`;
const UPDATED = "2026-11-02";

export const infoPages = {
  "editorial-policy": {
    title: "Editorial Policy",
    eyebrow: "Standards",
    description: `How ${site.name} decides what to publish, how our journalism is reported and checked, and the standards our editors and reporters follow.`,
    intro: `How ${site.name} decides what to publish, how we report it, and the standards our journalists are expected to meet.`,
    updated: UPDATED,
    sections: [
      {
        id: "purpose",
        title: "Our purpose and scope",
        body: [
          `${site.name} is an online news publication at ${site.url.replace(/^https?:\/\//, "")}. We report on world affairs, U.S. news, business, finance, technology, politics, health and investigations, with the aim of giving readers accurate, clearly explained and fairly presented news.`,
          "These principles apply to everything we publish under the Melonpost name, including articles, summaries, newsletters and social media posts.",
        ],
      },
      {
        id: "accuracy",
        title: "Accuracy and verification",
        body: [
          "Accuracy comes before speed. We check facts against primary sources wherever possible, such as official documents, court filings, data releases and direct statements. Where we cannot independently confirm a claim, we say so and attribute it clearly.",
          "Breaking stories are labelled as developing and updated as new information is confirmed. Substantive updates are noted on the article. Our verification process is described in more detail in our [[/source-methodology|Source Methodology]].",
        ],
      },
      {
        id: "sources",
        title: "Sources and attribution",
        body: [
          "We name our sources whenever we can. Anonymous sourcing is a last resort, used only when the information is important, cannot reasonably be obtained on the record, and comes from a source with first-hand knowledge or reliable access. When we grant anonymity, we explain why.",
          "We attribute information that comes from other news organisations or news agencies, and we link to original reporting and documents where it helps readers.",
        ],
      },
      {
        id: "fairness",
        title: "Fairness and right of response",
        body: [
          "People and organisations that are the subject of serious criticism or allegations are given a reasonable opportunity to respond before publication. We present competing arguments fairly and avoid loaded language.",
          "How we handle responses and complaints after publication is set out in our [[/corrections-policy|Corrections Policy]].",
        ],
      },
      {
        id: "independence",
        title: "Editorial independence",
        body: [
          "Editorial decisions are made by our editorial team. Advertisers, sponsors, partners and other outside parties do not review, approve or influence our coverage, and we do not accept payment in exchange for coverage. See our [[/advertising-policy|Advertising Policy]].",
        ],
      },
      {
        id: "news-analysis-opinion",
        title: "News, analysis and opinion",
        body: [
          "We keep news reporting separate from analysis and opinion. News reports set out what happened and what is known. Analysis explains context and implications and is labelled as such. Opinion reflects the views of its author and is clearly identified as opinion.",
        ],
      },
      {
        id: "conflicts",
        title: "Conflicts of interest",
        body: [
          "Journalists must not use their position for personal gain or accept gifts, payments or favours from people or organisations they cover. Anyone with a personal or financial interest in a subject must tell their editor before working on it. Where a relevant interest exists, we either disclose it to readers or assign the story to someone else.",
        ],
      },
      {
        id: "technology",
        title: "Use of technology and AI tools",
        body: [
          "We may use software tools, including AI-assisted tools, for tasks such as research support, transcription, translation and copy checks. Tools do not replace editorial judgement: our editors are responsible for the accuracy of what we publish and review articles before they go live.",
        ],
      },
      {
        id: "images",
        title: "Images and graphics",
        body: [
          "We choose images and graphics to illustrate the story. We do not alter photographs in ways that could mislead readers, and where an image is illustrative, a composite or a graphic, we say so.",
        ],
      },
      {
        id: "feedback",
        title: "Feedback",
        body: [
          `We welcome questions and feedback about our journalism. Write to ${mail}. To report a mistake, see our [[/corrections-policy|Corrections Policy]].`,
        ],
      },
    ],
  },

  "corrections-policy": {
    title: "Corrections Policy",
    eyebrow: "Standards",
    description: `How ${site.name} corrects errors, clarifies reporting and handles requests for a right of reply.`,
    intro: "We aim to get it right. When we do not, we correct it promptly and openly.",
    updated: UPDATED,
    sections: [
      {
        id: "commitment",
        title: "Our commitment",
        body: [
          `${site.name} corrects significant errors of fact, context or attribution as soon as they are confirmed. We aim to give a correction the same visibility as the original error, as far as that is practical.`,
        ],
      },
      {
        id: "report-an-error",
        title: "How to report an error",
        body: [
          `Email ${mail} with the subject line “Correction”. Please include the headline or web address of the article, what you believe is wrong, and any documents or links that support your request.`,
          "We aim to acknowledge reports within two business days and to review them promptly.",
        ],
      },
      {
        id: "how-we-correct",
        title: "How we make corrections",
        body: [
          {
            list: [
              "Corrections: when we have published something inaccurate, we fix the error and add a note to the article saying what was changed and when.",
              "Clarifications: when wording was unclear or potentially misleading but not strictly inaccurate, we clarify the text and add a note.",
              "Updates: when new developments or information become available, we mark the article as updated and say what has changed.",
              "Minor edits: typographical, spelling and formatting errors that do not affect meaning are fixed without a note.",
            ],
          },
          "If a headline, summary or image caption is corrected, we note that too.",
        ],
      },
      {
        id: "removing-content",
        title: "Removing content",
        body: [
          "We do not remove articles to avoid scrutiny. In exceptional circumstances, such as a legal requirement, a court order or a serious privacy or safety concern, we may remove or restrict content. Where appropriate, we leave a note explaining what was done.",
        ],
      },
      {
        id: "right-of-reply",
        title: "Right of reply",
        body: [
          "People and organisations named in our reporting may ask to respond. If a reply raises a factual point, we will check it and correct the article if it shows we made a mistake. If the disagreement is about interpretation, we may add or link to the response where it is fair and relevant to do so.",
          `Send requests to ${mail} with “Right of reply” in the subject line, setting out what you would like to respond to.`,
        ],
      },
      {
        id: "escalation",
        title: "If you are not satisfied",
        body: [
          "If you are unhappy with how a request was handled, reply to our acknowledgement and ask for a senior editor to review it. We will consider the request again and explain our decision.",
        ],
      },
    ],
  },

  "source-methodology": {
    title: "Source Methodology",
    eyebrow: "Standards",
    description: `The kinds of sources ${site.name} relies on, how we verify information, and how we tell readers what we know and what we do not.`,
    intro: "The kinds of evidence we rely on, how we check it, and how we tell readers what we know and what we do not.",
    updated: UPDATED,
    sections: [
      {
        id: "primary-sources",
        title: "Primary sources first",
        body: [
          "Wherever possible we report from primary sources rather than from summaries of them. These include:",
          {
            list: [
              "Court filings, rulings and legal documents",
              "Government and agency statements, reports and data releases",
              "Company filings, results and statements",
              "Peer-reviewed research and official statistics",
              "On-the-record interviews and direct statements",
              "Original video, audio and documents",
            ],
          },
        ],
      },
      {
        id: "secondary-sources",
        title: "Wire and secondary sources",
        body: [
          "When our reporting builds on the work of other news organisations or news agencies, we attribute it and, where possible, check it against the underlying material. We link to original reporting when it helps readers follow the story.",
        ],
      },
      {
        id: "verification",
        title: "How we verify",
        body: [
          {
            list: [
              "Confirm who a source is and how they know what they claim to know.",
              "Cross-check key facts with at least one independent source where possible.",
              "Check names, dates, figures and quotations against the original material.",
              "Read the original document rather than relying on a description of it.",
              "Check the origin, date and context of images and video before using them.",
            ],
          },
        ],
      },
      {
        id: "anonymous-sources",
        title: "Anonymous sources",
        body: [
          "Information from anonymous sources is published only when an editor knows the source’s identity and agrees that it meets the criteria in our [[/editorial-policy|Editorial Policy]]. We explain to readers why anonymity was granted and what the source’s position or access is, as far as we can without identifying them.",
        ],
      },
      {
        id: "data",
        title: "Data, statistics and research",
        body: [
          "When we cite data, we name the publisher and the date, and we note important limits such as small samples, margins of error or preliminary results. We avoid presenting correlation as causation, and we look for the underlying data when a figure is disputed.",
        ],
      },
      {
        id: "quotes",
        title: "Quotations",
        body: [
          "We quote people accurately. We may shorten a quotation for length but never change its meaning, and we do not invent or composite quotations.",
        ],
      },
      {
        id: "developing-stories",
        title: "Developing stories",
        body: [
          "On fast-moving stories, early information is often incomplete. We label developing coverage, distinguish between what is confirmed and what is reported or alleged, and update the article as facts are established.",
        ],
      },
      {
        id: "transparency",
        title: "Transparency",
        body: [
          "Where it helps, we explain our methods in the article or link to source documents. If you think we have misread a source, tell us through our [[/corrections-policy|Corrections Policy]].",
        ],
      },
    ],
  },

  "finance-coverage-standards": {
    title: "Finance Coverage Standards",
    eyebrow: "Standards",
    description: `Additional standards ${site.name} applies to reporting on markets, interest rates, companies, the economy and digital assets.`,
    intro: "Additional standards for our coverage of markets, interest rates, the economy, companies and digital assets.",
    updated: UPDATED,
    sections: [
      {
        id: "scope",
        title: "Scope",
        body: [
          "These standards apply to our Finance and Business coverage, including markets, central banks and interest rates, company results, economic data and digital assets, in addition to our [[/editorial-policy|Editorial Policy]].",
        ],
      },
      {
        id: "not-advice",
        title: "Information, not advice",
        body: [
          "Our finance content is for general information only. It is not investment, tax, legal or financial advice and should not be taken as a recommendation to buy, sell or hold any asset. Readers should do their own research or speak to a qualified professional before making financial decisions.",
        ],
      },
      {
        id: "figures",
        title: "Accuracy and timeliness of figures",
        body: [
          "Prices, rates and index levels change constantly. Figures in an article reflect the time of writing or the time stated, and may be out of date by the time you read it. When we cite data, we name the source and the date.",
        ],
      },
      {
        id: "conflicts-trading",
        title: "Conflicts of interest and trading",
        body: [
          "Journalists covering finance must not trade in securities or digital assets they are reporting on, and must never trade ahead of publication. They must disclose relevant holdings to their editors, and we disclose them to readers when it is relevant to the story.",
        ],
      },
      {
        id: "forecasts",
        title: "Forecasts and projections",
        body: [
          "Forecasts, price targets and projections are clearly labelled, attributed to their source and, where possible, accompanied by the assumptions behind them. Past performance is not a reliable guide to future results, and we do not present predictions as facts.",
        ],
      },
      {
        id: "digital-assets",
        title: "Crypto and speculative assets",
        body: [
          "We report on crypto assets, tokens and other speculative products without promoting them. We note volatility and risk, and we treat promotional claims with scepticism.",
        ],
      },
      {
        id: "commercial",
        title: "Commercial content",
        body: [
          "Finance coverage is never sponsored or paid for. Any advertising or sponsored content is kept separate and labelled in line with our [[/advertising-policy|Advertising Policy]].",
        ],
      },
      {
        id: "corrections",
        title: "Corrections",
        body: [
          "Errors in figures, names or attribution are corrected promptly under our [[/corrections-policy|Corrections Policy]].",
        ],
      },
    ],
  },

  "advertising-policy": {
    title: "Advertising Policy",
    eyebrow: "Policies",
    description: `How advertising works on ${site.name} and how we keep it separate from our journalism.`,
    intro: `How advertising works at ${site.name} and how we keep it separate from our journalism.`,
    updated: UPDATED,
    sections: [
      {
        id: "independence",
        title: "Editorial independence",
        body: [
          "Advertising does not influence what we report or how we report it. Advertisers have no say over editorial content, and we do not give advertisers advance notice of, or input into, our coverage.",
        ],
      },
      {
        id: "labelling",
        title: "Labelling",
        body: [
          "Advertisements are clearly distinguishable from editorial content. Any paid or sponsored content is labelled, for example as “Advertisement” or “Sponsored”, and is never presented as the work of our newsroom.",
        ],
      },
      {
        id: "no-pay-for-coverage",
        title: "No payment for coverage",
        body: [
          "We do not accept payment, gifts or other inducements in exchange for editorial coverage, and we do not sell links within our articles.",
        ],
      },
      {
        id: "what-we-accept",
        title: "What we accept",
        body: [
          "We reserve the right to decline or remove any advertisement. We do not accept advertising that:",
          {
            list: [
              "is false, deceptive or misleading",
              "promotes illegal products or services",
              "is hateful, discriminatory or promotes violence",
              "is sexually explicit",
              "exploits crises, tragedies or vulnerable people",
              "imitates our articles or site design so that it could be mistaken for editorial content",
            ],
          },
        ],
      },
      {
        id: "third-party",
        title: "Third-party advertising and data",
        body: [
          "Advertisements may be delivered by third-party providers, who may use cookies and similar technologies to show relevant advertising and measure its performance. Our [[/privacy-policy|Privacy Policy]] explains how data is handled and how you can manage your choices.",
        ],
      },
      {
        id: "advertise",
        title: "Advertising enquiries",
        body: [
          `To enquire about advertising on ${site.name}, email ${mail} with “Advertising” in the subject line.`,
        ],
      },
      {
        id: "report-an-ad",
        title: "Reporting an advertisement",
        body: [
          `If you see an advertisement that concerns you, email ${mail} with the web address of the page and, if possible, a screenshot, and we will review it.`,
        ],
      },
    ],
  },

  "privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Legal",
    description: `How ${site.name} collects, uses and protects personal information when you visit ${site.url.replace(/^https?:\/\//, "")} or contact us.`,
    intro: `This policy explains what personal information ${site.name} collects, how we use it, and the choices you have.`,
    updated: UPDATED,
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        body: [
          `${site.name} operates ${site.url.replace(/^https?:\/\//, "")} (the “Site”). In this policy, “we”, “us” and “our” refer to ${site.name}. You can contact us about privacy at ${mail}.`,
        ],
      },
      {
        id: "information-we-collect",
        title: "Information we collect",
        body: [
          {
            list: [
              "Information you give us: for example your email address if you subscribe to a newsletter, and the content of any message, tip, correction request or other enquiry you send us.",
              "Information collected automatically: such as your IP address, device and browser type, pages viewed, referring pages, and the date and time of your visit.",
              "Cookies and similar technologies: small files or identifiers that help the Site work, remember settings, measure usage and, where we use advertising, show and measure ads.",
            ],
          },
        ],
      },
      {
        id: "how-we-use",
        title: "How we use information",
        body: [
          {
            list: [
              "To operate, maintain and secure the Site",
              "To send newsletters or updates you have asked for",
              "To respond to your messages and requests",
              "To understand how the Site is used and improve our journalism and services",
              "To show and measure advertising",
              "To comply with legal obligations and protect our rights",
            ],
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies and your choices",
        body: [
          "You can control cookies through your browser settings, including blocking or deleting them. Some parts of the Site may not work properly without certain cookies. Where required by law, we ask for your consent before using non-essential cookies.",
        ],
      },
      {
        id: "newsletters",
        title: "Newsletters",
        body: [
          "If you subscribe to a newsletter, we use your email address to send it. You can unsubscribe at any time using the link in any email we send.",
        ],
      },
      {
        id: "sharing",
        title: "How we share information",
        body: [
          "We do not sell your personal information. We may share information with service providers who help us run the Site, such as hosting, analytics, email delivery and advertising partners, and they may only use it to provide services to us. We may also disclose information where required by law or to protect the rights, safety or security of our readers, our staff or the Site.",
        ],
      },
      {
        id: "retention",
        title: "How long we keep information",
        body: [
          "We keep personal information only as long as needed for the purposes described in this policy, or as required by law. Newsletter details are kept until you unsubscribe.",
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: [
          `Depending on where you live, you may have the right to access, correct or delete your personal information, to object to or restrict certain uses, to withdraw consent, and to receive a copy of your information. To exercise these rights, email ${mail}. We may need to verify your identity before acting on a request.`,
        ],
      },
      {
        id: "children",
        title: "Children",
        body: [
          "The Site is not directed at children under 13, and we do not knowingly collect personal information from them. If you believe a child has given us personal information, please contact us and we will delete it.",
        ],
      },
      {
        id: "security",
        title: "Security and international transfers",
        body: [
          "We take reasonable measures to protect personal information, but no online service can be completely secure. Our service providers may process information in countries other than your own, in which case we take steps to ensure appropriate protections are in place.",
        ],
      },
      {
        id: "links",
        title: "Links to other sites",
        body: [
          "Our articles may link to third-party websites. We are not responsible for their privacy practices, and we encourage you to read their policies.",
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          "We may update this policy from time to time. The “last updated” date at the top of this page shows when it last changed. If we make significant changes, we will take reasonable steps to let you know.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        body: [
          `Questions about this policy or your information can be sent to ${mail}.`,
        ],
      },
    ],
  },

  legal: {
    title: "Legal",
    eyebrow: "Legal",
    description: `Terms of use, copyright and legal information for ${site.name} and ${site.url.replace(/^https?:\/\//, "")}.`,
    intro: `The terms that apply when you use ${site.name}, plus copyright and other legal information.`,
    updated: UPDATED,
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of these terms",
        body: [
          `By accessing or using ${site.url.replace(/^https?:\/\//, "")} (the “Site”), you agree to these terms and to our [[/privacy-policy|Privacy Policy]]. If you do not agree, please do not use the Site.`,
        ],
      },
      {
        id: "use-of-site",
        title: "Use of the Site",
        body: [
          "You may use the Site for lawful, personal and non-commercial purposes. You agree not to:",
          {
            list: [
              "interfere with or disrupt the Site or its security",
              "use automated tools to scrape, copy or harvest content without our written permission",
              "attempt to gain unauthorised access to the Site or its systems",
              "use the Site in any way that breaks the law or infringes the rights of others",
            ],
          },
        ],
      },
      {
        id: "copyright",
        title: "Copyright and intellectual property",
        body: [
          `Unless otherwise stated, the articles, graphics, logos and other content on the Site are owned by or licensed to ${site.name} and protected by copyright and other laws. You may share links to our articles and quote short excerpts with attribution and a link back to the original. Any other reproduction, distribution or commercial use requires our prior written permission.`,
          `Some images or materials may belong to third parties and are used under licence or permission. To ask about permissions or to report a copyright concern, email ${mail}.`,
        ],
      },
      {
        id: "submissions",
        title: "Messages and submissions",
        body: [
          "If you send us tips, letters, comments or other material, you confirm that you have the right to share it. You allow us to use, edit and publish it, with attribution where appropriate, in connection with our journalism, unless you tell us otherwise when you send it.",
        ],
      },
      {
        id: "third-party-links",
        title: "Third-party links and content",
        body: [
          "The Site may link to or include content from third parties. We do not control and are not responsible for third-party sites, advertisements or services.",
        ],
      },
      {
        id: "disclaimer",
        title: "Information only",
        body: [
          "Our content is provided for general information. It is not legal, financial, medical or other professional advice, and you should not rely on it as such. See also our [[/finance-coverage-standards|Finance Coverage Standards]]. We work to keep our reporting accurate and up to date, but we do not guarantee that the Site will be free of errors or interruptions.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        body: [
          `To the fullest extent permitted by law, ${site.name} is not liable for any indirect or consequential loss arising from your use of, or inability to use, the Site or its content. Nothing in these terms limits liability that cannot be excluded by law.`,
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        body: [
          "We may update these terms from time to time. Continued use of the Site after changes are posted means you accept the updated terms.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        body: [`For legal enquiries, email ${mail}.`],
      },
    ],
  },

  contact: {
    title: "Contact",
    eyebrow: "Get in touch",
    description: `Contact the ${site.name} newsroom for story tips, corrections, advertising, privacy requests and general enquiries.`,
    intro: `Reach the ${site.name} team. Choose the topic that fits best so your message gets to the right place.`,
    sections: [
      {
        id: "write-to-us",
        title: "Write to us",
        body: [
          {
            mail: [
              { label: "News tips and story ideas", subject: "News tip", text: "Have information we should know about? Tell us what you know and how we can reach you." },
              { label: "Corrections and right of reply", subject: "Correction", text: "Spotted a mistake or want to respond to our reporting? Include the article link and details. See our [[/corrections-policy|Corrections Policy]]." },
              { label: "Advertising", subject: "Advertising", text: "Interested in advertising with us? See our [[/advertising-policy|Advertising Policy]]." },
              { label: "Privacy and data requests", subject: "Privacy request", text: "Questions about your data or a request to access or delete it. See our [[/privacy-policy|Privacy Policy]]." },
              { label: "General enquiries and feedback", subject: "Feedback", text: "Anything else — questions, feedback or suggestions about the site." },
            ],
          },
        ],
      },
      {
        id: "response-times",
        title: "What to expect",
        body: [
          "We read every message, but we cannot reply to all of them individually. We aim to acknowledge correction requests within two business days. Please do not send sensitive documents by email unless you have agreed a secure method with us first.",
        ],
      },
    ],
  },
};

// Order shown in the footer "Resources" list and the page side navigation.
export const resourceLinks = [
  { href: "/about", label: "About Us" },
  { href: "/authors", label: "Authors" },
  { href: "/editorial-policy", label: infoPages["editorial-policy"].title },
  { href: "/corrections-policy", label: infoPages["corrections-policy"].title },
  { href: "/source-methodology", label: infoPages["source-methodology"].title },
  { href: "/finance-coverage-standards", label: infoPages["finance-coverage-standards"].title },
  { href: "/advertising-policy", label: infoPages["advertising-policy"].title },
  { href: "/privacy-policy", label: infoPages["privacy-policy"].title },
  { href: "/legal", label: infoPages.legal.title },
  { href: "/contact", label: infoPages.contact.title },
];

export const infoPagePaths = resourceLinks.map((link) => link.href);

export function pageMetadata(slug) {
  const page = infoPages[slug];
  return {
    title: page.title,
    description: page.description,
    ...pageSocialMetadata(page.title, page.description, `/${slug}`),
  };
}

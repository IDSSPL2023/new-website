import knowledge from "../data/idsspl-knowledge.json" with { type: "json" };
import { prepareChatHistory, type AdvisorMessage } from "./idsspl-chat-history.ts";

type SiteLanguage = "en" | "hi" | "mr" | "ta" | "gu";

const OUT_OF_SCOPE = knowledge.responsePolicy.outOfScopeReply;
const EMAIL = knowledge.company.contact.email;
const MAX_WORDS = 88;

const stopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "can",
  "do",
  "does",
  "for",
  "from",
  "give",
  "how",
  "i",
  "idsspl",
  "in",
  "is",
  "it",
  "me",
  "of",
  "on",
  "please",
  "tell",
  "that",
  "the",
  "this",
  "to",
  "what",
  "which",
  "who",
  "with",
  "you",
  "your",
]);

const socialReplies: Record<SiteLanguage, { hello: string; thanks: string; bye: string }> = {
  en: {
    hello: "Hello! Ask me about IDSSPL, its banking products, leadership or services.",
    thanks: "You’re welcome. I can help with more IDSSPL or banking-product questions.",
    bye: "Goodbye! Contact info@idsspl.com if you need help from the IDSSPL team.",
  },
  hi: {
    hello: "नमस्ते! IDSSPL, उसके बैंकिंग उत्पादों, नेतृत्व या सेवाओं के बारे में पूछें।",
    thanks: "आपका स्वागत है। मैं IDSSPL और उसके बैंकिंग उत्पादों के बारे में मदद कर सकता हूँ।",
    bye: "धन्यवाद! IDSSPL टीम से सहायता के लिए info@idsspl.com पर संपर्क करें।",
  },
  mr: {
    hello: "नमस्कार! IDSSPL, तिची बँकिंग उत्पादने, नेतृत्व किंवा सेवांबद्दल विचारा.",
    thanks: "स्वागत आहे. मी IDSSPL आणि तिच्या बँकिंग उत्पादनांबद्दल मदत करू शकतो.",
    bye: "धन्यवाद! IDSSPL टीमच्या मदतीसाठी info@idsspl.com वर संपर्क करा.",
  },
  ta: {
    hello: "வணக்கம்! IDSSPL, அதன் வங்கித் தயாரிப்புகள், தலைமை அல்லது சேவைகள் பற்றி கேளுங்கள்.",
    thanks: "நன்றி. IDSSPL மற்றும் அதன் வங்கித் தயாரிப்புகள் குறித்து உதவ முடியும்.",
    bye: "நன்றி! IDSSPL குழுவின் உதவிக்கு info@idsspl.com ஐ தொடர்புகொள்ளவும்.",
  },
  gu: {
    hello: "નમસ્તે! IDSSPL, તેની બેંકિંગ પ્રોડક્ટ્સ, નેતૃત્વ અથવા સેવાઓ વિશે પૂછો.",
    thanks: "આભાર. હું IDSSPL અને તેની બેંકિંગ પ્રોડક્ટ્સ વિશે મદદ કરી શકું છું.",
    bye: "આભાર! IDSSPL ટીમની મદદ માટે info@idsspl.com પર સંપર્ક કરો.",
  },
};

const productAliases: Record<string, string[]> = {
  "next-gen-ai-core-banking": [
    "cbs",
    "core banking",
    "ai core banking",
    "banking platform",
    "deposit",
    "loan",
  ],
  "npci-products": ["npci", "payment switch", "payment rail", "payments"],
  "digital-banking-products": [
    "digital banking",
    "internet banking",
    "mobile banking",
    "mobile baking",
    "whatsapp banking",
    "sms banking",
  ],
  "enterprise-solution": ["enterprise solution", "treasury", "reconciliation", "e kyc", "c kyc"],
  "merchant-management-solution": ["merchant management", "merchant onboarding", "qr code"],
  "card-management": ["card management", "debit card", "virtual card", "pin generation", "pin reset"],
};

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase("en")
    .replace(/e[ -]?kyc/g, "e kyc")
    .replace(/c[ -]?kyc/g, "c kyc")
    .replace(/mobile baking/g, "mobile banking")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function terms(value: string) {
  return normalize(value)
    .split(" ")
    .filter((term) => term.length > 1 && !stopWords.has(term));
}

function includesPhrase(query: string, phrase: string) {
  const normalizedPhrase = normalize(phrase);
  return (` ${query} `).includes(` ${normalizedPhrase} `);
}

function scoreText(query: string, text: string) {
  const searchable = normalize(text);
  return [...new Set(terms(query))].reduce(
    (score, term) => score + (searchable.includes(term) ? (term.length > 4 ? 2 : 1) : 0),
    0,
  );
}

function concise(value: string) {
  const compact = value.trim().replace(/\s+/g, " ");
  const words = compact.split(" ");
  if (words.length <= MAX_WORDS) return compact;
  const clipped = words.slice(0, MAX_WORDS).join(" ");
  const sentenceEnd = Math.max(clipped.lastIndexOf("."), clipped.lastIndexOf("!"));
  return sentenceEnd > clipped.length * 0.55 ? clipped.slice(0, sentenceEnd + 1) : `${clipped}…`;
}

function latestQuestion(messages: AdvisorMessage[]) {
  return prepareChatHistory(messages)
    .filter((message) => message.role === "user")
    .at(-1)?.content ?? "";
}

function contextualQuestion(messages: AdvisorMessage[]) {
  const userMessages = prepareChatHistory(messages).filter((message) => message.role === "user");
  const latest = userMessages.at(-1)?.content ?? "";
  if (
    userMessages.length > 1 &&
    /^(and |also |what about |what are (its|their) |tell me more|more|its |their |benefits?|features?|modules?|sub products?|how does it)/i.test(
      latest.trim(),
    )
  ) {
    return `${userMessages.at(-2)?.content ?? ""} ${latest}`;
  }
  return latest;
}

function matchPerson(query: string) {
  const people = [...knowledge.leadership, ...knowledge.team];
  const exactName = people.find((person) => includesPhrase(query, person.name));
  if (exactName) return exactName;

  const roleAliases: Record<string, string> = {
    ceo: "vinayak-more",
    cto: "cto",
    cmo: "cmo",
    cgto: "cgto",
    "vp operation": "operations-lead",
    "vp operations": "operations-lead",
    "ai automation head": "ai-automation-lead",
    "hr admin": "hr-admin",
  };
  const matchedRole = Object.entries(roleAliases).find(([alias]) => includesPhrase(query, alias));
  return matchedRole ? people.find((person) => person.id === matchedRole[1]) : undefined;
}

function matchProduct(query: string) {
  return knowledge.products
    .map((product) => {
      const aliases = [product.label, ...product.subProducts, ...(productAliases[product.id] ?? [])];
      const exact = aliases.reduce(
        (best, alias) => (includesPhrase(query, alias) ? Math.max(best, normalize(alias).length) : best),
        0,
      );
      const searchable = JSON.stringify({
        label: product.label,
        shortDescription: product.shortDescription,
        overview: product.overview,
        subProducts: product.subProducts,
        keyFeatures: product.keyFeatures,
        benefits: product.benefits,
        faqs: product.faqs,
      });
      return { product, score: exact ? 100 + exact : scoreText(query, searchable) };
    })
    .sort((a, b) => b.score - a.score)[0];
}

function bestFaq(query: string) {
  const faqs = [
    ...knowledge.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
    ...knowledge.products.flatMap((product) =>
      product.faqs.map((faq) => ({ question: faq.title, answer: faq.description })),
    ),
  ];
  return faqs
    .map((faq) => ({ ...faq, score: scoreText(query, faq.question) }))
    .sort((a, b) => b.score - a.score)[0];
}

function productAnswer(query: string, product: (typeof knowledge.products)[number]) {
  if (/\b(price|pricing|cost|license|licence|quotation|quote)\b/.test(query)) {
    return `Pricing for ${product.label} is not published. Contact ${EMAIL} with your institution type and requirements for the appropriate commercial details.`;
  }
  if (/\b(benefit|benefits|advantage|advantages|outcome|outcomes)\b/.test(query)) {
    return `${product.label} benefits include ${product.benefits
      .slice(0, 4)
      .map((item) => item.title)
      .join(", ")}. Published outcomes are indicative, not guaranteed.`;
  }
  if (/\b(feature|features|capability|capabilities)\b/.test(query)) {
    return `${product.label} includes ${product.keyFeatures
      .slice(0, 4)
      .map((item) => item.title)
      .join(", ")}.`;
  }
  if (/\b(module|modules|sub product|sub products|includes|components)\b/.test(query)) {
    return `${product.label} includes: ${product.subProducts.join(", ")}.`;
  }

  const subProduct = product.subProducts.find((item) => includesPhrase(query, item));
  if (subProduct) {
    return `IDSSPL supports ${subProduct} within its ${product.label} portfolio. ${product.shortDescription}`;
  }
  return `${product.label}: ${product.shortDescription} ${product.overview[0]}`;
}

/**
 * Answers from the approved website snapshot inside the visitor's browser.
 * This deliberately uses no remote AI service, API key, tracking call or paid model.
 */
export function answerFromWebsiteKnowledge(
  messages: AdvisorMessage[],
  language: SiteLanguage = "en",
) {
  const latest = latestQuestion(messages).trim();
  const query = normalize(contextualQuestion(messages));
  const copy = socialReplies[language] ?? socialReplies.en;
  if (!latest) return OUT_OF_SCOPE;

  if (/\b(password|otp|pin|cvv|api key|secret key)\b/.test(normalize(latest))) {
    return `For security, do not share passwords, OTPs, PINs, CVVs or API keys. For IDSSPL support, contact ${EMAIL}.`;
  }
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|नमस्ते|नमस्कार)[ !.]*$/i.test(latest))
    return copy.hello;
  if (/^(thanks|thank you|धन्यवाद)[ !.]*$/i.test(latest)) return copy.thanks;
  if (/^(bye|goodbye|see you)[ !.]*$/i.test(latest)) return copy.bye;

  const unrelatedTask =
    /\b(weather|temperature|recipe|movie|song|cricket|football|politics|prime minister|president|horoscope|joke|poem|essay|homework|stock price|share price|crypto)\b/.test(
      query,
    ) ||
    /\b(ignore|reveal|override|bypass)\b.*\b(instruction|prompt|rule|system)\b/.test(query);
  if (unrelatedTask) return OUT_OF_SCOPE;

  const person = matchPerson(query);
  if (person) {
    const description = "bio" in person ? person.bio : person.summary;
    return concise(`${person.name} is ${person.role} at IDSSPL. ${description}`);
  }

  if (/\b(leadership|leaders|management|directors)\b/.test(query)) {
    return concise(
      `IDSSPL leadership includes ${knowledge.leadership
        .map((person) => `${person.name} (${person.role})`)
        .join(", ")}.`,
    );
  }
  if (/\b(team|employees|people)\b/.test(query)) {
    return "IDSSPL's published team covers leadership, AI and automation, frontend and backend engineering, mobile engineering, data, design, support, operations, accounts, HR and infrastructure.";
  }

  if (/\b(email|phone|telephone|contact|office|address|location|located|demo)\b/.test(query)) {
    const contact = knowledge.company.contact;
    return concise(
      `Contact IDSSPL at ${contact.email} or ${contact.phone}. Registered office: ${contact.registeredOffice}. Corporate office: ${contact.corporateOffice}.`,
    );
  }
  if (/\b(mission|vision)\b/.test(query)) {
    return concise(`Mission: ${knowledge.company.mission} Vision: ${knowledge.company.vision}`);
  }
  if (/\b(certification|certifications|certified|iso|pci dss)\b/.test(query)) {
    return `IDSSPL lists ${knowledge.certifications
      .map((item) => `${item.title} (${item.description})`)
      .join(" and ")}.`;
  }
  if (/\b(customer|customers|client|clients|case study|case studies|implementation story)\b/.test(query)) {
    return concise(
      `IDSSPL publishes implementation outcomes for ${knowledge.publishedOutcomes
        .map((item) => item.institution)
        .join(", ")}. These are reported customer experiences, not guaranteed results.`,
    );
  }
  if (/\b(who can use|audience|institutions|designed for)\b/.test(query)) {
    return `IDSSPL serves ${knowledge.company.audiences.join(", ")}.`;
  }
  if (/\b(all products|product list|products offer|products have|what products|which products|services offer)\b/.test(query)) {
    return `IDSSPL offers six product families: ${knowledge.products
      .map((product) => product.label)
      .join(", ")}.`;
  }

  const faq = bestFaq(query);
  const productMatch = matchProduct(query);
  if (faq && faq.score >= 4 && !/\b(benefit|feature|module|sub product)\b/.test(query))
    return concise(faq.answer);
  if (productMatch && productMatch.score >= 4)
    return concise(productAnswer(query, productMatch.product));

  if (
    /\b(idsspl|company|business|banking technology|financial technology|fintech|what do you do|who are you)\b/.test(
      query,
    )
  ) {
    return concise(knowledge.company.summary);
  }

  const capability = knowledge.capabilities
    .map((item) => ({ ...item, score: scoreText(query, `${item.title} ${item.description}`) }))
    .sort((a, b) => b.score - a.score)[0];
  if (capability && capability.score >= 4) return concise(capability.description);

  return OUT_OF_SCOPE;
}

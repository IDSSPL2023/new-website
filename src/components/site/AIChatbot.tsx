"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  LoaderCircle,
  Mail,
  RotateCcw,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import aiBotMascot from "@/assets/idsspl-ai-bot.png";
import { ChatAIOrb } from "@/components/site/ChatAIOrb";
import { prepareChatHistory } from "@/lib/idsspl-chat-history";
import {
  getSavedSiteLanguage,
  isSiteLanguageCode,
  siteI18n,
  type SiteLanguageCode,
} from "@/lib/site-i18n";

const chatbotEndpoint = import.meta.env["VITE_CHATBOT_ENDPOINT"]?.trim();
const chatMessageEndpoint = chatbotEndpoint || (import.meta.env.DEV ? "/api/chat" : undefined);

const CHAT_STORAGE_KEY = "idsspl-chat-session-v2";
const MAX_STORED_MESSAGES = 18;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatLead = {
  name: string;
  organization: string;
  email: string;
  requirement: string;
  website: string;
};

type ChatCopy = {
  assistantName: string;
  online: string;
  launcher: string;
  close: string;
  reset: string;
  placeholder: string;
  send: string;
  typing: string;
  suggestions: string[];
  emptyTitle: string;
  emptyDescription: string;
  talkToExpert: string;
  downloadBrochure: string;
  powered: string;
  connectionError: string;
  rateLimitError: string;
  leadTitle: string;
  leadDescription: string;
  name: string;
  organization: string;
  email: string;
  requirement: string;
  consent: string;
  submit: string;
  submitting: string;
  success: string;
  cancel: string;
};

const chatCopy: Record<SiteLanguageCode, ChatCopy> = {
  en: {
    assistantName: "IDSSPL AI Advisor",
    online: "Banking technology advisor",
    launcher: "Ask IDSSPL AI",
    close: "Close assistant",
    reset: "Start a new conversation",
    placeholder: "Ask about products, payments or banking technology…",
    send: "Send message",
    typing: "IDSSPL AI Advisor is thinking",
    suggestions: [
      "Which IDSSPL product fits my bank?",
      "Tell me about AI Core Banking.",
      "How do you support NPCI payments?",
    ],
    emptyTitle: "Explore banking with AI",
    emptyDescription: "Ask a question or choose a suggestion below.",
    talkToExpert: "Talk to an expert",
    downloadBrochure: "Get brochure",
    powered: "AI answers may need expert confirmation.",
    rateLimitError: "Too many AI requests right now. Please wait a moment and try again.",
    connectionError:
      "I’m unable to reach the AI service right now. You can still connect with an IDSSPL expert below.",
    leadTitle: "Connect with an IDSSPL expert",
    leadDescription: "Share your requirement and our banking technology team will follow up.",
    name: "Full name",
    organization: "Organization",
    email: "Work email",
    requirement: "What would you like to solve?",
    consent: "I agree that IDSSPL may contact me about this enquiry.",
    submit: "Send enquiry",
    submitting: "Sending…",
    success: "Thank you. An IDSSPL expert will contact you shortly.",
    cancel: "Back to chat",
  },
  hi: {
    assistantName: "IDSSPL AI Advisor",
    online: "बैंकिंग तकनीक मार्गदर्शन",
    launcher: "IDSSPL AI से पूछें",
    close: "सहायक बंद करें",
    reset: "नई बातचीत शुरू करें",
    placeholder: "उत्पाद, भुगतान या बैंकिंग तकनीक के बारे में पूछें…",
    send: "संदेश भेजें",
    typing: "IDSSPL AI Advisor उत्तर तैयार कर रहा है",
    suggestions: [
      "मेरे बैंक के लिए कौन सा IDSSPL उत्पाद सही है?",
      "AI कोर बैंकिंग के बारे में बताएं।",
      "आप NPCI भुगतान को कैसे सपोर्ट करते हैं?",
    ],
    emptyTitle: "AI के साथ बैंकिंग को समझें",
    emptyDescription: "सवाल पूछें या नीचे दिए गए सुझावों में से चुनें।",
    talkToExpert: "विशेषज्ञ से बात करें",
    downloadBrochure: "ब्रोशर लें",
    powered: "AI उत्तरों की विशेषज्ञ पुष्टि आवश्यक हो सकती है।",
    rateLimitError: "अभी AI अनुरोधों की सीमा पूरी हो गई है। कृपया थोड़ा रुककर दोबारा कोशिश करें।",
    connectionError:
      "अभी AI सेवा से संपर्क नहीं हो पा रहा है। आप नीचे IDSSPL विशेषज्ञ से जुड़ सकते हैं।",
    leadTitle: "IDSSPL विशेषज्ञ से जुड़ें",
    leadDescription: "अपनी आवश्यकता साझा करें, हमारी टीम आपसे संपर्क करेगी।",
    name: "पूरा नाम",
    organization: "संस्था",
    email: "कार्य ईमेल",
    requirement: "आप क्या समाधान चाहते हैं?",
    consent: "मैं सहमत हूँ कि IDSSPL इस पूछताछ के बारे में मुझसे संपर्क कर सकता है।",
    submit: "पूछताछ भेजें",
    submitting: "भेजा जा रहा है…",
    success: "धन्यवाद। IDSSPL विशेषज्ञ शीघ्र आपसे संपर्क करेगा।",
    cancel: "चैट पर वापस जाएं",
  },
  mr: {
    assistantName: "IDSSPL AI Advisor",
    online: "बँकिंग तंत्रज्ञान मार्गदर्शन",
    launcher: "IDSSPL AI ला विचारा",
    close: "सहाय्यक बंद करा",
    reset: "नवीन संभाषण सुरू करा",
    placeholder: "उत्पादने, पेमेंट्स किंवा बँकिंग तंत्रज्ञानाबद्दल विचारा…",
    send: "संदेश पाठवा",
    typing: "IDSSPL AI Advisor उत्तर तयार करत आहे",
    suggestions: [
      "माझ्या बँकेसाठी कोणते IDSSPL उत्पादन योग्य आहे?",
      "AI कोअर बँकिंगबद्दल सांगा.",
      "तुम्ही NPCI पेमेंट्सला कसा सपोर्ट करता?",
    ],
    emptyTitle: "AI सोबत बँकिंग समजून घ्या",
    emptyDescription: "प्रश्न विचारा किंवा खालील सुचवलेला प्रश्न निवडा.",
    talkToExpert: "तज्ज्ञाशी बोला",
    downloadBrochure: "ब्रोशर मिळवा",
    powered: "AI उत्तरांसाठी तज्ज्ञ पुष्टी आवश्यक असू शकते.",
    rateLimitError:
      "सध्या AI विनंत्यांची मर्यादा पूर्ण झाली आहे. कृपया थोडे थांबून पुन्हा प्रयत्न करा.",
    connectionError: "सध्या AI सेवेशी संपर्क होत नाही. तुम्ही खाली IDSSPL तज्ज्ञाशी जोडू शकता.",
    leadTitle: "IDSSPL तज्ज्ञाशी जोडा",
    leadDescription: "तुमची गरज सांगा; आमची बँकिंग तंत्रज्ञान टीम संपर्क करेल.",
    name: "पूर्ण नाव",
    organization: "संस्था",
    email: "कामाचा ईमेल",
    requirement: "तुम्हाला कोणती समस्या सोडवायची आहे?",
    consent: "या चौकशीबद्दल IDSSPL ने माझ्याशी संपर्क साधण्यास मी सहमत आहे.",
    submit: "चौकशी पाठवा",
    submitting: "पाठवत आहे…",
    success: "धन्यवाद. IDSSPL तज्ज्ञ लवकरच तुमच्याशी संपर्क साधेल.",
    cancel: "चॅटवर परत जा",
  },
  ta: {
    assistantName: "IDSSPL AI Advisor",
    online: "வங்கி தொழில்நுட்ப வழிகாட்டல்",
    launcher: "IDSSPL AI-யிடம் கேளுங்கள்",
    close: "உதவியாளரை மூடு",
    reset: "புதிய உரையாடலைத் தொடங்கு",
    placeholder: "தயாரிப்புகள், பணப்பரிவர்த்தனை அல்லது வங்கி தொழில்நுட்பம் பற்றி கேளுங்கள்…",
    send: "செய்தி அனுப்பு",
    typing: "IDSSPL AI Advisor பதிலைத் தயாரிக்கிறது",
    suggestions: [
      "என் வங்கிக்கு எந்த IDSSPL தயாரிப்பு பொருத்தமானது?",
      "AI கோர் பேங்கிங் பற்றி சொல்லுங்கள்.",
      "NPCI பணப்பரிவர்த்தனைகளை எவ்வாறு ஆதரிக்கிறீர்கள்?",
    ],
    emptyTitle: "AI உடன் வங்கித் தொழில்நுட்பத்தை அறியுங்கள்",
    emptyDescription: "கேள்வி கேளுங்கள் அல்லது கீழே உள்ள பரிந்துரையைத் தேர்ந்தெடுங்கள்.",
    talkToExpert: "நிபுணருடன் பேச",
    downloadBrochure: "பிரசுரத்தைப் பெற",
    powered: "AI பதில்களுக்கு நிபுணர் உறுதிப்படுத்தல் தேவைப்படலாம்.",
    rateLimitError:
      "தற்போது AI கோரிக்கைகளின் வரம்பை அடைந்துவிட்டோம். சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.",
    connectionError: "AI சேவையை இப்போது அணுக முடியவில்லை. கீழே IDSSPL நிபுணருடன் இணையலாம்.",
    leadTitle: "IDSSPL நிபுணருடன் இணையுங்கள்",
    leadDescription: "உங்கள் தேவையைப் பகிருங்கள்; எங்கள் குழு உங்களைத் தொடர்புகொள்ளும்.",
    name: "முழுப் பெயர்",
    organization: "நிறுவனம்",
    email: "பணி மின்னஞ்சல்",
    requirement: "நீங்கள் எதைத் தீர்க்க விரும்புகிறீர்கள்?",
    consent: "இந்த விசாரணை குறித்து IDSSPL என்னைத் தொடர்புகொள்ள சம்மதிக்கிறேன்.",
    submit: "விசாரணையை அனுப்பு",
    submitting: "அனுப்புகிறது…",
    success: "நன்றி. IDSSPL நிபுணர் விரைவில் தொடர்புகொள்வார்.",
    cancel: "அரட்டைக்குத் திரும்பு",
  },
  gu: {
    assistantName: "IDSSPL AI Advisor",
    online: "બેન્કિંગ ટેક્નોલોજી માર્ગદર્શન",
    launcher: "IDSSPL AI ને પૂછો",
    close: "સહાયક બંધ કરો",
    reset: "નવી વાતચીત શરૂ કરો",
    placeholder: "ઉત્પાદનો, પેમેન્ટ્સ અથવા બેન્કિંગ ટેક્નોલોજી વિશે પૂછો…",
    send: "સંદેશ મોકલો",
    typing: "IDSSPL AI Advisor જવાબ તૈયાર કરી રહ્યું છે",
    suggestions: [
      "મારી બેન્ક માટે કયું IDSSPL ઉત્પાદન યોગ્ય છે?",
      "AI કોર બેન્કિંગ વિશે જણાવો.",
      "તમે NPCI પેમેન્ટ્સને કેવી રીતે સપોર્ટ કરો છો?",
    ],
    emptyTitle: "AI સાથે બેન્કિંગને સમજો",
    emptyDescription: "પ્રશ્ન પૂછો અથવા નીચે આપેલા સૂચનોમાંથી પસંદ કરો.",
    talkToExpert: "નિષ્ણાત સાથે વાત કરો",
    downloadBrochure: "બ્રોશર મેળવો",
    powered: "AI જવાબોને નિષ્ણાત પુષ્ટિની જરૂર પડી શકે છે.",
    rateLimitError: "હાલ AI વિનંતીઓની મર્યાદા પહોંચી ગઈ છે. થોડી વાર રાહ જોઈને ફરી પ્રયાસ કરો.",
    connectionError:
      "હાલ AI સેવાનો સંપર્ક થઈ રહ્યો નથી. તમે નીચે IDSSPL નિષ્ણાત સાથે જોડાઈ શકો છો.",
    leadTitle: "IDSSPL નિષ્ણાત સાથે જોડાઓ",
    leadDescription: "તમારી જરૂરિયાત જણાવો; અમારી ટીમ તમારો સંપર્ક કરશે.",
    name: "પૂરું નામ",
    organization: "સંસ્થા",
    email: "કાર્ય ઇમેઇલ",
    requirement: "તમે શું ઉકેલવા માંગો છો?",
    consent: "આ પૂછપરછ અંગે IDSSPL મારો સંપર્ક કરી શકે તે માટે હું સંમત છું.",
    submit: "પૂછપરછ મોકલો",
    submitting: "મોકલી રહ્યા છીએ…",
    success: "આભાર. IDSSPL નિષ્ણાત ટૂંક સમયમાં તમારો સંપર્ક કરશે.",
    cancel: "ચેટ પર પાછા જાઓ",
  },
};

const initialLead: ChatLead = {
  name: "",
  organization: "",
  email: "",
  requirement: "",
  website: "",
};

const greetingLocales: Record<SiteLanguageCode, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  gu: "gu-IN",
};

function getVisitGreeting(language: SiteLanguageCode, date: Date) {
  const hour = date.getHours();
  const period = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const greetings: Record<
    SiteLanguageCode,
    Record<"morning" | "afternoon" | "evening", { salutation: string; message: string }>
  > = {
    en: {
      morning: { salutation: "Good morning", message: "Welcome to IDSSPL. How can I help?" },
      afternoon: {
        salutation: "Good afternoon",
        message: "Welcome to IDSSPL. How can I help?",
      },
      evening: { salutation: "Good evening", message: "Welcome to IDSSPL. How can I help?" },
    },
    hi: {
      morning: { salutation: "सुप्रभात", message: "IDSSPL में आपका स्वागत है। मैं कैसे मदद करूँ?" },
      afternoon: {
        salutation: "नमस्कार",
        message: "IDSSPL में आपका स्वागत है। मैं कैसे मदद करूँ?",
      },
      evening: {
        salutation: "शुभ संध्या",
        message: "IDSSPL में आपका स्वागत है। मैं कैसे मदद करूँ?",
      },
    },
    mr: {
      morning: { salutation: "शुभ सकाळ", message: "IDSSPL मध्ये स्वागत आहे. मी कशी मदत करू?" },
      afternoon: {
        salutation: "नमस्कार",
        message: "IDSSPL मध्ये स्वागत आहे. मी कशी मदत करू?",
      },
      evening: {
        salutation: "शुभ संध्याकाळ",
        message: "IDSSPL मध्ये स्वागत आहे. मी कशी मदत करू?",
      },
    },
    ta: {
      morning: {
        salutation: "காலை வணக்கம்",
        message: "IDSSPL-க்கு வரவேற்கிறோம். நான் எப்படி உதவலாம்?",
      },
      afternoon: {
        salutation: "மதிய வணக்கம்",
        message: "IDSSPL-க்கு வரவேற்கிறோம். நான் எப்படி உதவலாம்?",
      },
      evening: {
        salutation: "மாலை வணக்கம்",
        message: "IDSSPL-க்கு வரவேற்கிறோம். நான் எப்படி உதவலாம்?",
      },
    },
    gu: {
      morning: {
        salutation: "સુપ્રભાત",
        message: "IDSSPL માં આપનું સ્વાગત છે. હું કેવી રીતે મદદ કરું?",
      },
      afternoon: {
        salutation: "નમસ્કાર",
        message: "IDSSPL માં આપનું સ્વાગત છે. હું કેવી રીતે મદદ કરું?",
      },
      evening: {
        salutation: "શુભ સાંજ",
        message: "IDSSPL માં આપનું સ્વાગત છે. હું કેવી રીતે મદદ કરું?",
      },
    },
  };

  return {
    ...greetings[language][period],
    time: new Intl.DateTimeFormat(greetingLocales[language], {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
  };
}

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function ChatbotRobot({ className = "" }: { className?: string }) {
  return (
    <span className={`chatbot-robot-figure ${className}`} aria-hidden="true">
      <span className="chatbot-robot-thrust">
        <i />
        <i />
      </span>
      <img src={aiBotMascot} alt="" draggable={false} />
      <span className="chatbot-robot-eyes">
        <i />
        <i />
      </span>
    </span>
  );
}

function ChatWelcomeAnimation({ copy }: { copy: ChatCopy }) {
  return (
    <div className="chatbot-welcome">
      <div className="chatbot-ai-art" aria-hidden="true">
        <ChatAIOrb />
      </div>
      <h3>{copy.emptyTitle}</h3>
      <p>{copy.emptyDescription}</p>
    </div>
  );
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [showVisitGreeting, setShowVisitGreeting] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [language, setLanguage] = useState<SiteLanguageCode>("en");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState<ChatLead>(initialLead);
  const [leadConsent, setLeadConsent] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef("");
  const [historyReady, setHistoryReady] = useState(false);
  const chatRequestRef = useRef<AbortController | null>(null);
  const conversationVersionRef = useRef(0);
  const copy = chatCopy[language];
  const visibleSuggestions = messages.some((message) => message.role === "user")
    ? []
    : copy.suggestions;
  const visitGreeting = currentTime ? getVisitGreeting(language, currentTime) : null;

  useEffect(() => {
    const savedLanguage = getSavedSiteLanguage();
    setLanguage(savedLanguage);
    sessionIdRef.current = createId("chat");

    try {
      const saved = window.sessionStorage.getItem(CHAT_STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        const restored = parsed
          .filter(
            (item): item is ChatMessage =>
              item &&
              typeof item.id === "string" &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string" &&
              !!item.content.trim(),
          )
          .slice(-MAX_STORED_MESSAGES);
        const firstUser = restored.findIndex((item) => item.role === "user");
        setMessages(firstUser < 0 ? [] : restored.slice(firstUser));
      }
    } catch {
      setMessages([]);
    } finally {
      setHistoryReady(true);
    }

    const onLanguageChange = (nextCode: string) => {
      if (isSiteLanguageCode(nextCode)) setLanguage(nextCode);
    };

    siteI18n.on("languageChanged", onLanguageChange);
    return () => {
      siteI18n.off("languageChanged", onLanguageChange);
      chatRequestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    setCurrentTime(new Date());
    const clockTimer = window.setInterval(() => setCurrentTime(new Date()), 30_000);
    const revealTimer = window.setTimeout(() => setShowVisitGreeting(true), 1_250);
    const dismissTimer = window.setTimeout(() => setShowVisitGreeting(false), 10_500);

    return () => {
      window.clearInterval(clockTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(dismissTimer);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateGaze = (event: MouseEvent | PointerEvent) => {
      const launcher = root.querySelector<HTMLElement>(".chatbot-launcher");
      if (!launcher) return;
      const bounds = launcher.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height * 0.36;
      const gazeX = Math.max(-3, Math.min(3, (event.clientX - centerX) / 80));
      const gazeY = Math.max(-2.2, Math.min(2.2, (event.clientY - centerY) / 95));
      root.style.setProperty("--chatbot-gaze-x", `${gazeX}px`);
      root.style.setProperty("--chatbot-gaze-y", `${gazeY}px`);
    };

    const resetGaze = () => {
      root.style.setProperty("--chatbot-gaze-x", "0px");
      root.style.setProperty("--chatbot-gaze-y", "0px");
    };

    window.addEventListener("pointermove", updateGaze, { passive: true });
    window.addEventListener("mousemove", updateGaze, { passive: true });
    document.documentElement.addEventListener("mouseleave", resetGaze);
    return () => {
      window.removeEventListener("pointermove", updateGaze);
      window.removeEventListener("mousemove", updateGaze);
      document.documentElement.removeEventListener("mouseleave", resetGaze);
    };
  }, []);

  useEffect(() => {
    if (!historyReady) return;
    try {
      if (messages.length) {
        window.sessionStorage.setItem(
          CHAT_STORAGE_KEY,
          JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
        );
      } else {
        window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
      }
    } catch {
      /* Chat still works when browser storage is unavailable. */
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, historyReady]);

  useEffect(() => {
    if (!open) return;
    setShowVisitGreeting(false);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 240);
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, showLeadForm]);

  const resetConversation = () => {
    sessionIdRef.current = createId("chat");
    conversationVersionRef.current++;
    chatRequestRef.current?.abort();
    chatRequestRef.current = null;
    setIsTyping(false);
    setMessages([]);
    setDraft("");
    setShowLeadForm(false);
    setLead(initialLead);
    setLeadConsent(false);
    setLeadStatus("idle");
    try {
      window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
      /* Optional storage. */
    }
  };

  const sendMessage = async (content: string) => {
    const trimmed = content.trim().slice(0, 1200);
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = { id: createId("user"), role: "user", content: trimmed };
    const history = prepareChatHistory([...messages, userMessage]);
    const version = conversationVersionRef.current;
    const requestController = new AbortController();
    chatRequestRef.current = requestController;
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsTyping(true);

    let failureReply = copy.connectionError;
    try {
      if (!chatMessageEndpoint) throw new Error("The Gemini chat endpoint is not configured.");
      const response = await fetch(chatMessageEndpoint, {
        method: "POST",
        signal: AbortSignal.any([requestController.signal, AbortSignal.timeout(42_000)]),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "chatbot_message",
          sessionId: sessionIdRef.current,
          language,
          sourcePath: `${window.location.pathname}${window.location.hash}`,
          pageTitle: document.title,
          messages: history.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent.slice(0, 1500),
          })),
          website: "",
        }),
      });
      if (response.status === 429) failureReply = copy.rateLimitError;
      const payload = (await response.json().catch(() => null)) as { reply?: string } | null;
      if (!response.ok || typeof payload?.reply !== "string" || !payload.reply.trim())
        throw new Error(`Chat request failed: ${response.status}`);
      const reply = payload.reply;

      if (requestController.signal.aborted || version !== conversationVersionRef.current) return;
      setMessages((current) => [
        ...current,
        { id: createId("assistant"), role: "assistant", content: reply },
      ]);
    } catch (error) {
      if (requestController.signal.aborted || version !== conversationVersionRef.current) return;
      console.error("Unable to reach IDSSPL AI", error);
      setMessages((current) => [
        ...current,
        { id: createId("assistant"), role: "assistant", content: failureReply },
      ]);
    } finally {
      if (version === conversationVersionRef.current) {
        chatRequestRef.current = null;
        setIsTyping(false);
      }
    }
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (leadStatus === "submitting") return;
    setLeadStatus("submitting");

    try {
      if (chatbotEndpoint) {
        const response = await fetch(chatbotEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "chatbot_lead",
            sessionId: sessionIdRef.current,
            name: lead.name.trim(),
            organization: lead.organization.trim(),
            email: lead.email.trim().toLowerCase(),
            message: lead.requirement.trim(),
            consent: leadConsent,
            language,
            sourcePath: `${window.location.pathname}${window.location.hash}`,
            website: lead.website,
          }),
        });
        if (!response.ok) throw new Error(`Lead request failed: ${response.status}`);
      } else {
        throw new Error("No expert enquiry endpoint is configured; nothing was submitted.");
      }

      setLeadStatus("success");
      setMessages((current) => [
        ...current,
        { id: createId("assistant"), role: "assistant", content: copy.success },
      ]);
      window.setTimeout(() => setShowLeadForm(false), 900);
    } catch (error) {
      console.error("Unable to submit chatbot lead", error);
      setLeadStatus("error");
    }
  };

  return (
    <div ref={rootRef} className="idsspl-chatbot notranslate" translate="no">
      {showVisitGreeting && !open && visitGreeting && (
        <button
          type="button"
          className="chatbot-visit-greeting"
          aria-label={`${visitGreeting.salutation}. ${visitGreeting.message}`}
          onClick={() => {
            setShowVisitGreeting(false);
            setOpen(true);
          }}
        >
          <span className="chatbot-visit-greeting-copy">
            <strong>{visitGreeting.salutation}</strong>
            <span>{visitGreeting.message}</span>
          </span>
          <span className="chatbot-visit-greeting-time">
            <i aria-hidden="true" />
            {visitGreeting.time}
          </span>
        </button>
      )}
      <button
        type="button"
        className={`chatbot-launcher${open ? " is-open" : ""}`}
        aria-label={open ? copy.close : copy.launcher}
        aria-expanded={open}
        aria-controls="idsspl-ai-chatbot"
        onClick={() => {
          setShowVisitGreeting(false);
          setOpen((current) => !current);
        }}
      >
        <span className="chatbot-launcher-orbit" aria-hidden="true" />
        <span className="chatbot-launcher-icon" aria-hidden="true">
          <ChatbotRobot className="is-launcher" />
          {open && (
            <span className="chatbot-launcher-close">
              <X size={12} />
            </span>
          )}
        </span>
        <span className="chatbot-launcher-tooltip">{copy.assistantName}</span>
      </button>

      <div
        ref={panelRef}
        id="idsspl-ai-chatbot"
        className={`chatbot-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label={copy.assistantName}
        aria-hidden={!open}
      >
        <div className="chatbot-panel-grid" aria-hidden="true" />
        <header className="chatbot-header">
          <div className="chatbot-identity">
            <span className="chatbot-avatar" aria-hidden="true">
              <ChatbotRobot className="is-avatar" />
              <i />
            </span>
            <span>
              <strong>{copy.assistantName}</strong>
              <small>
                <i aria-hidden="true" />
                {copy.online}
              </small>
            </span>
          </div>
          <div className="chatbot-header-actions">
            <button
              type="button"
              onClick={resetConversation}
              aria-label={copy.reset}
              title={copy.reset}
            >
              <RotateCcw size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setOpen(false)} aria-label={copy.close}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </header>

        {showLeadForm ? (
          <form className="chatbot-lead-form" onSubmit={handleLeadSubmit}>
            <div className="chatbot-lead-heading">
              <span aria-hidden="true">
                <Sparkles size={16} />
              </span>
              <div>
                <h3>{copy.leadTitle}</h3>
                <p>{copy.leadDescription}</p>
              </div>
            </div>

            <label className="chatbot-field">
              <span>{copy.name}</span>
              <span className="chatbot-input-wrap">
                <UserRound size={15} aria-hidden="true" />
                <input
                  value={lead.name}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, name: event.target.value }))
                  }
                  autoComplete="name"
                  required
                />
              </span>
            </label>
            <label className="chatbot-field">
              <span>{copy.organization}</span>
              <span className="chatbot-input-wrap">
                <Building2 size={15} aria-hidden="true" />
                <input
                  value={lead.organization}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, organization: event.target.value }))
                  }
                  autoComplete="organization"
                  required
                />
              </span>
            </label>
            <label className="chatbot-field">
              <span>{copy.email}</span>
              <span className="chatbot-input-wrap">
                <Mail size={15} aria-hidden="true" />
                <input
                  type="email"
                  value={lead.email}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, email: event.target.value }))
                  }
                  autoComplete="email"
                  required
                />
              </span>
            </label>
            <label className="chatbot-field">
              <span>{copy.requirement}</span>
              <textarea
                value={lead.requirement}
                onChange={(event) =>
                  setLead((current) => ({ ...current, requirement: event.target.value }))
                }
                minLength={10}
                maxLength={900}
                rows={4}
                required
              />
            </label>
            <label className="sr-only" aria-hidden="true">
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={lead.website}
                onChange={(event) =>
                  setLead((current) => ({ ...current, website: event.target.value }))
                }
              />
            </label>
            <label className="chatbot-consent">
              <input
                type="checkbox"
                checked={leadConsent}
                onChange={(event) => setLeadConsent(event.target.checked)}
                required
              />
              <span>{copy.consent}</span>
            </label>
            <button
              type="submit"
              className="chatbot-lead-submit"
              disabled={leadStatus === "submitting" || leadStatus === "success"}
            >
              {leadStatus === "submitting" ? (
                <>
                  <LoaderCircle className="animate-spin" size={16} aria-hidden="true" />
                  {copy.submitting}
                </>
              ) : leadStatus === "success" ? (
                <>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {copy.success}
                </>
              ) : (
                <>
                  {copy.submit}
                  <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
            {leadStatus === "error" && <p className="chatbot-form-error">{copy.connectionError}</p>}
            <button
              type="button"
              className="chatbot-back-button"
              onClick={() => setShowLeadForm(false)}
            >
              {copy.cancel}
            </button>
          </form>
        ) : (
          <>
            <div
              className="chatbot-messages"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {open && historyReady && messages.length === 0 && (
                <ChatWelcomeAnimation copy={copy} />
              )}
              {messages.map((message) => (
                <div key={message.id} className={`chatbot-message is-${message.role}`}>
                  {message.role === "assistant" && (
                    <span className="chatbot-message-mark" aria-hidden="true">
                      <Sparkles size={13} />
                    </span>
                  )}
                  <p>{message.content}</p>
                </div>
              ))}
              {isTyping && (
                <div className="chatbot-message is-assistant is-typing" aria-label={copy.typing}>
                  <span className="chatbot-message-mark" aria-hidden="true">
                    <Sparkles size={13} />
                  </span>
                  <span className="chatbot-typing-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {historyReady && visibleSuggestions.length > 0 && (
              <div className="chatbot-suggestions" aria-label="Suggested questions">
                {visibleSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={isTyping}
                    onClick={() => void sendMessage(suggestion)}
                  >
                    {suggestion}
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}

            <div className="chatbot-quick-actions">
              <button type="button" onClick={() => setShowLeadForm(true)}>
                <UserRound size={14} aria-hidden="true" />
                {copy.talkToExpert}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  window.setTimeout(
                    () => window.dispatchEvent(new CustomEvent("idsspl:open-brochure")),
                    180,
                  );
                }}
              >
                <Download size={14} aria-hidden="true" />
                {copy.downloadBrochure}
              </button>
            </div>

            <div className="chatbot-composer">
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                rows={1}
                maxLength={1200}
                disabled={isTyping}
              />
              <button
                type="button"
                aria-label={copy.send}
                disabled={!draft.trim() || isTyping}
                onClick={() => void sendMessage(draft)}
              >
                {isTyping ? (
                  <LoaderCircle className="animate-spin" size={17} aria-hidden="true" />
                ) : (
                  <Send size={17} aria-hidden="true" />
                )}
              </button>
            </div>
            <p className="chatbot-disclaimer">{copy.powered}</p>
          </>
        )}
      </div>
    </div>
  );
}

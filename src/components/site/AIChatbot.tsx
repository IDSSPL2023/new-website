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
import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import aiBotMascot from "@/assets/idsspl-ai-bot.png";
import {
  getSavedSiteLanguage,
  isSiteLanguageCode,
  siteI18n,
  type SiteLanguageCode,
} from "@/lib/site-i18n";

const chatbotEndpoint = import.meta.env["VITE_CHATBOT_ENDPOINT"]?.trim();

const CHAT_STORAGE_KEY = "idsspl-chat-session-v1";
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
  greeting: string;
  placeholder: string;
  send: string;
  typing: string;
  suggestions: string[];
  exploreProducts: string;
  talkToExpert: string;
  downloadBrochure: string;
  powered: string;
  connectionError: string;
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
    assistantName: "IDSSPL AI Assistant",
    online: "Banking technology guidance",
    launcher: "Ask IDSSPL AI",
    close: "Close assistant",
    reset: "Start a new conversation",
    greeting:
      "Hello. I’m the IDSSPL AI Assistant. I can help you explore our banking products, compare capabilities, or connect you with the right expert.",
    placeholder: "Ask about products, payments or banking technology…",
    send: "Send message",
    typing: "IDSSPL AI is thinking",
    suggestions: [
      "Which IDSSPL product fits my bank?",
      "Tell me about AI Core Banking.",
      "How do you support NPCI payments?",
    ],
    exploreProducts: "Explore products",
    talkToExpert: "Talk to an expert",
    downloadBrochure: "Get brochure",
    powered: "AI answers may need expert confirmation.",
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
    assistantName: "IDSSPL AI सहायक",
    online: "बैंकिंग तकनीक मार्गदर्शन",
    launcher: "IDSSPL AI से पूछें",
    close: "सहायक बंद करें",
    reset: "नई बातचीत शुरू करें",
    greeting:
      "नमस्ते। मैं IDSSPL AI सहायक हूँ। मैं हमारे बैंकिंग उत्पादों, क्षमताओं और सही विशेषज्ञ से जुड़ने में आपकी सहायता कर सकता हूँ।",
    placeholder: "उत्पाद, भुगतान या बैंकिंग तकनीक के बारे में पूछें…",
    send: "संदेश भेजें",
    typing: "IDSSPL AI उत्तर तैयार कर रहा है",
    suggestions: [
      "मेरे बैंक के लिए कौन सा उत्पाद सही है?",
      "AI कोर बैंकिंग के बारे में बताएं।",
      "NPCI भुगतान समाधान कैसे काम करते हैं?",
    ],
    exploreProducts: "उत्पाद देखें",
    talkToExpert: "विशेषज्ञ से बात करें",
    downloadBrochure: "ब्रोशर लें",
    powered: "AI उत्तरों की विशेषज्ञ पुष्टि आवश्यक हो सकती है।",
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
    assistantName: "IDSSPL AI सहाय्यक",
    online: "बँकिंग तंत्रज्ञान मार्गदर्शन",
    launcher: "IDSSPL AI ला विचारा",
    close: "सहाय्यक बंद करा",
    reset: "नवीन संभाषण सुरू करा",
    greeting:
      "नमस्कार. मी IDSSPL AI सहाय्यक आहे. आमची बँकिंग उत्पादने समजून घेण्यासाठी आणि योग्य तज्ज्ञाशी जोडण्यासाठी मी मदत करू शकतो.",
    placeholder: "उत्पादने, पेमेंट्स किंवा बँकिंग तंत्रज्ञानाबद्दल विचारा…",
    send: "संदेश पाठवा",
    typing: "IDSSPL AI उत्तर तयार करत आहे",
    suggestions: [
      "माझ्या बँकेसाठी कोणते उत्पादन योग्य आहे?",
      "AI कोअर बँकिंगबद्दल सांगा.",
      "NPCI पेमेंट्सना तुम्ही कसे समर्थन देता?",
    ],
    exploreProducts: "उत्पादने पाहा",
    talkToExpert: "तज्ज्ञाशी बोला",
    downloadBrochure: "ब्रोशर मिळवा",
    powered: "AI उत्तरांसाठी तज्ज्ञ पुष्टी आवश्यक असू शकते.",
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
    assistantName: "IDSSPL AI உதவியாளர்",
    online: "வங்கி தொழில்நுட்ப வழிகாட்டல்",
    launcher: "IDSSPL AI-யிடம் கேளுங்கள்",
    close: "உதவியாளரை மூடு",
    reset: "புதிய உரையாடலைத் தொடங்கு",
    greeting:
      "வணக்கம். நான் IDSSPL AI உதவியாளர். எங்கள் வங்கி தயாரிப்புகளை அறியவும் சரியான நிபுணருடன் இணையவும் உதவுகிறேன்.",
    placeholder: "தயாரிப்புகள், பணப்பரிவர்த்தனை அல்லது வங்கி தொழில்நுட்பம் பற்றி கேளுங்கள்…",
    send: "செய்தி அனுப்பு",
    typing: "IDSSPL AI பதிலைத் தயாரிக்கிறது",
    suggestions: [
      "என் வங்கிக்கு எந்த தயாரிப்பு பொருந்தும்?",
      "AI கோர் பேங்கிங் பற்றி சொல்லுங்கள்.",
      "NPCI பணப்பரிவர்த்தனைகளை எவ்வாறு ஆதரிக்கிறீர்கள்?",
    ],
    exploreProducts: "தயாரிப்புகளைப் பார்க்க",
    talkToExpert: "நிபுணருடன் பேச",
    downloadBrochure: "பிரசுரத்தைப் பெற",
    powered: "AI பதில்களுக்கு நிபுணர் உறுதிப்படுத்தல் தேவைப்படலாம்.",
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
    assistantName: "IDSSPL AI સહાયક",
    online: "બેન્કિંગ ટેક્નોલોજી માર્ગદર્શન",
    launcher: "IDSSPL AI ને પૂછો",
    close: "સહાયક બંધ કરો",
    reset: "નવી વાતચીત શરૂ કરો",
    greeting:
      "નમસ્તે. હું IDSSPL AI સહાયક છું. અમારા બેન્કિંગ ઉત્પાદનો સમજવા અને યોગ્ય નિષ્ણાત સાથે જોડાવામાં હું મદદ કરી શકું છું.",
    placeholder: "ઉત્પાદનો, પેમેન્ટ્સ અથવા બેન્કિંગ ટેક્નોલોજી વિશે પૂછો…",
    send: "સંદેશ મોકલો",
    typing: "IDSSPL AI જવાબ તૈયાર કરી રહ્યું છે",
    suggestions: [
      "મારી બેન્ક માટે કયું ઉત્પાદન યોગ્ય છે?",
      "AI કોર બેન્કિંગ વિશે જણાવો.",
      "NPCI પેમેન્ટ્સને તમે કેવી રીતે સપોર્ટ કરો છો?",
    ],
    exploreProducts: "ઉત્પાદનો જુઓ",
    talkToExpert: "નિષ્ણાત સાથે વાત કરો",
    downloadBrochure: "બ્રોશર મેળવો",
    powered: "AI જવાબોને નિષ્ણાત પુષ્ટિની જરૂર પડી શકે છે.",
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

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getLocalPreviewReply(message: string, language: SiteLanguageCode) {
  const normalized = message.toLocaleLowerCase();
  const copy = chatCopy[language];

  if (/npci|upi|imps|payment|पेमेंट|भुगतान|பணம்|પેમેન્ટ/.test(normalized)) {
    return language === "en"
      ? "IDSSPL’s NPCI portfolio supports secure, real-time transaction journeys across UPI, IMPS and connected payment operations. The platform is designed for resilient switching, monitoring, reconciliation and institutional-scale integration. For an exact fit, share the payment rails and transaction volumes you need to support."
      : `${copy.assistantName}: NPCI, UPI மற்றும் IMPS உள்ளிட்ட நிகழ்நேர பணப்பரிவர்த்தனை தேவைகளுக்கு IDSSPL ஒருங்கிணைந்த தீர்வுகளை வழங்குகிறது. உங்கள் தேவையைப் பகிர்ந்தால் சரியான தயாரிப்பை பரிந்துரைக்க முடியும்.`;
  }

  if (/core|bank|बैंक|बँक|வங்கி|બેન્ક|ai/.test(normalized)) {
    return language === "en"
      ? "The Next Gen AI Core Banking Solution is IDSSPL’s secure and scalable banking foundation. It brings core operations, connected modules, analytics and intelligent automation into one platform designed for financial institutions. Tell me whether you are modernising an existing CBS or planning a new implementation."
      : `${copy.assistantName}: IDSSPL चे Next Gen AI Core Banking Solution सुरक्षित, विस्तारक्षम आणि बुद्धिमान बँकिंग पायाभूत व्यवस्था देते. अधिक अचूक मार्गदर्शनासाठी तुमची सध्याची प्रणाली आणि उद्दिष्ट सांगा.`;
  }

  if (/security|secure|compliance|risk|सुरक्षा|பாதுகாப்பு|સુરક્ષા/.test(normalized)) {
    return language === "en"
      ? "IDSSPL applies security-first architecture across banking systems, including controlled access, auditability, resilient infrastructure and compliance-ready operations. The company also holds ISO/IEC 27001:2022 and PCI DSS v4.0.1 certifications."
      : `${copy.assistantName}: IDSSPL સુરક્ષા, નિયંત્રિત ઍક્સેસ, ઑડિટ અને અનુપાલન-તૈયાર આર્કિટેક્ચર પર ધ્યાન કેન્દ્રિત કરે છે.`;
  }

  return language === "en"
    ? "IDSSPL provides six connected product families: AI Core Banking, NPCI Products, Digital Banking, Enterprise Solutions, Merchant Management and Card Management. Tell me about your institution and the outcome you need, and I’ll narrow down the best starting point."
    : `${copy.greeting} ${copy.talkToExpert} विकल्पातून तुम्ही तुमची गरज थेट आमच्या टीमसोबतही शेअर करू शकता.`;
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

export function AIChatbot() {
  const [open, setOpen] = useState(false);
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
  const copy = chatCopy[language];

  useEffect(() => {
    const savedLanguage = getSavedSiteLanguage();
    setLanguage(savedLanguage);
    sessionIdRef.current = createId("chat");

    try {
      const saved = window.sessionStorage.getItem(CHAT_STORAGE_KEY);
      const parsed = saved ? (JSON.parse(saved) as ChatMessage[]) : [];
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed.slice(-MAX_STORED_MESSAGES));
      else
        setMessages([
          {
            id: createId("assistant"),
            role: "assistant",
            content: chatCopy[savedLanguage].greeting,
          },
        ]);
    } catch {
      setMessages([
        { id: createId("assistant"), role: "assistant", content: chatCopy[savedLanguage].greeting },
      ]);
    }

    const onLanguageChange = (nextCode: string) => {
      if (!isSiteLanguageCode(nextCode)) return;
      setLanguage(nextCode);
      setMessages((current) => {
        if (current.length > 1) return current;
        return [
          { id: createId("assistant"), role: "assistant", content: chatCopy[nextCode].greeting },
        ];
      });
    };

    siteI18n.on("languageChanged", onLanguageChange);
    return () => siteI18n.off("languageChanged", onLanguageChange);
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
    if (!messages.length) return;
    window.sessionStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
    );
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!open) return;
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

  const visibleSuggestions = useMemo(
    () =>
      messages.filter((message) => message.role === "user").length === 0 ? copy.suggestions : [],
    [copy.suggestions, messages],
  );

  const resetConversation = () => {
    sessionIdRef.current = createId("chat");
    setMessages([{ id: createId("assistant"), role: "assistant", content: copy.greeting }]);
    setDraft("");
    setShowLeadForm(false);
    setLead(initialLead);
    setLeadConsent(false);
    setLeadStatus("idle");
    window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
  };

  const sendMessage = async (content: string) => {
    const trimmed = content.trim().slice(0, 1200);
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = { id: createId("user"), role: "user", content: trimmed };
    const history = [...messages, userMessage].slice(-12);
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsTyping(true);

    try {
      let reply = "";
      if (chatbotEndpoint) {
        const response = await fetch(chatbotEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "chatbot_message",
            sessionId: sessionIdRef.current,
            language,
            sourcePath: `${window.location.pathname}${window.location.hash}`,
            pageTitle: document.title,
            messages: history.map(({ role, content: messageContent }) => ({
              role,
              content: messageContent,
            })),
            website: "",
          }),
        });
        const payload = (await response.json().catch(() => null)) as { reply?: string } | null;
        if (!response.ok || !payload?.reply)
          throw new Error(`Chat request failed: ${response.status}`);
        reply = payload.reply;
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 650));
        reply = getLocalPreviewReply(trimmed, language);
      }

      setMessages((current) => [
        ...current,
        { id: createId("assistant"), role: "assistant", content: reply },
      ]);
    } catch (error) {
      console.error("Unable to reach IDSSPL AI", error);
      setMessages((current) => [
        ...current,
        { id: createId("assistant"), role: "assistant", content: copy.connectionError },
      ]);
    } finally {
      setIsTyping(false);
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
        await new Promise((resolve) => window.setTimeout(resolve, 550));
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
      <button
        type="button"
        className={`chatbot-launcher${open ? " is-open" : ""}`}
        aria-label={open ? copy.close : copy.launcher}
        aria-expanded={open}
        aria-controls="idsspl-ai-chatbot"
        onClick={() => setOpen((current) => !current)}
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
        <span className="chatbot-launcher-tooltip">AI Bot</span>
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

            {visibleSuggestions.length > 0 && (
              <div className="chatbot-suggestions" aria-label="Suggested questions">
                {visibleSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                  >
                    {suggestion}
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}

            <div className="chatbot-quick-actions">
              <button
                type="button"
                onClick={() => void sendMessage(copy.suggestions[0] ?? "Products")}
              >
                <Sparkles size={14} aria-hidden="true" />
                {copy.exploreProducts}
              </button>
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

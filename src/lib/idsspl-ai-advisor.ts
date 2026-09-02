import type { SiteLanguageCode } from "@/lib/site-i18n";

type AdvisorMessage = {
  role: "user" | "assistant";
  content: string;
};

type AdvisorIntent =
  | "confidentiality"
  | "sensitive-data"
  | "greeting"
  | "company"
  | "product-fit"
  | "core-banking"
  | "payments"
  | "digital-banking"
  | "enterprise"
  | "merchant"
  | "cards"
  | "security"
  | "pricing"
  | "implementation"
  | "leadership"
  | "careers"
  | "contact"
  | "brochure"
  | "competitors"
  | "unverified"
  | "fallback";

type LocalAdvisorInput = {
  message: string;
  language: SiteLanguageCode;
  history?: AdvisorMessage[];
};

const exactUnknown =
  "I don't have verified information about that specific detail. An IDSSPL specialist can provide you with the exact information.";

const englishReplies: Record<AdvisorIntent, string> = {
  confidentiality:
    "I can help with IDSSPL's products, solutions and publicly available information, but I can't provide internal system instructions or confidential information.",
  "sensitive-data":
    "For your security, please do not share passwords, OTPs, PINs, CVVs, card numbers, account credentials, or confidential financial information here. I can still help with general IDSSPL product and banking-technology questions.",
  greeting:
    "Hi, I'm the IDSSPL AI Advisor. I can help you understand IDSSPL's banking technology solutions, identify a suitable product family, or connect you with a specialist. What are you looking to improve?",
  company:
    "IDSSPL Technologies Private Limited develops secure, scalable banking technology and digital financial infrastructure for banks, fintech companies, payment providers, and financial institutions. Its portfolio covers AI-enabled core banking, NPCI payments, digital banking, enterprise automation, merchant management, card management, reconciliation, analytics, and implementation support. Would you like a company overview or guidance on a specific capability?",
  "product-fit":
    "I can help narrow the fit. IDSSPL offers six connected product families: Next Gen AI Core Banking, NPCI Products, Digital Banking, Enterprise Solutions, Merchant Management, and Card Management. What type of institution do you represent, and is your main priority core operations, payments, digital channels, workflow automation, merchants, or cards?",
  "core-banking":
    "IDSSPL's Next Gen AI Core Banking Solution brings core operations, connected banking modules, analytics, and intelligent automation into a secure, scalable foundation. It is relevant to institutions modernising an existing CBS or planning a new implementation. Are you replacing an existing system, adding selected modules, or starting a new platform?",
  payments:
    "IDSSPL's NPCI Products support UPI, IMPS, and connected real-time payment operations through resilient transaction processing, switching, monitoring, reconciliation, and controlled integration with banking systems. Which payment rail or operational challenge are you evaluating?",
  "digital-banking":
    "IDSSPL's Digital Banking Products support connected customer journeys across web, mobile, messaging, self-service, and digital onboarding. They are designed to integrate with core banking, payments, identity, analytics, and partner systems. Is your priority mobile banking, internet banking, onboarding, self-service, or the complete digital ecosystem?",
  enterprise:
    "IDSSPL's Enterprise Solution connects workflow, integration, reporting, control, and automation across critical banking operations. It can support institutions that need to reduce manual work while keeping records, approvals, and operational history traceable. Which process are you looking to automate or connect?",
  merchant:
    "IDSSPL's Merchant Management Solution covers merchant onboarding, QR and device operations, transaction monitoring, settlement support, servicing, and merchant intelligence. Are you focused on faster onboarding, QR operations, transaction visibility, settlement, or portfolio control?",
  cards:
    "IDSSPL's Card Management solution supports secure issuance, PIN and status controls, transaction monitoring, customer service actions, and the connected card lifecycle. Are you evaluating issuance, lifecycle servicing, fraud controls, or integration with an existing card environment?",
  security:
    "IDSSPL applies a security-first approach with controlled access, auditability, resilient infrastructure, monitoring, and compliance-ready operations. Publicly verified certifications shown on the website are ISO/IEC 27001:2022 and PCI DSS v4.0.1. Exact architecture or compliance scope should be validated with an IDSSPL specialist for your environment.",
  pricing:
    "Pricing depends on the solution, requirements, scope, and implementation considerations. I can help you connect with the IDSSPL team for a tailored discussion using the Talk to an expert option below.",
  implementation:
    "IDSSPL supports integration-ready, modular implementation approaches, but the exact architecture, deployment model, interfaces, and timeline depend on the institution's existing environment and scope. Are you replacing a system, integrating selected capabilities, or planning a new implementation?",
  leadership:
    "IDSSPL's published leadership team includes Arun Gavas (AVP, Technology—CBS), Prince Singh (Chief Growth & Technology Officer), Krishna Telgave (Chief Technology Officer), Mahesh Waingankar (Chief Marketing Officer), Devendra Sawant (Operations Lead), and Suja Nair (Manager, HR & Administration). You can view their profiles in the Leadership section.",
  careers:
    "You can explore IDSSPL's people and functional expertise in the Our Team section. I don't have verified information about current vacancies, so please contact info@idsspl.com for the latest career opportunities.",
  contact:
    "You can contact IDSSPL at info@idsspl.com or +91 231 2530950. The registered office is in Kolhapur and the corporate office is in Goregaon East, Mumbai. For a solution enquiry, use the Talk to an expert option below so the right specialist receives your requirement.",
  brochure:
    "You can request the IDSSPL Banking Division brochure using the Get brochure option below. The website will ask for basic professional details and consent before starting the download.",
  competitors:
    "I can provide verified information about IDSSPL, but I won't make unsupported comparisons or criticise another provider. If you share the capabilities you are comparing, I can explain how the relevant IDSSPL product addresses those requirements.",
  unverified: `${exactUnknown} Would you like to connect with an IDSSPL specialist for more information?`,
  fallback:
    "To guide you accurately, tell me what you want to improve: core banking, NPCI payments, digital channels, enterprise workflows, merchant operations, card management, security, or implementation. I can then recommend the most relevant IDSSPL starting point.",
};

const localizedReplies: Partial<Record<SiteLanguageCode, Partial<Record<AdvisorIntent, string>>>> =
  {
    hi: {
      greeting:
        "नमस्ते, मैं IDSSPL AI Advisor हूँ। मैं IDSSPL के बैंकिंग टेक्नोलॉजी समाधानों को समझने, सही प्रोडक्ट चुनने या विशेषज्ञ से जुड़ने में आपकी मदद कर सकता हूँ। आप क्या बेहतर करना चाहते हैं?",
      company:
        "IDSSPL Technologies Private Limited बैंकों, फिनटेक कंपनियों, भुगतान प्रदाताओं और वित्तीय संस्थानों के लिए सुरक्षित और स्केलेबल बैंकिंग टेक्नोलॉजी बनाती है। इसके समाधान कोर बैंकिंग, NPCI भुगतान, डिजिटल बैंकिंग, एंटरप्राइज ऑटोमेशन, मर्चेंट और कार्ड मैनेजमेंट को कवर करते हैं। आप कंपनी का परिचय चाहते हैं या किसी विशेष समाधान की जानकारी?",
      "product-fit":
        "सही समाधान चुनने के लिए बताइए: आप किस प्रकार की वित्तीय संस्था से हैं और आपकी प्राथमिकता कोर बैंकिंग, भुगतान, डिजिटल चैनल, वर्कफ्लो ऑटोमेशन, मर्चेंट ऑपरेशन या कार्ड मैनेजमेंट में से क्या है?",
      "core-banking":
        "IDSSPL का Next Gen AI Core Banking Solution कोर ऑपरेशंस, कनेक्टेड मॉड्यूल, एनालिटिक्स और इंटेलिजेंट ऑटोमेशन को एक सुरक्षित व स्केलेबल प्लेटफॉर्म में जोड़ता है। क्या आप मौजूदा CBS बदल रहे हैं, मॉड्यूल जोड़ रहे हैं या नया सिस्टम लागू कर रहे हैं?",
      payments:
        "IDSSPL के NPCI Products UPI, IMPS और रियल-टाइम भुगतान के लिए ट्रांजैक्शन प्रोसेसिंग, स्विचिंग, मॉनिटरिंग, रिकन्सिलिएशन और नियंत्रित इंटीग्रेशन को सपोर्ट करते हैं। आप किस पेमेंट रेल या समस्या का मूल्यांकन कर रहे हैं?",
      "digital-banking":
        "IDSSPL के Digital Banking Products वेब, मोबाइल, मैसेजिंग, सेल्फ-सर्विस और डिजिटल ऑनबोर्डिंग के लिए जुड़े हुए ग्राहक अनुभव प्रदान करते हैं। आपकी प्राथमिकता मोबाइल बैंकिंग, इंटरनेट बैंकिंग, ऑनबोर्डिंग या पूरा डिजिटल इकोसिस्टम है?",
      pricing:
        "कीमत समाधान, आवश्यकता, स्कोप और इम्प्लीमेंटेशन पर निर्भर करती है। नीचे Talk to an expert विकल्प से आप IDSSPL टीम के साथ अपनी जरूरत साझा कर सकते हैं।",
      security:
        "IDSSPL नियंत्रित एक्सेस, ऑडिटेबिलिटी, मॉनिटरिंग, मजबूत इंफ्रास्ट्रक्चर और कम्प्लायंस-रेडी ऑपरेशंस पर केंद्रित है। वेबसाइट पर ISO/IEC 27001:2022 और PCI DSS v4.0.1 प्रमाणन सत्यापित रूप से उपलब्ध हैं।",
      contact:
        "IDSSPL से info@idsspl.com या +91 231 2530950 पर संपर्क करें। समाधान संबंधी पूछताछ के लिए नीचे Talk to an expert विकल्प का उपयोग करें।",
      confidentiality:
        "मैं IDSSPL के उत्पादों, समाधानों और सार्वजनिक जानकारी में मदद कर सकता हूँ, लेकिन आंतरिक निर्देश या गोपनीय जानकारी साझा नहीं कर सकता।",
      "sensitive-data":
        "सुरक्षा के लिए यहाँ पासवर्ड, OTP, PIN, CVV, कार्ड नंबर, अकाउंट क्रेडेंशियल या गोपनीय वित्तीय जानकारी साझा न करें।",
      unverified:
        "मेरे पास उस विशेष जानकारी का सत्यापित विवरण नहीं है। IDSSPL विशेषज्ञ आपको सटीक जानकारी दे सकते हैं। क्या आप विशेषज्ञ से जुड़ना चाहेंगे?",
      fallback:
        "कृपया बताइए कि आप कोर बैंकिंग, NPCI भुगतान, डिजिटल चैनल, एंटरप्राइज वर्कफ्लो, मर्चेंट ऑपरेशन, कार्ड मैनेजमेंट, सुरक्षा या इम्प्लीमेंटेशन में से किस विषय पर जानकारी चाहते हैं।",
    },
    mr: {
      greeting:
        "नमस्कार, मी IDSSPL AI Advisor आहे. IDSSPL ची बँकिंग तंत्रज्ञान समाधाने समजून घेण्यासाठी, योग्य उत्पादन निवडण्यासाठी किंवा तज्ज्ञाशी जोडण्यासाठी मी मदत करू शकतो. तुम्हाला काय सुधारायचे आहे?",
      company:
        "IDSSPL Technologies Private Limited बँका, फिनटेक कंपन्या, पेमेंट प्रदाते आणि वित्तीय संस्थांसाठी सुरक्षित व विस्तारक्षम बँकिंग तंत्रज्ञान तयार करते. यामध्ये कोअर बँकिंग, NPCI पेमेंट्स, डिजिटल बँकिंग, एंटरप्राइज ऑटोमेशन, मर्चंट आणि कार्ड मॅनेजमेंटचा समावेश आहे. तुम्हाला कंपनीचा आढावा हवा आहे की विशिष्ट समाधानाची माहिती?",
      "product-fit":
        "योग्य समाधान सुचवण्यासाठी तुमची संस्था कोणत्या प्रकारची आहे आणि तुमचे मुख्य प्राधान्य कोअर बँकिंग, पेमेंट्स, डिजिटल चॅनेल्स, वर्कफ्लो ऑटोमेशन, मर्चंट ऑपरेशन्स की कार्ड मॅनेजमेंट आहे ते सांगा.",
      "core-banking":
        "IDSSPL चे Next Gen AI Core Banking Solution कोअर ऑपरेशन्स, जोडलेले मॉड्यूल्स, विश्लेषण आणि बुद्धिमान ऑटोमेशन एका सुरक्षित व विस्तारक्षम पायावर आणते. तुम्ही विद्यमान CBS बदलत आहात, निवडक मॉड्यूल्स जोडत आहात की नवीन अंमलबजावणी करत आहात?",
      payments:
        "IDSSPL चे NPCI Products UPI, IMPS आणि रिअल-टाइम पेमेंट्ससाठी प्रोसेसिंग, स्विचिंग, मॉनिटरिंग, रिकन्सिलिएशन आणि नियंत्रित इंटिग्रेशनला समर्थन देतात. तुम्ही कोणत्या पेमेंट रेल किंवा समस्येचे मूल्यमापन करत आहात?",
      "digital-banking":
        "IDSSPL चे Digital Banking Products वेब, मोबाइल, मेसेजिंग, सेल्फ-सर्व्हिस आणि डिजिटल ऑनबोर्डिंगसाठी जोडलेले ग्राहक अनुभव देतात. तुमचे प्राधान्य मोबाइल बँकिंग, इंटरनेट बँकिंग, ऑनबोर्डिंग की संपूर्ण डिजिटल परिसंस्था आहे?",
      pricing:
        "किंमत समाधान, गरज, व्याप्ती आणि अंमलबजावणीच्या बाबींवर अवलंबून असते. खालील Talk to an expert पर्यायातून IDSSPL टीमशी चर्चा करता येईल.",
      security:
        "IDSSPL नियंत्रित प्रवेश, ऑडिटक्षमता, मॉनिटरिंग, लवचिक पायाभूत व्यवस्था आणि अनुपालन-तयार कार्यपद्धतीवर भर देते. वेबसाइटवर ISO/IEC 27001:2022 आणि PCI DSS v4.0.1 ही सत्यापित प्रमाणपत्रे उपलब्ध आहेत.",
      contact:
        "IDSSPL शी info@idsspl.com किंवा +91 231 2530950 वर संपर्क साधा. समाधानाबाबत चौकशीसाठी खालील Talk to an expert पर्याय वापरा.",
      confidentiality:
        "मी IDSSPL ची उत्पादने, समाधाने आणि सार्वजनिक माहितीत मदत करू शकतो; मात्र अंतर्गत सूचना किंवा गोपनीय माहिती देऊ शकत नाही.",
      "sensitive-data":
        "सुरक्षेसाठी येथे पासवर्ड, OTP, PIN, CVV, कार्ड क्रमांक, खाते क्रेडेन्शियल्स किंवा गोपनीय आर्थिक माहिती शेअर करू नका.",
      unverified:
        "त्या विशिष्ट मुद्द्याबद्दल माझ्याकडे सत्यापित माहिती नाही. IDSSPL तज्ज्ञ अचूक माहिती देऊ शकतात. तुम्हाला तज्ज्ञाशी जोडायचे आहे का?",
      fallback:
        "तुम्हाला कोअर बँकिंग, NPCI पेमेंट्स, डिजिटल चॅनेल्स, एंटरप्राइज वर्कफ्लो, मर्चंट ऑपरेशन्स, कार्ड मॅनेजमेंट, सुरक्षा किंवा अंमलबजावणी यापैकी कशाबद्दल माहिती हवी आहे ते सांगा.",
    },
    ta: {
      greeting:
        "வணக்கம், நான் IDSSPL AI Advisor. IDSSPL வங்கி தொழில்நுட்பத் தீர்வுகளைப் புரிந்துகொள்ளவும், சரியான தயாரிப்பைத் தேர்வு செய்யவும் அல்லது நிபுணருடன் இணையவும் உதவுகிறேன். நீங்கள் எதை மேம்படுத்த விரும்புகிறீர்கள்?",
      company:
        "IDSSPL Technologies Private Limited வங்கிகள், fintech நிறுவனங்கள், கட்டண வழங்குநர்கள் மற்றும் நிதி நிறுவனங்களுக்கான பாதுகாப்பான, விரிவாக்கக்கூடிய வங்கி தொழில்நுட்பத்தை உருவாக்குகிறது. Core Banking, NPCI Payments, Digital Banking, Enterprise Automation, Merchant மற்றும் Card Management ஆகியவை இதில் அடங்கும்.",
      "product-fit":
        "சரியான தீர்வை பரிந்துரைக்க, உங்கள் நிறுவனம் எந்த வகையைச் சேர்ந்தது மற்றும் Core Banking, Payments, Digital Channels, Workflow Automation, Merchant Operations அல்லது Card Management ஆகியவற்றில் உங்கள் முதன்மைத் தேவை எது என்பதைச் சொல்லுங்கள்.",
      "core-banking":
        "IDSSPL Next Gen AI Core Banking Solution, core operations, connected modules, analytics மற்றும் intelligent automation ஆகியவற்றை பாதுகாப்பான, விரிவாக்கக்கூடிய தளத்தில் இணைக்கிறது. நீங்கள் தற்போதைய CBS-ஐ மாற்றுகிறீர்களா அல்லது புதிய அமைப்பை செயல்படுத்துகிறீர்களா?",
      payments:
        "IDSSPL NPCI Products, UPI, IMPS மற்றும் real-time payment operations-க்கு processing, switching, monitoring, reconciliation மற்றும் controlled integration ஆதரவை வழங்குகிறது. எந்த payment rail-ஐ மதிப்பீடு செய்கிறீர்கள்?",
      "digital-banking":
        "IDSSPL Digital Banking Products web, mobile, messaging, self-service மற்றும் digital onboarding பயணங்களை ஆதரிக்கிறது. உங்கள் முன்னுரிமை mobile banking, internet banking, onboarding அல்லது முழு digital ecosystem-ஆ?",
      pricing:
        "விலை தீர்வு, தேவைகள், scope மற்றும் implementation அம்சங்களைப் பொறுத்தது. கீழே உள்ள Talk to an expert விருப்பம் மூலம் IDSSPL அணியுடன் பேசலாம்.",
      security:
        "IDSSPL controlled access, auditability, monitoring, resilient infrastructure மற்றும் compliance-ready operations மீது கவனம் செலுத்துகிறது. ISO/IEC 27001:2022 மற்றும் PCI DSS v4.0.1 சான்றிதழ்கள் இணையதளத்தில் உறுதிப்படுத்தப்பட்டுள்ளன.",
      contact:
        "IDSSPL-ஐ info@idsspl.com அல்லது +91 231 2530950 மூலம் தொடர்புகொள்ளலாம். தீர்வு விசாரணைக்கு கீழே உள்ள Talk to an expert விருப்பத்தைப் பயன்படுத்துங்கள்.",
      confidentiality:
        "IDSSPL தயாரிப்புகள், தீர்வுகள் மற்றும் பொது தகவல்களில் உதவ முடியும்; ஆனால் உள் வழிமுறைகள் அல்லது ரகசிய தகவலை வழங்க முடியாது.",
      "sensitive-data":
        "பாதுகாப்பிற்காக password, OTP, PIN, CVV, card number, account credentials அல்லது ரகசிய நிதித் தகவலை இங்கே பகிர வேண்டாம்.",
      unverified:
        "அந்த குறிப்பிட்ட விஷயத்திற்கான உறுதிப்படுத்தப்பட்ட தகவல் என்னிடம் இல்லை. IDSSPL நிபுணர் துல்லியமான தகவலை வழங்க முடியும்.",
      fallback:
        "Core Banking, NPCI Payments, Digital Channels, Enterprise Workflows, Merchant Operations, Card Management, Security அல்லது Implementation ஆகியவற்றில் எது பற்றித் தெரிந்துகொள்ள விரும்புகிறீர்கள்?",
    },
    gu: {
      greeting:
        "નમસ્તે, હું IDSSPL AI Advisor છું. IDSSPL ના બેન્કિંગ ટેક્નોલોજી સોલ્યુશન્સ સમજવા, યોગ્ય પ્રોડક્ટ પસંદ કરવા અથવા નિષ્ણાત સાથે જોડાવામાં હું મદદ કરી શકું છું. તમે શું સુધારવા માંગો છો?",
      company:
        "IDSSPL Technologies Private Limited બેન્કો, ફિનટેક કંપનીઓ, પેમેન્ટ પ્રોવાઇડર્સ અને નાણાકીય સંસ્થાઓ માટે સુરક્ષિત અને સ્કેલેબલ બેન્કિંગ ટેક્નોલોજી બનાવે છે. તેમાં Core Banking, NPCI Payments, Digital Banking, Enterprise Automation, Merchant અને Card Management સામેલ છે.",
      "product-fit":
        "યોગ્ય સોલ્યુશન માટે તમારી સંસ્થાનો પ્રકાર અને મુખ્ય પ્રાથમિકતા જણાવો: Core Banking, Payments, Digital Channels, Workflow Automation, Merchant Operations કે Card Management?",
      "core-banking":
        "IDSSPL નું Next Gen AI Core Banking Solution core operations, connected modules, analytics અને intelligent automation ને સુરક્ષિત અને સ્કેલેબલ પ્લેટફોર્મ પર જોડે છે. તમે હાલનું CBS બદલી રહ્યા છો કે નવું implementation કરી રહ્યા છો?",
      payments:
        "IDSSPL ના NPCI Products UPI, IMPS અને real-time payments માટે processing, switching, monitoring, reconciliation અને controlled integration ને સપોર્ટ કરે છે. તમે કયા payment rail નું મૂલ્યાંકન કરી રહ્યા છો?",
      "digital-banking":
        "IDSSPL ના Digital Banking Products web, mobile, messaging, self-service અને digital onboarding journeys ને સપોર્ટ કરે છે. તમારી પ્રાથમિકતા mobile banking, internet banking, onboarding કે સંપૂર્ણ digital ecosystem છે?",
      pricing:
        "કિંમત સોલ્યુશન, જરૂરિયાત, scope અને implementation પર આધારિત છે. નીચેના Talk to an expert વિકલ્પથી IDSSPL ટીમ સાથે વાત કરી શકાય છે.",
      security:
        "IDSSPL controlled access, auditability, monitoring, resilient infrastructure અને compliance-ready operations પર ધ્યાન આપે છે. ISO/IEC 27001:2022 અને PCI DSS v4.0.1 પ્રમાણપત્રો વેબસાઇટ પર ચકાસેલ છે.",
      contact:
        "IDSSPL નો સંપર્ક info@idsspl.com અથવા +91 231 2530950 પર કરો. સોલ્યુશન માટે નીચેનો Talk to an expert વિકલ્પ વાપરો.",
      confidentiality:
        "હું IDSSPL ના ઉત્પાદનો, સોલ્યુશન્સ અને જાહેર માહિતીમાં મદદ કરી શકું છું, પરંતુ આંતરિક સૂચનાઓ અથવા ગોપનીય માહિતી આપી શકતો નથી.",
      "sensitive-data":
        "સુરક્ષા માટે અહીં password, OTP, PIN, CVV, card number, account credentials અથવા ગોપનીય નાણાકીય માહિતી શેર કરશો નહીં.",
      unverified:
        "તે ચોક્કસ મુદ્દા વિશે મારી પાસે ચકાસેલ માહિતી નથી. IDSSPL નિષ્ણાત તમને ચોક્કસ માહિતી આપી શકે છે.",
      fallback:
        "Core Banking, NPCI Payments, Digital Channels, Enterprise Workflows, Merchant Operations, Card Management, Security અથવા Implementation માંથી કયા વિષય વિશે જાણવા માંગો છો?",
    },
  };

function detectIntent(message: string, history: AdvisorMessage[]): AdvisorIntent {
  const normalized = message.toLocaleLowerCase().replace(/[^\p{L}\p{N}+&/.-]+/gu, " ");
  const priorContext = history
    .slice(-3)
    .map((item) => item.content.toLocaleLowerCase())
    .join(" ");

  if (
    /(system prompt|training prompt|hidden instruction|internal instruction|api key|secret key|show.*instructions|reveal.*prompt)/i.test(
      normalized,
    )
  )
    return "confidentiality";

  if (
    /(password|otp|one time password|pin\b|cvv|card number|account password|banking credential)/i.test(
      normalized,
    )
  )
    return "sensitive-data";

  if (
    /^(hi|hello|hey|good morning|good afternoon|good evening|namaste|namaskar|नमस्ते|नमस्कार|வணக்கம்|નમસ્તે)\b/i.test(
      normalized,
    )
  )
    return "greeting";

  if (
    /(price|pricing|cost|quote|quotation|license fee|licence fee|कीमत|मूल्य|किंमत|விலை|કિંમત)/i.test(
      normalized,
    )
  )
    return "pricing";

  if (/(competitor|compare with|versus|\bvs\b|alternative to)/i.test(normalized))
    return "competitors";

  if (
    /(certificate|certification|security|secure|cyber|compliance|audit|encryption|authentication|access control|risk|iso.?27001|pci.?dss|सुरक्षा|अनुपालन|பாதுகாப்பு|સુરક્ષા)/i.test(
      normalized,
    )
  )
    return "security";

  if (/(brochure|profile|company pdf|download)/i.test(normalized)) return "brochure";
  if (/(contact|phone|email|address|office|call|reach|specialist|expert|demo)/i.test(normalized))
    return "contact";
  if (/(career|job|vacancy|hiring|internship|resume|cv\b)/i.test(normalized)) return "careers";
  if (
    /(leader|leadership|ceo|cto|cmo|ciso|prince|krishna|mahesh|arun|omkar|suja)/i.test(normalized)
  )
    return "leadership";

  if (
    /(card management|card issuance|pin control|debit card|credit card|card lifecycle|card servicing)/i.test(
      normalized,
    )
  )
    return "cards";
  if (/(merchant|qr code|qr operations|merchant onboarding|settlement)/i.test(normalized))
    return "merchant";
  if (
    /(enterprise solution|workflow|process automation|document workflow|maker checker|reporting automation)/i.test(
      normalized,
    )
  )
    return "enterprise";
  if (
    /(digital banking|mobile banking|internet banking|self service|digital onboarding|omnichannel|customer journey)/i.test(
      normalized,
    )
  )
    return "digital-banking";
  if (
    /(npci|upi|imps|payment rail|payment switch|payment switching|real.?time payment|reconciliation)/i.test(
      normalized,
    )
  )
    return "payments";
  if (/(core banking|\bcbs\b|core operations|ai core|banking modules)/i.test(normalized))
    return "core-banking";

  if (
    /(api|architecture|integration|infrastructure|deployment|scalability|data flow|monitoring|implementation|migration|timeline|go live|cloud|on premise)/i.test(
      normalized,
    )
  )
    return "implementation";

  if (
    /(which product|recommend|suitable|best solution|fits? my|what do i need|looking for.*solution|we are a bank|cooperative bank|co-operative bank|credit society|financial institution)/i.test(
      normalized,
    )
  )
    return "product-fit";

  if (
    /(about idsspl|what is idsspl|who are you|what do you do|company|mission|vision|services|solutions)/i.test(
      normalized,
    )
  )
    return "company";

  if (
    /(customer list|client list|partner list|revenue|turnover|transaction volume|market share|case stud|founded|founder|guarantee|sla)/i.test(
      normalized,
    )
  )
    return "unverified";

  if (/^(yes|yeah|sure|okay|ok|tell me more|more details)$/i.test(normalized)) {
    if (/(core banking|next gen ai)/i.test(priorContext)) return "core-banking";
    if (/(npci|upi|imps|payment)/i.test(priorContext)) return "payments";
    if (/(digital banking|mobile banking|internet banking)/i.test(priorContext))
      return "digital-banking";
    if (/(merchant)/i.test(priorContext)) return "merchant";
    if (/(card management|card lifecycle)/i.test(priorContext)) return "cards";
    if (/(enterprise|workflow)/i.test(priorContext)) return "enterprise";
    return "product-fit";
  }

  return "fallback";
}

export function getLocalAdvisorReply({ message, language, history = [] }: LocalAdvisorInput) {
  const intent = detectIntent(message, history);
  return localizedReplies[language]?.[intent] ?? englishReplies[intent];
}

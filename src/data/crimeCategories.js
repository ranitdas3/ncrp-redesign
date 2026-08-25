// Crime Categories Data Definition for NCRP Portal
export const CRIME_CATEGORIES = [
  {
    id: 'women-children',
    title: 'Women & Children',
    titleHi: 'महिला एवं बाल अपराध',
    icon: '👩‍👧‍👦',
    color: '#D93025',
    summary: 'Online Sexual Exploitation, Child Sexual Abuse Material, Grooming, Cyberstalking, Intimate image abuse',
    description: 'Reporting sensitive cybercrimes involving women and children. Option for anonymous reporting is available.',
    subCrimes: [
      { id: 'online-sexual-exploitation', name: 'Online sexual Exploitation', tag: 'High Severity' },
      { id: 'csam', name: 'Child Sexual Abuse Material (CSAM)', tag: 'Critical' },
      { id: 'grooming', name: 'Online Grooming', tag: 'High Severity' },
      { id: 'cyberstalking-wc', name: 'CyberStalking', tag: 'Harassment' },
      { id: 'intimate-image-abuse', name: 'Intimate-Image Abuse (Non-consensual Sharing)', tag: 'Critical' },
      { id: 'uncategorised', name: 'Uncategorised', tag: 'General' },
    ]
  },
  {
    id: 'financial',
    title: 'Financial',
    titleHi: 'वित्तीय धोखाधड़ी',
    icon: '💵',
    color: '#0A3161',
    summary: 'UPI Fraud, Bank Fraud, Card Fraud, Investment Scam, Loan app Fraud, Phishing, Crypto fraud, Digital Arrest Scam...',
    description: 'Crimes related to unauthorized banking, credit/debit card theft, investment scams, and money transfer fraud.',
    subCrimes: [
      { id: 'upi-fraud', name: 'UPI Fraud', tag: 'Immediate Action' },
      { id: 'bank-fraud', name: 'Bank Fraud / Netbanking Unauthorized Access', tag: 'Financial' },
      { id: 'card-fraud', name: 'Credit / Debit Card Fraud', tag: 'Financial' },
      { id: 'investment-scam', name: 'Investment Scam / Stock Trading Scam', tag: 'Scam' },
      { id: 'loan-app-fraud', name: 'Instant Loan-App Fraud / Extortion', tag: 'Scam' },
      { id: 'marketplace-fraud', name: 'Marketplace Fraud (OLX/Quikr Scam)', tag: 'Financial' },
      { id: 'crypto-fraud', name: 'Crypto Currency Fraud', tag: 'Financial' },
      { id: 'impersonation-scam', name: 'Impersonation Scam (Fake Officer / Relative)', tag: 'Scam' },
      { id: 'phishing', name: 'Phishing Email / Fraudulent SMS Link', tag: 'Cyber' },
      { id: 'remote-access-fraud', name: 'Remote-Access Fraud (AnyDesk / TeamViewer)', tag: 'Critical' },
      { id: 'digital-arrest-scam', name: 'Digital Arrest Scam (CBI / Police Video Call Scam)', tag: 'Critical' },
    ]
  },
  {
    id: 'identity',
    title: 'Identity fraud',
    titleHi: 'पहचान एवं अकाउंट संबंधी अपराध',
    icon: '👤',
    color: '#138808',
    summary: 'Account takeover, Identity Theft, Sim-related fraud, Aadhaar Misuse, Social Media Takeover...',
    description: 'Unlawful access to online profiles, impersonation using personal documents, or SIM card fraud.',
    subCrimes: [
      { id: 'account-takeover', name: 'Account Takeover', tag: 'Security' },
      { id: 'identity-theft', name: 'Identity Theft', tag: 'Identity' },
      { id: 'sim-fraud', name: 'SIM Swap / SIM-related Fraud', tag: 'Telecom' },
      { id: 'aadhaar-misuse', name: 'Aadhaar / Identity Misuse', tag: 'Identity' },
      { id: 'email-compromise', name: 'Email Account Compromise', tag: 'Security' },
      { id: 'social-media-takeover', name: 'Social-Media Takeover', tag: 'Social Media' },
    ]
  },
  {
    id: 'online-abuse',
    title: 'Online Abuse',
    titleHi: 'ऑनलाइन उत्पीड़न व दुर्व्यवहार',
    icon: '💬',
    color: '#E65100',
    summary: 'Cyberstalking, Harassment, Blackmail, Sextortion, Impersonation, Obscene content',
    description: 'Online bullying, extortion, non-consensual threats, and harassment across social platforms.',
    subCrimes: [
      { id: 'cyberstalking', name: 'Cyberstalking', tag: 'Abuse' },
      { id: 'harassment', name: 'Online Harassment & Bullying', tag: 'Abuse' },
      { id: 'blackmail', name: 'Blackmail / Coercion', tag: 'Criminal' },
      { id: 'sextortion', name: 'Sextortion', tag: 'Critical' },
      { id: 'impersonation-abuse', name: 'Online Impersonation', tag: 'Abuse' },
      { id: 'obscene-content', name: 'Obscene Content', tag: 'Abuse' },
    ]
  },
  {
    id: 'technical',
    title: 'Technical',
    titleHi: 'तकनीकी साइबर अपराध',
    icon: '💻',
    color: '#3F51B5',
    summary: 'Hacking, Malware, Ransomware, Unauthorized Access, Data Theft',
    description: 'Cyberattacks targeting computer systems, networks, servers, databases, or malware infection.',
    subCrimes: [
      { id: 'hacking', name: 'Hacking / System Breach', tag: 'Cyber' },
      { id: 'malware', name: 'Malware / Virus Infection', tag: 'Cyber' },
      { id: 'ransomware', name: 'Ransomware Attack', tag: 'Critical' },
      { id: 'unauthorized-access', name: 'Unauthorized Access', tag: 'Security' },
      { id: 'data-theft', name: 'Data Theft / Data Leakage', tag: 'Security' },
    ]
  },
  {
    id: 'content',
    title: 'Content',
    titleHi: 'सामग्री व प्लेटफॉर्म अपराध',
    icon: '🌐',
    color: '#7B1FA2',
    summary: 'Fake Profile, Fraudulent Website, Malicious Advertisement, Illegal online content',
    description: 'Deceptive online domain names, fake brand pages, malicious advertisements, or illegal media.',
    subCrimes: [
      { id: 'fake-profiles', name: 'Fake Profile', tag: 'Content' },
      { id: 'fraudulent-websites', name: 'Fraudulent Website', tag: 'Domain' },
      { id: 'malicious-ads', name: 'Malicious Advertisement', tag: 'Content' },
      { id: 'illegal-abusive-content', name: 'Illegal Online Content', tag: 'Content' },
    ]
  },
  {
    id: 'others',
    title: 'Others',
    titleHi: 'अन्य साइबर अपराध',
    icon: '📑',
    color: '#475569',
    summary: 'Any other cybercrime, online scam, or suspicious activity not listed above...',
    description: 'Report any other cybercrime or suspicious online incident not covered in the specific categories above.',
    subCrimes: [
      { id: 'other-cyber-crime', name: 'Other Cyber Crime', tag: 'General' }
    ]
  }
];

export const CRIME_CATEGORIES = [
  {
    id: 'women-children',
    titleKey: 'categories.womenChildren.title',
    summaryKey: 'categories.womenChildren.summary',
    color: '#D93025',
    subCrimes: [
      { id: 'online-sexual-exploitation', nameKey: 'categories.subCrimes.onlineSexualExploitation', tagKey: 'categories.tags.highSeverity' },
      { id: 'csam', nameKey: 'categories.subCrimes.csam', tagKey: 'categories.tags.critical' },
      { id: 'grooming', nameKey: 'categories.subCrimes.grooming', tagKey: 'categories.tags.highSeverity' },
      { id: 'cyberstalking-wc', nameKey: 'categories.subCrimes.cyberstalkingWc', tagKey: 'categories.tags.harassment' },
      { id: 'intimate-image-abuse', nameKey: 'categories.subCrimes.intimateImageAbuse', tagKey: 'categories.tags.critical' },
      { id: 'uncategorised', nameKey: 'categories.subCrimes.uncategorised', tagKey: 'categories.tags.general' },
    ]
  },
  {
    id: 'financial',
    titleKey: 'categories.financial.title',
    summaryKey: 'categories.financial.summary',
    color: '#0A3161',
    subCrimes: [
      { id: 'upi-fraud', nameKey: 'categories.subCrimes.upiFraud', tagKey: 'categories.tags.immediateAction' },
      { id: 'bank-fraud', nameKey: 'categories.subCrimes.bankFraud', tagKey: 'categories.tags.financial' },
      { id: 'card-fraud', nameKey: 'categories.subCrimes.cardFraud', tagKey: 'categories.tags.financial' },
      { id: 'investment-scam', nameKey: 'categories.subCrimes.investmentScam', tagKey: 'categories.tags.scam' },
      { id: 'loan-app-fraud', nameKey: 'categories.subCrimes.loanAppFraud', tagKey: 'categories.tags.scam' },
      { id: 'marketplace-fraud', nameKey: 'categories.subCrimes.marketplaceFraud', tagKey: 'categories.tags.financial' },
      { id: 'crypto-fraud', nameKey: 'categories.subCrimes.cryptoFraud', tagKey: 'categories.tags.financial' },
      { id: 'impersonation-scam', nameKey: 'categories.subCrimes.impersonationScam', tagKey: 'categories.tags.scam' },
      { id: 'phishing', nameKey: 'categories.subCrimes.phishing', tagKey: 'categories.tags.cyber' },
      { id: 'remote-access-fraud', nameKey: 'categories.subCrimes.remoteAccessFraud', tagKey: 'categories.tags.critical' },
      { id: 'digital-arrest-scam', nameKey: 'categories.subCrimes.digitalArrestScam', tagKey: 'categories.tags.critical' },
      { id: 'uncategorised', nameKey: 'categories.subCrimes.uncategorised', tagKey: 'categories.tags.general' },
    ]
  },
  {
    id: 'identity',
    titleKey: 'categories.identity.title',
    summaryKey: 'categories.identity.summary',
    color: '#138808',
    subCrimes: [
      { id: 'account-takeover', nameKey: 'categories.subCrimes.accountTakeover', tagKey: 'categories.tags.security' },
      { id: 'identity-theft', nameKey: 'categories.subCrimes.identityTheft', tagKey: 'categories.tags.identity' },
      { id: 'sim-fraud', nameKey: 'categories.subCrimes.simFraud', tagKey: 'categories.tags.telecom' },
      { id: 'aadhaar-misuse', nameKey: 'categories.subCrimes.aadhaarMisuse', tagKey: 'categories.tags.identity' },
      { id: 'email-compromise', nameKey: 'categories.subCrimes.emailCompromise', tagKey: 'categories.tags.security' },
      { id: 'social-media-takeover', nameKey: 'categories.subCrimes.socialMediaTakeover', tagKey: 'categories.tags.socialMedia' },
      { id: 'uncategorised', nameKey: 'categories.subCrimes.uncategorised', tagKey: 'categories.tags.general' },
    ]
  },
  {
    id: 'online-abuse',
    titleKey: 'categories.onlineAbuse.title',
    summaryKey: 'categories.onlineAbuse.summary',
    color: '#E65100',
    subCrimes: [
      { id: 'cyberstalking', nameKey: 'categories.subCrimes.cyberstalking', tagKey: 'categories.tags.abuse' },
      { id: 'harassment', nameKey: 'categories.subCrimes.harassment', tagKey: 'categories.tags.abuse' },
      { id: 'blackmail', nameKey: 'categories.subCrimes.blackmail', tagKey: 'categories.tags.criminal' },
      { id: 'sextortion', nameKey: 'categories.subCrimes.sextortion', tagKey: 'categories.tags.critical' },
      { id: 'impersonation-abuse', nameKey: 'categories.subCrimes.impersonationAbuse', tagKey: 'categories.tags.abuse' },
      { id: 'obscene-content', nameKey: 'categories.subCrimes.obsceneContent', tagKey: 'categories.tags.abuse' },
      { id: 'uncategorised', nameKey: 'categories.subCrimes.uncategorised', tagKey: 'categories.tags.general' },
    ]
  },
  {
    id: 'technical',
    titleKey: 'categories.technical.title',
    summaryKey: 'categories.technical.summary',
    color: '#3F51B5',
    subCrimes: [
      { id: 'hacking', nameKey: 'categories.subCrimes.hacking', tagKey: 'categories.tags.cyber' },
      { id: 'malware', nameKey: 'categories.subCrimes.malware', tagKey: 'categories.tags.cyber' },
      { id: 'ransomware', nameKey: 'categories.subCrimes.ransomware', tagKey: 'categories.tags.critical' },
      { id: 'unauthorized-access', nameKey: 'categories.subCrimes.unauthorizedAccess', tagKey: 'categories.tags.security' },
      { id: 'data-theft', nameKey: 'categories.subCrimes.dataTheft', tagKey: 'categories.tags.security' },
      { id: 'uncategorised', nameKey: 'categories.subCrimes.uncategorised', tagKey: 'categories.tags.general' },
    ]
  },
  {
    id: 'content',
    titleKey: 'categories.content.title',
    summaryKey: 'categories.content.summary',
    color: '#7B1FA2',
    subCrimes: [
      { id: 'fake-profiles', nameKey: 'categories.subCrimes.fakeProfiles', tagKey: 'categories.tags.content' },
      { id: 'fraudulent-websites', nameKey: 'categories.subCrimes.fraudulentWebsites', tagKey: 'categories.tags.domain' },
      { id: 'malicious-ads', nameKey: 'categories.subCrimes.maliciousAds', tagKey: 'categories.tags.content' },
      { id: 'illegal-abusive-content', nameKey: 'categories.subCrimes.illegalAbusiveContent', tagKey: 'categories.tags.content' },
      { id: 'uncategorised', nameKey: 'categories.subCrimes.uncategorised', tagKey: 'categories.tags.general' },
    ]
  },
  {
    id: 'others',
    titleKey: 'categories.others.title',
    summaryKey: 'categories.others.summary',
    color: '#475569',
    subCrimes: [
      { id: 'other-cyber-crime', nameKey: 'categories.subCrimes.otherCyberCrime', tagKey: 'categories.tags.general' },
      { id: 'uncategorised', nameKey: 'categories.subCrimes.uncategorised', tagKey: 'categories.tags.general' },
    ]
  }
];

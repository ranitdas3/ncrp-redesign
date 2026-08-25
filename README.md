# 🛡️ National Cyber Crime Reporting Portal (NCRP) — Redesign

> **Modernizing Citizen Cybercrime Reporting for India**  
> Built with **React 19**, **Vite**, **UX4G 3.0 Government Design System**, and **Phosphor Icons**.

---

## 📌 Project Overview

The **National Cyber Crime Reporting Portal (NCRP) Redesign** is a citizen-centric, accessible, and express intake application designed to streamline the reporting and tracking of cybercrimes in India. The redesign focuses on reducing friction during emergency incidents (such as financial frauds and sensitive cyber crimes against women and children) while strictly adhering to Indian government design and accessibility guidelines.

---

## ✨ Key Features & Highlights

### 1. 🚨 Express Incident Reporting Intake Wizard
- **Category-Dynamic Forms**: Automatically adapts input fields, guidance prompts, and evidence buttons based on the selected crime category.
- **Dynamic Evidence Upload Controls**: Custom evidence selection popover menu supporting Screenshots, Chat Logs, Voice Recordings, PDFs, and Bank Receipts with direct removal (`✕`) and quick-add (`+ Add Evidence`) controls.
- **Persistent Live Case Summary Card**: Pinned right-hand side summary card updating live as citizens type, maintaining complete visibility before official submission.
- **Legal Terms & Policy Declaration**: Mandatory acceptance checkbox with direct links to official [NCRP FAQs](https://cybercrime.gov.in/Webform/FAQ.aspx) and [Privacy Policy](https://cybercrime.gov.in/Webform/privacy_policy.aspx).

### 2. 📂 7 Standardized Crime Categories
Includes all primary cybercrime domains with the newly integrated **Uncategorised** subcategory option across all categories:
- **👩‍👧‍👦 Women & Children** *(Child Exploitation, CSAM, Grooming, Cyberstalking, Non-consensual Sharing)*
- **💵 Financial Fraud** *(UPI Scam, Netbanking Fraud, Card Theft, Investment Scam, Loan Apps, Digital Arrest Scam)*
- **👤 Identity Fraud** *(Account Takeover, SIM Swap, Aadhaar Misuse, Social Media Hacking)*
- **💬 Online Abuse** *(Harassment, Blackmail, Sextortion, Online Extortion)*
- **💻 Technical Crimes** *(Hacking, Malware, Ransomware Attacks, Data Breach)*
- **🌐 Content & Platform Abuse** *(Fake Profiles, Fraudulent Domains, Malicious Advertisements)*
- **📑 Others** *(Suspicious Online Activity & General Cybercrimes)*

### 3. 🔐 Integrated Citizen Authentication & Session Flow
- **Authentication Options**: Mobile OTP verification and User ID / Password login tabs.
- **Security Captcha**: Refreshable 6-character anti-bot captcha generator.
- **Dynamic Session Bypass**: Citizens already logged in automatically skip the verification step and proceed directly to official registration.

### 4. 🔍 Track Your Complaint Status
- **Wireframe-Matched Tracking View**: Real-time status lookup using Official Acknowledgement Number + Mobile OTP + Security Captcha.
- **4-Stage Live Progress Timeline**: Visual tracking of complaint stages (*Registered & Encrypted* ➔ *Assigned to State Cyber Cell* ➔ *Evidence & Suspect Analysis* ➔ *Final Resolution*).

### 5. ♿ UX4G 3.0 Accessibility & Localization
- **UX4G Government Design Tokens**: Styled using official government color palettes, card tokens, responsive containers, and tricolor header ribbon.
- **Phosphor Icon System**: Integrated `@phosphor-icons/react` for accessible, crisp UI icons.
- **Accessibility Controls**: Multi-tier font sizing (`sm`, `md`, `lg`) and High-Contrast Accessibility Mode toggle.
- **Bilingual Support**: Instant toggle between English and Hindi (`hi`).

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8
- **Design Tokens & System**: UX4G 3.0 CSS (`src/styles/ux4g.css`)
- **Icon Library**: Phosphor Icons (`@phosphor-icons/react`)
- **Linter & Code Quality**: Oxlint

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ranitdas3/ncrp-redesign.git
   cd ncrp-redesign
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Launches Vite local development server |
| `npm run build` | Builds production-ready client bundle in `dist/` |
| `npm run lint` | Runs Oxlint linter for code quality checks |
| `npm run preview` | Serves production build locally for verification |

---

## 📁 Repository Structure

```
ncrp-redesign/
├── src/
│   ├── components/
│   │   ├── CategoryIcon.jsx           # Phosphor icon renderer for crime categories
│   │   ├── CategorySelection.jsx      # Home dashboard category card grid
│   │   ├── GovtFooter.jsx             # Official government footer
│   │   ├── GovtHeader.jsx             # Portal header with National Emblem & Branding
│   │   ├── IncidentReportingFlow.jsx  # Express intake wizard & Case Summary card
│   │   ├── LanguageToolbar.jsx        # Multi-language & accessibility controls
│   │   ├── LoginForm.jsx              # Citizen verification module
│   │   └── TrackComplaint.jsx         # Live complaint tracking timeline view
│   ├── data/
│   │   └── crimeCategories.js         # Crime categories & sub-crimes data
│   ├── styles/
│   │   └── ux4g.css                   # UX4G 3.0 Design Tokens & Utilities
│   ├── App.jsx                        # Main layout & router container
│   └── main.jsx                       # React DOM entry point
├── package.json
└── README.md
```

---

## 📄 License & Attribution
Designed for the **National Cyber Crime Reporting Portal (NCRP)** initiative. Built in alignment with Indian legal frameworks and government design system guidelines (UX4G).

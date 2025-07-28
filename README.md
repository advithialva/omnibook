# Multi-language Support UI

**Project Name:** Omnibook - Multilingual Book Management System  
**Developer:** Advithi Alva  
**University:** Sahyadri College of Engineering and Management (SCEM)  
**Task:** Task 15 – React Development  
**Submission Date:** July 28, 2025  

---

## 1.  Objective

To implement a comprehensive multi-language support using `react-i18next` in a React-based book management application, enabling users to seamlessly switch languages and localize content.

---

## 2. Project Structure

```
src/
├── components/
│   ├── BookCard.jsx
│   ├── BookDetailModal.jsx
│   ├── BookForm.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── LanguageSwitcher.jsx
├── data/
│   └── books.js
├── lang/
│   ├── en/translation.json
│   ├── es/translation.json
│   ├── hi/translation.json
│   ├── ja/translation.json
│   └── ko/translation.json
├── utils/
│   └── formatters.js
├── App.jsx
├── main.jsx
├── i18n.js
└── index.css
```

---

## 3. Adding a New Language

**Step 1:** Create a New Translation File  
```bash
mkdir src/lang/fr
nano src/lang/fr/translation.json
```

**Step 2:** Add Translations  
```json
{
  "app": { "title": "Omnibook" },
  "navigation": { "home": "Accueil", "books": "Livres" }
}
```

**Step 3:** Update Language Switcher  
```js
{ code: 'fr', label: 'Français', flag: '🇫🇷' }
```

**Step 4:** Add to i18n Configuration  
```js
fr: { translation: require('./lang/fr/translation.json') }
```

---

## 4. Dependencies

| Library                       | Version  | Description                          |
|------------------------------|----------|--------------------------------------|
| `react-i18next`              | 15.6.0   | React bindings for i18next           |
| `i18next`                    | latest   | Core i18n library                    |
| `i18next-browser-languagedetector` | 8.2.0    | Auto-detects browser language       |
| `i18next-http-backend`       | 3.0.2    | Loads translation files via HTTP     |
| `Tailwind CSS`               | 4.1.11   | Styling                              |
| `Vite`                       | 7.0.4    | Frontend bundler                     |

---
## 5. Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/advithialva/omnibook.git
   cd omnibook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

---

## 6. Live Demo

**URL:** [https://omnibook-beta.vercel.app/](https://omnibook-beta.vercel.app/)

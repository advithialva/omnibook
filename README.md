# 📚 Omnibook - A Multilingual Book Management System

Omnibook is a modern, user-friendly book management system with multi-language support. Effortlessly organize your book collection with an intuitive and accessible interface built for global users.

---

## ✨ Features

- **📖 Book Management**: Add, edit, delete, and view book details
- **🌍 Multilingual Support**: Available in 5 languages (English, Spanish, Hindi, Japanese, Korean)
- **🔍 Smart Search**: Search by title, author, genre, or description
- **🏷️ Genre Filtering**: Filter books by genre categories
- **📊 Statistics Dashboard**: View collection statistics and insights
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Modern UI**: Clean, professional interface with Tailwind CSS
- **🔄 Real-time Updates**: Instant feedback with toast notifications

---
## 🛠️ Tech Stack

| Technology | Version | Purpose | Links |
|------------|---------|---------|-------|
|  **React** | 19.1.0 | Frontend framework | [Docs](https://reactjs.org/) |
|  **Tailwind CSS** | 4.1.11 | Utility-first styling | [Docs](https://tailwindcss.com/) |
|  **Vite** | 7.0.4 | Build tool & dev server | [Docs](https://vitejs.dev/) |
|  **i18next** | Latest | Internationalization | [Docs](https://www.i18next.com/) |
|  **react-i18next** | 15.6.0 | React i18n bindings | [Docs](https://react.i18next.com/) |
|  **react-hot-toast** | 2.5.2 | Toast notifications | [Docs](https://react-hot-toast.com/) |
|  **PostCSS** | 8.5.6 | CSS processing | [Docs](https://postcss.org/) |
|  **ESLint** | 9.30.1 | Code linting | [Docs](https://eslint.org/) |

---

## 🌐 Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English  | `en` | ✅ Complete |
| Spanish  | `es` | ✅ Complete |
| Hindi    | `hi` | ✅ Complete |
| Japanese | `ja` | ✅ Complete |
| Korean   | `ko` | ✅ Complete |

---
## 🏗️ Project Structure

```
src/
├── components/          
│   ├── BookCard.jsx                         # Book display card
│   ├── BookDetailModal.jsx                  # Book details modal
│   ├── BookForm.jsx                         # Add/edit book form
│   ├── Header.jsx                           # App header
│   └── LanguageSwitcher.jsx                 # Language selector
├── data/               
│   └── books.js                             # Sample book data
├── lang/                                    # Translations
│   ├── en/translation.json
│   ├── es/translation.json
│   ├── hi/translation.json
│   ├── ja/translation.json
│   └── ko/translation.json
├── utils/             
│   └── formatters.js                        # Date/number formatting
├── App.jsx             
├── main.jsx            
├── i18n.js                                  # i18next configuration
└── index.css           
`
```
---

## 🚀 Installation

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

## 🎨 Customization

### Adding New Languages

1. Create a new translation file in `src/lang/<language-code>/translation.json`
2. Add the language to the language switcher in `src/components/LanguageSwitcher.jsx`
3. Update the i18next configuration in `src/i18n.js`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


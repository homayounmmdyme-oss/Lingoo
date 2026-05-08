# 🦜 Lingo - English Idioms Learning App

An interactive web application designed to help Persian speakers learn English idioms through an intuitive, engaging interface. Built with modern web technologies for a seamless learning experience.

## 🎯 Purpose

Lingo is specifically designed for **Persian speakers** to master English idioms. The app provides:

- **Bilingual learning** - English idioms with Persian translations
- **Contextual understanding** - Real-world example sentences with meanings
- **Interactive navigation** - Browse, search, and shuffle through idioms
- **Visual learning** - Clean, modern interface with smooth animations

## ✨ Features

### 📚 Comprehensive Idiom Collection
- Browse idioms sorted alphabetically or randomly
- Each idiom includes:
  - English phrase
  - Phonetic pronunciation
  - Persian translation
  - Example sentence (with idiom highlighted)
  - Example meaning in Persian

### 🔍 Search & Filter
- Search idioms in English or Persian
- Real-time filtering results
- Shows count of matching idioms

### 🎲 Smart Randomization
- "Random" mode with animated dice effect
- Shuffle idioms for varied practice sessions
- Smooth grid animations during shuffling

### 🧭 Intuitive Navigation
- Next/Previous buttons for sequential learning
- Click any idiom from the collection list
- Keyboard-friendly interface (RTL support for Persian)

### 🎨 Beautiful UI/UX
- Responsive gradient background
- Smooth transitions and animations
- Dark/Light friendly color scheme
- Hover effects and visual feedback
- Scrollable idiom list with custom styling

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 16.2.6 |
| React | 19.2.4 |
| React DOM | 19.2.4 |
| Tailwind CSS | ^4 |
| TypeScript | ^5 |
| ESLint | ^9 |

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd my-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
my-app/
├── app/
│   └── page.tsx              # Main application component
├── public/
│   └── community/
│       └── idioms.json       # Idioms database
├── package.json
├── tailwind.config.js
└── README.md
```

## 📝 Data Structure

The app expects idioms in the following JSON format:

```json
{
  "idiom": "Break a leg",
  "fonetic": "/breɪk ə lɛɡ/",
  "persian": "موفق باشی",
  "example": "Before his performance, his friend said '<span class='idiom-highlight'>break a leg</span>'!",
  "exampleMeaning": "قبل از اجرا، دوستش به او گفت 'موفق باشی'!"
}
```

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 🎨 Key CSS Animations

The app includes custom animations:
- `diceRoll` - For randomize button
- `slideIn` - For idiom list items during shuffle
- `fadeIn/fadeOut` - For smooth detail panel transitions
- `pulse` - Loading indicators

## 🌍 Localization

The interface is fully RTL (Right-to-Left) optimized for Persian language support. The app uses:
- RTL layout (`dir="rtl"`)
- Persian translations for all educational content
- Persian search functionality

## 🤝 Contributing

This is an **open-source** project! To add your favorite idioms:

1. Fork the repository
2. Add your idioms to `/public/community/idioms.json`
3. Maintain the JSON structure
4. Submit a pull request

### Idiom Contribution Guidelines
- Ensure accurate Persian translations
- Provide realistic example sentences
- Include phonetic pronunciation (IPA recommended)
- Verify example meanings in Persian

## 📄 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Future Roadmap

Potential improvements:
- [ ] Audio pronunciation for idioms
- [ ] Quiz/Flashcard mode
- [ ] Progress tracking
- [ ] User accounts for saving favorites
- [ ] Categorized idioms by difficulty/topic
- [ ] Daily idiom notifications
- [ ] Practice exercises

## 📧 Support

For issues or suggestions:
- Open an issue in the repository
- Contribute directly via pull requests

## 📜 License

This project is open-source and available under the MIT License.

**Happy Learning! 🦜** 
*Master English idioms, one phrase at a time.*

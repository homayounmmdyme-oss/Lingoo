# 🦜 Lingo - Learn English with Fun!

<div align="center">

🇮🇷 [فارسی](./README.fa.md) | 🇺🇸 [English](./README.md)

</div>

An interactive web application designed for Persian speakers to master English idioms AND test their knowledge through exciting trivia quizzes. Built with modern web technologies for a seamless, engaging learning experience.

## 🎯 Purpose

Lingo is specifically designed for **Persian speakers** to learn English through two powerful approaches:

### 1. 📚 Idioms Dictionary
- Master over 100+ English idioms with Persian translations
- Learn through real-world example sentences
- Understand contextual usage with example meanings

### 2. 🎯 Trivia Quiz Game
- Test your English knowledge with multiple-choice questions
- Learn fun facts about English language and culture
- Track your score and progress

## ✨ Features

### 📚 Idioms Section

#### Comprehensive Idiom Collection
- Browse idioms sorted alphabetically or randomly
- Each idiom includes:
  - English phrase
  - Phonetic pronunciation
  - Persian translation
  - Example sentence (with idiom highlighted)
  - Example meaning in Persian

#### 🔍 Search & Filter
- Search idioms in English or Persian
- Real-time filtering results
- Shows count of matching idioms

#### 🎲 Smart Randomization
- "Random" mode with animated dice effect
- Shuffle idioms for varied practice sessions
- Smooth grid animations during shuffling

#### 🧭 Intuitive Navigation
- Next/Previous buttons for sequential learning
- Click any idiom from the collection list
- Keyboard-friendly interface (RTL support for Persian)

### 🎯 Trivia Section

#### Question Grid View
- All questions displayed as clickable cards
- Visual progress tracking
- Random question selector

#### Interactive Quiz Experience
- Multiple-choice questions about English language
- Immediate feedback on answers
- Fun facts after each question
- Score tracking throughout the quiz

#### Smooth Navigation
- Sequential question flow
- Previous/Next question buttons
- Return to grid view after completion

### 🎨 Beautiful UI/UX
- Responsive gradient background
- Smooth transitions and animations
- Dark/Light friendly color scheme
- Hover effects and visual feedback
- Full RTL support for Persian language
- Mobile-responsive design

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| Next.js (App Router) | 16.2.6 |
| React | 19.2.4 |
| React DOM | 19.2.4 |
| Tailwind CSS | ^4 |
| TypeScript | ^5 |
| ESLint | ^9 |

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/homayounmmdy/Lingoo
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
│   ├── page.tsx                    # Home page (main entry)
│   ├── trivia/
│   │   ├── page.tsx                # Trivia grid view
│   │   └── question/
│   │       └── [id]/
│   │           └── page.tsx        # Individual question page
│   └── idioms/
│       └── page.tsx                # Idioms dictionary page
├── public/
│   └── community/
│       ├── idioms.json             # Idioms database
│       └── english-trivia.json     # Trivia questions database
├── package.json
├── tailwind.config.js
└── README.md
```

## 📝 Data Structures

### Idioms JSON Format
```json
{
  "idiom": "Break a leg",
  "fonetic": "/breɪk ə lɛɡ/",
  "persian": "موفق باشی",
  "example": "Before his performance, his friend said 'break a leg'!",
  "exampleMeaning": "قبل از اجرا، دوستش به او گفت 'موفق باشی'!"
}
```

### Trivia JSON Format
```json
{
  "question": "What does 'piece of cake' mean?",
  "answers": ["Very easy task", "A delicious cake", "A small problem", "A celebration"],
  "correctIndex": 0,
  "funFact": "This idiom originated in the 1930s when cakes were given as prizes to competition winners!"
}
```

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 🎨 Key CSS Animations

The app includes custom animations:
- `bounce` - For home page card icons
- `diceRoll` - For randomize button in idioms
- `slideIn` - For idiom list items during shuffle
- `fadeIn/fadeOut` - For smooth detail panel transitions
- `pulse` - Loading indicators
- `scale` - For interactive button feedback

## 🌍 Localization

The interface is fully RTL (Right-to-Left) optimized for Persian language support. The app uses:
- RTL layout (`dir="rtl"`)
- Persian translations for all educational content
- Persian search functionality
- Persian UI text throughout

## 🤝 Contributing

This is an **open-source** project! To contribute:

### Adding New Idioms
1. Fork the repository
2. Add your idioms to `/public/community/idioms.json`
3. Maintain the JSON structure
4. Submit a pull request

### Adding New Trivia Questions
1. Add questions to `/public/community/english-trivia.json`
2. Ensure each question has:
   - Clear, accurate question text
   - 4 answer options (one correct)
   - An educational fun fact
3. Submit a pull request

### Contribution Guidelines
- Ensure accurate Persian translations
- Provide realistic example sentences for idioms
- Include phonetic pronunciation (IPA recommended)
- Verify example meanings in Persian
- Make trivia questions educational and interesting
- Keep fun facts brief but informative

## 📄 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Future Roadmap

- [ ] Audio pronunciation for idioms and vocabulary
- [ ] Flashcard mode for spaced repetition
- [ ] Progress tracking and statistics
- [ ] User accounts for saving favorites
- [ ] Categorized idioms by difficulty/topic
- [ ] Daily idiom notifications
- [ ] Practice exercises and quizzes
- [ ] Leaderboards for trivia scores
- [ ] Multiple difficulty levels for trivia
- [ ] Dark mode toggle
- [ ] Offline support with PWA

## 📧 Support

For issues, suggestions, or contributions:
- Open an issue in the repository
- Submit pull requests for improvements
- Contact the maintainers directly

## 📜 License

This project is open-source and available under the **MIT License**.

**Happy Learning! 🦜** 

*Master English, one idiom and one question at a time.*

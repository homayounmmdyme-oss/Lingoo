# 🤝 Contributing to Lingo

Thank you for your interest in contributing to Lingo! Please follow these guidelines to ensure a smooth contribution process.

## 📋 Before You Start

### Check Existing Issues First
**DO NOT directly add idioms or trivia questions** without checking open issues first.

1. Go to [Issues](https://github.com/homayounmmdy/Lingoo/issues)
2. Look for issues labeled:
   - `good-first-issue`
   - `help-wanted`
   - `community`
   - `first-timers`
3. **Comment on the issue** saying you want to work on it
4. Wait for assignment or confirmation

### Why This Matters
- Prevents duplicate work
- Ensures quality control
- Maintains consistent JSON structure
- Allows maintainers to track contributions

## 🔧 Contribution Workflow

### Step 1: Fork & Clone
```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR-USERNAME/Lingoo
cd Lingoo
```

### Step 2: Create a Separate Branch
**ALWAYS create a new branch for your contribution**

```bash
# For idioms
git checkout -b add-idiom-[idiom-name]

# For trivia
git checkout -b add-trivia-[question-topic]

# For bug fixes
git checkout -b fix-[bug-description]

# For features
git checkout -b feature-[feature-name]
```

### Step 3: Read the Issue Carefully
- Understand exactly what's needed
- Check any specific requirements mentioned
- Follow the JSON structure exactly as specified
- Verify Persian translations if applicable

### Step 4: Make Your Changes
```bash
# Add your changes
git add .

# Commit with clear message
git commit -m "add: [description of what you added]"

# Push to your fork
git push origin [your-branch-name]
```

### Step 5: Open a Pull Request
1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. **Link the issue** by writing `Closes #issue-number` in the PR description
5. Submit for review

## 📝 What to Contribute

### 🐛 Bug Reports
- Check if the bug already reported
- Use the bug report template
- Include steps to reproduce
- Add screenshots if helpful

### 💡 Feature Suggestions
- Check existing feature requests
- Explain the feature clearly
- Describe benefits for Persian speakers
- Be specific about implementation ideas

### 🎮 Trivia Questions
**Only after being assigned to an issue:**
- Add to `/public/community/english-trivia.json`
- Follow exact JSON format
- Verify all answers are correct
- Include educational fun fact

### 📚 Idioms
**Only after being assigned to an issue:**
- Add to `/public/community/idioms.json`
- Follow exact JSON format
- Ensure accurate Persian translation
- Provide natural example sentence

## ❌ What NOT to Do

- **Don't** directly add idioms without an issue
- **Don't** work on the main branch
- **Don't** submit unrelated changes in one PR
- **Don't** ignore the issue requirements
- **Don't** submit without testing locally first

## ✅ Pull Request Checklist

Before submitting, verify:

- [ ] I read the issue carefully
- [ ] I created a separate branch
- [ ] My changes match the issue requirements
- [ ] JSON syntax is valid
- [ ] My commit message is clear
- [ ] I linked the issue in PR description

## 🚀 Development Setup

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Check for errors
npm run lint

# Build to test production
npm run build
```

## 💬 Need Help?

- **Read the issue again** - Requirements are usually there
- **Comment on the issue** - Ask for clarification
- **Check README.md** - For project structure
- **Open a discussion** - For general questions

## 📌 Remember

1. **Always check issues first** - Don't assume what's needed
2. **Create separate branches** - One contribution per branch
3. **Read requirements carefully** - Follow exactly what's asked
4. **Link your PR to the issue** - So maintainers know what it fixes
5. **Be patient** - Reviews take time

## ⭐ First Time Contributors?

Look for issues labeled:
- `good-first-issue`
- `beginner-friendly`
- `first-timers`

These have clear instructions and are perfect for getting started.

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/homayounmmdy/Lingoo/issues)

**Thank you for contributing responsibly! 🦜**
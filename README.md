# Password-Checker

# 🔐 PasswordLab — Password Strength Checker

A browser-based password strength analyzer and secure password generator built with HTML, CSS, and JavaScript.

PasswordLab helps users understand password security by analyzing password length, character variety, common patterns, and estimated entropy.

## 🚀 Features

- Real-time password strength analysis
- Password strength levels:
  - Weak
  - Medium
  - Strong
  - Very Strong
- Password length analysis
- Character variety detection
- Common password detection
- Repeated character detection
- Sequential pattern detection
- Estimated password entropy
- Security checklist
- Actionable recommendations
- Secure random password generator
- Adjustable password length
- Copy generated password to clipboard
- Show and hide password option
- Responsive user interface

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Crypto API

## 📂 Project Structure

```text
PasswordLab/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── .gitignore
```

## 💻 Installation and Usage

### Option 1: Download the project

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in your web browser.
4. Enter a password to analyze its strength.
5. Use the password generator to create a random password.

### Option 2: Clone using Git

```bash
git clone https://github.com/YOUR_USERNAME/PasswordLab.git
```

Navigate to the project directory:

```bash
cd PasswordLab
```

Open `index.html` in your browser.

## 🔍 How It Works

PasswordLab evaluates several password characteristics:

### Password Length

Longer passwords generally provide better resistance to guessing attacks.

### Character Variety

The analyzer checks for:

- Lowercase letters
- Uppercase letters
- Numbers
- Special characters

### Pattern Detection

The project identifies some predictable patterns, including:

- Common passwords
- Repeated characters
- Sequential characters

### Entropy Estimation

The application calculates a rough entropy estimate based on password length and character categories.

The entropy value is educational and should not be interpreted as an exact measure of password security.

## 🔒 Privacy and Security

- Password analysis runs locally in the browser.
- Passwords are not stored in a database.
- Passwords are not transmitted to a server.
- The project does not use a backend.
- The password generator uses the browser's Web Crypto API.

## ⚠️ Limitations

This project is an educational password-strength checker.

It does not:

- Check passwords against breached-password databases
- Perform actual password cracking
- Guarantee that a password is secure
- Use a comprehensive password-strength estimation model
- Replace a professional password manager

The strength score uses simple heuristic rules and should not be treated as a definitive security assessment.

## 🎯 Project Objective

The objective of this project is to demonstrate practical understanding of:

- Password security
- Authentication security concepts
- Password complexity analysis
- Predictable password patterns
- Client-side JavaScript
- Secure random number generation
- Privacy-conscious application design

## 👨‍💻 Author

Created as a cybersecurity learning project.

## 📜 License

This project is licensed under the MIT License.

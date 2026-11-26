
"use strict";

// ========================================
// PASSWORD LAB - PASSWORD STRENGTH CHECKER
// ========================================

// HTML elements
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");

const strengthLabel = document.getElementById("strengthLabel");
const strengthFill = document.getElementById("strengthFill");
const strengthSummary = document.getElementById("strengthSummary");

const lengthValue = document.getElementById("lengthValue");
const typesValue = document.getElementById("typesValue");
const entropyValue = document.getElementById("entropyValue");
const patternValue = document.getElementById("patternValue");

const checklist = document.getElementById("checklist");
const checkCount = document.getElementById("checkCount");
const recommendations = document.getElementById("recommendations");

const lengthSlider = document.getElementById("lengthSlider");
const generatedLength = document.getElementById("generatedLength");
const generatedPassword = document.getElementById("generatedPassword");

const generateButton = document.getElementById("generateButton");
const copyGenerated = document.getElementById("copyGenerated");
const copyStatus = document.getElementById("copyStatus");


// ========================================
// COMMON PASSWORDS
// ========================================

const commonPasswords = [
    "password",
    "password123",
    "123456",
    "123456789",
    "qwerty",
    "qwerty123",
    "admin",
    "admin123",
    "welcome",
    "iloveyou",
    "abc123",
    "letmein",
    "monkey",
    "dragon",
    "football",
    "master",
    "sunshine",
    "login",
    "princess",
    "trustno1"
];


// ========================================
// CHECK PASSWORD PATTERNS
// ========================================

function hasRepeatedCharacters(password) {
    return /(.)\1{2,}/.test(password);
}


function hasSequentialPattern(password) {
    const sequences = [
        "0123456789",
        "9876543210",
        "abcdefghijklmnopqrstuvwxyz",
        "zyxwvutsrqponmlkjihgfedcba",
        "qwertyuiop",
        "poiuytrewq",
        "asdfghjkl",
        "lkjhgfdsa",
        "zxcvbnm",
        "mnbvcxz"
    ];

    const lowerPassword = password.toLowerCase();

    for (const sequence of sequences) {
        for (let i = 0; i <= sequence.length - 3; i++) {
            const pattern = sequence.substring(i, i + 3);

            if (lowerPassword.includes(pattern)) {
                return true;
            }
        }
    }

    return false;
}


// ========================================
// ENTROPY ESTIMATION
// ========================================

function calculateEntropy(password) {
    let poolSize = 0;

    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;

    if (poolSize === 0 || password.length === 0) {
        return 0;
    }

    return Math.round(
        password.length * Math.log2(poolSize)
    );
}


// ========================================
// CHECKLIST
// ========================================

function updateChecklist(password) {
    const checks = [
        {
            label: "At least 12 characters",
            passed: password.length >= 12
        },
        {
            label: "Contains uppercase letters",
            passed: /[A-Z]/.test(password)
        },
        {
            label: "Contains lowercase letters",
            passed: /[a-z]/.test(password)
        },
        {
            label: "Contains numbers",
            passed: /[0-9]/.test(password)
        },
        {
            label: "Contains special characters",
            passed: /[^a-zA-Z0-9]/.test(password)
        }
    ];

    checklist.innerHTML = "";

    let passedCount = 0;

    checks.forEach(function (check) {
        const li = document.createElement("li");

        li.className = check.passed ? "valid" : "pending";

        const icon = document.createElement("span");
        icon.className = "check-icon";
        icon.textContent = check.passed ? "✓" : "•";

        const text = document.createElement("span");
        text.textContent = check.label;

        li.appendChild(icon);
        li.appendChild(text);

        checklist.appendChild(li);

        if (check.passed) {
            passedCount++;
        }
    });

    checkCount.textContent = passedCount + " / 5";
}


// ========================================
// RECOMMENDATIONS
// ========================================

function updateRecommendations(
    password,
    common,
    repeated,
    sequential
) {
    const items = [];

    if (password.length < 12) {
        items.push(
            "Use at least 12 characters. Longer passwords are generally harder to guess."
        );
    }

    if (!/[A-Z]/.test(password)) {
        items.push("Consider adding uppercase letters.");
    }

    if (!/[a-z]/.test(password)) {
        items.push("Consider adding lowercase letters.");
    }

    if (!/[0-9]/.test(password)) {
        items.push("Consider adding numbers.");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        items.push("Consider adding special characters.");
    }

    if (common) {
        items.push(
            "Avoid common passwords. Choose a unique password."
        );
    }

    if (repeated) {
        items.push(
            "Avoid repeated characters such as aaaaa or 11111."
        );
    }

    if (sequential) {
        items.push(
            "Avoid predictable sequences such as 123 or abc."
        );
    }

    if (password.length >= 16 && !common && !repeated && !sequential) {
        items.push(
            "Good length. Make sure this password is unique to one account."
        );
    }

    if (items.length === 0) {
        items.push(
            "Use a longer, unique password or passphrase for better security."
        );
    }

    recommendations.innerHTML = "";

    items.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        recommendations.appendChild(li);
    });
}


// ========================================
// PASSWORD ANALYSIS
// ========================================

function analyzePassword(password) {
    if (password.length === 0) {
        strengthLabel.textContent = "Not tested";
        strengthLabel.className = "strength-label neutral";

        strengthFill.style.width = "0%";

        strengthSummary.textContent =
            "Enter a password to see your security analysis.";

        lengthValue.textContent = "0 chars";
        typesValue.textContent = "0 / 4";
        entropyValue.textContent = "— bits";
        patternValue.textContent = "—";

        checklist.innerHTML =
            '<li class="pending">' +
            '<span class="check-icon">•</span>' +
            '<span>Enter a password to start checking.</span>' +
            '</li>';

        checkCount.textContent = "0 / 5";

        recommendations.innerHTML =
            "<li>Use a long, unique password or passphrase.</li>";

        return;
    }

    let score = 0;

    const length = password.length;

    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const numbers = /[0-9]/.test(password);
    const special = /[^a-zA-Z0-9]/.test(password);

    const types =
        Number(lowercase) +
        Number(uppercase) +
        Number(numbers) +
        Number(special);

    const lowerPassword = password.toLowerCase();

    const common = commonPasswords.includes(lowerPassword);
    const repeated = hasRepeatedCharacters(password);
    const sequential = hasSequentialPattern(password);

    // Length scoring
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (length >= 20) score++;

    // Character variety
    score += types;

    // Pattern penalties
    if (repeated) score -= 2;
    if (sequential) score -= 2;

    // Common password penalty
    if (common) score = 0;

    // Very short password penalty
    if (length < 8) {
        score = Math.min(score, 1);
    }

    score = Math.max(0, score);

    // Strength rating
    let strength;
    let color;
    let percentage;

    if (score <= 2) {
        strength = "Weak";
        color = "#ef4444";
        percentage = 25;
    } else if (score <= 4) {
        strength = "Medium";
        color = "#f59e0b";
        percentage = 50;
    } else if (score <= 6) {
        strength = "Strong";
        color = "#22c55e";
        percentage = 75;
    } else {
        strength = "Very Strong";
        color = "#16a34a";
        percentage = 100;
    }

    if (common) {
        strength = "Weak";
        color = "#ef4444";
        percentage = 15;
    }

    // Update strength label
    strengthLabel.textContent = strength;
    strengthLabel.className =
        "strength-label " + strength.toLowerCase().replace(" ", "-");

    // Update strength bar
    strengthFill.style.width = percentage + "%";
    strengthFill.style.backgroundColor = color;

    // Update metrics
    lengthValue.textContent = length + " chars";
    typesValue.textContent = types + " / 4";

    entropyValue.textContent =
        calculateEntropy(password) + " bits";

    // Pattern status
    if (common || repeated || sequential) {
        patternValue.textContent = "Issues found";
    } else {
        patternValue.textContent = "No basic patterns";
    }

    // Summary
    if (common) {
        strengthSummary.textContent =
            "This password is commonly used and should be avoided.";
    } else if (repeated) {
        strengthSummary.textContent =
            "Repeated characters reduce password predictability.";
    } else if (sequential) {
        strengthSummary.textContent =
            "Predictable sequences were detected.";
    } else if (strength === "Very Strong") {
        strengthSummary.textContent =
            "Good length and character variety. Use it only for one account.";
    } else if (strength === "Strong") {
        strengthSummary.textContent =
            "Good password. Consider making it longer.";
    } else if (strength === "Medium") {
        strengthSummary.textContent =
            "Improve your password by adding length and variety.";
    } else {
        strengthSummary.textContent =
            "This password is weak. Try a longer, unique passphrase.";
    }

    // Update checklist and recommendations
    updateChecklist(password);

    updateRecommendations(
        password,
        common,
        repeated,
        sequential
    );
}


// ========================================
// PASSWORD INPUT
// ========================================

passwordInput.addEventListener("input", function () {
    analyzePassword(passwordInput.value);
});


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

togglePassword.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    togglePassword.textContent = isHidden ? "◎" : "◉";

    togglePassword.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
    );

    togglePassword.setAttribute(
        "title",
        isHidden ? "Hide password" : "Show password"
    );
});


// ========================================
// SECURE PASSWORD GENERATOR
// ========================================

function generateSecurePassword(length) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}";

    const allCharacters =
        lowercase + uppercase + digits + symbols;

    const randomValues = new Uint32Array(length);

    crypto.getRandomValues(randomValues);

    let password = "";

    // Ensure at least one character from each group
    const requiredCharacters = [
        lowercase,
        uppercase,
        digits,
        symbols
    ];

    for (let i = 0; i < requiredCharacters.length; i++) {
        const group = requiredCharacters[i];

        const randomIndex =
            randomValues[i] % group.length;

        password += group[randomIndex];
    }

    // Fill remaining length
    for (let i = requiredCharacters.length; i < length; i++) {
        const randomIndex =
            randomValues[i] % allCharacters.length;

        password += allCharacters[randomIndex];
    }

    // Shuffle password using cryptographic random values
    const shuffleValues = new Uint32Array(length);

    crypto.getRandomValues(shuffleValues);

    const characters = password.split("");

    for (let i = characters.length - 1; i > 0; i--) {
        const j = shuffleValues[i] % (i + 1);

        [characters[i], characters[j]] =
            [characters[j], characters[i]];
    }

    return characters.join("");
}


// ========================================
// GENERATOR SLIDER
// ========================================

lengthSlider.addEventListener("input", function () {
    generatedLength.textContent = lengthSlider.value;
});


// ========================================
// GENERATE PASSWORD BUTTON
// ========================================

generateButton.addEventListener("click", function () {
    const length = Number(lengthSlider.value);

    const password = generateSecurePassword(length);

    generatedPassword.value = password;

    copyStatus.textContent =
        "Password generated successfully.";

    copyStatus.style.color = "#22c55e";
});


// ========================================
// COPY GENERATED PASSWORD
// ========================================

copyGenerated.addEventListener("click", async function () {
    const password = generatedPassword.value;

    if (!password) {
        copyStatus.textContent =
            "Generate a password first.";

        copyStatus.style.color = "#ef4444";

        return;
    }

    try {
        await navigator.clipboard.writeText(password);

        copyStatus.textContent =
            "Password copied to clipboard.";

        copyStatus.style.color = "#22c55e";
    } catch (error) {
        copyStatus.textContent =
            "Copy failed. Please copy it manually.";

        copyStatus.style.color = "#ef4444";
    }
});


// ========================================
// INITIAL STATE
// ========================================

analyzePassword("");

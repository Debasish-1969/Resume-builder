// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
});

// --- Global Variables and Constants ---
const app = document.getElementById('app');
const landingPage = document.getElementById('landing-page');
const resumeApp = document.getElementById('resume-app');
const getStartedBtn = document.getElementById('get-started-btn');
const getStartedBtnBottom = document.getElementById('get-started-btn-bottom');
const learnMoreBtn = document.getElementById('learn-more-btn');
const appLogo = document.getElementById('app-logo');

const themeToggle = document.getElementById('theme-toggle');
const colorPalette = document.getElementById('color-palette');
const colorButtons = colorPalette.querySelectorAll('button');

const formSteps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('[data-step-indicator]');
const prevStepBtn = document.getElementById('prev-step');
const nextStepBtn = document.getElementById('next-step');
let currentStep = 0;

const resumeForm = document.getElementById('resume-form');
const resumePreview = document.getElementById('resume-preview');
const resumePreviewContent = document.getElementById('resume-preview-content');

const addEducationBtn = document.getElementById('add-education');
const educationEntries = document.getElementById('education-entries');
const addExperienceBtn = document.getElementById('add-experience');

const downloadPdfBtn = document.getElementById('download-pdf');
const exportJsonBtn = document.getElementById('export-json');
const importJsonInput = document.getElementById('import-json-input');

const aiSuggestSummaryBtn = document.getElementById('ai-suggest-summary');
const aiLoadingSpinner = document.getElementById('ai-loading-spinner');
const summaryTextarea = document.getElementById('summary');

const completenessScore = document.getElementById('completeness-score');
const keywordDensity = document.getElementById('keyword-density');
const overallScore = document.getElementById('overall-score');

const templateSelect = document.getElementById('template-select');

const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavButtons = mobileNav.querySelectorAll('button[data-step]');
const mobileImportJsonBtn = document.getElementById('mobile-import-json');
const mobileExportJsonBtn = document.getElementById('mobile-export-json');
const mobileDownloadPdfBtn = document.getElementById('mobile-download-pdf');

const animatedCharacterContainer = document.getElementById('animated-character-container');
const animatedCharacter = document.getElementById('animated-character');

const messageBox = document.getElementById('message-box');
const messageOverlay = document.getElementById('message-overlay');
const messageContent = document.getElementById('message-content');
const messageBoxOkButton = document.getElementById('message-box-ok-button');

const tutorialOverlay = document.getElementById('tutorial-overlay');
const tutorialModal = tutorialOverlay.querySelector('.tutorial-modal');
const tutorialTitle = document.getElementById('tutorial-title');
const tutorialText = document.getElementById('tutorial-text');
const tutorialNextButton = document.getElementById('tutorial-next-button');
const tutorialCloseButton = document.getElementById('tutorial-close-button');
let tutorialStep = 0;

const statResumes = document.getElementById('stat-resumes');
const statUsers = document.getElementById('stat-users');
const statFeatures = document.getElementById('stat-features');

const chatbotModal = document.getElementById('chatbot-modal');
const chatbotCloseButton = document.getElementById('chatbot-close-button');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInputField = document.getElementById('chatbot-input-field');
const chatbotSendButton = document.getElementById('chatbot-send-button');
const chatbotLoadingSpinner = document.getElementById('chatbot-loading-spinner');

const authModal = document.getElementById('auth-modal');
const authCloseButton = document.getElementById('auth-close-button');
const authTitle = document.getElementById('auth-title');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const authButton = document.getElementById('auth-button');
const logoutButton = document.getElementById('logout-button');
const userDisplay = document.getElementById('user-display');

// Firebase variables (will be initialized after SDKs are loaded)
// These are declared globally so they can be accessed throughout the script.
let firebaseApp;
let auth;
let db;
let currentUserId = null;
let isAuthReady = false; // Flag to indicate if Firebase Auth is initialized and user state is known

// IMPORTANT: YOUR FIREBASE CONFIG MUST BE DECLARED GLOBALLY HERE
// This is the ONLY place firebaseConfig should be defined.
// Replace all "YOUR_..." placeholders with your actual values from Firebase Console.
const firebaseConfig = {
    apiKey: "AIzaSyDKxl87_qmUKSgl4xKPAyAqMZ2no8qbSpU", // Replace with your actual Firebase API Key
    authDomain: "myresumebuilder-efcb9.firebaseapp.com", // Replace with your actual Auth Domain
    projectId: "myresumebuilder-efcb9", // Replace with your actual Project ID
    storageBucket: "myresumebuilder-efcb9.firebasestorage.app", // Replace with your actual Storage Bucket
    messagingSenderId: "1065439564402", // Replace with your actual Messaging Sender ID
    appId: "1:1065439564402:web:84bd7e16269ba7f61a28eb", // Replace with your actual App ID
    measurementId: "G-ZBDT1DJ755" // Replace with your actual Measurement ID (optional)
};


// --- Resume Data Structure ---
let resumeData = {
    personal: {
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        address: ''
    },
    education: [],
    experience: [],
    skills: '',
    summary: '',
    template: 'classic'
};

// --- Theme Definitions ---
const THEMES = {
    'indigo': { primary: '#4F46E5', secondary: '#6366F1', accent: '#EC4899' },
    'blue': { primary: '#3B82F6', secondary: '#60A5FA', accent: '#EF4444' },
    'green': { primary: '#22C55E', secondary: '#4ADE80', accent: '#FACC15' },
    'purple': { primary: '#9333EA', secondary: '#A855F7', accent: '#EC4899' },
    'pink': { primary: '#EC4899', secondary: '#F472B6', accent: '#8B5CF6' },
    'red': { primary: '#EF4444', secondary: '#F87171', accent: '#FACC15' },
    'yellow': { primary: '#EAB308', secondary: '#FDE047', accent: '#EF4444' },
    'orange': { primary: '#F97316', secondary: '#FB923C', accent: '#22C55E' },
    'teal': { primary: '#14B8A6', secondary: '#2DD4BF', accent: '#FACC15' },
    'cyan': { primary: '#06B6D4', secondary: '#22D3EE', accent: '#EF4444' }
};

// --- Utility Functions ---
function showMessageBox(message) {
    messageContent.textContent = message;
    messageBox.style.display = 'block';
    messageOverlay.style.display = 'block';
}

function hideMessageBox() {
    messageBox.style.display = 'none';
    messageOverlay.style.display = 'none';
}

// --- Theme Management ---
function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (theme) {
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);
        localStorage.setItem('selectedTheme', themeName);
        // Re-render preview to apply new theme colors to resume content
        updatePreview();
    }
}

function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark-mode')) {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    } else {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    }
}

function initializeTheme() {
    // Check for system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode)) {
        document.documentElement.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
    }

    // Apply saved color theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'indigo'; // Default to indigo
    applyTheme(savedTheme);
}

// --- Landing Page Animations ---
function animateNumbers() {
    const duration = 2000; // milliseconds
    const start = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        statResumes.textContent = `${Math.floor(progress * 1500)}+`;
        statUsers.textContent = `${Math.floor(progress * 800)}+`;
        statFeatures.textContent = `${Math.floor(progress * 10)}+`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

// --- Multi-Step Form Logic ---
function showStep(step) {
    formSteps.forEach((s, index) => {
        s.classList.add('hidden');
        if (index === step) {
            s.classList.remove('hidden');
        }
    });
    updateProgressIndicator(step);
    updateNavigationButtons(step);
    currentStep = step;
    // Scroll to top of form when changing step
    resumeForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateProgressIndicator(step) {
    stepIndicators.forEach((indicator, index) => {
        if (index <= step) {
            indicator.classList.remove('bg-gray-400');
            indicator.classList.add('bg-primary');
        } else {
            indicator.classList.remove('bg-primary');
            indicator.classList.add('bg-gray-400');
        }
    });
}

function updateNavigationButtons(step) {
    prevStepBtn.classList.toggle('hidden', step === 0);
    nextStepBtn.classList.toggle('hidden', step === formSteps.length - 1);
    if (step === formSteps.length - 1) {
        // For the last step, we might want a "Finish" or "Download" button
        // but the current UI already has download/export buttons on this step.
        // So, just hide next button.
    }
}

function goToNextStep() {
    // Basic validation for current step before moving on
    const currentFormSection = formSteps[currentStep];
    const requiredInputs = currentFormSection.querySelectorAll('[required]');
    let allValid = true;
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500', 'ring-red-500');
            allValid = false;
        } else {
            input.classList.remove('border-red-500', 'ring-red-500');
        }
    });

    if (!allValid) {
        showMessageBox('Please fill in all required fields before proceeding.');
        return;
    }

    if (currentStep < formSteps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function goToPrevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// --- Dynamic Form Fields (Education & Experience) ---
function createEducationEntry(edu = {}) {
    const id = `edu-${Date.now()}`;
    const div = document.createElement('div');
    div.className = 'bg-input-bg-color p-4 rounded-md mb-4 border border-border-color relative';
    div.innerHTML = `
        <button type="button" class="remove-entry absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl" data-id="${id}">&times;</button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label for="${id}-degree" class="block text-sm font-medium text-text-color mb-1">Degree/Qualification</label>
                <input type="text" id="${id}-degree" name="degree" value="${edu.degree || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-major" class="block text-sm font-medium text-text-color mb-1">Major/Field of Study</label>
                <input type="text" id="${id}-major" name="major" value="${edu.major || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-university" class="block text-sm font-medium text-text-color mb-1">University/Institution</label>
                <input type="text" id="${id}-university" name="university" value="${edu.university || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-location" class="block text-sm font-medium text-text-color mb-1">Location</label>
                <input type="text" id="${id}-location" name="location" value="${edu.location || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-start-date" class="block text-sm font-medium text-text-color mb-1">Start Date</label>
                <input type="month" id="${id}-start-date" name="startDate" value="${edu.startDate || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-end-date" class="block text-sm font-medium text-text-color mb-1">End Date (or 'Present')</label>
                <input type="month" id="${id}-end-date" name="endDate" value="${edu.endDate || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
        </div>
    `;
    educationEntries.appendChild(div);
    div.querySelector('.remove-entry').addEventListener('click', () => {
        div.remove();
        updateResumeData();
    });
}

function createExperienceEntry(exp = {}) {
    const id = `exp-${Date.now()}`;
    const div = document.createElement('div');
    div.className = 'bg-input-bg-color p-4 rounded-md mb-4 border border-border-color relative';
    div.innerHTML = `
        <button type="button" class="remove-entry absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl" data-id="${id}">&times;</button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label for="${id}-title" class="block text-sm font-medium text-text-color mb-1">Job Title</label>
                <input type="text" id="${id}-title" name="title" value="${exp.title || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-company" class="block text-sm font-medium text-text-color mb-1">Company</label>
                <input type="text" id="${id}-company" name="company" value="${exp.company || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-location" class="block text-sm font-medium text-text-color mb-1">Location</label>
                <input type="text" id="${id}-location" name="location" value="${exp.location || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-start-date" class="block text-sm font-medium text-text-color mb-1">Start Date</label>
                <input type="month" id="${id}-start-date" name="startDate" value="${exp.startDate || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
            <div>
                <label for="${id}-end-date" class="block text-sm font-medium text-text-color mb-1">End Date (or 'Present')</label>
                <input type="month" id="${id}-end-date" name="endDate" value="${exp.endDate || ''}" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">
            </div>
        </div>
        <div>
            <label for="${id}-description" class="block text-sm font-medium text-text-color mb-1">Responsibilities/Achievements (one per line)</label>
            <textarea id="${id}-description" name="description" rows="4" class="w-full p-2 rounded-md border border-border-color focus:ring focus:ring-primary">${exp.description || ''}</textarea>
        </div>
    `;
    experienceEntries.appendChild(div);
    div.querySelector('.remove-entry').addEventListener('click', () => {
        div.remove();
        updateResumeData();
    });
}

// --- Data Management (Autosave, Import/Export) ---
let autosaveTimeout;
async function updateResumeData() {
    clearTimeout(autosaveTimeout);
    autosaveTimeout = setTimeout(async () => {
        // Personal Details
        resumeData.personal = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            linkedin: document.getElementById('linkedin').value,
            address: document.getElementById('address').value
        };

        // Education
        resumeData.education = Array.from(educationEntries.children).map(entry => ({
            degree: entry.querySelector('[name="degree"]').value,
            major: entry.querySelector('[name="major"]').value,
            university: entry.querySelector('[name="university"]').value,
            location: entry.querySelector('[name="location"]').value,
            startDate: entry.querySelector('[name="startDate"]').value,
            endDate: entry.querySelector('[name="endDate"]').value
        }));

        // Experience
        resumeData.experience = Array.from(experienceEntries.children).map(entry => ({
            title: entry.querySelector('[name="title"]').value,
            company: entry.querySelector('[name="company"]').value,
            location: entry.querySelector('[name="location"]').value,
            startDate: entry.querySelector('[name="startDate"]').value,
            endDate: entry.querySelector('[name="endDate"]').value,
            description: entry.querySelector('[name="description"]').value
        }));

        // Skills and Summary
        resumeData.skills = document.getElementById('skills').value;
        resumeData.summary = document.getElementById('summary').value;

        // Template
        resumeData.template = templateSelect.value;

        // Save to Firestore if authenticated
        if (isAuthReady && currentUserId) {
            try {
                // Use the projectId from firebaseConfig for the app ID in Firestore paths
                const appId = firebaseConfig.projectId;
                const resumeDocRef = firebase.doc(db, `artifacts/${appId}/users/${currentUserId}/resumes/myResume`);
                await firebase.setDoc(resumeDocRef, resumeData, { merge: true });
                console.log("Resume data saved to Firestore!");
            } catch (error) {
                console.error("Error saving resume data to Firestore:", error);
                showMessageBox("Error saving your data. Please check your connection.");
            }
        } else {
            // Fallback to localStorage if not authenticated or auth not ready
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            console.log("Resume data saved to localStorage (not authenticated).");
        }

        updatePreview();
        updateResumeAnalytics();
    }, 500); // Debounce for 500ms
}

async function loadResumeData() {
    let loadedData = null;

    if (isAuthReady && currentUserId) {
        try {
            // Use the projectId from firebaseConfig for the app ID in Firestore paths
            const appId = firebaseConfig.projectId;
            const resumeDocRef = firebase.doc(db, `artifacts/${appId}/users/${currentUserId}/resumes/myResume`);
            const docSnap = await firebase.getDoc(resumeDocRef);
            if (docSnap.exists()) {
                loadedData = docSnap.data();
                console.log("Resume data loaded from Firestore.");
            } else {
                console.log("No resume data found in Firestore for this user.");
            }
        } catch (error) {
            console.error("Error loading resume data from Firestore:", error);
            showMessageBox("Error loading your data from cloud. Using local data if available.");
        }
    }

    // Fallback to localStorage if no data from Firestore or not authenticated
    if (!loadedData) {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            loadedData = JSON.parse(savedData);
            console.log("Resume data loaded from localStorage.");
        }
    }

    if (loadedData) {
        resumeData = loadedData;
        // Populate form fields
        document.getElementById('name').value = resumeData.personal.name || '';
        document.getElementById('email').value = resumeData.personal.email || '';
        document.getElementById('phone').value = resumeData.personal.phone || '';
        document.getElementById('linkedin').value = resumeData.personal.linkedin || '';
        document.getElementById('address').value = resumeData.personal.address || '';

        // Clear existing dynamic entries and re-add
        educationEntries.innerHTML = '';
        resumeData.education.forEach(edu => createEducationEntry(edu));
        if (resumeData.education.length === 0) createEducationEntry(); // Add at least one empty entry if none exist

        experienceEntries.innerHTML = '';
        resumeData.experience.forEach(exp => createExperienceEntry(exp));
        if (resumeData.experience.length === 0) createExperienceEntry(); // Add at least one empty entry if none exist

        document.getElementById('skills').value = resumeData.skills || '';
        document.getElementById('summary').value = resumeData.summary || '';
        templateSelect.value = resumeData.template || 'classic';

        updatePreview();
        updateResumeAnalytics();
    } else {
        // Initialize with empty entries if no saved data (first time user)
        createEducationEntry();
        createExperienceEntry();
    }
}

function exportJson() {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessageBox('Resume data exported successfully!');
}

function importJson(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                // Validate imported data structure if necessary
                resumeData = { ...resumeData, ...importedData }; // Merge or overwrite
                updateResumeData(); // This will save to Firestore if logged in, else localStorage
                loadResumeData(); // Re-populate form and preview
                showMessageBox('Resume data imported successfully!');
            } catch (error) {
                console.error('Error parsing JSON:', error);
                showMessageBox('Failed to import JSON. Please ensure it\'s a valid JSON file.');
            }
        };
        reader.readAsText(file);
    }
}

// --- Dynamic Preview Generation ---
function updatePreview() {
    const { personal, education, experience, skills, summary, template } = resumeData;
    let html = '';

    // Apply template-specific classes to the preview content div
    resumePreviewContent.className = 'p-5'; // Reset class
    resumePreviewContent.classList.add(`template-${template}`);

    if (template === 'modern') {
        html += `
            <div class="header">
                <h1 class="text-white">${personal.name || 'Your Name'}</h1>
                <p>${personal.email || ''} | ${personal.phone || ''} | ${personal.linkedin ? `<a href="${personal.linkedin}" target="_blank" class="text-white underline">${personal.linkedin.replace(/(^\w+:|^)\/\//, '')}</a>` : ''} | ${personal.address || ''}</p>
            </div>
        `;
    } else if (template === 'elegant') {
        html += `
            <div class="header">
                <h1 class="text-gray-900">${personal.name || 'Your Name'}</h1>
                <p class="text-gray-700">${personal.email || ''} | ${personal.phone || ''} | ${personal.linkedin ? `<a href="${personal.linkedin}" target="_blank" class="text-primary underline">${personal.linkedin.replace(/(^\w+:|^)\/\//, '')}</a>` : ''} | ${personal.address || ''}</p>
            </div>
        `;
    } else if (template === 'creative') {
        html += `
            <div class="header">
                <h1 class="text-white">${personal.name || 'Your Name'}</h1>
                <p>${personal.email || ''} | ${personal.phone || ''} | ${personal.linkedin ? `<a href="${personal.linkedin}" target="_blank" class="text-white underline">${personal.linkedin.replace(/(^\w+:|^)\/\//, '')}</a>` : ''} | ${personal.address || ''}</p>
            </div>
            <div class="main-content">
        `;
    }
    else { // Classic template
        html += `
            <h1 class="text-2xl font-bold text-primary mb-1">${personal.name || 'Your Name'}</h1>
            <p class="text-sm text-gray-700 mb-4">${personal.email || ''} | ${personal.phone || ''} | ${personal.linkedin ? `<a href="${personal.linkedin}" target="_blank" class="text-primary underline">${personal.linkedin.replace(/(^\w+:|^)\/\//, '')}</a>` : ''} | ${personal.address || ''}</p>
        `;
    }

    if (summary) {
        html += `
            <h2 class="section-title">Summary</h2>
            <p>${summary}</p>
        `;
    }

    if (experience.length > 0 && experience[0].title) { // Check if at least one experience entry has a title
        html += `<h2 class="section-title">Experience</h2>`;
        experience.forEach(exp => {
            if (exp.title) {
                html += `
                    <div class="mb-4">
                        <div class="flex-between">
                            <h3 class="text-lg font-semibold">${exp.title || ''}</h3>
                            <span class="text-sm text-gray-600">${exp.startDate || ''} - ${exp.endDate || ''}</span>
                        </div>
                        <p class="text-md font-medium text-gray-700">${exp.company || ''}, ${exp.location || ''}</p>
                        <ul class="list-disc ml-5 text-sm mt-1">
                            ${exp.description ? exp.description.split('\n').map(line => line.trim() ? `<li>${line.trim()}</li>` : '').join('') : ''}
                        </ul>
                    </div>
                `;
            }
        });
    }

    if (education.length > 0 && education[0].degree) { // Check if at least one education entry has a degree
        html += `<h2 class="section-title">Education</h2>`;
        education.forEach(edu => {
            if (edu.degree) {
                html += `
                    <div class="mb-4">
                        <div class="flex-between">
                            <h3 class="text-lg font-semibold">${edu.degree || ''} in ${edu.major || ''}</h3>
                            <span class="text-sm text-gray-600">${edu.startDate || ''} - ${edu.endDate || ''}</span>
                        </div>
                        <p class="text-md font-medium text-gray-700">${edu.university || ''}, ${edu.location || ''}</p>
                    </div>
                `;
            }
        });
    }

    if (skills) {
        html += `
            <h2 class="section-title">Skills</h2>
            <p>${skills}</p>
        `;
    }

    if (template === 'creative') {
        html += `</div>`; // Close main-content div for creative template
    }


    if (!personal.name && !summary && education.length === 0 && experience.length === 0 && !skills) {
        html = '<p class="text-center text-gray-500">Your resume preview will appear here as you fill out the form.</p>';
    }

    resumePreviewContent.innerHTML = html;
}

// --- PDF Export ---
function downloadPdf() {
    showMessageBox('Generating PDF... Please wait.');
    const element = resumePreviewContent; // The element to convert to PDF
    const pdfFileName = `${resumeData.personal.name || 'Resume'}_${Date.now()}.pdf`;

    // Temporarily set background to white for accurate PDF rendering
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = 'white';

    html2canvas(element, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // If you have external images/fonts, enable CORS
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(pdfFileName);
        hideMessageBox(); // Hide message box after PDF is generated
        // Restore original background
        element.style.backgroundColor = originalBg;
    }).catch(error => {
        console.error('Error generating PDF:', error);
        showMessageBox('Failed to generate PDF. Please try again.');
        element.style.backgroundColor = originalBg; // Restore background on error
    });
}

// --- AI-Powered Suggestions (for Summary) ---
async function getAISuggestion() {
    const currentSummary = summaryTextarea.value.trim();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const experienceDetails = resumeData.experience.map(exp => `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})`).join(', ');

    if (!name && !skills && !experienceDetails) {
        showMessageBox("Please fill in your name, skills, and some experience details to get a better AI summary suggestion.");
        return;
    }

    aiLoadingSpinner.classList.remove('hidden');
    aiSuggestSummaryBtn.disabled = true;

    const prompt = `Generate a professional and concise resume summary for a job seeker.
    Name: ${name}
    Email: ${email}
    Skills: ${skills}
    Experience: ${experienceDetails}
    Current Summary (if any): ${currentSummary}

    Focus on achievements, key skills, and career goals. Keep it under 5 sentences.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    // IMPORTANT: Replace "YOUR_GOOGLE_CLOUD_API_KEY_HERE" with your actual Google Cloud API Key (from Step 2)
    const apiKey = "AIzaSyDYNqQUummrpb_DUMr8oiu-jkHeYOtOblM";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorBody)}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const suggestedSummary = result.candidates[0].content.parts[0].text;
            summaryTextarea.value = suggestedSummary.trim();
            updateResumeData(); // Update data and preview with new summary
            showMessageBox('AI summary generated successfully!');
        } else {
            showMessageBox('AI could not generate a summary. Please try again or provide more details.');
            console.warn('Unexpected AI response structure:', result);
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        showMessageBox('Error generating AI summary. Please check your network or try again later.');
    } finally {
        aiLoadingSpinner.classList.add('hidden');
        aiSuggestSummaryBtn.disabled = false;
    }
}

// --- Real-time AI Assistant/Chatbot ---
function showChatbot() {
    chatbotModal.classList.add('active');
    chatbotInputField.focus();
}

function hideChatbot() {
    chatbotModal.classList.remove('active');
}

function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'from-user' : 'from-ai');
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
}

async function sendMessageToAI() {
    const userMessage = chatbotInputField.value.trim();
    if (!userMessage) return;

    addMessageToChat(userMessage, 'user');
    chatbotInputField.value = '';
    chatbotLoadingSpinner.classList.remove('hidden');
    chatbotSendButton.disabled = true;

    // Construct a more general prompt for the chatbot
    const prompt = `You are an AI assistant specialized in resume building. Provide helpful and concise advice.
    User query: "${userMessage}"
    
    Consider the following context from the user's resume data (if available):
    Name: ${resumeData.personal.name || 'Not provided'}
    Skills: ${resumeData.skills || 'Not provided'}
    Summary: ${resumeData.summary || 'Not provided'}
    
    Please provide a helpful response related to resume building.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    // IMPORTANT: Replace "YOUR_GOOGLE_CLOUD_API_KEY_HERE" with your actual Google Cloud API Key (from Step 2)
    const apiKey = "AIzaSyDYNqQUummrpb_DUMr8oiu-jkHeYOtOblM";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorBody)}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const aiResponse = result.candidates[0].content.parts[0].text;
            addMessageToChat(aiResponse, 'ai');
        } else {
            addMessageToChat('Sorry, I could not process that request. Please try again.', 'ai');
            console.warn('Unexpected AI response structure:', result);
        }
    } catch (error) {
        console.error('Error calling Gemini API for chatbot:', error);
        addMessageToChat('There was an error connecting to the AI. Please try again later.', 'ai');
    } finally {
        chatbotLoadingSpinner.classList.add('hidden');
        chatbotSendButton.disabled = false;
    }
}

// --- Resume Analytics & Score ---
function updateResumeAnalytics() {
    let filledFields = 0;
    let totalFields = 0;

    // Personal details
    for (const key in resumeData.personal) {
        totalFields++;
        if (resumeData.personal[key]) filledFields++;
    }

    // Education
    totalFields += 3; // At least one education entry is expected to count towards score
    if (resumeData.education.length > 0) {
        let validEduEntries = 0;
        resumeData.education.forEach(edu => {
            if (edu.degree && edu.university) {
                validEduEntries++;
            }
        });
        if (validEduEntries > 0) filledFields += 3;
    }

    // Experience
    totalFields += 3; // At least one experience entry is expected to count towards score
    if (resumeData.experience.length > 0) {
        let validExpEntries = 0;
        resumeData.experience.forEach(exp => {
            if (exp.title && exp.company) {
                validExpEntries++;
            }
        });
        if (validExpEntries > 0) filledFields += 3;
    }

    // Skills
    totalFields++;
    if (resumeData.skills.trim()) filledFields++;

    // Summary
    totalFields++;
    if (resumeData.summary.trim()) filledFields++;

    const completeness = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
    completenessScore.textContent = `${completeness}%`;

    // Keyword density (very basic example)
    const keywords = ['leadership', 'management', 'project', 'communication', 'analysis', 'development', 'sales', 'marketing', 'customer service'];
    let foundKeywords = 0;
    const allText = (resumeData.summary + ' ' + resumeData.skills + ' ' +
                    resumeData.experience.map(exp => exp.description).join(' ')).toLowerCase();
    keywords.forEach(keyword => {
        if (allText.includes(keyword)) {
            foundKeywords++;
        }
    });
    const keywordScore = foundKeywords / keywords.length;
    if (keywordScore > 0.6) {
        keywordDensity.textContent = 'High';
        keywordDensity.classList.remove('text-red-500', 'text-yellow-500');
        keywordDensity.classList.add('text-green-500');
    } else if (keywordScore > 0.3) {
        keywordDensity.textContent = 'Medium';
        keywordDensity.classList.remove('text-red-500', 'text-green-500');
        keywordDensity.classList.add('text-yellow-500');
    } else {
        keywordDensity.textContent = 'Low';
        keywordDensity.classList.remove('text-green-500', 'text-yellow-500');
        keywordDensity.classList.add('text-red-500');
    }

    // Overall Score
    let overall = 'Poor';
    if (completeness > 80 && keywordScore > 0.5) {
        overall = 'Excellent';
        overallScore.classList.remove('text-red-500', 'text-yellow-500', 'text-orange-500');
        overallScore.classList.add('text-green-500');
    } else if (completeness > 60 && keywordScore > 0.3) {
        overall = 'Good';
        overallScore.classList.remove('text-red-500', 'text-green-500', 'text-orange-500');
        overallScore.classList.add('text-yellow-500');
    } else if (completeness > 40) {
        overall = 'Fair';
        overallScore.classList.remove('text-red-500', 'text-green-500', 'text-yellow-500');
        overallScore.classList.add('text-orange-500');
    } else {
        overallScore.classList.remove('text-green-500', 'text-yellow-500');
        overallScore.classList.add('text-red-500');
    }
    overallScore.textContent = overall;
}

// --- Interactive Tutorial System ---
const tutorialSteps = [
    { title: "Welcome to Resume Builder!", text: "Let's get started. This tool helps you create a professional resume in a few easy steps." },
    { title: "Personal Details", text: "Start by filling in your basic contact information. This is crucial for recruiters to reach you." },
    { title: "Education & Experience", text: "Add your academic background and work history. Be sure to highlight your achievements!" },
    { title: "Skills & Summary", text: "List your key skills and craft a compelling professional summary. Don't forget to try the AI suggestion!" },
    { title: "Preview & Export", text: "See your resume come to life in the live preview. Choose a template and download your PDF when ready!" },
    { title: "Theme Customization", text: "You can change the look and feel of the app and your resume using the theme toggle and color palette in the header." },
    { title: "Autosave & Import/Export", text: "Your data is automatically saved! You can also import or export your resume data as a JSON file for backup." },
    { title: "AI Assistant", text: "Need help? Click the animated character at the bottom right to chat with our AI assistant for resume tips!" },
    { title: "Premium Features", text: "Check out our premium features section on the landing page for advanced tools and benefits." },
    { title: "Account Management", text: "Login or Sign up to save your progress across sessions and devices." },
    { title: "You're All Set!", text: "You're now ready to build an amazing resume. Good luck with your job search!" }
];

function showTutorialStep(stepIndex) {
    if (stepIndex < tutorialSteps.length) {
        tutorialTitle.textContent = tutorialSteps[stepIndex].title;
        tutorialText.textContent = tutorialSteps[stepIndex].text;
        tutorialNextButton.textContent = (stepIndex === tutorialSteps.length - 1) ? "Got It!" : "Next";
        tutorialOverlay.classList.add('active');
        tutorialStep = stepIndex;
    } else {
        hideTutorial();
    }
}

function hideTutorial() {
    tutorialOverlay.classList.remove('active');
    localStorage.setItem('hasSeenTutorial', 'true');
}

// --- Login/Signup Functionality (Firebase Integrated) ---
function showAuthModal(formType = 'login') {
    authModal.classList.add('active');
    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        authTitle.textContent = 'Login';
        document.getElementById('login-email').focus();
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        authTitle.textContent = 'Sign Up';
        document.getElementById('signup-email').focus();
    }
}

function hideAuthModal() {
    authModal.classList.remove('active');
    // Clear form fields
    loginForm.reset();
    signupForm.reset();
}

function updateAuthUI(user) {
    if (user) {
        userDisplay.textContent = `Welcome, ${user.email || 'User'}`;
        userDisplay.classList.remove('hidden');
        authButton.classList.add('hidden');
        logoutButton.classList.remove('hidden');
    } else {
        userDisplay.classList.add('hidden');
        authButton.classList.remove('hidden');
        logoutButton.classList.add('hidden');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    console.log("Attempting login...");
    console.log("Auth object at start of handleLogin:", auth); // Debug log

    if (!auth) {
        showMessageBox('Firebase authentication is not ready. Please wait a moment and try again.');
        console.error("Firebase auth object is null or undefined in handleLogin.");
        return;
    }

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showMessageBox('Please enter both email and password.');
        return;
    }

    try {
        const userCredential = await firebase.signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful:", userCredential.user.uid); // Debug log
        hideAuthModal();
        showMessageBox(`Logged in as ${email}!`);
    } catch (error) {
        console.error("Login error:", error.code, error.message); // Debug log
        let errorMessage = "Login failed. Please check your credentials.";
        if (error.code === 'auth/user-not-found') {
            errorMessage = "No user found with this email. Please sign up.";
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = "Incorrect password.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "Invalid email format.";
        } else if (error.code === 'auth/network-request-failed') {
            errorMessage = "Network error. Please check your internet connection.";
        }
        showMessageBox(errorMessage);
    }
}

async function handleSignup(event) {
    event.preventDefault();
    console.log("Attempting signup...");
    console.log("Auth object at start of handleSignup:", auth); // Debug log

    if (!auth) {
        showMessageBox('Firebase authentication is not ready. Please wait a moment and try again.');
        console.error("Firebase auth object is null or undefined in handleSignup.");
        return;
    }

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!email || !password || !confirmPassword) {
        showMessageBox('Please fill in all fields.');
        return;
    }
    if (password !== confirmPassword) {
        showMessageBox('Passwords do not match.');
        return;
    }
    if (password.length < 6) {
        showMessageBox('Password must be at least 6 characters long.');
        return;
    }

    try {
        const userCredential = await firebase.createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup successful:", userCredential.user.uid); // Debug log
        showMessageBox('Account created successfully! Please login.');
        showAuthModal('login'); // Switch to login form
    } catch (error) {
        console.error("Signup error:", error.code, error.message); // Debug log
        let errorMessage = "Signup failed. Please try again.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email is already in use.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "Invalid email format.";
        } else if (error.code === 'auth/weak-password') {
            errorMessage = "Password is too weak. Please use a stronger password.";
        } else if (error.code === 'auth/network-request-failed') {
            errorMessage = "Network error. Please check your internet connection.";
        }
        showMessageBox(errorMessage);
    }
}

async function handleLogout() {
    try {
        await firebase.signOut(auth);
        showMessageBox('Logged out successfully.');
        // Clear local data or reset to default if not authenticated
        resumeData = {
            personal: { name: '', email: '', phone: '', linkedin: '', address: '' },
            education: [],
            experience: [],
            skills: '',
            summary: '',
            template: 'classic'
        };
        localStorage.removeItem('resumeData'); // Clear local storage too
        loadResumeData(); // Reload with empty/default data
    } catch (error) {
        console.error("Logout error:", error);
        showMessageBox("Error logging out. Please try again.");
    }
}

// --- Firebase Initialization and Auth State Listener ---
window.addEventListener('load', async () => {
    // Initialize Firebase
    // IMPORTANT: The firebaseConfig object is now correctly defined globally at the top of the script.
    animateNumbers();
    // Check if firebaseConfig.apiKey is still the placeholder string.
    // This condition now correctly checks if the API key needs to be updated by the user.
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "AIzaSyDKxl87_qmUKSgl4xKPAyAqMZ2no8qbSpU") { // This line now correctly checks against the placeholder
        console.error("Firebase config is not set. Please update script.js with your Firebase project details.");
        isAuthReady = true; // Allow local storage fallback
        loadResumeData(); // Load data from local storage immediately
        return;
    }

    firebaseApp = firebase.initializeApp(firebaseConfig);
    auth = firebase.getAuth(firebaseApp);
    db = firebase.getFirestore(firebaseApp);
    console.log("Firebase auth and firestore initialized!"); // Debug log

    // Sign in anonymously if no custom token, or use custom token
    // __initial_auth_token is provided by the Canvas environment. For local run, it's null.
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
    try {
        if (initialAuthToken) {
            await firebase.signInWithCustomToken(auth, initialAuthToken);
            console.log("Signed in with custom token.");
        } else {
            // If running locally without Canvas, this signs in anonymously.
            // This is useful for initial setup and testing.
            await firebase.signInAnonymously(auth);
            console.log("Signed in anonymously.");
        }
    } catch (error) {
        console.error("Firebase anonymous/custom token sign-in error:", error);
        showMessageBox("Failed to sign in to Firebase. Some features may not work.");
    }

    // Listen for auth state changes
    firebase.onAuthStateChanged(auth, (user) => {
        isAuthReady = true; // Auth state is now known
        if (user) {
            currentUserId = user.uid;
            console.log("User is logged in:", user.uid);
            updateAuthUI(user);
            loadResumeData(); // Load user-specific data from Firestore
        } else {
            currentUserId = null;
            console.log("User is logged out.");
            updateAuthUI(null);
            loadResumeData(); // Load data from local storage if not logged in
        }
    });

    initializeTheme();
    showStep(currentStep); // Show the first step of the form
    animateNumbers(); // Start landing page number animation

    // Show tutorial if it's the first visit
    if (!localStorage.getItem('hasSeenTutorial')) {
        showTutorialStep(0);
    }

    // Show animated character after a delay
    setTimeout(() => {
        animatedCharacterContainer.classList.remove('hidden');
    }, 3000); // Show after 3 seconds
});


messageBoxOkButton.addEventListener('click', hideMessageBox);
messageOverlay.addEventListener('click', hideMessageBox); // Close on overlay click

// Landing page buttons
getStartedBtn.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    resumeApp.classList.remove('hidden');
    animatedCharacterContainer.classList.remove('hidden'); // Show character when app starts
    // Scroll to top of resume app
    resumeApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
getStartedBtnBottom.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    resumeApp.classList.remove('hidden');
    animatedCharacterContainer.classList.remove('hidden'); // Show character when app starts
    // Scroll to top of resume app
    resumeApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
learnMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
});
appLogo.addEventListener('click', (e) => {
    e.preventDefault();
    landingPage.classList.remove('hidden');
    resumeApp.classList.add('hidden');
    animatedCharacterContainer.classList.add('hidden'); // Hide character on landing page
    landingPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
});


// Theme toggle and color palette
themeToggle.addEventListener('click', () => {
    toggleDarkMode();
    // Toggle visibility of color palette
    colorPalette.classList.toggle('hidden');
    colorPalette.classList.toggle('scale-95');
    colorPalette.classList.toggle('opacity-0');
    colorPalette.classList.toggle('scale-100');
    colorPalette.classList.toggle('opacity-100');
});

// Close color palette if clicked outside
document.addEventListener('click', (event) => {
    if (!themeToggle.contains(event.target) && !colorPalette.contains(event.target)) {
        colorPalette.classList.add('hidden', 'scale-95', 'opacity-0');
        colorPalette.classList.remove('scale-100', 'opacity-100');
    }
});

colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const themeName = e.target.dataset.theme;
        applyTheme(themeName);
        colorPalette.classList.add('hidden', 'scale-95', 'opacity-0'); // Hide palette after selection
        colorPalette.classList.remove('scale-100', 'opacity-100');
    });
});

// Form navigation
prevStepBtn.addEventListener('click', goToPrevStep);
nextStepBtn.addEventListener('click', goToNextStep);

// Dynamic form field buttons
addEducationBtn.addEventListener('click', () => createEducationEntry());
addExperienceBtn.addEventListener('click', () => createExperienceEntry());

// Listen for changes on the entire form to trigger autosave and preview update
resumeForm.addEventListener('input', updateResumeData);
resumeForm.addEventListener('change', updateResumeData); // For select elements

// Template selection
templateSelect.addEventListener('change', updateResumeData);

// Export/Import JSON
exportJsonBtn.addEventListener('click', exportJson);
importJsonInput.addEventListener('change', importJson);
mobileImportJsonBtn.addEventListener('click', () => importJsonInput.click());
mobileExportJsonBtn.addEventListener('click', exportJson);

// Download PDF
downloadPdfBtn.addEventListener('click', downloadPdf);
mobileDownloadPdfBtn.addEventListener('click', downloadPdf);

// AI Suggestion
aiSuggestSummaryBtn.addEventListener('click', getAISuggestion);

// Hamburger Menu
hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
});

// Mobile Nav buttons
mobileNavButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const step = parseInt(e.target.dataset.step);
        showStep(step);
        mobileNav.classList.add('hidden'); // Hide mobile nav after selection
    });
});

// Tutorial Event Listeners
tutorialNextButton.addEventListener('click', () => {
    showTutorialStep(tutorialStep + 1);
});

tutorialCloseButton.addEventListener('click', hideTutorial);
tutorialOverlay.addEventListener('click', (e) => {
    if (e.target === tutorialOverlay) {
        hideTutorial();
    }
});

// Animated character (Chatbot trigger)
animatedCharacterContainer.addEventListener('click', showChatbot);

// Chatbot event listeners
chatbotCloseButton.addEventListener('click', hideChatbot);
chatbotSendButton.addEventListener('click', sendMessageToAI);
chatbotInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessageToAI();
    }
});

// Auth event listeners
authButton.addEventListener('click', () => showAuthModal('login'));
logoutButton.addEventListener('click', handleLogout);
authCloseButton.addEventListener('click', hideAuthModal);
showSignupBtn.addEventListener('click', () => showAuthModal('signup'));
showLoginBtn.addEventListener('click', () => showAuthModal('login'));
loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);

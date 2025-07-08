📄 Digital Resume Builder
Replace this placeholder image with a screenshot of your landing page.

🌟 Overview
The Digital Resume Builder is a modern, interactive web application designed to help users create professional and visually appealing resumes with ease. It provides a step-by-step guided form, real-time preview, AI-powered suggestions, and various export options, including PDF. The application also features theme customization, autosave, and user authentication for cloud storage of resume data.

✨ Features
Multi-Step Guided Form: 🚶‍♀️ Intuitive, step-by-step process for inputting personal details, education, experience, skills, and a professional summary.

Real-time Live Preview: 👁️ Instantly see how your resume looks as you type, with dynamic updates.

Customizable Templates: 🎨 Choose from various modern resume templates (Classic, Modern, Elegant, Creative) to match your style.

Theme & Color Customization: 🌈 Personalize the application's look and feel, and your resume's accent colors.

AI-Powered Summary Suggestions: 🤖 Leverage Gemini API to generate compelling professional summaries based on your input.

Interactive AI Chatbot: 💬 Get instant resume building tips and advice from an integrated AI assistant.

Resume Analytics: 📊 Receive a completeness score and keyword density analysis to optimize your resume.

Autosave & Cloud Storage: ☁️ Your resume data is automatically saved locally, and securely stored in Firestore when logged in.

Import/Export Functionality: 📤📥 Easily backup and restore your resume data using JSON files.

PDF Export: 📄⬇️ Download your finished resume as a professional, print-ready PDF document.

User Authentication: 🔐 Secure login and signup powered by Firebase Authentication to manage your resumes across devices.

Responsive Design: 📱💻 Optimized for seamless experience across desktop, tablet, and mobile devices.

Animated Landing Page: 📈 Engaging number animations on the landing page to highlight key statistics.

🚀 Technologies Used
Frontend:

HTML5: <i class="fab fa-html5"></i>

CSS3: <i class="fab fa-css3-alt"></i> (with Tailwind CSS framework)

JavaScript: <i class="fab fa-js-square"></i> (Vanilla JS)

Libraries & APIs:

Firebase: 🔥 For Authentication (Email/Password, Anonymous) and Firestore Database (cloud storage).

Google Gemini API: ♊ For AI-powered summary suggestions and chatbot functionality.

AOS (Animate On Scroll): 💫 For scroll-triggered animations on the landing page.

jsPDF & html2canvas: 🖼️ For client-side PDF generation.

LottieFiles: 🎬 For animated characters.

Font Awesome: ✨ For icons.

Deployment: 🌐 (Mention where you plan to deploy, e.g., GitHub Pages, Firebase Hosting, Netlify)

🛠️ Setup and Installation
Follow these steps to get a local copy of the project up and running on your machine.

Prerequisites
A web browser (Chrome, Firefox, Edge, Safari, etc.) 🌐

A code editor (VS Code, Sublime Text, etc.) 💻

Node.js and npm (recommended for managing dependencies, though not strictly required for this vanilla JS project if you manually include CDNs). 📦

A Firebase Project: 🔥

Go to Firebase Console.

Create a new project.

Enable Email/Password sign-in method under Authentication > Sign-in method.

Create a Firestore Database in production mode.

Update your Firestore Security Rules (see below).

Register a Web App and copy its configuration.

Firebase Configuration
Get your Firebase Web App Config:

In your Firebase project, go to Project settings (gear icon) ⚙️.

Scroll down to "Your apps" and select your Web app.

Under "Firebase SDK snippet", choose "Config".

Copy the entire const firebaseConfig = { ... }; object.

Update script.js:

Open script.js.

Locate the const firebaseConfig = { ... }; object (around line 90).

Replace the existing placeholder firebaseConfig object with your copied configuration.

Update Google Gemini API Key:

You'll need a Google Cloud API Key with access to the Gemini API.

In script.js, find the apiKey variable inside getAISuggestion() and sendMessageToAI() functions.

Replace "YOUR_GOOGLE_CLOUD_API_KEY_HERE" with your actual Google Cloud API Key.

Firestore Security Rules:

In your Firebase Console, navigate to Firestore Database > Rules.

Ensure your rules allow authenticated users to read and write their own data. For this project, the following rules are recommended:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to user-specific resume data if authenticated
    match /artifacts/{appId}/users/{userId}/resumes/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Optional: If you plan public data later
    // match /artifacts/{appId}/public/data/{collection}/{document} {
    //   allow read, write: if request.auth != null;
    // }
  }
}

Click "Publish" after updating your rules. 🚀

Local Setup
Clone the repository:

git clone https://github.com/your-username/digital-resume-builder.git
cd digital-resume-builder

Open in your code editor:
Open the digital-resume-builder folder in your preferred code editor (e.g., VS Code). 📂

Open index.html:
Simply open the index.html file in your web browser. Most modern browsers allow you to open local HTML files directly. 🖥️

💡 Usage
Landing Page: Explore the features and information about the resume builder. Click "Get Started" to begin. ▶️

Resume Builder Form:

Fill in your details across the multi-step form (Personal, Education, Experience, Skills & Summary). ✍️

Your data will autosave locally. If you log in, it will also save to your Firebase account. 💾

Use the "Add Education" and "Add Experience" buttons to add multiple entries. ➕

Click "Get AI Suggestion" on the "Skills & Summary" step for AI-generated content. 💡

Preview & Export:

Navigate to the "Preview" step to see your resume. 👀

Choose different templates from the dropdown to change the design. 🖼️

Use "Download PDF" to save your resume as a PDF. 📥

Use "Export JSON" to save your data as a JSON file for backup. 💾

Use "Import JSON" to load previously saved data. 📂

Login/Signup:

Click the "Login / Signup" button in the header to create an account or log in. This enables cloud storage for your resume data. 👤

AI Assistant:

Click the animated character at the bottom right of the screen to open the AI chatbot for quick tips and help! 💬

Theme Customization:

Click the sun/moon icon in the header to toggle dark mode. 🌗

Click the color palette icon to select a primary accent color for the application and your resume. 🌈

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or find any bugs, please:

Fork the repository. 🍴

Create a new branch (git checkout -b feature/your-feature-name or bugfix/your-bug-fix). 🌿

Make your changes. ✏️

Commit your changes (git commit -m 'feat: Add new feature'). 💾

Push to the branch (git push origin feature/your-feature-name). ⬆️

Open a Pull Request. ➡️

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
(Note: You'll need to create a LICENSE file in your repository if you don't have one.)

📞 Contact
Your Name / Your GitHub Username

Your Email (Optional) 📧

Project Link: https://github.com/your-username/digital-resume-builder (Update this link) 🔗

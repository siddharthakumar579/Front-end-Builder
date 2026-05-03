🚀 AI App Builder

Turn ideas into fully functional web apps instantly using AI.

AI App Builder takes a simple text prompt and generates a complete **HTML, CSS, and JavaScript application**, along with a live preview and feature specifications — all in one place.

---

✨ Features

* 🧠 **Prompt → App**
  Describe your idea and get a working web app instantly

* 📄 **Auto-generated Code**
  Complete HTML file with embedded CSS & JavaScript

* 📋 **Specs Section**
  Clear explanation of app features and functionality

* 👁️ **Live Preview**
  Instantly run the generated app inside the UI

* 🔁 **Regenerate Flow**
  Modify your prompt and generate improved versions

---

## 🖼️ Demo

> Add screenshots or a screen recording here
> *(Highly recommended for portfolio impact)*

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **AI Integration:** Google Gemini API (`@google/genai`)
* **Rendering:** iframe (for live preview)
* **Styling:** CSS (custom modern UI)

---

## ⚙️ How It Works

```text
User Prompt
   ↓
AI (Gemini API)
   ↓
Structured JSON Response
   ↓
Parse → Extract Specs + Code
   ↓
Render:
  - Left: Specs
  - Right: Code / Live Preview
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-app-builder.git
cd ai-app-builder
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

---

### 4. Run the app

```bash
npm run dev
```

---

## ⚠️ Important Note

Currently, the AI API is called directly from the frontend for simplicity.

For production use:

* Move API calls to a backend (Node/Express)
* Keep your API key secure

---

## 📌 Future Improvements

* 🔐 Backend integration for secure API handling
* 🎨 Syntax highlighting for generated code
* 🧪 Sandboxed preview environment
* 💾 Save & export generated apps
* ✏️ Editable code with live re-render

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 💡 Inspiration

Built to explore the idea of **AI-powered development tools** — turning prompts into real, usable applications.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

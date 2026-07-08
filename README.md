# LearnTube

LearnTube is an AI-powered learning platform that transforms YouTube tutorials into structured study material. Paste a YouTube video URL and generate concise summaries, detailed notes, interactive flashcards, quizzes, and an AI tutor to reinforce learning.


> **Note**
>
> The deployed version is a demonstration of the user interface and uses mock data.
>
> Due to limitations of the current YouTube transcript extraction library in serverless deployment environments, real transcript generation has been disabled in the live demo.
>
> The complete AI-powered version is included in this repository and can be run locally by following the instructions below.

---

## Features

* Generate AI-powered summaries
* Create structured study notes
* Interactive flashcards
* AI-generated quiz
* AI Tutor
* Search notes instantly
* Download learning kit as PDF
* Responsive design for desktop and mobile
* Clean and modular architecture

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI

* Google Gemini API

### Transcript Extraction

* youtube-transcript

---

## Project Structure

```text
LearnTube/

├── client/
│
└── server/
```

---

## Running the Complete AI Version Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/LearnTube.git

cd LearnTube
```

### 2. Install the frontend

```bash
cd client

npm install
```

### 3. Install the backend

```bash
cd ../server

npm install
```

### 4. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5001
```

### 5. Start the frontend

Open a second terminal.

```bash
cd client

npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## Switching From Demo Mode to the Full AI Version

The deployed version uses mock data.

To enable real YouTube processing on your local machine, make the following changes.

### Step 1

Open:

```text
client/src/App.jsx
```

Change:

```javascript
// import { fetchStructuredContent } from "./api/learnApi";
import mockData from "./data/mockData";
```

to

```javascript
import { fetchStructuredContent } from "./api/learnApi";
// import mockData from "./data/mockData";
```

---

### Step 2

Inside `handleGenerate()`, replace:

```javascript
// const data = await fetchStructuredContent(url.trim());
// setLearningData(data);

await new Promise((resolve) => setTimeout(resolve, 500));
setLearningData(mockData);
```

with:

```javascript
const data = await fetchStructuredContent(url.trim());
setLearningData(data);

// await new Promise((resolve) => setTimeout(resolve, 500)); 
// setLearningData(mockData);

```

---

### Step 3

Save the file.

With both the frontend and backend running, LearnTube will:

* Fetch the transcript from the YouTube video
* Send the transcript to Gemini AI
* Generate the summary
* Generate study notes
* Generate flashcards
* Generate a quiz
* Enable the AI Tutor using the generated learning content

---

## Why Doesn't the Live Demo Process Real YouTube Videos?

The full application depends on extracting transcripts from YouTube videos.

During development, transcript extraction works correctly when the Express backend is running locally.

However, the current transcript extraction library is not consistently reliable when deployed in serverless environments such as Vercel Functions, where it may incorrectly report that captions are unavailable even though they are available.

To provide a stable public demo, the deployed application uses mock data while the complete AI-powered implementation remains available in this repository for local use.

---

## Future Improvements

* Workflow diagrams
* Visual concept maps
* Timeline visualization
* Save learning kits
* Learning history
* Multi-language support
* Authentication
* Cloud deployment with full transcript support

---

## License

This project is licensed under the MIT License.

# AI Image JSON Generator

A visual prompt-building React app that helps users generate structured JSON configurations for AI image generation. Users can customize elements like subject, style, environment, camera, lighting, and more through an intuitive interface.

## Live Demo

👉 **[https://lgwalker.github.io/ai-json-generator/](https://lgwalker.github.io/ai-json-generator/)**

👉 **[Watch Demo video](https://drive.google.com/file/d/1muR8poubksvb1Y8OJJy54xW86MWYPEHA/view?usp=sharing)**


## Features

- ** Visual Prompt Builder**: Intuitive interface for crafting AI image prompts
- ** Dynamic Categories**: Customize subject, style, environment, camera, lighting, and more
- ** Real-time Preview**: See your JSON configuration update as you build
- ** Save & Load**: Persist presets using localStorage
- ** Export/Import**: Download JSON files or upload existing configurations
- ** Structured Output**: Generate clean, organized JSON for AI image tools
- ** Granular Control**: Add fields to customize any part of image
  

## Tech Stack

- **Frontend**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Deployment**: GitHub Pages
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AIImagePromptGenerator.tsx
│   ├── ConfigEditor.tsx
│   ├── ControlPanel.tsx
|   ├── JSONOutput.tsx
|   ├── Modal.tsx
|   ├── SavedConfigs.tsx
|   └── index.ts
├── hooks/              # Custom React hooks
│   ├── useModal.ts
│   ├── useDropdown.ts
│   └── index.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── constants/          # Default configuration data
│   └── index.ts
├── utils/              # Helper functions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lgwalker/ai-image-json-generator.git
   cd ai-image-json-generator
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
   
   Visit `http://localhost:3000` to see the app in action.

## Build & Deploy

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and push it to the `gh-pages` branch.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Select Categories**: Choose from various prompt categories like Subject, Style, Environment, etc.
2. **Customize Options**: Add, remove, or modify characteristics within each category
3. **Real-time Preview**: Watch your JSON configuration update in real-time
4. **Save Presets**: Store frequently used configurations for quick access
5. **Export/Import**: Download your JSON or upload existing configurations
6. **Copy & Use**: Copy the generated JSON for use in your AI image generation workflow

## Example Output

```json
{
  "subject": {
    "main": "portrait of a woman",
    "details": ["elegant", "confident", "professional"]
  },
  "style": {
    "artistic": "photorealistic",
    "mood": "dramatic"
  },
  "environment": {
    "location": "studio",
    "background": "dark gradient"
  },
  "camera": {
    "angle": "medium shot",
    "focus": "shallow depth of field"
  },
  "lighting": {
    "type": "dramatic lighting",
    "direction": "side lighting"
  }
}
```

## Configuration

The app uses several configuration files:

- **`vite.config.ts`**: Vite configuration for build and development
- **`tailwind.config.js`**: TailwindCSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`package.json`**: Project dependencies and scripts


## Note

- localStorage has size limitations for very large configurations (To be worked on in further iterations)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- Styled with [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- Deployed on [GitHub Pages](https://pages.github.com/) for free hosting
- Inspired by the need for structured AI image prompt generation

## Author

**Lily Walker**

- GitHub: [@lgwalker](https://github.com/lgwalker)
- Project Link: [https://github.com/lgwalker/ai-json-generator](https://github.com/lgwalker/ai-json-generator)


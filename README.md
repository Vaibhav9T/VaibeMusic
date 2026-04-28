# <picture>
  <source media="(prefers-color-scheme: dark)" srcset="./src/assets/vb_dark.png">
  <source media="(prefers-color-scheme: light)" srcset="./src/assets/vb_light.png">
  <img alt="VaibeMusic Icon" src="./src/assets/vb_light.png" height="32" align="center">
</picture> VaibeMusic 🎵

VaibeMusic is a sleek, modern web-based music player built with React, Vite, and Tailwind CSS. It leverages the [Audius API](https://audius.co/) to fetch and stream top trending tracks directly in your browser. With a dynamic UI that adapts its aesthetic based on the currently playing track's artwork, VaibeMusic provides an immersive listening experience.

## Features ✨

- **Trending Tracks Integration:** Real-time fetching of trending music from Audius.
- **Dynamic Backgrounds:** Analyzes track artwork to generate a matching background ambient glow.
- **Audio Controls:** Play, pause, skip, and volume/mute controls.
- **Progress Tracking:** Real-time track progress and seekbar functionality.
- **Responsive Design:** Clean, dark-mode focused UI built with Tailwind CSS.

## Tech Stack 🛠️

- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Icons:** Heroicons (`@heroicons/react`)
- **Color Extraction:** `fast-average-color` (for dynamic UI theming)

## Getting Started 🚀

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vaibhav9T/VaibeMusic.git
   ```

2. Navigate to the project directory:
   ```bash
   cd VaibeMusic
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to enjoy the tunes!

## Building for Production 🏗️

To create an optimized production build, run:
```bash
npm run build
```

You can preview the built app using:
```bash
npm run preview
```

## Acknowledgments 🙌

- [Audius API](https://audius.co/) for the decentralized music catalog.
- [Vite](https://vitejs.dev/) & [React](https://react.dev/) for the blazing-fast development experience.
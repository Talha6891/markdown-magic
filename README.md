# Markdown Magic ✨

> Beautiful markdown editor with live preview, text-to-markdown, and markdown-to-text conversion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Talha6891/markdown-magic)

A modern, feature-rich markdown editor built with React and TypeScript. Transform your plain text into beautifully formatted markdown, or convert markdown back to plain text with ease.

## ✨ Features

### 📝 Markdown Editor
- **Live Preview**: See your markdown rendered in real-time as you type
- **Rich Toolbar**: Quick access to common markdown syntax (headers, bold, italic, lists, links, images, code blocks, and more)
- **Resizable Panels**: Adjust the editor and preview panels to your preference
- **Syntax Highlighting**: Beautiful code block rendering with syntax highlighting

### 🔄 Text to Markdown Converter
- **Smart Conversion**: Automatically detect and convert plain text to markdown format
- **Quick Formatting Tools**: 
  - Auto-detect headers
  - Convert to bullet lists
  - Apply bold formatting
  - Create blockquotes
- **Intelligent Parsing**: Detects URLs, lists, and other patterns automatically

### 📊 Statistics Dashboard
- Real-time statistics including:
  - Character count
  - Word count
  - Line count
  - Estimated reading time

### 🎨 Beautiful UI
- **Neon Theme**: Modern dark theme with vibrant neon accents
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Polished user experience with smooth transitions
- **Glass Morphism**: Modern glass-panel design elements

### 🛠️ Additional Features
- **Copy to Clipboard**: One-click copy for both markdown and plain text
- **Download Options**: 
  - Download as Markdown (.md file)
  - Download as PDF (via browser print)
- **Content Swap**: Swap content between markdown and text modes
- **Clear Content**: Quick clear button for fresh starts

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Talha6891/markdown-magic.git
   cd markdown-magic
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
   Navigate to `http://localhost:8080` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[React Router](https://reactrouter.com/)** - Client-side routing

## 🏗️ Architecture

This project follows **DRY (Don't Repeat Yourself)** principles with a well-organized architecture:

### Shared Utilities
- **Markdown Parsing**: Centralized markdown-to-HTML conversion used by both preview and PDF export
- **Clipboard Operations**: Reusable copy-to-clipboard functionality with consistent error handling
- **Validation**: Shared validation logic for content checks
- **Constants**: Centralized constants, messages, and configuration values

### Component Reusability
- **PanelHeader**: Reusable header component eliminating code duplication across panels
- **Modular Components**: Each component has a single responsibility and can be easily tested and maintained

### Benefits
- ✅ **Maintainability**: Changes to markdown parsing logic only need to be made in one place
- ✅ **Consistency**: Shared utilities ensure consistent behavior across the application
- ✅ **Testability**: Utility functions can be tested independently
- ✅ **Scalability**: Easy to add new features without duplicating code

## 📁 Project Structure

```
markdown-magic/
├── src/
│   ├── components/
│   │   ├── MarkdownConverter.tsx    # Main converter component
│   │   ├── MarkdownEditor.tsx       # Markdown editor with toolbar
│   │   ├── MarkdownPreview.tsx      # Live preview renderer
│   │   ├── TextToMarkdown.tsx       # Text to markdown converter
│   │   ├── StatsBar.tsx              # Statistics display
│   │   ├── ActionButtons.tsx        # Action buttons (copy, download, clear)
│   │   ├── PanelHeader.tsx           # Reusable panel header component
│   │   └── ui/                       # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx                 # Main page
│   │   └── NotFound.tsx              # 404 page
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utility functions and shared code
│   │   ├── markdown.ts               # Markdown parsing utilities (to HTML, strip markdown)
│   │   ├── clipboard.ts              # Clipboard utility functions
│   │   ├── validation.ts            # Validation utility functions
│   │   ├── constants.ts              # Shared constants and messages
│   │   └── utils.ts                  # General utility functions (cn, etc.)
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts               # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

### 📚 Key Files Explained

**Components:**
- `MarkdownConverter.tsx` - Main orchestrator component that manages tabs and content state
- `MarkdownEditor.tsx` - Rich text editor with markdown syntax toolbar
- `MarkdownPreview.tsx` - Renders markdown as styled HTML preview
- `TextToMarkdown.tsx` - Converts plain text to markdown format
- `PanelHeader.tsx` - Reusable header component with icon, label, and copy button
- `ActionButtons.tsx` - Download, swap, and clear action buttons
- `StatsBar.tsx` - Displays content statistics (characters, words, lines, reading time)

**Utilities (`lib/`):**
- `markdown.ts` - Core markdown parsing logic (converts markdown to HTML, strips markdown syntax)
- `clipboard.ts` - Clipboard operations with toast notifications
- `validation.ts` - Content validation helpers
- `constants.ts` - Shared constants, messages, and configuration values
- `utils.ts` - General utilities (class name merging, etc.)

## 🎯 Usage

### Markdown Editor Mode

1. Click on the **"Markdown Editor"** tab
2. Start typing your markdown in the left panel
3. See the live preview in the right panel
4. Use the toolbar buttons to insert markdown syntax
5. Adjust panel sizes by dragging the divider

### Text to Markdown Mode

1. Click on the **"Text to Markdown"** tab
2. Paste or type your plain text in the left panel
3. Use the formatting tools:
   - **Headers**: Auto-detect and format headers
   - **Bold**: Make first words bold
   - **List**: Convert lines to bullet lists
   - **Quote**: Convert to blockquotes
   - **Smart Convert**: Automatically convert entire text
4. See the markdown preview in the right panel

### Keyboard Shortcuts

- **Copy**: Use the copy button in each panel header
- **Download**: Click the download button and choose format
- **Clear**: Use the trash icon to clear content
- **Swap**: Exchange content between modes (when available)

## 🤝 Contributing

Contributions are welcome! This project is open source and we encourage you to contribute.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes before submitting
- Update documentation if needed
- Be respectful and constructive in discussions

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the open source community
- Inspired by modern markdown editors
- Uses amazing open source libraries and tools

## 📞 Contact & Support

- **GitHub Repository**: [https://github.com/Talha6891/markdown-magic](https://github.com/Talha6891/markdown-magic)
- **Issues**: [GitHub Issues](https://github.com/Talha6891/markdown-magic/issues)

![Markdown Magic Home Screen](./screenshot.png)
---

**Made with ❤️ for 🌍**

If you find this project helpful, please consider giving it a ⭐ on GitHub!

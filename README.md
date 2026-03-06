# 🛡️ GhostGuard - Adversarial Image Protection

**GhostGuard** is a sophisticated, client-side adversarial image obfuscation tool designed to protect your digital assets from unauthorized use in AI model training, style transfer, and automated scraping.

## ✨ Features

### 🎯 Multi-Layer Protection System

1. **Adversarial Noise Injection**
   - High-frequency pixel perturbations that disrupt CNN and ViT latent space representations
   - Creates "feature collisions" invisible to humans but catastrophic for AI models
   - Adjustable intensity from 0-100%

2. **Edge Distortion & Ghosting**
   - Detects high-gradient regions (edges, textures, boundaries)
   - Applies micro-displacement with weighted blending
   - Targets spatial convolution operations used by image models

3. **Watermark Pattern Layer**
   - Embeds semi-invisible high-frequency grid patterns
   - Text-based fingerprinting ("GhostGuard" signature)
   - Interferes with style mimicry and automated scraping

4. **Metadata Poisoning**
   - Manipulates alpha channel values in pseudo-random patterns
   - Corrupts normalization/preprocessing pipelines
   - Lossless for visual display, disruptive for batch processing

### 🎨 Intuitive UI/UX

- **Clean Upload Zone**: Modern drag-and-drop interface with futuristic icon design (no overlapping elements)
- **Real-Time Preview**: Interactive before/after comparison slider
- **Smart Presets**: Quick-select protection levels (Low, Medium, High, Ultra)
- **Live Processing Visualization**: Animated neural network with step-by-step feedback
- **Educational Modal**: "How it works" section explaining each protection layer in detail
- **Responsive Design**: Works beautifully on desktop and tablet devices

### 🔒 Privacy-First Architecture

- **100% Client-Side**: All processing via HTML5 Canvas API
- **No Uploads**: Images never leave your device
- **No Tracking**: Zero analytics, cookies, or external requests
- **PNG Export**: Lossless format preserves adversarial noise details

## 🚀 Quick Start

1. **Upload an Image**: Drag and drop or click to browse (JPEG, PNG, WebP supported)
2. **Select Protection Level**: Choose from Low/Medium/High/Ultra presets
3. **Fine-Tune Settings**: Adjust noise injection and edge distortion sliders
4. **Generate**: Click "Generate Protected Image" and watch the neural defense in action
5. **Compare**: Use the interactive slider to compare original vs. protected versions
6. **Download**: Export your protected image as a PNG file

## 🎛️ Protection Settings

### Preset Levels
- **Low** (8% noise, 6% distortion): Best visual fidelity, minimal disruption
- **Medium** (18% noise, 12% distortion): Balanced protection for general use
- **High** (36% noise, 24% distortion): Strong model disruption with acceptable quality
- **Ultra** (58% noise, 38% distortion): Maximum obfuscation for critical assets

### Advanced Controls
- **Noise Injection Slider**: Fine-tune perturbation intensity (0-100%)
- **Edge Distortion Slider**: Control ghosting and boundary displacement (0-100%)
- **Watermark Layer Toggle**: Enable/disable semi-visible pattern overlay
- **Metadata Poisoning Toggle**: Enable/disable alpha channel manipulation

## 🧠 How It Works

Click the **"How it works"** button in the header to see detailed explanations of each protection mechanism, including:

- Technical breakdown of adversarial noise injection
- Edge detection and ghosting algorithms
- Watermark pattern embedding techniques
- Metadata poisoning strategies
- Privacy guarantees and local processing architecture

## 🛠️ Tech Stack

- **React 18** + **TypeScript**: Component architecture and type safety
- **Vite**: Lightning-fast dev server and optimized builds
- **Tailwind CSS**: Utility-first styling with custom dark theme
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Clean, modern icon library
- **Canvas API**: Client-side image manipulation

## 📦 Build & Deploy

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🎯 Use Cases

- **Artists & Creators**: Protect artwork from unauthorized AI training and style mimicry
- **Photographers**: Safeguard portfolio images from scraping and dataset inclusion
- **Designers**: Defend brand assets and proprietary visual content
- **Privacy Advocates**: Prevent facial recognition and biometric data extraction
- **Content Creators**: Block unauthorized commercial use by generative AI platforms

## ⚡ Performance

- **Bundle Size**: ~420KB (gzipped to ~126KB)
- **Processing Time**: 0.9-2.5 seconds depending on image resolution
- **Memory Efficient**: Processes images up to 8K resolution
- **Browser Support**: Modern browsers with Canvas API support

## 🔐 Security & Privacy

GhostGuard operates entirely in your browser. No data is transmitted to any server. The source code is open and auditable. All processing happens on your local machine using standard web APIs.

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

**Built with ❤️ for the creative community fighting against unauthorized AI exploitation.**

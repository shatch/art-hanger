# 🎯 The Hanging Equation

A beautiful, artistic web application that helps you perfectly hang artwork on your walls. This app calculates the optimal nail placement height based on your artwork dimensions and wire configuration, ensuring your art is displayed at the ideal eye level.

## ✨ Features

- **Precise Calculations**: Uses the standard 57-inch eye level formula to determine perfect nail placement
- **Interactive Canvas**: Dynamic abstract art backgrounds that change based on your selected mood
- **Multiple Artistic Moods**: Choose from Cubist, Post-Impressionist, or Zen themes
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Dark/Light Mode**: Automatically adapts to your system preferences
- **Real-time Updates**: See results instantly as you adjust measurements

## 🎨 Artistic Themes

### Cubist
- Geometric, angular shapes with vibrant colors
- Dynamic, energetic background patterns
- Perfect for modern, contemporary art

### Post-Impressionist
- Flowing, organic forms with warm, expressive colors
- Inspired by Van Gogh and Gauguin
- Ideal for impressionist and expressionist artwork

### Zen
- Serene, meditative patterns with soft, calming colors
- Animated glowing orbs and flowing shapes
- Perfect for minimalist and peaceful spaces

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shatch/art-hanger.git
   cd art-hanger
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📐 How to Use

1. **Enter Artwork Height**: Input the height of your artwork in inches
2. **Enter Wire Distance**: Specify the distance from the top of your artwork to where the wire becomes taut when hung
3. **Select Mood**: Choose your preferred artistic theme for the background
4. **Calculate**: Click the calculate button to get your nail placement height
5. **Hang Your Art**: Place the nail at the calculated height from the floor

### The Formula

The app uses the standard gallery formula:
```
Nail Height = 57" (standard eye level) + (Artwork Height ÷ 2) - Wire Distance
```

This ensures your artwork's center is positioned at the optimal viewing height.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **Graphics**: HTML5 Canvas for dynamic background art
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 🎯 Features in Detail

### Responsive Design
- Adapts seamlessly to different screen sizes
- Touch-friendly interface for mobile devices
- Optimized for both portrait and landscape orientations

### Performance
- Client-side calculations for instant results
- Optimized canvas rendering with requestAnimationFrame
- Minimal bundle size for fast loading

### Accessibility
- High contrast text and interactive elements
- Keyboard navigation support
- Screen reader friendly labels and descriptions

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify

### Deploy to Other Platforms

The app is compatible with any static hosting platform that supports Next.js applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by gallery hanging standards and artistic expression
- Built with modern web technologies for the best user experience
- Designed to make art hanging both precise and beautiful

---

**Author Credits:**
- Steve Hatch ([steve@hatch.org](mailto:steve@hatch.org))
- Cursor AI
- ChatGPT

**Happy hanging! 🎨📌**

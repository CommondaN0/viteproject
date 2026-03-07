# WebGL Interactive Pattern ✨

[![WebGL Pattern](https://img.shields.io/badge/demo-WebGL-blue?style=for-the-badge&logo=html5&logoColor=white)](https://github.com/CommondaN0/reactpage)

Interactive WebGL pattern with mouse-controlled ripple effects, dynamic colors, and glow. Built with Vite.

![Demo](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=WebGL+Interactive+Pattern)

## ✨ Features

- 🎮 **Ripple Effect** - Waves emanate from cursor
- 🌈 **Dynamic Colors** - HSV gradients shift with mouse & time
- 💫 **Cursor Glow** - Yellow-white bloom effect
- 📱 **Fully Responsive** - Works on all screen sizes
- ⚡ **60 FPS** - Smooth `requestAnimationFrame` animation
- 🔧 **Pure WebGL** - No dependencies, shader-only

## 🚀 Quick Start

```bash
git clone https://github.com/CommondaN0/reactpage.git
cd reactpage
npm install
npm run dev
Open http://localhost:5173 and move your mouse! 🖱️

🛠️ Project Structure
text
reactpage/
├── index.html     # Main HTML
├── main.js       # WebGL + shaders
├── style.css     # Canvas styles
└── package.json  # Vite config
🎨 How It Works
Fragment Shader Effects
text
// Grid pattern
float pattern = sin(uv.x * 3.14) * sin(uv.y * 3.14) * 0.5 + 0.5;

// Mouse ripple
float ripple = sin(dist * 30.0 - u_time * 8.0) * exp(-dist * 8.0);

// HSV colors
vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 0.8, 0.2) + pattern * 6.28);
Mouse Interaction
javascript
canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX - rect.left;
  mouseY = canvas.height - (e.clientY - rect.top);
});
🔧 Build & Deploy
bash
npm run dev     # Development
npm run build   # Production
npm run preview # Preview build
📱 Live Demo Features
Hover → Ripples + color shifts

Click → Position refresh

Resize → Adaptive redraw

🔮 Future Ideas
 Touch events for mobile

 Animation speed slider

 Color presets

 GIF export

 WebGL2 shadows

🤝 Contributing
Fork the repo

Create feature branch (git checkout -b feature/cool-effect)

Commit changes (git commit -m 'Add cool effect')

Push (git push origin feature/cool-effect)

Open Pull Request

📄 License
MIT License - see LICENSE for details.

Made with ❤️ using pure WebGL + Vite

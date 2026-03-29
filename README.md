# WebGL Interactive Pattern ✨

[![WebGL Pattern](https://img.shields.io/badge/demo-WebGL-blue?style=for-the-badge&logo=html5&logoColor=white)](https://github.com/CommondaN0/reactpage)

Interactive WebGL pattern with mouse-controlled ripple effects, dynamic colors, and glow. Built with Vite.


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
```

Open http://localhost:5173 and move your mouse! 🖱️


## 🛠️ Project Structure
<pre>
text
reactpage/
├── index.html     # Main HTML
├── main.js       # WebGL + shaders
├── style.css     # Canvas styles
└── package.json  # Vite config
</pre>

## 🔧 Build & Deploy
```bash
npm run dev     # Development
npm run build   # Production
npm run preview # Preview build
```

## 📱 Live Demo Features
1. Hover → Ripples + color shifts

2. Click → Position refresh

3. Resize → Adaptive redraw

## 🔮 Future Ideas
- [x] Touch events for mobile

- [x] Animation speed slider

- [x] Color presets

- [x] GIF export

- [x] WebGL2 shadows

## 🤝 Contributing

1. Fork the repo

2. Create feature branch (git checkout -b feature/cool-effect)

3. Commit changes (git commit -m 'Add cool effect')

4. Push (git push origin feature/cool-effect)

5. Open Pull Request

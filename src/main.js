const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  throw new Error('WebGL не поддерживается');
}

// Vertex Shader
const vertexShaderSource = `#version 100
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = (a_position + 1.0) * 0.5;
}`;

// Fragment Shader с интерактивным узором
const fragmentShaderSource = `#version 100
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

float circle(vec2 p, float r) {
  return length(p) - r;
}

float pattern(vec2 uv, float scale) {
  uv *= scale;
  return sin(uv.x * 3.14) * sin(uv.y * 3.14) * 0.5 + 0.5;
}

void main() {
  vec2 uv = v_uv;
  vec2 mouse = u_mouse / u_resolution;
  
  // Расстояние до мыши
  float dist = distance(uv, mouse);
  
  // Базовый узор
  float pat1 = pattern(uv * 5.0 + u_time * 0.5, 1.0);
  float pat2 = pattern(uv * 8.0 - u_time * 0.3, 1.0);
  float pattern = pat1 * pat2;
  
  // Волны от мыши
  float ripple = sin(dist * 30.0 - u_time * 8.0) * exp(-dist * 8.0);
  pattern += ripple * 0.6;
  
  // Цвета
  vec3 col1 = 0.5 + 0.5 * cos(vec3(0.0, 0.8, 0.2) + pattern * 6.28 + u_time * 0.3);
  vec3 col2 = 0.5 + 0.5 * cos(vec3(2.0, 0.3, 1.0) + pattern * 4.0 + u_time * 0.7);
  
  vec3 color = mix(col1, col2, smoothstep(0.3, 0.7, pattern));
  
  // Свечение от мыши
  float glow = exp(-dist * 5.0) * 0.8;
  color += vec3(1.0, 0.8, 0.4) * glow;
  
  gl_FragColor = vec4(color, 1.0);
}`;

// Компиляция шейдеров
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Создание программы
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// Инициализация
const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vs, fs);

gl.useProgram(program);

// Полноэкранный квадрат
const positions = new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,
   1,  1,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Uniforms
const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
const timeLocation = gl.getUniformLocation(program, 'u_time');

// Mouse tracking
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = canvas.height - (e.clientY - rect.top);
});

canvas.addEventListener('click', (e) => {
  // Дополнительный эффект при клике
  mouseX = e.clientX - canvas.getBoundingClientRect().left;
  mouseY = canvas.height - (e.clientY - canvas.getBoundingClientRect().top);
});

// Resize
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resize);

// Render loop
let startTime = performance.now();

function render() {
  const currentTime = (performance.now() - startTime) / 1000;
  
  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
  gl.uniform2f(mouseLocation, mouseX, mouseY);
  gl.uniform1f(timeLocation, currentTime);
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(render);
}

resize();
render();

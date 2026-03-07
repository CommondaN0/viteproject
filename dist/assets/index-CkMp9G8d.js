(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}})();const n=document.querySelector("#canvas"),e=n.getContext("webgl");if(!e)throw new Error("WebGL не поддерживается");const h=`#version 100
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = (a_position + 1.0) * 0.5;
}`,g=`#version 100
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
}`;function d(t,c,a){const r=t.createShader(c);return t.shaderSource(r,a),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("Shader compile error:",t.getShaderInfoLog(r)),t.deleteShader(r),null)}function _(t,c,a){const r=t.createProgram();return t.attachShader(r,c),t.attachShader(r,a),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?r:(console.error("Program link error:",t.getProgramInfoLog(r)),t.deleteProgram(r),null)}const S=d(e,e.VERTEX_SHADER,h),L=d(e,e.FRAGMENT_SHADER,g),s=_(e,S,L);e.useProgram(s);const A=new Float32Array([-1,-1,1,-1,-1,1,1,1]),w=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,w);e.bufferData(e.ARRAY_BUFFER,A,e.STATIC_DRAW);const m=e.getAttribLocation(s,"a_position");e.enableVertexAttribArray(m);e.vertexAttribPointer(m,2,e.FLOAT,!1,0,0);const P=e.getUniformLocation(s,"u_resolution"),y=e.getUniformLocation(s,"u_mouse"),R=e.getUniformLocation(s,"u_time");let l=0,f=0;n.addEventListener("mousemove",t=>{const c=n.getBoundingClientRect();l=t.clientX-c.left,f=n.height-(t.clientY-c.top)});n.addEventListener("click",t=>{l=t.clientX-n.getBoundingClientRect().left,f=n.height-(t.clientY-n.getBoundingClientRect().top)});function p(){n.width=window.innerWidth,n.height=window.innerHeight,e.viewport(0,0,n.width,n.height)}window.addEventListener("resize",p);let E=performance.now();function v(){const t=(performance.now()-E)/1e3;e.uniform2f(P,n.width,n.height),e.uniform2f(y,l,f),e.uniform1f(R,t),e.drawArrays(e.TRIANGLE_STRIP,0,4),requestAnimationFrame(v)}p();v();

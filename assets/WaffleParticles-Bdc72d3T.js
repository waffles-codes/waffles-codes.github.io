import{n as e,t}from"./index-BxiOzdk1.js";var n=e(),r=t(),i=`
attribute vec3 aPosition;

uniform float uTime;
uniform vec2 uPointer;
uniform float uAspect;
uniform float uDpr;
uniform float uPointSize;
uniform float uViewportHeight;

vec3 rotateX(vec3 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);

  return vec3(
    p.x,
    p.y * c - p.z * s,
    p.y * s + p.z * c
  );
}

vec3 rotateY(vec3 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);

  return vec3(
    p.x * c + p.z * s,
    p.y,
    -p.x * s + p.z * c
  );
}

void main() {
  vec3 position = aPosition;

  // Slow object spin.
  position = rotateY(position, uTime * 0.15);
  position = rotateX(position, uTime * 0.30);

  // Pointer-driven camera orbit.
  float orbitY = uPointer.x * 0.3 * 3.14159265;
  float orbitX = uPointer.y * 0.3 * 3.14159265;

  position = rotateY(position, orbitY);
  position = rotateX(position, orbitX);

  // Camera sits at +Z and looks toward the origin.
  float cameraZ = 4.0;
  float distanceToCamera = cameraZ - position.z;

  // Perspective projection.
  float focalLength = 1.303;
  float perspectiveScale = focalLength / max(distanceToCamera, 0.1);

  float clipX = position.x * perspectiveScale / uAspect;
  float clipY = position.y * perspectiveScale;

  gl_Position = vec4(clipX, clipY, 0.0, 1.0);

  // Distance-based point size.
  gl_PointSize = uPointSize * uViewportHeight * uDpr / max(distanceToCamera, 0.1);}
`,a=`
precision mediump float;

void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float distanceSquared = dot(uv, uv);

  if (distanceSquared > 1.0) {
    discard;
  }

  // Browser expects premultiplied alpha.
  gl_FragColor = vec4(0.8431372549, 0.8078431373, 0.737254902, 1);
}
`,o=5e3,s=2.8,c=2.45,l=.35,u=4.9,d=3,f=.63;function p(e,t,n){let r=e.createShader(t);if(!r)throw Error(`Unable to create WebGL shader`);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(`WebGL shader compile error: ${t}`)}return r}function m(e){let t=e.createProgram();if(!t)throw Error(`Unable to create WebGL program`);let n=p(e,e.VERTEX_SHADER,i),r=p(e,e.FRAGMENT_SHADER,a);if(e.attachShader(t,n),e.attachShader(t,r),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){let i=e.getProgramInfoLog(t);throw e.deleteProgram(t),e.deleteShader(n),e.deleteShader(r),Error(`WebGL program link error: ${i}`)}return e.deleteShader(n),e.deleteShader(r),t}function h(){let e=new Float32Array(o*3),t=Math.PI*(s*s-c*c),n=t+l*u*d,r=Math.round(o*t/n);r=Math.min(r,o);let i=0;for(let t=0;t<r;t+=1){let t=Math.random()*Math.PI*2,n=Math.sqrt(Math.random()*(s*s-c*c)+c*c);e[i*3]=n*Math.cos(t),e[i*3+1]=n*Math.sin(t),e[i*3+2]=(Math.random()-.5)*.35,i+=1}let a=(t,n)=>{i>=o||Math.hypot(t,n)>c||(e[i*3]=t,e[i*3+1]=n,e[i*3+2]=(Math.random()-.5)*.35,i+=1)};for(;i<o;)for(let e=0;e<4;e+=1)for(let t=0;t<d;t+=1){let n=f*t*1.5;e===0?a((Math.random()-.5)*l+n,(Math.random()-.5)*u):e===1?a((Math.random()-.5)*l-n,(Math.random()-.5)*u):e===2?a((Math.random()-.5)*u,(Math.random()-.5)*l+n):a((Math.random()-.5)*u,(Math.random()-.5)*l-n)}return e}function g(){let e=(0,n.useRef)(null);return(0,n.useEffect)(()=>{let t=e.current;if(!t)return;let n=document.createElement(`canvas`);n.style.width=`100%`,n.style.height=`100%`,n.style.display=`block`,t.appendChild(n);let r=n.getContext(`webgl`,{alpha:!0,antialias:!1,premultipliedAlpha:!0,powerPreference:`high-performance`});if(!r){n.remove();return}let i=m(r);r.useProgram(i);let a=h(),s=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,s),r.bufferData(r.ARRAY_BUFFER,a,r.STATIC_DRAW);let c=r.getAttribLocation(i,`aPosition`);r.enableVertexAttribArray(c),r.vertexAttribPointer(c,3,r.FLOAT,!1,0,0);let l=r.getUniformLocation(i,`uTime`),u=r.getUniformLocation(i,`uPointer`),d=r.getUniformLocation(i,`uAspect`),f=r.getUniformLocation(i,`uDpr`),p=r.getUniformLocation(i,`uPointSize`),g=r.getUniformLocation(i,`uViewportHeight`);r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA),r.clearColor(0,0,0,0);let _=()=>Math.min(window.devicePixelRatio||1,1.25),v=()=>{let e=t.clientWidth||window.innerWidth,i=t.clientHeight||window.innerHeight,a=_();n.width=Math.max(1,Math.round(e*a)),n.height=Math.max(1,Math.round(i*a)),r.viewport(0,0,n.width,n.height),r.uniform1f(d,e/i),r.uniform1f(f,a),r.uniform1f(g,i)},y=0,b=0,x=0,S=0,C=0,w=0,T=!1,E=null,D=e=>{let t=.0025;y+=e.movementX*t,b+=e.movementY*t},O=()=>{E===null&&(E=requestAnimationFrame(()=>{E=null,v()}))},k=e=>{let t=e*.001,n=Math.min((e-C)/1e3,.05);C=e;let i=1-Math.exp(-3.5*n);x+=(y-x)*i,S+=(b-S)*i,r.uniform1f(l,t),r.uniform2f(u,x/(Math.PI*.3),S/(Math.PI*.3)),r.uniform1f(p,.02),r.clear(r.COLOR_BUFFER_BIT),r.drawArrays(r.POINTS,0,o)},A=e=>{w=requestAnimationFrame(A),k(e)},j=()=>{T||(T=!0,w=requestAnimationFrame(A))},M=()=>{T&&(T=!1,cancelAnimationFrame(w))},N=()=>{document.hidden?M():j()},P=new IntersectionObserver(([e])=>{e.isIntersecting&&!document.hidden?j():M()});return v(),P.observe(t),window.addEventListener(`pointermove`,D,{passive:!0}),window.addEventListener(`resize`,O,{passive:!0}),document.addEventListener(`visibilitychange`,N),j(),()=>{M(),E!==null&&cancelAnimationFrame(E),P.disconnect(),window.removeEventListener(`pointermove`,D),window.removeEventListener(`resize`,O),document.removeEventListener(`visibilitychange`,N),r.deleteBuffer(s),r.deleteProgram(i),n.remove()}},[]),(0,r.jsx)(`div`,{ref:e,className:`h-full w-full pointer-events-none select-none opacity-90`,style:{contain:`strict`}})}export{g as default};
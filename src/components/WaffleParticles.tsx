import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
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
`;

const FRAGMENT_SHADER = `
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
`;

const PARTICLE_COUNT = 5000;
const OUTER_RADIUS = 2.8;
const INNER_RADIUS = 2.45;
const RECTANGLE_WIDTH = 0.35;
const RECTANGLE_LENGTH = 4.9;
const RECTANGLES = 3;
const SPACING = 0.63;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create WebGL shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`WebGL shader compile error: ${error}`);
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create WebGL program");

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER,
  );

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error(`WebGL program link error: ${error}`);
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

function createPositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  const annularArea =
    Math.PI * (OUTER_RADIUS * OUTER_RADIUS - INNER_RADIUS * INNER_RADIUS);
  const rectangleArea = RECTANGLE_WIDTH * RECTANGLE_LENGTH * RECTANGLES;
  const totalArea = annularArea + rectangleArea;

  let annularCount = Math.round(
    (PARTICLE_COUNT * annularArea) / totalArea,
  );
  annularCount = Math.min(annularCount, PARTICLE_COUNT);

  let index = 0;

  for (let i = 0; i < annularCount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(
      Math.random() *
        (OUTER_RADIUS * OUTER_RADIUS - INNER_RADIUS * INNER_RADIUS) +
        INNER_RADIUS * INNER_RADIUS,
    );

    positions[index * 3] = radius * Math.cos(angle);
    positions[index * 3 + 1] = radius * Math.sin(angle);
    positions[index * 3 + 2] = (Math.random() - 0.5) * 0.35;
    index += 1;
  }

  const pushPoint = (x: number, y: number) => {
    if (index >= PARTICLE_COUNT) return;
    if (Math.hypot(x, y) > INNER_RADIUS) return;

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 0.35;
    index += 1;
  };

  while (index < PARTICLE_COUNT) {
    for (let side = 0; side < 4; side += 1) {
      for (let column = 0; column < RECTANGLES; column += 1) {
        const offset = SPACING * column * 1.5;

        if (side === 0) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_WIDTH + offset,
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
          );
        } else if (side === 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_WIDTH - offset,
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
          );
        } else if (side === 2) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
            (Math.random() - 0.5) * RECTANGLE_WIDTH + offset,
          );
        } else {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
            (Math.random() - 0.5) * RECTANGLE_WIDTH - offset,
          );
        }
      }
    }
  }

  return positions;
}

export default function WaffleParticles() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      canvas.remove();
      return;
    }

    const program = createProgram(gl);
    gl.useProgram(program);

    const positions = createPositions();
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uAspect = gl.getUniformLocation(program, "uAspect");
    const uDpr = gl.getUniformLocation(program, "uDpr");
    const uPointSize = gl.getUniformLocation(program, "uPointSize");
    const uViewportHeight = gl.getUniformLocation(program,"uViewportHeight");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const getDpr = () => Math.min(window.devicePixelRatio || 1, 1.25);

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const dpr = getDpr();

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, width / height);
      gl.uniform1f(uDpr, dpr);
      gl.uniform1f(uViewportHeight, height);
    };

    let targetOrbitX = 0;
    let targetOrbitY = 0;
    let smoothOrbitX = 0;
    let smoothOrbitY = 0;
    let previousTimeMs = 0;
    let rafId = 0;
    let isRunning = false;
    let resizeFrameId: number | null = null;

    const handlePointerMove = (event: PointerEvent) => {
      // Convert pixel deltas into a manageable rotation range.
      const sensitivity = 0.0025;

      targetOrbitX += event.movementX * sensitivity;
      targetOrbitY += event.movementY * sensitivity;
    };

    const handleResize = () => {
      if (resizeFrameId !== null) return;

      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = null;
        resize();
      });
    };

    const render = (timeMs: number) => {
      const time = timeMs * 0.001;
      const deltaTime = Math.min((timeMs - previousTimeMs) / 1000, 0.05);
      previousTimeMs = timeMs;

      const followStrength = 3.5;
      const smoothing = 1 - Math.exp(-followStrength * deltaTime);

      smoothOrbitX += (targetOrbitX - smoothOrbitX) * smoothing;
      smoothOrbitY += (targetOrbitY - smoothOrbitY) * smoothing;

      gl.uniform1f(uTime, time);
      gl.uniform2f(
        uPointer,
        smoothOrbitX / (Math.PI * 0.3),
        smoothOrbitY / (Math.PI * 0.3),
      );
      gl.uniform1f(uPointSize, 0.02);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
    };

    const animate = (timeMs: number) => {
      rafId = requestAnimationFrame(animate);
      render(timeMs);
    };

    const start = () => {
      if (isRunning) return;

      isRunning = true;
      rafId = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (!isRunning) return;

      isRunning = false;
      cancelAnimationFrame(rafId);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    });

    resize();
    observer.observe(container);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    start();

    return () => {
      stop();

      if (resizeFrameId !== null) {
        cancelAnimationFrame(resizeFrameId);
      }

      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full pointer-events-none select-none opacity-90"
      style={{ contain: "strict" }}
    />
  );
}
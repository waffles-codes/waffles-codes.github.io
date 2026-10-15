import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WaffleParticles() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });

    const getDpr = () => Math.min(window.devicePixelRatio || 1, 1.25);

    renderer.setPixelRatio(getDpr());
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const SCALING = 0.7;
    const OUTER_RADIUS = 4 * SCALING;
    const INNER_RADIUS = 3.5 * SCALING;
    const PARTICLE_COUNT = 5000;
    const RECTANGLE_WIDTH = 0.5 * SCALING;
    const RECTANGLE_LENGTH = 7 * SCALING;
    const RECTANGLES = 3;
    const SPACING = 0.9 * SCALING;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    const annularArea =
      Math.PI * (OUTER_RADIUS * OUTER_RADIUS - INNER_RADIUS * INNER_RADIUS);
    const rectangleArea = RECTANGLE_WIDTH * RECTANGLE_LENGTH * RECTANGLES;
    const totalArea = annularArea + rectangleArea;

    let annularParticles = Math.round(
      PARTICLE_COUNT * (annularArea / totalArea),
    );
    let rectangleParticles = PARTICLE_COUNT - annularParticles;

    annularParticles +=
      PARTICLE_COUNT - (annularParticles + rectangleParticles);

    let index = 0;

    for (
      let i = 0;
      i < annularParticles && index < PARTICLE_COUNT;
      i += 1
    ) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(
        Math.random() *
          (OUTER_RADIUS * OUTER_RADIUS - INNER_RADIUS * INNER_RADIUS) +
          INNER_RADIUS * INNER_RADIUS,
      );

      positions[index * 3] = radius * Math.cos(angle);
      positions[index * 3 + 1] = radius * Math.sin(angle);
      positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5 * SCALING;
      index += 1;
    }

    const pushPoint = (x: number, y: number) => {
      if (index >= PARTICLE_COUNT) return;

      const distance = Math.sqrt(x * x + y * y);
      if (distance > INNER_RADIUS) return;

      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5 * SCALING;
      index += 1;
    };

    while (index < PARTICLE_COUNT) {
      for (
        let i = 0;
        i < rectangleParticles && index < PARTICLE_COUNT;
        i += 1
      ) {
        for (let j = 0; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_WIDTH + SPACING * j * 1.5,
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
          );
        }

        for (let j = 1; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_WIDTH - SPACING * j * 1.5,
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
          );
        }

        for (let j = 0; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
            (Math.random() - 0.5) * RECTANGLE_WIDTH + SPACING * j * 1.5,
          );
        }

        for (let j = 1; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
            (Math.random() - 0.5) * RECTANGLE_WIDTH - SPACING * j * 1.5,
          );
        }
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const material = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color(0.6667, 0.5686, 0.4549),
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const CAMERA_DISTANCE = 5;
    const targetPosition = new THREE.Vector3(0, 0, CAMERA_DISTANCE);
    const normalizedPosition = new THREE.Vector3();

    let pointerX = 0;
    let pointerY = 0;
    let rafId = 0;
    let isRunning = false;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const resize = () => {
      const nextWidth = container.clientWidth || window.innerWidth;
      const nextHeight = container.clientHeight || window.innerHeight;

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(getDpr());
      renderer.setSize(nextWidth, nextHeight);
    };

    // Coalesce resize events into one layout read/write per frame.
    let resizeFrameId: number | null = null;

    const handleResize = () => {
      if (resizeFrameId !== null) return;

      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = null;
        resize();
      });
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      particles.rotation.y += 0.0025;
      particles.rotation.z += 0.001;

      const verticalAngle = -pointerY * Math.PI * 0.3;
      const horizontalAngle = -pointerX * Math.PI * 0.3;

      targetPosition.set(
        CAMERA_DISTANCE *
          Math.sin(horizontalAngle) *
          Math.cos(verticalAngle),
        CAMERA_DISTANCE * Math.sin(verticalAngle),
        CAMERA_DISTANCE *
          Math.cos(horizontalAngle) *
          Math.cos(verticalAngle),
      );

      camera.position.lerp(targetPosition, 0.01);

      normalizedPosition.copy(camera.position).normalize();
      camera.position
        .copy(normalizedPosition)
        .multiplyScalar(CAMERA_DISTANCE);

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
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
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

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

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      geometry.dispose();
      material.dispose();
      scene.clear();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
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
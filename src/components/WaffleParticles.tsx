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
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
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

    const annularArea = Math.PI * (OUTER_RADIUS ** 2 - INNER_RADIUS ** 2);
    const rectangleArea = RECTANGLE_WIDTH * RECTANGLE_LENGTH * RECTANGLES;
    const totalArea = annularArea + rectangleArea;

    let annularParticles = Math.round(
      PARTICLE_COUNT * (annularArea / totalArea)
    );
    let rectangleParticles = PARTICLE_COUNT - annularParticles;

    if (annularParticles + rectangleParticles !== PARTICLE_COUNT) {
      annularParticles +=
        PARTICLE_COUNT - (annularParticles + rectangleParticles);
    }

    let index = 0;

    for (let i = 0; i < annularParticles && index < PARTICLE_COUNT; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(
        Math.random() * (OUTER_RADIUS ** 2 - INNER_RADIUS ** 2) +
          INNER_RADIUS ** 2
      );

      positions[index * 3] = radius * Math.cos(angle);
      positions[index * 3 + 1] = radius * Math.sin(angle);
      positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5 * SCALING;
      index += 1;
    }

    const pushPoint = (x: number, y: number) => {
      if (index >= PARTICLE_COUNT) return;
      const distance = Math.sqrt(x ** 2 + y ** 2);
      if (distance > INNER_RADIUS) return;

      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5 * SCALING;
      index += 1;
    };

    while (index < PARTICLE_COUNT) {
      for (let i = 0; i < rectangleParticles && index < PARTICLE_COUNT; i += 1) {
        for (let j = 0; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_WIDTH + SPACING * j * 1.5,
            (Math.random() - 0.5) * RECTANGLE_LENGTH
          );
        }

        for (let j = 1; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_WIDTH - SPACING * j * 1.5,
            (Math.random() - 0.5) * RECTANGLE_LENGTH
          );
        }

        for (let j = 0; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
            (Math.random() - 0.5) * RECTANGLE_WIDTH + SPACING * j * 1.5
          );
        }

        for (let j = 1; j < RECTANGLES; j += 1) {
          pushPoint(
            (Math.random() - 0.5) * RECTANGLE_LENGTH,
            (Math.random() - 0.5) * RECTANGLE_WIDTH - SPACING * j * 1.5
          );
        }
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color(0.6667, 0.5686, 0.4549),
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const cameraDistance = 5;
    let mouseX = 0;
    let mouseY = 0;
    let rafId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      const nextWidth = container.clientWidth || window.innerWidth;
      const nextHeight = container.clientHeight || window.innerHeight;

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);

      particles.rotation.y += 0.0025;
      particles.rotation.z += 0.001;

      const verticalAngle = -mouseY * Math.PI * 0.3;
      const horizontalAngle = -mouseX * Math.PI * 0.3;

      const nextX =
        cameraDistance * Math.sin(horizontalAngle) * Math.cos(verticalAngle);
      const nextY = cameraDistance * Math.sin(verticalAngle);
      const nextZ =
        cameraDistance * Math.cos(horizontalAngle) * Math.cos(verticalAngle);

      camera.position.x += (nextX - camera.position.x) * 0.01;
      camera.position.y += (nextY - camera.position.y) * 0.01;
      camera.position.z += (nextZ - camera.position.z) * 0.01;

      const direction = new THREE.Vector3()
        .copy(camera.position)
        .normalize()
        .multiplyScalar(cameraDistance);

      camera.position.copy(direction);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

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
    />
  );
}
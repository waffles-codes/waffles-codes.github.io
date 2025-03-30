import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaffleParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Capture the current value of containerRef
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // New grid configuration
    const OUTER_RADIUS = 4; // Outer bound of the circle
    const INNER_RADIUS = 3.5; // Inner bound of the circle
    const PARTICLE_COUNT = 5000; // Total number of particles
    const RECTANGLE_WIDTH = 0.5;  // Horizontal size of rectangle
    const RECTANGLE_LENGTH = 7;  // Vertical size of rectangle
    const RECTANGLES = 3;
    const SPACING = 0.9;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    
    // Calculate distribution between regions
    const annularArea = Math.PI * (OUTER_RADIUS**2 - INNER_RADIUS**2);
    const rectangleArea = RECTANGLE_WIDTH * RECTANGLE_LENGTH * RECTANGLES;
    const totalArea = annularArea + rectangleArea;
    
    let annularParticles = Math.round(PARTICLE_COUNT * (annularArea / totalArea));
    let rectangleParticles = PARTICLE_COUNT - annularParticles;
    
    // Fix potential rounding errors
    if (annularParticles + rectangleParticles !== PARTICLE_COUNT) {
      annularParticles += PARTICLE_COUNT - (annularParticles + rectangleParticles);
    }
    
    let index = 0;
    
    // Generate annular region particles
    for (let i = 0; i < annularParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(
        Math.random() * (OUTER_RADIUS**2 - INNER_RADIUS**2) + INNER_RADIUS**2
      );
      
      positions[index * 3] = radius * Math.cos(angle);
      positions[index * 3 + 1] = radius * Math.sin(angle);
      positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5;
      index++;
    }
    
    // Generate rectangular section particles
    for (let i = 0; i < rectangleParticles; i++) {
        for (let j = 0; j < RECTANGLES; j++){
            const x = (Math.random() - 0.5) * RECTANGLE_WIDTH + SPACING * j * 1.5;
            const y = (Math.random() - 0.5) * RECTANGLE_LENGTH;
            
            // Ensure rectangle stays within outer circle
            const distance = Math.sqrt(x**2 + y**2);
            if (distance > INNER_RADIUS) continue;  // Skip points outside middle of circle
            
            positions[index * 3] = x;
            positions[index * 3 + 1] = y;
            positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5;
            index++;
            
            // Regenerate if we skipped some particles
            if (index < PARTICLE_COUNT && i === rectangleParticles - 1) {
                i--;
            }
        }
        for (let j = 0; j < RECTANGLES; j++){
            const x = (Math.random() - 0.5) * RECTANGLE_WIDTH - SPACING * j * 1.5;
            const y = (Math.random() - 0.5) * RECTANGLE_LENGTH;
            
            // Ensure rectangle stays within outer circle
            const distance = Math.sqrt(x**2 + y**2);
            if (distance > INNER_RADIUS) continue;  // Skip points outside middle of circle
            
            positions[index * 3] = x;
            positions[index * 3 + 1] = y;
            positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5;
            index++;
            
            // Regenerate if we skipped some particles
            if (index < PARTICLE_COUNT && i === rectangleParticles - 1) {
                i--;
            }
        }
        for (let j = 0; j < RECTANGLES; j++){
            const x = (Math.random() - 0.5) * RECTANGLE_LENGTH;
            const y = (Math.random() - 0.5) * RECTANGLE_WIDTH + SPACING * j * 1.5;
            
            // Ensure rectangle stays within outer circle
            const distance = Math.sqrt(x**2 + y**2);
            if (distance > INNER_RADIUS) continue;  // Skip points outside middle of circle
            
            positions[index * 3] = x;
            positions[index * 3 + 1] = y;
            positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5;
            index++;
            
            // Regenerate if we skipped some particles
            if (index < PARTICLE_COUNT && i === rectangleParticles - 1) {
                i--;
            }
        }
        for (let j = 0; j < RECTANGLES; j++){
            const x = (Math.random() - 0.5) * RECTANGLE_LENGTH;
            const y = (Math.random() - 0.5) * RECTANGLE_WIDTH - SPACING * j * 1.5;
            
            // Ensure rectangle stays within outer circle
            const distance = Math.sqrt(x**2 + y**2);
            if (distance > INNER_RADIUS) continue;  // Skip points outside middle of circle
            
            positions[index * 3] = x;
            positions[index * 3 + 1] = y;
            positions[index * 3 + 2] = (Math.random() - 0.5) * 0.5;
            index++;
            
            // Regenerate if we skipped some particles
            if (index < PARTICLE_COUNT && i === rectangleParticles - 1) {
                i--;
            }
        }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    

    // Create waffle-colored material
    const material = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color(0.6667, 0.5686, 0.4549), // Golden waffle color
      transparent: false,
      opacity: 1,
    });

    // Create particle system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Camera positioning
    camera.position.z = 5;

    // // Mouse interaction variables
    // let mouseX = 0;
    // let mouseY = 0;

    // const handleMouseMove = (event) => {
    //   mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    // };

    // window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the particle system slightly for dynamic effect
      // particles.rotation.x += 0.0005;
      particles.rotation.y += 0.002;
      particles.rotation.z += 0.001;

      // Smooth camera movement based on mouse position
    //   camera.position.x += (mouseX * 2 - camera.position.x) * 0.002;
    //   camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize events
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
    // window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    
    // Use captured container reference for cleanup
    if (container) {
      container.removeChild(renderer.domElement);
    }
    
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    
    // Clean up scene objects
    scene.clear();
    
    console.log("Cleanup completed");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: ' #fef3dd',
      }}
    />
  );
};

export default WaffleParticles;
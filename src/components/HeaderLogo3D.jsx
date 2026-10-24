import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeaderLogo3D - Interactive 3D Crystal Cube for Navbar Brand
 * Renders an interactive 3D isometric polyhedron that rotates gently and tilts to cursor hover.
 */
export default function HeaderLogo3D({ size = 36, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.8);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffd83d, 2.5); // Amber gold
    dirLight1.position.set(2, 3, 2);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7928ca, 2.0); // Violet purple
    dirLight2.position.set(-2, -2, -2);
    scene.add(dirLight2);

    // Group for combined rotation
    const group = new THREE.Group();
    scene.add(group);

    // Outer 3D Rounded Cube / Gem
    const boxGeo = new THREE.BoxGeometry(1.35, 1.35, 1.35);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xffd83d,
      roughness: 0.25,
      metalness: 0.7,
      transparent: true,
      opacity: 0.92,
    });
    const cube = new THREE.Mesh(boxGeo, boxMat);
    group.add(cube);

    // Wireframe edges for tech feel
    const wireGeo = new THREE.EdgesGeometry(boxGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x4c1d95,
      linewidth: 1.5,
    });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    group.add(wireframe);

    // Inner glowing core octahedron
    const coreGeo = new THREE.OctahedronGeometry(0.65, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Initial isometric rotation
    group.rotation.x = 0.55;
    group.rotation.y = 0.78;

    let targetRotX = 0.55;
    let targetRotY = 0.78;
    let isHovered = false;

    const onMouseEnter = () => {
      isHovered = true;
    };
    const onMouseLeave = () => {
      isHovered = false;
      targetRotX = 0.55;
      targetRotY = 0.78;
    };
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = 0.78 + x * 1.5;
      targetRotX = 0.55 - y * 1.5;
    };

    canvas.addEventListener('mouseenter', onMouseEnter);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('mousemove', onMouseMove);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isHovered) {
        group.rotation.y += delta * 0.9;
        group.rotation.x = 0.55 + Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
      } else {
        // Smooth interpolation towards mouse tilt
        group.rotation.y += (targetRotY - group.rotation.y) * 0.12;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.12;
      }

      core.rotation.y -= delta * 1.5;
      core.rotation.z += delta * 1.0;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      boxGeo.dispose();
      boxMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
    };
  }, []);

  return (
    <div 
      className={`relative flex items-center justify-center cursor-pointer group ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-amber-300/40 to-purple-400/30 blur-[6px] group-hover:blur-[9px] transition-all" />
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="relative z-10 drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
        title="Interactive 3D DKoder Emblem"
      />
    </div>
  );
}

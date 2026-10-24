import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ParticleCanvas - 3D Interactive Geometric Atmosphere for Hero Header
 * Combines:
 * 1. A floating 3D Wireframe Icosahedron Crystal with dual glowing orbital rings
 * 2. An inner pulsating geometric core with amber and violet directional lights
 * 3. 140 floating code-node particles with faint constellation connectors
 * 4. Interactive 3D mouse parallax tracking
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 7;

    // --- 3D Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xffd83d, 3.5, 20);
    amberLight.position.set(4, 3, 4);
    scene.add(amberLight);

    const purpleLight = new THREE.PointLight(0x7928ca, 3.0, 20);
    purpleLight.position.set(-4, -3, 3);
    scene.add(purpleLight);

    // --- 3D Geometric Anchor Group (Positioned in right-center of header) ---
    const anchor3D = new THREE.Group();
    // Position slightly toward top-right where visual breathing room exists
    anchor3D.position.set(2.8, 0.4, -0.5);
    scene.add(anchor3D);

    // 1. Outer 3D Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const icoWire = new THREE.LineSegments(icoEdges, icoMat);
    anchor3D.add(icoWire);

    // 2. Vertex Glowing Points on the Icosahedron
    const icoVertexGeo = new THREE.BufferGeometry();
    const icoPos = icoGeo.getAttribute('position');
    icoVertexGeo.setAttribute('position', icoPos);
    const icoVertexMat = new THREE.PointsMaterial({
      color: 0xffd83d,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const icoPoints = new THREE.Points(icoVertexGeo, icoVertexMat);
    anchor3D.add(icoPoints);

    // 3. Inner Floating Diamond / Octahedron Core
    const coreGeo = new THREE.OctahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffd83d,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.55,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    anchor3D.add(coreMesh);

    // Core wireframe outline
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreWireMat = new THREE.LineBasicMaterial({
      color: 0xfff089,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.8,
    });
    const coreWire = new THREE.LineSegments(coreEdges, coreWireMat);
    anchor3D.add(coreWire);

    // 4. Orbital 3D Torus Rings
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.015, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    anchor3D.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.012, 16, 90);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    anchor3D.add(ring2);

    // 5. Ambient Constellation Particles
    const particleCount = 130;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#FFD83D'), // DKoder yellow
      new THREE.Color('#7928CA'), // DKoder purple
      new THREE.Color('#9333EA'), // Violet
      new THREE.Color('#F59E0B'), // Warm amber
      new THREE.Color('#C084FC'), // Lilac
    ];

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 16;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const col = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeometry.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    // Faint connection lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
    });
    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pPositions[i * 3] - pPositions[j * 3];
        const dy = pPositions[i * 3 + 1] - pPositions[j * 3 + 1];
        const dz = pPositions[i * 3 + 2] - pPositions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 2.2) {
          linePositions.push(
            pPositions[i * 3], pPositions[i * 3 + 1], pPositions[i * 3 + 2],
            pPositions[j * 3], pPositions[j * 3 + 1], pPositions[j * 3 + 2]
          );
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // --- Interactive Mouse Tracking with Smooth Damping ---
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 3D Anchor rotation
      anchor3D.rotation.y = t * 0.2 + mouse.x * 0.4;
      anchor3D.rotation.x = Math.sin(t * 0.15) * 0.2 + mouse.y * 0.3;

      // Independent core spin
      coreMesh.rotation.y = -t * 0.45;
      coreMesh.rotation.z = Math.cos(t * 0.3) * 0.3;
      coreWire.rotation.copy(coreMesh.rotation);

      // Pulse core scale
      const pulse = 1 + Math.sin(t * 1.8) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);
      coreWire.scale.set(pulse, pulse, pulse);

      // Counter-rotating orbital rings
      ring1.rotation.z = t * 0.35;
      ring2.rotation.z = -t * 0.25;

      // Floating gentle bobbing motion
      anchor3D.position.y = 0.4 + Math.sin(t * 0.8) * 0.15;

      // Gentle particle field drift
      particles.rotation.y = t * 0.015 + mouse.x * 0.05;
      lines.rotation.y = particles.rotation.y;

      // Dynamic light movements
      amberLight.position.x = Math.cos(t * 0.7) * 4 + anchor3D.position.x;
      amberLight.position.y = Math.sin(t * 0.5) * 3 + anchor3D.position.y;
      purpleLight.position.x = -Math.cos(t * 0.6) * 4 + anchor3D.position.x;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Adjust 3D anchor position on smaller screens
      if (w < 768) {
        anchor3D.position.set(0, 1.2, -1.5);
        anchor3D.scale.set(0.75, 0.75, 0.75);
      } else {
        anchor3D.position.set(2.8, 0.4, -0.5);
        anchor3D.scale.set(1, 1, 1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      icoGeo.dispose();
      icoEdges.dispose();
      icoMat.dispose();
      icoVertexGeo.dispose();
      icoVertexMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreEdges.dispose();
      coreWireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      pGeometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

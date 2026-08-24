"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Large, continuously-rotating glowing 3D orb — dark glass sphere with a
 * shifting cyan / blue / purple / pink fresnel rim and orbiting highlights.
 */
export const AiOrbBg = ({ className = "" }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // ── Scene setup ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Orb geometry + custom shader material ───────────────
    const geometry = new THREE.SphereGeometry(7.4, 128, 128);

    const uniforms = {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#22d3ee") }, // cyan-400
      uColorB: { value: new THREE.Color("#60a5fa") }, // blue-400
      uColorC: { value: new THREE.Color("#a78bfa") }, // violet-400
      uColorD: { value: new THREE.Color("#f472b6") }, // pink-400
      uBase: { value: new THREE.Color("#04040a") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vObjectNormal;

        void main() {
          vObjectNormal = normalize(normal);
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform vec3 uColorD;
        uniform vec3 uBase;

        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vObjectNormal;

        float hash(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
        }

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float n000 = hash(i + vec3(0.0, 0.0, 0.0));
          float n100 = hash(i + vec3(1.0, 0.0, 0.0));
          float n010 = hash(i + vec3(0.0, 1.0, 0.0));
          float n110 = hash(i + vec3(1.0, 1.0, 0.0));
          float n001 = hash(i + vec3(0.0, 0.0, 1.0));
          float n101 = hash(i + vec3(1.0, 0.0, 1.0));
          float n011 = hash(i + vec3(0.0, 1.0, 1.0));
          float n111 = hash(i + vec3(1.0, 1.0, 1.0));
          float nx00 = mix(n000, n100, f.x);
          float nx10 = mix(n010, n110, f.x);
          float nx01 = mix(n001, n101, f.x);
          float nx11 = mix(n011, n111, f.x);
          float nxy0 = mix(nx00, nx10, f.y);
          float nxy1 = mix(nx01, nx11, f.y);
          return mix(nxy0, nxy1, f.z);
        }

        // Rotate a vector around Y by angle a — used to make the lights
        // orbit continuously, independent of the mesh's own rotation.
        vec3 rotateY(vec3 v, float a) {
          float c = cos(a);
          float s = sin(a);
          return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // Fresnel rim
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.6);

          // Azimuth around the SAME axis the mesh spins on (object-space,
          // so it visibly sweeps as the mesh rotates) + a latitude term.
          float azimuth = atan(vObjectNormal.z, vObjectNormal.x);
          float lat = vObjectNormal.y;

          float mixA = sin(azimuth * 1.6) * 0.5 + 0.5;
          float mixB = sin(lat * 3.0 + uTime * 0.32) * 0.5 + 0.5;

          vec3 rim = mix(uColorA, uColorD, mixA);
          rim = mix(rim, uColorB, mixB);
          rim = mix(rim, uColorC, sin(azimuth * 0.8 + uTime * 0.16) * 0.5 + 0.5);

          // Shimmering surface noise, scrolling over time
          float n = noise(normal * 5.0 + uTime * 0.24);
          vec3 base = uBase + n * 0.035;

          vec3 color = mix(base, rim, fresnel);

          // Orbiting highlights — driven purely by uTime so they are
          // always visibly moving, regardless of mesh orientation.
          vec3 lightDir = rotateY(normalize(vec3(0.35, 0.55, 0.75)), uTime * 0.55);
          float hotspot = pow(max(dot(normal, lightDir), 0.0), 22.0);
          color += vec3(0.85, 0.92, 1.0) * hotspot * 0.7;

          vec3 lightDir2 = rotateY(normalize(vec3(-0.6, -0.2, 0.7)), -uTime * 0.36 + 2.0);
          float hotspot2 = pow(max(dot(normal, lightDir2), 0.0), 26.0);
          color += uColorD * hotspot2 * 0.55;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // ── Animation loop (infinite) ────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;

      // Continuous multi-axis spin — bumped up from before for a
      // clearly-visible, faster rotation.
      orb.rotation.y = elapsed * 0.3;
      orb.rotation.x = Math.sin(elapsed * 0.2) * 0.28;
      orb.rotation.z = Math.cos(elapsed * 0.15) * 0.16;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // ── Resize handling ──────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(handleResize);
    ro.observe(mount);

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
    />
  );
};
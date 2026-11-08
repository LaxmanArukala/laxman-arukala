import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface TechCoreProps {
  /** 0 → 1 scroll progress through the hero, written by the hero's GSAP timeline. */
  progress: React.MutableRefObject<number>;
}

/**
 * Abstract wireframe "core" for the hero: a faceted shell, an inner point
 * cloud and two orbit rings. Plain three.js, paused while off-screen, and
 * fully disposed on unmount.
 */
const TechCore: React.FC<TechCoreProps> = ({ progress }) => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    const blue = new THREE.Color("#4f8cff");
    const violet = new THREE.Color("#8b7bff");

    // Faceted shell
    const shellGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const shellEdges = new THREE.EdgesGeometry(shellGeo);
    const shellMat = new THREE.LineBasicMaterial({ color: blue, transparent: true, opacity: 0.55 });
    const shell = new THREE.LineSegments(shellEdges, shellMat);
    group.add(shell);

    // Outer lattice
    const outerGeo = new THREE.IcosahedronGeometry(3.1, 2);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
    const outer = new THREE.LineSegments(outerEdges, outerMat);
    group.add(outer);

    // Inner point cloud
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.6 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: violet,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    // Orbit rings
    const ringGeo = new THREE.TorusGeometry(2.7, 0.004, 6, 160);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
    const ringA = new THREE.Mesh(ringGeo, ringMat);
    ringA.rotation.x = Math.PI / 2.4;
    const ringB = new THREE.Mesh(ringGeo, ringMat);
    ringB.rotation.set(Math.PI / 3, Math.PI / 5, 0);
    group.add(ringA, ringB);

    // Sizing
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.position.z = w < 768 ? 9.5 : 7;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer parallax
    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Render loop, paused off-screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;
      const p = progress.current;

      group.rotation.y = t * 0.12 + p * Math.PI * 1.2 + pointer.x * 0.25;
      group.rotation.x = Math.sin(t * 0.2) * 0.15 + pointer.y * 0.15 + p * 0.6;
      outer.rotation.y = -t * 0.05;
      points.rotation.y = -t * 0.2;
      ringA.rotation.z = t * 0.3;
      ringB.rotation.z = -t * 0.22;

      const s = 1 + p * 0.9;
      group.scale.setScalar(s);
      shellMat.opacity = 0.55 * (1 - p * 0.6);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      [shellGeo, shellEdges, outerGeo, outerEdges, pointsGeo, ringGeo].forEach((g) => g.dispose());
      [shellMat, outerMat, pointsMat, ringMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress]);

  return <div ref={mount} aria-hidden="true" className="absolute inset-0" />;
};

export default TechCore;

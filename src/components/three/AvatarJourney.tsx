import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * A 3D avatar that travels with the scroll:
 *   Hero  — stands on the right, then walks 3–4 steps to the centre.
 *   About — glides into the About frame and works at a laptop.
 *
 * One fixed, transparent canvas covers the viewport; each frame the scene is
 * drawn into a scissor rectangle that morphs from the full screen (hero) to
 * the About frame's live position. The walk is scrubbed by scroll, so it plays
 * backwards when scrolling up. The typing pose is built procedurally on the
 * Mixamo skeleton (the model ships with idle + walk only).
 *
 * Model: "Xbot" from Adobe Mixamo, as distributed with the three.js examples.
 */

const MODEL_URL = `${import.meta.env.BASE_URL}models/xbot.glb`;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (a: number, b: number, x: number) => clamp01((x - a) / (b - a));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// Scratch objects (avoid per-frame allocation)
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _qp = new THREE.Quaternion();
const _qb = new THREE.Quaternion();
const _qi = new THREE.Quaternion();

/** Rotate `bone` (in world space) so the bone→child direction points along `dir`. */
function aim(bone: THREE.Object3D, child: THREE.Object3D, dir: THREE.Vector3, weight: number) {
  if (weight <= 0) return;
  bone.getWorldPosition(_a);
  child.getWorldPosition(_b);
  _b.sub(_a).normalize();
  _q.setFromUnitVectors(_b, dir);
  if (weight < 1) _q.slerpQuaternions(_qi, _q, weight);
  bone.getWorldQuaternion(_qb).premultiply(_q);
  bone.parent!.getWorldQuaternion(_qp).invert();
  bone.quaternion.copy(_qp.multiply(_qb));
  bone.updateMatrixWorld(true);
}

/** Rotate `bone` about a world-space axis. */
function turn(bone: THREE.Object3D, axis: THREE.Vector3, angle: number) {
  if (!angle) return;
  _q.setFromAxisAngle(axis, angle);
  bone.getWorldQuaternion(_qb).premultiply(_q);
  bone.parent!.getWorldQuaternion(_qp).invert();
  bone.quaternion.copy(_qp.multiply(_qb));
  bone.updateMatrixWorld(true);
}

/** Small "code editor" texture for the laptop screen, redrawn as it types. */
function makeScreen() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const palette = ["#7aa7ff", "#8b7bff", "#e6e9f2", "#5eead4", "#f0abfc", "#94a3b8"];
  const lines: { indent: number; parts: { w: number; c: string }[] }[] = [];
  const addLine = () => {
    const indent = [0, 1, 1, 2, 2, 3][(Math.random() * 6) | 0];
    const parts = Array.from({ length: 1 + ((Math.random() * 4) | 0) }, () => ({
      w: 20 + Math.random() * 90,
      c: palette[(Math.random() * palette.length) | 0],
    }));
    lines.push({ indent, parts });
    if (lines.length > 15) lines.shift();
  };
  for (let i = 0; i < 12; i++) addLine();
  const draw = () => {
    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, 512, 320);
    ctx.fillStyle = "#111a33";
    ctx.fillRect(0, 0, 512, 22);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(14 + i * 14, 11, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    lines.forEach((l, i) => {
      let x = 34 + l.indent * 22;
      const y = 34 + i * 18;
      ctx.fillStyle = "#334155";
      ctx.fillRect(8, y, 14, 8);
      l.parts.forEach((p) => {
        ctx.fillStyle = p.c;
        ctx.fillRect(x, y, p.w, 8);
        x += p.w + 8;
      });
    });
    tex.needsUpdate = true;
  };
  draw();
  return {
    texture: tex,
    tick: () => {
      addLine();
      draw();
    },
  };
}

const AvatarJourney: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const dock = document.querySelector<HTMLElement>("[data-avatar-dock]");
    if (!host || !dock) return;

    // A fresh canvas per mount: disposing a renderer kills its WebGL context,
    // so reusing one canvas (e.g. React StrictMode's double mount) would leave
    // the avatar drawing into a dead context.
    const canvas = document.createElement("canvas");
    canvas.className = "h-full w-full opacity-0 transition-opacity duration-1000";
    host.appendChild(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopMQ = window.matchMedia("(min-width: 1024px)");
    // Full journey on desktop; elsewhere the avatar simply works in the About frame.
    let journey = desktopMQ.matches && !reduced;

    // ---------- Renderer / scene ----------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setScissorTest(true);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);

    scene.add(new THREE.HemisphereLight(0xc7d6ff, 0x0a0a14, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 5, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8b7bff, 3);
    rim.position.set(-4, 3, -4);
    scene.add(rim);
    const rim2 = new THREE.DirectionalLight(0x4f8cff, 2);
    rim2.position.set(4, 2, -3);
    scene.add(rim2);

    // Root that walks; model sits inside it.
    const root = new THREE.Group();
    scene.add(root);

    // Soft contact shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const sctx = shadowCanvas.getContext("2d")!;
    const grad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,0,0,0.55)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.002;
    root.add(shadow);

    // ---------- Workstation (standing desk + laptop) ----------
    const work = new THREE.Group();
    root.add(work);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1a1d2b, roughness: 0.55, metalness: 0.4, transparent: true });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x9aa3b8, roughness: 0.3, metalness: 0.9, transparent: true });
    const screen = makeScreen();
    const screenMat = new THREE.MeshBasicMaterial({ map: screen.texture, transparent: true, toneMapped: false });
    const lidBackMat = new THREE.MeshStandardMaterial({
      color: 0x2a2f40,
      roughness: 0.35,
      metalness: 0.85,
      emissive: 0x4f8cff,
      emissiveIntensity: 0,
      transparent: true,
    });
    const workMats = [deskMat, metalMat, screenMat, lidBackMat];

    const desk = new THREE.Group();
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.035, 0.55), deskMat);
    desk.add(deskTop);
    const legGeo = new THREE.BoxGeometry(0.05, 1, 0.05);
    [-0.48, 0.48].forEach((x) => {
      const leg = new THREE.Mesh(legGeo, metalMat);
      leg.position.set(x, -0.5, 0);
      desk.add(leg);
    });
    work.add(desk);

    const laptop = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.015, 0.25), metalMat);
    laptop.add(base);
    const keys = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x0f1220, roughness: 0.8, transparent: true }),
    );
    workMats.push(keys.material as THREE.MeshStandardMaterial);
    keys.rotation.x = -Math.PI / 2;
    keys.position.set(0, 0.0081, -0.02);
    laptop.add(keys);
    // Lid hinges at the far edge (away from the avatar), leaning back.
    const hinge = new THREE.Group();
    hinge.position.set(0, 0.008, 0.125);
    hinge.rotation.x = 0.28;
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.01), lidBackMat);
    lid.position.set(0, 0.12, 0);
    hinge.add(lid);
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.33, 0.21), screenMat);
    screenMesh.position.set(0, 0.12, -0.0056);
    screenMesh.rotation.y = Math.PI; // faces the avatar
    hinge.add(screenMesh);
    laptop.add(hinge);
    work.add(laptop);

    const screenLight = new THREE.PointLight(0x6ea0ff, 0, 1.6, 2);
    work.add(screenLight);

    // ---------- Layout / state ----------
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      renderer.setSize(vw, vh, false);
      journey = desktopMQ.matches && !reduced;
    };
    resize();
    window.addEventListener("resize", resize);

    // Scroll targets (0..1) and their smoothed values. Read straight from the
    // page each frame so they can't drift from the pinned hero:
    //   walk — through the hero pin (it starts at scroll 0 and lasts 120% of the viewport)
    //   dock — the About frame travelling from the viewport bottom to its sticky top (112px)
    const HERO_PIN = 1.2;
    const DOCK_TOP = 112;
    // Framing (fov 30°): in the hero he fills 75% of the screen height; at the
    // desk he fills FRAME_FILL of the About frame's height.
    const TAN = Math.tan(THREE.MathUtils.degToRad(15));
    const HERO_D = 1.8 / (2 * TAN * 0.75);
    const FRAME_FILL = 0.62;
    const WORK_YAW = -0.6;
    const target = { walk: journey ? 0 : 1, dock: journey ? 0 : 1 };
    const cur = { walk: target.walk, dock: target.dock };

    // ---------- Model ----------
    let mixer: THREE.AnimationMixer | null = null;
    let idle: THREE.AnimationAction | null = null;
    let walk: THREE.AnimationAction | null = null;
    const bones: Record<string, THREE.Bone> = {};
    const modelMats: THREE.Material[] = [];
    let loaded = false;
    let disposed = false;
    const handAnchor = new THREE.Vector3(0, 1.0, 0.42);

    const loader = new GLTFLoader();
    const load = () =>
      loader.load(
        MODEL_URL,
        (gltf) => {
          if (disposed) return;
          const model = gltf.scene;
          model.traverse((o) => {
            const mesh = o as THREE.SkinnedMesh;
            if (mesh.isMesh) {
              mesh.frustumCulled = false;
              const old = mesh.material as THREE.MeshStandardMaterial;
              const joints = /joint/i.test(old.name);
              const mat = new THREE.MeshStandardMaterial({
                color: joints ? 0xd7deeb : 0x1f2f57, // light joints, navy "suit"
                roughness: joints ? 0.35 : 0.5,
                metalness: joints ? 0.6 : 0.25,
              });
              old.dispose();
              mesh.material = mat;
              modelMats.push(mat);
            }
            if ((o as THREE.Bone).isBone) bones[o.name.replace(/^mixamorig:?/, "")] = o as THREE.Bone;
          });
          root.add(model);

          // Normalise height to ~1.8 units, feet on the floor.
          const box = new THREE.Box3().setFromObject(model);
          const h = box.max.y - box.min.y || 1.8;
          model.scale.multiplyScalar(1.8 / h);
          model.updateMatrixWorld(true);
          const box2 = new THREE.Box3().setFromObject(model);
          model.position.y -= box2.min.y;

          // Make the model face +Z regardless of how it was exported.
          model.updateMatrixWorld(true);
          const left = bones.LeftArm.getWorldPosition(new THREE.Vector3()).sub(bones.RightArm.getWorldPosition(new THREE.Vector3()));
          const fwd = new THREE.Vector3().crossVectors(left, new THREE.Vector3(0, 1, 0)).normalize();
          model.rotation.y -= Math.atan2(fwd.x, fwd.z);

          mixer = new THREE.AnimationMixer(model);
          const find = (n: string) => gltf.animations.find((a) => a.name === n)!;
          idle = mixer.clipAction(find("idle"));
          walk = mixer.clipAction(find("walk"));
          idle.play();
          walk.play();

          // Measure where the hands land in the typing pose to place the laptop.
          root.rotation.y = 0;
          root.position.set(0, 0, 0);
          idle.setEffectiveWeight(1);
          walk.setEffectiveWeight(0);
          mixer.update(0);
          root.updateMatrixWorld(true);
          applyPose(1, 0, false);
          const l = bones.LeftHand.getWorldPosition(new THREE.Vector3());
          const r = bones.RightHand.getWorldPosition(new THREE.Vector3());
          handAnchor.copy(l.add(r).multiplyScalar(0.5));
          root.worldToLocal(handAnchor);

          // Keyboard just under and ahead of the wrists; desk under the laptop.
          laptop.position.set(0, handAnchor.y - 0.06, handAnchor.z + 0.1);
          desk.position.set(0, laptop.position.y - 0.026, laptop.position.z + 0.05);
          desk.children.forEach((c) => {
            if (c !== deskTop) {
              c.scale.y = desk.position.y;
              c.position.y = -desk.position.y / 2;
            }
          });
          screenLight.position.set(0, laptop.position.y + 0.15, laptop.position.z);

          loaded = true;
          canvas.style.opacity = "1";
        },
        undefined,
        () => {
          /* Model failed to load — the page works without it. */
        },
      );

    // Defer the 3 MB download until the page is idle.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle ? window.requestIdleCallback(load, { timeout: 1500 }) : window.setTimeout(load, 600);

    // ---------- Procedural typing pose ----------
    const charQ = new THREE.Quaternion();
    const toWorld = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z).normalize().applyQuaternion(charQ);

    function applyPose(weight: number, time: number, typing: boolean) {
      if (weight <= 0.001) return;
      root.getWorldQuaternion(charQ);
      const leftAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(charQ);

      // Lean in and look down at the screen
      turn(bones.Spine1, leftAxis, 0.1 * weight);
      turn(bones.Neck, leftAxis, 0.18 * weight);
      turn(bones.Head, leftAxis, 0.12 * weight);

      ([1, -1] as const).forEach((s) => {
        const side = s === 1 ? "Left" : "Right";
        aim(bones[`${side}Arm`], bones[`${side}ForeArm`], toWorld(s * 0.2, -0.82, 0.5), weight);
        aim(bones[`${side}ForeArm`], bones[`${side}Hand`], toWorld(-s * 0.34, -0.12, 0.93), weight);
        aim(bones[`${side}Hand`], bones[`${side}HandMiddle1`], toWorld(-s * 0.08, -0.5, 0.86), weight);
        if (typing) {
          // Alternating finger taps
          const tap = Math.max(0, Math.sin(time * 15 + (s === 1 ? 0 : 1.7))) * 0.22 * weight;
          turn(bones[`${side}Hand`], leftAxis, tap);
          turn(bones[`${side}ForeArm`], leftAxis, Math.sin(time * 2.3 + s) * 0.03 * weight);
        }
      });
    }

    // ---------- Frame loop ----------
    const t0 = performance.now();
    let lastScreenTick = 0;
    let lastT = 0;
    let raf = 0;
    let wasVisible = true;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!loaded || !mixer || !idle || !walk) return;

      const t = (performance.now() - t0) / 1000;
      const fr = dock.getBoundingClientRect();
      if (journey) {
        target.walk = clamp01(window.scrollY / (vh * HERO_PIN));
        target.dock = range(vh, DOCK_TOP, fr.top);
      } else {
        target.walk = 1;
        target.dock = 1;
      }
      // Frame-rate independent smoothing
      const dt = Math.min(0.1, t - lastT);
      lastT = t;
      const k = journey ? 1 - Math.exp(-dt * 7) : 1;
      cur.walk += (target.walk - cur.walk) * k;
      cur.dock += (target.dock - cur.dock) * k;
      const p = cur.walk;
      const q = cur.dock;

      // ---- Where to draw ----
      // Desktop: full viewport while walking, then clipped to the About frame
      // once he has arrived (so he scrolls away with it). Mobile: the frame only.
      const docked = !journey || q > 0.995;
      const rx = docked ? fr.left : 0;
      const ry = docked ? fr.top : 0;
      const rw = docked ? fr.width : vw;
      const rh = docked ? fr.height : vh;
      const visible = ry < vh && ry + rh > 0 && rw > 2 && rh > 2;
      if (!visible) {
        if (wasVisible) {
          renderer.setScissor(0, 0, vw, vh);
          renderer.clear();
          wasVisible = false;
        }
        return;
      }
      wasVisible = true;

      let walkWeight = 0;
      let walkPhase = 0;
      let yaw = WORK_YAW;
      let poseW = 1;
      let show = 1;

      if (!journey) {
        // ---- Mobile / reduced motion: already at the desk, close framing ----
        root.position.set(0, 0, 0);
        camera.clearViewOffset();
        camera.aspect = rw / rh;
        camera.fov = 32;
        camera.position.set(-0.05, 1.3, 3.7);
        camera.lookAt(-0.16, 0.98, 0);
        camera.updateProjectionMatrix();
      } else {
        // ---- Desktop: one continuous walk, all in the same camera ----
        const aspect = vw / vh;
        const H = fr.height;
        // Where the frame will sit once it reaches its sticky top, and where it is now.
        const centerY = q > 0.995 ? fr.top + H / 2 : DOCK_TOP + H / 2;
        // Slightly right of centre so he and the desk (on his left) sit centred together.
        const cx = fr.left + fr.width * 0.6;

        // Depth that makes him fill FRAME_FILL of the frame, and the x that lines up with it.
        const dFrame = 1.8 / (2 * TAN * ((FRAME_FILL * H) / vh));
        const zFrame = HERO_D - dFrame;
        const xFrame = ((cx / vw) * 2 - 1) * dFrame * TAN * aspect;
        const xStart = 0.62 * HERO_D * TAN * aspect; // ~80% across the hero

        // Leg 1 (hero): right side → centre.  Leg 2 (About): centre → into the frame.
        const leg1 = ease(range(0.1, 0.76, p));
        const leg2 = ease(range(0.02, 0.72, q));
        root.position.set(lerp(lerp(xStart, 0, leg1), xFrame, leg2), 0, lerp(0, zFrame, leg2));

        const dist2 = Math.hypot(xFrame, zFrame);
        walkPhase = leg1 * 1.75 + leg2 * Math.max(2, dist2 / 1.3); // ≈ steps that match the distance
        walkWeight = Math.max(
          range(0.06, 0.14, p) * (1 - range(0.7, 0.8, p)),
          range(0, 0.06, q) * (1 - range(0.68, 0.78, q)),
        );

        // Facing: toward centre → turn left to walk → face the camera →
        // turn toward the frame and walk in → turn to the desk.
        const heading = Math.atan2(xFrame, zFrame);
        yaw = lerp(-0.35, -Math.PI / 2, ease(range(0.04, 0.14, p)));
        yaw = lerp(yaw, 0, ease(range(0.72, 0.88, p)));
        yaw = lerp(yaw, heading, ease(range(0, 0.1, q)));
        yaw = lerp(yaw, WORK_YAW, ease(range(0.7, 0.86, q)));

        poseW = ease(range(0.8, 0.99, q));
        show = ease(range(0.68, 0.96, q));

        // Camera never cuts: level with his mid-height, gently shifted so he
        // ends centred in the frame.
        const shift = (centerY - vh / 2) * ease(range(0.2, 1, q));
        camera.fov = 30;
        camera.aspect = aspect;
        camera.position.set(0, 0.9, HERO_D);
        camera.lookAt(0, 0.9, 0);
        camera.setViewOffset(vw, vh, 0, -shift, vw, vh);
        camera.updateProjectionMatrix();
      }

      // ---- Animation ----
      idle.time = t % idle.getClip().duration;
      walk.time = (walkPhase % 1) * walk.getClip().duration;
      idle.setEffectiveWeight(1 - walkWeight);
      walk.setEffectiveWeight(walkWeight);
      root.rotation.y = yaw;
      mixer.update(0);
      root.updateMatrixWorld(true);
      applyPose(poseW, t, !reduced);

      // ---- Workstation reveal ----
      work.visible = show > 0.01;
      work.position.y = lerp(-0.5, 0, show);
      workMats.forEach((m) => (m.opacity = show));
      lidBackMat.emissiveIntensity = show * 0.25;
      screenLight.intensity = show * 1.6;
      shadowMat.opacity = 1 - show * 0.4;
      if (!reduced && show > 0.5 && t - lastScreenTick > 0.35) {
        screen.tick();
        lastScreenTick = t;
      }

      // ---- Draw (WebGL's y axis starts at the bottom) ----
      renderer.setScissor(0, 0, vw, vh);
      renderer.clear();
      const glY = vh - (ry + rh);
      if (journey) {
        // Same full-screen projection throughout; only the clip changes.
        renderer.setViewport(0, 0, vw, vh);
      } else {
        renderer.setViewport(rx, glY, rw, rh);
      }
      renderer.setScissor(rx, glY, rw, rh);
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (hasIdle) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      window.removeEventListener("resize", resize);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) mesh.geometry.dispose();
      });
      [...workMats, ...modelMats, shadowMat].forEach((m) => m.dispose());
      screen.texture.dispose();
      shadowTex.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[39]" />;
};

export default AvatarJourney;

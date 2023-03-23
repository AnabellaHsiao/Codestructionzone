import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const CompilingInteractive = () => {
  const containerStyle = {
    width: "300px",
    height: "270px",
  };

  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(1, 1.5, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);
    directionalLight.position.set(1, 1.5, 15);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    loader.load("/assets/3D/compiling.gltf", (gltf) => {
      scene.add(gltf.scene);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      // Calculate the position of the camera based on the time elapsed
      const cameraX = -(Math.sin(Date.now() * 0.007) * 5) - 23;
      const cameraY = 6;
      const cameraZ = -6;

      // Set the position of the camera
      camera.position.set(cameraX, cameraY, cameraZ);
      camera.lookAt(0, 3, 0);

      directionalLight.position.set(cameraX, cameraY, cameraZ);
      directionalLight.lookAt(0, 3, 0);

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(container.clientWidth, container.clientHeight);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div style={containerStyle} ref={containerRef} />;
};

export default CompilingInteractive;

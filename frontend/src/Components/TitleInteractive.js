import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const TitleInteractive = () => {
  const containerStyle = {
    width: "500px",
    height: "180px",
  };

  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();

    console.log(container.clientWidth);
    console.log(container.clientHeight);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(1, 1.5, 10);
    camera.lookAt(1, 1.5, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);
    directionalLight.position.set(1, 1.5, 15);
    directionalLight.lookAt(1, 1.5, 0);
    scene.add(directionalLight);

    const directionalLightBack = new THREE.DirectionalLight(0xffffff, 1.25);
    directionalLightBack.position.set(1, 1.5, -15);
    directionalLightBack.lookAt(1, 1.5, 0);
    scene.add(directionalLightBack);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // const filepath = "/assets/3D/codestructionzone.gltf";
    // fetch(filepath)
    //   .then((response) => response.text())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));

    loader.load("/assets/3D/codestructionzone.gltf", (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.x = Math.sin(Date.now() * 0.0005) * 10;
      camera.position.z = Math.cos(Date.now() * 0.0005) * 10;
      camera.lookAt(1, 1.5, 0);

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

export default TitleInteractive;

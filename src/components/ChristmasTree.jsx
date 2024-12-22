import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ChristmasTree = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Crear la escena, la cámara y el renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Agregar luces
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Luz ambiental
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
    directionalLight.position.set(10, 10, 10); // Posición de la luz
    scene.add(directionalLight);

    // Crear tronco
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1;
    
    // Crear follaje (árbol)
    const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });

    const foliage1 = new THREE.Mesh(new THREE.ConeGeometry(3, 4, 32), foliageMaterial);
    foliage1.position.y = 4;

    const foliage2 = new THREE.Mesh(new THREE.ConeGeometry(2.5, 3.5, 32), foliageMaterial);
    foliage2.position.y = 6;

    const foliage3 = new THREE.Mesh(new THREE.ConeGeometry(2, 3, 32), foliageMaterial);
    foliage3.position.y = 8;

    // Agrupar el árbol
    const treeGroup = new THREE.Group();
    treeGroup.add(trunk, foliage1, foliage2, foliage3);
    scene.add(treeGroup);

    // Crear la estrella y agregarla al grupo del árbol
    const starGeometry = new THREE.IcosahedronGeometry(1, 0); // Forma 3D similar a una estrella
    const starMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 }); // Material dorado
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.y = 9; // Colocarla en la parte superior del árbol
    treeGroup.add(star);  // Añadir la estrella al grupo del árbol

    // Escalar el árbol para que sea más pequeño
    // treeGroup.scale.set(0.1, 0.1, 0.1); // Escala al 10% de su tamaño original

    // Crear partículas de nieve
    const snowflakes = [];
    const snowflakeCount = 200; // Número de copos de nieve

    for (let i = 0; i < snowflakeCount; i++) {
      const snowflakeGeometry = new THREE.SphereGeometry(0.1, 6, 6); // Usamos una esfera pequeña como partícula
      const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
      
      // Posicionar las partículas en una zona aleatoria
      snowflake.position.x = Math.random() * 30 - 15;
      snowflake.position.y = Math.random() * 30 + 5;
      snowflake.position.z = Math.random() * 30 - 15;

      snowflakes.push(snowflake);
      scene.add(snowflake);
    }

    // Posicionar la cámara
    camera.position.set(0, 5, 15);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar el árbol para mostrarlo mejor
      treeGroup.rotation.y += 0.01;

      // Animar las partículas de nieve
      snowflakes.forEach(snowflake => {
        snowflake.position.y -= 0.1; // Mover la nieve hacia abajo

        // Volver a poner las partículas en la parte superior cuando salen de la cámara
        if (snowflake.position.y < -10) {
          snowflake.position.y = 30;
        }
      });

      // Renderizar la escena
      renderer.render(scene, camera);
    };

    animate();

    // Limpiar el renderizador al desmontar el componente
    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ChristmasTree;

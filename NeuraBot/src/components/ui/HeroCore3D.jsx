import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/Brain.glb";

/**
 * Malha do cérebro com um "rim glow" holográfico: um clone levemente maior,
 * renderizado só pelo lado de dentro (BackSide) com blending aditivo, cria o
 * efeito de brilho na borda sem precisar de shader customizado.
 */
function BrainMesh() {
  const { nodes } = useGLTF(MODEL_URL);
  const meshData = Object.values(nodes).find((n) => n.isMesh);

  return (
    <group>
      {/* Casca sólida, escura, levemente metálica */}
      <mesh geometry={meshData.geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#0c1420"
          emissive="#0e4a5c"
          emissiveIntensity={0.45}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      {/* Rim glow — clone 4% maior, só face de trás, aditivo */}
      <mesh geometry={meshData.geometry} scale={1.04}>
        <meshBasicMaterial
          color="#3fd8ff"
          side={THREE.BackSide}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Segunda casca, bem maior e mais fraca — simula o halo suave que o Bloom faria */}
      <mesh geometry={meshData.geometry} scale={1.12}>
        <meshBasicMaterial
          color="#3fd8ff"
          side={THREE.BackSide}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Um anel fino orbitando em um plano específico — equivalente 3D dos antigos .core3d-ring */
function OrbitRing({ radius, rotation, color, speed, opacity = 0.5 }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={rotation}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.006, 8, 96]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/** Pequenos pontos brilhantes presos ao longo de uma órbita — "nós" de dados */
function OrbitNode({ radius, rotation, speed, offset = 0, color = "#3fd8ff" }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0);
    }
  });

  return (
    <group rotation={rotation}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color={color} />
        <pointLight color={color} intensity={0.6} distance={0.6} />
      </mesh>
    </group>
  );
}

/** Grupo raiz: giro automático horizontal (em torno do eixo vertical, "em pé"),
 * separado por completo da pose fixa de repouso. O grupo mais externo SÓ tem
 * rotation.y — nunca mistura com tilt/roll — então o giro nunca pode ficar
 * torto, não importa a inclinação usada por dentro pra pose. */
function Rig() {
  const spinRef = useRef(null);
  const autoSpin = useRef(0);

  // Giro contínuo em torno do vertical — nessa hierarquia (roll fixo por
  // dentro, spin puro por fora) o tronco cerebral fica reto pra baixo em
  // QUALQUER ângulo do giro, então não tem "ângulo ruim" pra evitar.
  useFrame((_, delta) => {
    autoSpin.current += delta * 0.12;
    if (spinRef.current) spinRef.current.rotation.y = autoSpin.current;
  });

  return (
    <group ref={spinRef}>
      {/* Pose fixa de repouso: perfil clássico — lobo frontal arredondado
          à esquerda, tronco cerebral/medula reto pra baixo. Nunca muda. */}
      <group rotation={[0, 0, -Math.PI * (70 / 180)]}>
        <group rotation={[0, -Math.PI / 2, 0]}>
          <group scale={0.75}>
            <BrainMesh />
          </group>
          <OrbitRing radius={1.25} rotation={[Math.PI / 2 + 0.12, 0.2, 0]} color="#3fd8ff" speed={0.2} opacity={0.5} />
          <OrbitRing radius={1.45} rotation={[0.5, 0.9, 0.3]} color="#8b7bff" speed={-0.14} opacity={0.32} />

          <OrbitNode radius={1.25} rotation={[Math.PI / 2 + 0.12, 0.2, 0]} speed={0.2} offset={0.4} />
          <OrbitNode radius={1.45} rotation={[0.5, 0.9, 0.3]} speed={-0.14} offset={2.6} color="#8b7bff" />
        </group>
      </group>
    </group>
  );
}

export default function HeroCore3D() {
  return (
    <div className="core3d-scene">
      <style>{`
        .core3d-scene {
          position: relative;
          width: 100%;
          max-width: 460px;
          aspect-ratio: 1;
          margin: 0 auto;
        }
        .core3d-scene canvas {
          outline: none;
          filter: drop-shadow(0 0 22px rgba(63,216,255,0.35)) drop-shadow(0 0 50px rgba(139,123,255,0.15));
        }
        @media (max-width: 768px) {
          .core3d-scene { max-width: 300px; }
        }
      `}</style>

      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearAlpha(0)}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 3]} intensity={1.1} color="#3fd8ff" />
        <pointLight position={[-2, -1.5, -2]} intensity={0.6} color="#8b7bff" />

        <Suspense fallback={null}>
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);

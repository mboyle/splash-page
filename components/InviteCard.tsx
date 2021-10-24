import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useCubeTexture, useFBX } from "@react-three/drei";
import { Glitch, EffectComposer, Bloom } from "@react-three/postprocessing";
// @ts-ignore
import { GlitchMode, Resizer, KernelSize } from "postprocessing";
import BadTVEffect from "./BadTVEffect";

const InviteCard = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      setX(e.pageX / window.innerWidth);
      setY(e.pageY / window.innerHeight);
    };
    window.addEventListener("mousemove", listener);
    return () => window.removeEventListener("mousemove", listener);
  }, []);

  return (
    <Container>
      <div
        style={{
          width: "50vh",
          height: "70vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-35vh",
          marginLeft: "-25vh",
          transform: `perspective(1400px) rotateX(${-(
            y * 30 -
            15
          )}deg) rotateY(${x * 30 - 15}deg)`,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            backgroundColor: "#0d1218",
            width: "50vh",
            height: "70vh",
            borderRadius: "30vh 30vh 10px 10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              background: "url(glitter.gif)",
              mixBlendMode: "screen",
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <Canvas
            dpr={typeof window !== "undefined" ? window.devicePixelRatio : 1}
            style={{ position: "absolute", width: "100%", height: "100%" }}
            resize={{ scroll: false }}
          >
            <Suspense fallback={null}>
              <Scene />
              <OrbitControls
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                enablePan={false}
                enableZoom={false}
              />
              <BadTVEffect></BadTVEffect>
            </Suspense>
          </Canvas>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                boxShadow: "inset 0 0 0 1px #fff2bd",
                margin: "2vh",
                flex: 1,
                borderRadius: "30vh 30vh 8px 8px",
                overflow: "hidden",
              }}
            ></div>
            <div
              style={{
                color: "#fff2bd",
                fontFamily: "Outward",
                fontSize: "13vh",
                textTransform: "uppercase",
                padding: "2vh 2vh 0 2vh",
                position: "relative",
                userSelect: "none",
                marginTop: "-1vh",
                textAlignLast: "justify",
                width: '100%'
              }}
            >
              Mad Realities season 0
            </div>
            <div
              style={{
                padding: "2vh 2vh 1.5vh 2vh",
                backgroundColor: "#d39bff",
                color: "#490081",
                fontWeight: 600,
                fontSize: "3vh",
                display: "flex",
                flexDirection: "column",
                userSelect: "none",
              }}
            >
              <span style={{ borderTop: "1px solid", paddingTop: "0.5vh" }}>
                UNIQUE ¹⁄₁
              </span>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                pointerEvents: "none",
                backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
                transform: `rotate(${x * 180 - 90}deg) translate(-50%, -50%)`,
                transformOrigin: "0% 0%",
                width: "100vh",
                height: "140vh",
                opacity: (1 - y) / 2,
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 80vh;
  width: 50%;
`;

export default InviteCard;

function Scene() {
  const {
    // @ts-ignore
    children: [{ geometry }],
  } = useFBX("rose.fbx");

  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "/" }
  );

  const ref = useRef<THREE.Group>();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    ref.current!.rotation.y = (Math.sin(a) - 0.5) / 4;
  });

  return (
    <group ref={ref}>
      <mesh
        geometry={geometry}
        material-envMap={envMap}
        material-reflectivity={1}
        scale={13}
        position={[0, 0, -3.5]}
        rotation={[0.2, 0, 0]}
      />
    </group>
  );
}

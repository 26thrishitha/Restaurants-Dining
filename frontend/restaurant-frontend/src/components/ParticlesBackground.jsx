// src/components/ParticlesBackground.jsx
import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // Loads all tsparticles features (shapes, interactions, etc.)
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // You can log the container if you want to debug
    // console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: { value: "#000" }, // Dark background
        },
        fullScreen: {
          enable: true,
          zIndex: -1, // Puts particles behind everything
        },
        fpsLimit: 120,
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 80,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;

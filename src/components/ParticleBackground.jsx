import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#0d0d1d",
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 130,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: { value: "#ff3333ff" },
          links: {
            color: "#ff3333ff",
            distance: 200,
            enable: true,
            opacity: 0.5,
            width: 1.5,
          },
          collisions: { enable: false },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: "bounce" },
          },
          number: { value: 140 },
          opacity: { value: 2.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
      }}
    />
  );
}

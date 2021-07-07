import dynamic from "next/dynamic";
import { tsParticles } from "tsparticles";
const DynamicComponent = dynamic(
  () => import("../components/homepage/animate/animate"),
  {
    ssr: false,
  }
);

import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import BgAnimate from "../components/homepage/bg-animate/bg-animate.jsx";
//css
import styles from "../styles/spring-page.module.css";
import { useEffect } from "react";
//

const particlesConfig = {
  background: {
    color: {
      value: "#020f24da",
    },
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
    opacity: 0,
  },
  fullScreen: {
    enable: false,
  },
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "repulse",
      },
      onHover: {
        enable: false,
        mode: "bubble",
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 0.3,
        opacity: 1,
        size: 4,
      },
      grab: {
        distance: 400,
        links: {
          opacity: 0.5,
        },
      },
    },
  },
  particles: {
    links: {
      color: {
        value: "#ffffff",
      },
      distance: 500,
      opacity: 0.4,
      width: 2,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      direction: "bottom",
      enable: true,
      outModes: {
        bottom: "out",
        left: "out",
        right: "out",
        top: "out",
      },
    },
    number: {
      density: {
        enable: true,
      },
      value: 400,
    },
    opacity: {
      random: {
        enable: true,
      },
      value: {
        min: 0.1,
        max: 0.5,
      },
      animation: {
        speed: 1,
        minimumValue: 0.1,
      },
    },
    size: {
      random: {
        enable: true,
      },
      value: {
        min: 1,
        max: 10,
      },
      animation: {
        speed: 40,
        minimumValue: 0.1,
      },
    },
  },
};

function SpringPage() {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    // config: { duration: 1000 },
    to: {
      opacity: 1,
    },
  });
  useEffect(() => {
    tsParticles.load("tsparticles", particlesConfig);
  }, []);

  return (
    <div style={{ backgroundColor: "#020f24da" }}>
      <animated.header className={styles.header} style={fade}>
        <div>
          <Image src="/dgp.png" alt="logo" width={80} height={80} />
        </div>
        <button className={styles.menu}>Menu</button>
      </animated.header>
      <div
        id="tsparticles"
        style={{
          width: "100%",
          height: "150vh",
          position: "absolute",
          zIndex: 5,
        }}
      ></div>
      <DynamicComponent />
      <BgAnimate />
    </div>
  );
}

export default SpringPage;

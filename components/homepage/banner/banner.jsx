import Image from "next/image";
import styles from "./banner.module.css";
import { useSpring, animated } from "@react-spring/web";
const Banner = () => {
  const rotate = useSpring({
    loop: true,
    from: {
      rotateZ: -25,
      rotateY: 0,
    },
    to: [
      {
        rotateZ: 25,
      },
      {
        rotateY: 180,
      },
      {
        rotateZ: -25,
      },
      {
        rotateY: 0,
      },
    ],
  });
  return (
    <div className={styles.banner}>
      <animated.div
        className={styles.rotate}
        style={{
          transformOrigin: "bottom",
          ...rotate,
        }}
      >
        <Image
          src="/monsters/fly-monster.png"
          width={300}
          height={300}
          alt="fly"
        />
      </animated.div>
    </div>
  );
};

export default Banner;

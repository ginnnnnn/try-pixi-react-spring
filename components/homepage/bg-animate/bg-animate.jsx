import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Banner from "../banner/banner";

//css
import styles from "./bg-animate.module.css";
//
const BgAnimate = () => {
  const { x } = useSpring({
    loop: true,
    from: { x: 0 },
    x: 1,
    config: { duration: 1000 },
  });
  const containerRef = useRef();
  const monsterLRef = useRef();
  const monsterRRef = useRef();

  const [monsterOffset, setMonsterOffset] = useState(0);

  const onScollChange = () => {
    setMonsterOffset(window.pageYOffset);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScollChange);
    return () => window.removeEventListener("scroll", onScollChange);
  }, []);

  return (
    <div ref={containerRef} className={styles.mainBg}>
      <Image
        src="/bg4.png"
        layout="fill"
        alt="bg"
        objectFit="cover"
        quality={100}
      />
      <animated.div
        ref={monsterLRef}
        style={{
          scale: x.to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          }),
          transform: `translate3d(0,${monsterOffset * 0.1}px,${
            -600 + monsterOffset * 0.83
          }px)`,
        }}
        className={styles.left}
      >
        <Image
          src="/monsters/left-monster.png"
          layout="fill"
          objectFit="cover"
          alt="left monster"
        />
      </animated.div>
      <animated.div
        ref={monsterRRef}
        style={{
          scale: x.to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          }),
          transform: `translate3d(0,${monsterOffset * 0.1}px,${
            -600 + monsterOffset * 0.83
          }px)`,
        }}
        className={styles.right}
      >
        <Image
          src="/monsters/right-monster.png"
          layout="fill"
          objectFit="cover"
          alt="right monster"
        />
      </animated.div>

      <div
        className={styles.bg6}
        style={{
          transform: `translate3d(${monsterOffset * 0.05}px,${
            monsterOffset * 0.009
          }px,${monsterOffset * 0.1}px)`,
        }}
      >
        <Image src="/bg6.png" layout="fill" objectFit="cover" alt="bg2" />
      </div>
      <div
        className={styles.bg7}
        style={{
          transform: `translate3d(${monsterOffset * 0.05}px,${
            monsterOffset * 0.009
          }px,${monsterOffset * 0.1}px)`,
        }}
      >
        <Image src="/bg7.png" layout="fill" objectFit="cover" alt="bg7" />
      </div>
      <Banner />
    </div>
  );
};

export default BgAnimate;

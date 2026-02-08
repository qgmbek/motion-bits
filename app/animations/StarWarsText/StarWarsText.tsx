"use client";
import { motion } from "framer-motion";

export default function StarWarsText() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        perspective: "300px",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: "100vh",
          rotateX: 25,
          scale: 1,
        }}
        animate={{
          opacity: [0, 1, 1, 0], // Fades in, stays, then fades out at the top
          y: "-150vh", // Moves all the way up and "away"
          // rotateX: 35,
          scale: 0.3, // Shrinks as it hits the vanishing point
        }}
        transition={{
          duration: 12,
          ease: "linear",
          times: [0, 0.1, 0.8, 1],
        }}
        style={{
          color: "#FFE81F",
          fontWeight: "800",
          fontSize: "5rem",
          textAlign: "center",
          textTransform: "uppercase",
          width: "80%",
          alignSelf: "center",
          lineHeight: "1.2",
          fontFamily: '"Franklin Gothic", sans-serif',
        }}
      >
        <p style={{ margin: 0 }}>A Long Time Ago</p>
        <p style={{ margin: "20px 0", fontSize: "3rem" }}>
          In a galaxy far, far away...
        </p>
        <div style={{ marginTop: "40px" }}>
          IT IS A PERIOD OF CIVIL WAR. REBEL SPACESHIPS, STRIKING FROM A HIDDEN
          BASE, HAVE WON THEIR FIRST VICTORY AGAINST THE EVIL GALACTIC EMPIRE.
        </div>
        <p>
          A developer mastered Framer Motion and created cinematic typography
          that felt legendary.
        </p>
      </motion.div>
    </div>
  );
}

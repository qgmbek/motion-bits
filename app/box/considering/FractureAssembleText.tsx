// "use client";

// import { motion } from "framer-motion";

// const ease = [0.16, 1, 0.3, 1];

// function randomPolygon() {
//   const points = Array.from({ length: 5 }).map(() => {
//     const x = Math.floor(Math.random() * 100);
//     const y = Math.floor(Math.random() * 100);
//     return `${x}% ${y}%`;
//   });
//   return `polygon(${points.join(",")})`;
// }

// export default function FractureAssembleText() {
//   const text = "Fracture Assemble Text";

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "0.1em",
//         fontSize: "64px",
//         fontWeight: 700,
//         letterSpacing: "-0.02em",
//         fontFamily: "serif",
//         color: "#000000",
//         overflow: "hidden",
//       }}
//     >
//       {text.split("").map((char, i) => (
//         <div
//           key={i}
//           style={{
//             position: "relative",
//             width: char === " " ? "0.5em" : "1em",
//             height: "1em",
//           }}
//         >
//           {char !== " " &&
//             Array.from({ length: 4 }).map((_, shardIndex) => (
//               <motion.span
//                 key={shardIndex}
//                 initial={{
//                   x: (Math.random() - 0.5) * 120,
//                   y: (Math.random() - 0.5) * 120,
//                   rotate: (Math.random() - 0.5) * 90,
//                   opacity: 0,
//                   filter: "blur(6px)",
//                 }}
//                 animate={{
//                   x: [0, (Math.random() - 0.5) * 10, 0],
//                   y: [0, (Math.random() - 0.5) * 10, 0],
//                   rotate: [0, (Math.random() - 0.5) * 8, 0],
//                   opacity: 1,
//                   filter: "blur(0px)",
//                 }}
//                 transition={{
//                   delay: i * 0.05 + shardIndex * 0.04,
//                   duration: 1.2,
//                   ease,
//                 }}
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   clipPath: randomPolygon(),
//                   willChange: "transform",
//                   color: "#fff",
//                 }}
//               >
//                 {char}
//               </motion.span>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// }

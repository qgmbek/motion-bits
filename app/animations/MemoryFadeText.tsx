// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const text = "Memory Fade Text";

// export default function MemoryFadeText() {
//   const [phase, setPhase] = useState("appear");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPhase("forget");
//     }, 4000); // after appearing, start forgetting

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at center, #111 0%, #000 70%)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden",
//       }}
//     >
//       <div
//         style={{
//           fontSize: "4rem",
//           fontWeight: "600",
//           letterSpacing: "0.05em",
//           position: "relative",
//           color: "#e6e6e6",
//           fontFamily: "serif",
//         }}
//       >
//         {text.split("").map((letter, index) => {
//           const randomDelay = Math.random() * 1.5;

//           return (
//             <motion.span
//               key={index}
//               initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
//               animate={
//                 phase === "appear"
//                   ? {
//                       opacity: 1,
//                       filter: "blur(0px)",
//                       y: 0,
//                     }
//                   : {
//                       opacity: 0,
//                       filter: "blur(10px)",
//                       y: -10,
//                     }
//               }
//               transition={{
//                 duration: 1.6,
//                 delay: randomDelay,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               style={{
//                 position: "relative",
//                 display: "inline-block",
//               }}
//             >
//               {letter}

//               {/* Ghost Shadow */}
//               <motion.span
//                 aria-hidden
//                 initial={{ opacity: 0 }}
//                 animate={
//                   phase === "appear"
//                     ? { opacity: 0.15 }
//                     : { opacity: 0.05 }
//                 }
//                 transition={{
//                   duration: 2,
//                   delay: randomDelay + 0.3,
//                 }}
//                 style={{
//                   position: "absolute",
//                   left: "3px",
//                   top: "3px",
//                   color: "#aaa",
//                   filter: "blur(6px)",
//                   pointerEvents: "none",
//                 }}
//               >
//                 {letter}
//               </motion.span>
//             </motion.span>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

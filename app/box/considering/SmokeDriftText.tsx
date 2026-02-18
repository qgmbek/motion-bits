// "use client";
// import { motion } from "framer-motion";

// export default function SmokeDriftText() {
//   const text = "Smoke Drift Text";

//   const container = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.045,
//       },
//     },
//   };

//   const letter = {
//     hidden: () => ({
//       opacity: 0,
//       x: (Math.random() - 0.5) * 120,
//       y: 60 + Math.random() * 40,
//       filter: "blur(8px)",
//     }),
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       filter: "blur(0px)",
//       transition: {
//         duration: 1.4,
//         ease: "easeOut",
//       },
//     },
//   };

//   const smokeFade = {
//     animate: {
//       y: -20,
//       opacity: 0.85,
//       transition: {
//         duration: 2.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="visible"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         fontSize: "64px",
//         fontWeight: 600,
//         letterSpacing: "0.02em",
//         color: "#eaeaea",
//         overflow: "hidden",
//       }}
//     >
//       {text.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           custom={i}
//           variants={letter}
//           style={{
//             display: "inline-block",
//             position: "relative",
//           }}
//         >
//           <motion.span
//             variants={smokeFade}
//             animate="animate"
//             style={{
//               display: "inline-block",
//             }}
//           >
//             {char === " " ? "\u00A0" : char}
//           </motion.span>
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// }

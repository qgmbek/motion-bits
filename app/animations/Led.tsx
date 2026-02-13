// "use client";

// import { motion } from "framer-motion";

// export default function Led() {
//   const letters = "Led".split("");

//   return (
//     <div style={container}>
//       <motion.h1 style={textWrapper}>
//         {letters.map((letter, index) => (
//           <motion.span
//             key={index}
//             style={letterStyle}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{
//               opacity: [0, 1, 1, 0.95, 1],
//               y: 0,
//               textShadow: [
//                 "0px 0px 0px rgba(0,255,180,0)",
//                 "0px 0px 8px rgba(0,255,180,0.6)",
//                 "0px 0px 16px rgba(0,255,180,0.8)",
//                 "0px 0px 12px rgba(0,255,180,0.5)",
//                 "0px 0px 18px rgba(0,255,180,1)",
//               ],
//             }}
//             transition={{
//               duration: 2,
//               delay: index * 0.15,
//               repeat: Infinity,
//               repeatType: "mirror",
//               ease: "easeInOut",
//             }}
//           >
//             {letter}
//           </motion.span>
//         ))}
//       </motion.h1>

//       {/* subtle background glow */}
//       <motion.div
//         style={glow}
//         animate={{
//           opacity: [0.3, 0.6, 0.4],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// }

// const container = {
//   position: "relative",
//   height: "100vh",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   background: "#050505",
//   overflow: "hidden",
// };

// const textWrapper = {
//   fontSize: "8rem",
//   fontWeight: 700,
//   letterSpacing: "-0.05em",
//   fontFamily: "Inter, sans-serif",
//   color: "#00ffb4",
//   display: "flex",
//   gap: "0.1em",
//   zIndex: 2,
// };

// const letterStyle = {
//   display: "inline-block",
// };

// const glow = {
//   position: "absolute",
//   width: "400px",
//   height: "400px",
//   borderRadius: "50%",
//   background:
//     "radial-gradient(circle, rgba(0,255,180,0.25) 0%, rgba(0,255,180,0.05) 40%, transparent 70%)",
//   filter: "blur(60px)",
// };

// "use client";

// import { motion, useTime, useTransform } from "framer-motion";

// const text = "Wave / Ripple Text Animation";

// export default function WaveRippleText() {
//   const time = useTime();

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#0b0b0b",
//       }}
//     >
//       <motion.h1
//         initial="rest"
//         whileHover="hover"
//         style={{
//           display: "flex",
//           fontSize: "64px",
//           fontWeight: 600,
//           letterSpacing: "-0.02em",
//           color: "#fff",
//           cursor: "default",
//         }}
//       >
//         {text.split("").map((char, i) => {
//           const y = useTransform(time, (t) => {
//             return Math.sin(t / 250 + i * 0.6) * 14;
//           });

//           return (
//             <motion.span
//               key={i}
//               style={{
//                 display: "inline-block",
//                 y,
//               }}
//               variants={{
//                 rest: { scale: 1 },
//                 hover: { scale: 1.15 },
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 20,
//               }}
//             >
//               {char === " " ? "\u00A0" : char}
//             </motion.span>
//           );
//         })}
//       </motion.h1>
//     </div>
//   );
// }

export default function _WaveRippleText() {
  return (
    <div>_WaveRippleText</div>
  )
}

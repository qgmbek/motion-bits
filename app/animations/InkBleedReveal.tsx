// "use client";

// import { motion } from "framer-motion";

// export default function InkBleedReveal() {
//   return (
//     <div
//       style={{
//         padding: "120px 40px",
//         background: "#f6f3ee",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <motion.h1
//         initial={{ scale: 0.98, filter: "blur(14px)", opacity: 0 }}
//         animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
//         transition={{ duration: 1.6, ease: "easeOut" }}
//         style={{
//           fontSize: "clamp(3rem, 8vw, 7rem)",
//           fontWeight: 600,
//           letterSpacing: "-0.02em",
//           color: "#111",
//           position: "relative",

//           /* INK MASK */
//           WebkitMaskImage:
//             "radial-gradient(circle at center, black 40%, transparent 70%)",
//           WebkitMaskSize: "0% 0%",
//           WebkitMaskRepeat: "no-repeat",
//           WebkitMaskPosition: "center",

//           maskImage:
//             "radial-gradient(circle at center, black 40%, transparent 70%)",
//           maskSize: "0% 0%",
//           maskRepeat: "no-repeat",
//           maskPosition: "center",
//         }}
//         animate={{
//           WebkitMaskSize: "250% 250%",
//           maskSize: "250% 250%",
//           scale: 1,
//           filter: "blur(0px)",
//           opacity: 1,
//         }}
//         transition={{
//           duration: 1.8,
//           ease: [0.25, 1, 0.3, 1],
//         }}
//       >
//         Ink Bleed Reveal
//       </motion.h1>
//     </div>
//   );
// }

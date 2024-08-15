// import { useEffect } from "react";

// export const useClickAnimation = (element, config) => {
//   const { size = 100, color = "#fff", duration = 800 } = config;

//   useEffect(() => {
//     if (!element.current) return;

//     const applyContainerProperties = () => {
//       element.current.classList.add("effect-container");
//     };

//     const applyStyles = (e) => {
//       const { offsetX, offsetY } = e;
//       const { style } = element.current;
//       const sizeOffset = size / 2;

//       style.setProperty("--effect-duration", `${duration}ms`);
//       style.setProperty("--effect-top", `${offsetY - sizeOffset}px`);
//       style.setProperty("--effect-left", `${offsetX - sizeOffset}px`);
//       style.setProperty("--effect-height", `${size}px`);
//       style.setProperty("--effect-width", `${size}px`);
//       style.setProperty("--effect-color", `${color}`);
//     };

//     const onClick = (e) => {
//       element.current.classList.remove("active");
//       applyStyles(e);
//       element.current.classList.add("active");
//     };

//     applyContainerProperties();
//     element.current.addEventListener("mousedown", onClick);

//     const cleanupRef = element.current;
//     return () => {
//       if (cleanupRef) {
//         cleanupRef.removeEventListener("mousedown", onClick);
//       }
//     };
//   }, [color, duration, element, size]);
// };

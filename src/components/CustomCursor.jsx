// import { useEffect, useState } from "react";

// export default function CustomCursor() {
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const [speed, setSpeed] = useState(1.25);

//   useEffect(() => {
//     const cursor = document.querySelector(".custom-cursor");

//     const move = (e) => {
//       const target = e.target;
//       if (target.closest(".text-zone")) {
//         setSpeed(0.75);
//       } else {
//         setSpeed(1.25);
//       }

//       setPos({
//         x: e.clientX,
//         y: e.clientY,
//       });

//       cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${speed})`;
//     };

//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, [speed]);

//   return <div className="custom-cursor" />;
// }


import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(1.25);
  const [borderPos, setBorderPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef(null);

  const lastMove = useRef(Date.now());

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    const move = (e) => {
      const target = e.target;
      if (target.closest(".text-zone")) {
        setSpeed(0.75);
      } else {
        setSpeed(1.25);
      }

      const { clientX, clientY } = e;
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) scale(${speed})`;
      setPos({ x: clientX, y: clientY });

      // Update last move time
      lastMove.current = Date.now();

      // Clear previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Snap after 150ms of inactivity
      timeoutRef.current = setTimeout(() => {
        setBorderPos({ x: clientX, y: clientY });
      }, 150);
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      clearTimeout(timeoutRef.current);
    };
  }, [speed]);

  // Animate border lag only when moving
  useEffect(() => {
    const follow = () => {
      const now = Date.now();
      const moving = now - lastMove.current < 100;

      if (moving) {
        setBorderPos((prev) => {
          const dx = pos.x - prev.x;
          const dy = pos.y - prev.y;
          return {
            x: prev.x + dx * 0.1,
            y: prev.y + dy * 0.1,
          };
        });
      }

      requestAnimationFrame(follow);
    };
    follow();
  }, [pos]);

  return (
    <>
      <div
        className="cursor-border"
        style={{
          transform: `translate3d(${borderPos.x}px, ${borderPos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
      <div
        className="custom-cursor"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${speed})`,
        }}
      />
    </>
  );
}

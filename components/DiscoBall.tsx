"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DiscoBall() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [position, setPosition] = useState(-100);
  const [showButton, setShowButton] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Crear la bola disco
    const createDiscoBall = () => {
      const radius = 100;
      const squareSize = 10;
      const prec = 19.55;
      const fuzzy = 0.001;
      const inc = (Math.PI - fuzzy) / prec;
      const discoBall = document.getElementById("discoBall");

      if (!discoBall) return;

      for (let t = fuzzy; t < Math.PI; t += inc) {
        const z = radius * Math.cos(t);
        const currentRadius = Math.abs((radius * Math.cos(0) * Math.sin(t)) - (radius * Math.cos(Math.PI) * Math.sin(t))) / 2.5;
        const circumference = Math.abs(2 * Math.PI * currentRadius);
        const squaresThatFit = Math.floor(circumference / squareSize);
        const angleInc = (Math.PI * 2 - fuzzy) / squaresThatFit;

        for (let i = angleInc / 2 + fuzzy; i < Math.PI * 2; i += angleInc) {
          const square = document.createElement("div");
          const squareTile = document.createElement("div");
          squareTile.style.width = squareSize + "px";
          squareTile.style.height = squareSize + "px";
          squareTile.style.transformOrigin = "0 0 0";
          squareTile.style.webkitTransformOrigin = "0 0 0";
          squareTile.style.webkitTransform = `rotate(${i}rad) rotateY(${t}rad)`;
          squareTile.style.transform = `rotate(${i}rad) rotateY(${t}rad)`;

          if ((t > 1.3 && t < 1.9) || (t < -1.3 && t > -1.9)) {
            squareTile.style.backgroundColor = randomColor("bright");
          } else {
            squareTile.style.backgroundColor = randomColor("any");
          }

          square.appendChild(squareTile);
          square.className = "square";
          squareTile.style.webkitAnimation = "reflect 2s linear infinite";
          squareTile.style.webkitAnimationDelay = String(randomNumber(0, 20) / 10) + "s";
          squareTile.style.animation = "reflect 2s linear infinite";
          squareTile.style.animationDelay = String(randomNumber(0, 20) / 10) + "s";
          squareTile.style.backfaceVisibility = "hidden";

          const x = radius * Math.cos(i) * Math.sin(t);
          const y = radius * Math.sin(i) * Math.sin(t);
          square.style.webkitTransform = `translateX(${Math.ceil(x)}px) translateY(${y}px) translateZ(${z}px)`;
          square.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`;
          discoBall.appendChild(square);
        }
      }
    };

    createDiscoBall();

    // Animación de caída
    const dropTimer = setTimeout(() => {
      setPosition(0);
      setShowButton(true);
    }, 100);

    // Inicializar el audio
    const audioElement = new Audio('/believer.mp3');
    setAudio(audioElement);

    return () => {
      clearTimeout(dropTimer);
      const discoBall = document.getElementById("discoBall");
      if (discoBall) {
        discoBall.innerHTML = "";
      }
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, []);

  const handleEnter = () => {
    if (audio) {
      audio.play();
    }
    setOpacity(0);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      style={{ 
        display: isVisible ? "flex" : "none",
        opacity: opacity,
        transition: "opacity 3s ease-in-out"
      }}
    >
      <div 
        className="disco-container"
        style={{
          transform: `translateY(${position}vh)`,
          transition: "transform 3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <div id="discoBallLight"></div>
        <div id="discoBall">
          <div id="discoBallMiddle"></div>
        </div>
      </div>
      
      {showButton && (
        <div 
          className="absolute bottom-20"
          style={{
            opacity: opacity,
            transition: "opacity 3s ease-in-out"
          }}
        >
          <Button
            onClick={handleEnter}
            className="bg-gradient-to-r from-slate-500 to-zinc-600 hover:from-slate-600 hover:to-zinc-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Entrar
          </Button>
        </div>
      )}
    </div>
  );
}

function randomColor(type: "bright" | "any") {
  const c = type === "bright" ? randomNumber(130, 255) : randomNumber(110, 190);
  return `rgb(${c},${c},${c})`;
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

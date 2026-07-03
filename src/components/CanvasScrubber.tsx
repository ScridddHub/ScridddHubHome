'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CanvasScrubberProps {
  framesPerSequence: number;
  sequenceFolders: string[];
  loopFolder: string;
  loopFrames: number;
  onFrameUpdate?: (frame: number) => void;
}

export default function CanvasScrubber({ 
  framesPerSequence, 
  sequenceFolders, 
  loopFolder, 
  loopFrames, 
  onFrameUpdate 
}: CanvasScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalScrollFrames = framesPerSequence * sequenceFolders.length;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Adjust canvas resolution for high-DPI (retina) displays
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = 1920 * dpr;
    canvas.height = 1080 * dpr;

    // Enable high-quality image smoothing
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    // Helper to get image paths
    const getScrollFrameUrl = (globalIndex: number) => {
      const folderIndex = Math.min(
        Math.floor((globalIndex - 1) / framesPerSequence), 
        sequenceFolders.length - 1
      );
      let localIndex = globalIndex - (folderIndex * framesPerSequence);
      if (localIndex === 0) localIndex = 1;

      const padIndex = String(localIndex).padStart(3, '0');
      return `/${sequenceFolders[folderIndex]}/ezgif-frame-${padIndex}.jpg`;
    };

    const getLoopFrameUrl = (index: number) => {
      const padIndex = String(index).padStart(3, '0');
      return `/${loopFolder}/ezgif-frame-${padIndex}.jpg`;
    };

    // Preload loop images
    const loopImages: HTMLImageElement[] = [];
    for (let i = 1; i <= loopFrames; i++) {
      const img = new Image();
      img.src = getLoopFrameUrl(i);
      loopImages.push(img);
    }

    // Preload scroll images
    const scrollImages: HTMLImageElement[] = [];
    for (let i = 1; i <= totalScrollFrames; i++) {
      const img = new Image();
      img.src = getScrollFrameUrl(i);
      scrollImages.push(img);
    }

    // State indicators
    let loopFrameId: number;
    let currentLoopFrame = 0;
    let isScrolling = false;
    let lastTime = 0;
    const fpsInterval = 1000 / 12; // 12 FPS for loop

    const animationState = {
      frame: 1
    };

    // Draw function with fallback if image isn't loaded yet (prevents black screen on fast scroll)
    function drawImage(img: HTMLImageElement) {
      if (!canvas || !context || !img) return;
      
      if (!img.complete || img.width === 0) {
        img.onload = () => {
          // Make sure this image is still the active one before drawing
          const activeIndex = Math.max(0, Math.min(Math.floor(animationState.frame) - 1, totalScrollFrames - 1));
          const currentActiveImg = isScrolling ? scrollImages[activeIndex] : (loopImages[currentLoopFrame - 1] || loopImages[0]);
          
          if (currentActiveImg === img) {
            drawImage(img);
          }
        };
        return;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // Loop animation logic (starts/resumes when scroll is at 0)
    function animateLoop(timestamp: number) {
      if (isScrolling) return;

      loopFrameId = requestAnimationFrame(animateLoop);

      const elapsed = timestamp - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        
        currentLoopFrame = (currentLoopFrame % loopFrames) + 1;
        const img = loopImages[currentLoopFrame - 1];
        if (img) drawImage(img);
      }
    }

    // Start loop immediately on mount
    if (!isScrolling) {
      lastTime = performance.now();
      loopFrameId = requestAnimationFrame(animateLoop);
    }

    // GSAP ScrollTrigger setup
    const scrollAnimation = gsap.to(animationState, {
      frame: totalScrollFrames,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom", // Scroll mapping matches container height
        scrub: 0.5
      },
      onUpdate: () => {
        const isAtTop = typeof window !== 'undefined' ? window.scrollY === 0 : true;
        
        if (!isAtTop) {
          if (!isScrolling) {
            isScrolling = true;
            cancelAnimationFrame(loopFrameId);
          }
          
          const index = Math.max(0, Math.min(Math.floor(animationState.frame) - 1, totalScrollFrames - 1));
          const img = scrollImages[index];
          if (img) drawImage(img);
          
          if (onFrameUpdate) {
            onFrameUpdate(Math.floor(animationState.frame));
          }
        } else {
          if (isScrolling) {
            isScrolling = false;
            lastTime = performance.now();
            loopFrameId = requestAnimationFrame(animateLoop);
          }
        }
      }
    });

    const handleResize = () => {
      if (isScrolling) {
        const index = Math.max(0, Math.min(Math.floor(animationState.frame) - 1, totalScrollFrames - 1));
        const img = scrollImages[index];
        if (img) drawImage(img);
      } else {
        const img = loopImages[currentLoopFrame - 1] || loopImages[0];
        if (img) drawImage(img);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(loopFrameId);
      scrollAnimation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [framesPerSequence, sequenceFolders, loopFolder, loopFrames]);

  // Using a fixed overlay wrapper with a relative scroll container.
  // This keeps the canvas locked to the background forever, preventing it from scrolling away at the end.
  return (
    <div 
      ref={containerRef} 
      style={{ height: `${totalScrollFrames * 25}px` }} 
      className="relative w-full"
    >
      <div className="fixed inset-0 w-full h-screen bg-black z-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

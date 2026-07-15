'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SequenceConfig {
  folder: string;
  frames: number;
}

interface CanvasScrubberProps {
  sequences: SequenceConfig[];
  active: boolean;
  onFrameUpdate?: (frame: number) => void;
  children?: React.ReactNode;
}

export default function CanvasScrubber({ 
  sequences, 
  active,
  onFrameUpdate,
  children
}: CanvasScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [scrollImages, setScrollImages] = useState<HTMLImageElement[]>([]);
  const totalScrollFrames = sequences.reduce((sum, s) => sum + s.frames, 0);

  // Helper to resolve local frame image path inside sequence folders
  const getScrollFrameUrl = (globalIndex: number) => {
    let accumulated = 0;
    for (let i = 0; i < sequences.length; i++) {
      const seq = sequences[i];
      if (globalIndex <= accumulated + seq.frames) {
        const localIndex = globalIndex - accumulated;
        const padIndex = String(localIndex).padStart(3, '0');
        return `/optimised/${seq.folder}/ezgif-frame-${padIndex}.webp`;
      }
      accumulated += seq.frames;
    }
    const lastSeq = sequences[sequences.length - 1];
    const padIndex = String(lastSeq.frames).padStart(3, '0');
    return `/optimised/${lastSeq.folder}/ezgif-frame-${padIndex}.webp`;
  };

  // Preload scroll images on mount once
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= totalScrollFrames; i++) {
      const img = new Image();
      img.src = getScrollFrameUrl(i);
      images.push(img);
    }
    setScrollImages(images);

    return () => {
      // Abort all image requests when component unmounts to prevent network clogging
      images.forEach(img => {
        img.src = '';
      });
    };
  }, [totalScrollFrames]);

  // Handle canvas drawing and ScrollTrigger binding
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || scrollImages.length === 0) return;

    // Adjust canvas resolution for high-DPI displays, but cap it to prevent massive GPU overhead
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    
    if (isMobileViewport) {
      // 1280x720 is retina-sharp on small screens and rendering is 20x faster than 3x DPR scaling
      canvas.width = 1280;
      canvas.height = 720;
    } else {
      const cappedDpr = Math.min(dpr, 2);
      canvas.width = 1920 * cappedDpr;
      canvas.height = 1080 * cappedDpr;
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'medium';

    const animationState = {
      frame: 1
    };

    function drawImage(img: HTMLImageElement) {
      if (!canvas || !context || !img) return;
      
      if (!img.complete || img.width === 0) {
        img.onload = () => {
          const activeIndex = Math.max(0, Math.min(Math.floor(animationState.frame) - 1, totalScrollFrames - 1));
          const currentActiveImg = scrollImages[activeIndex];
          
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

    // Draw the very first frame initially
    const firstImg = scrollImages[0];
    if (firstImg) {
      drawImage(firstImg);
    }

    if (!active) return;

    let scrollAnimation: gsap.core.Tween;

    // Wait for the browser layout to complete height changes before initializing ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      scrollAnimation = gsap.to(animationState, {
        frame: totalScrollFrames,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Start scrubbing exactly when Section 3 reaches the top of the viewport
          end: "bottom bottom",
          scrub: 0.5
        },
        onUpdate: () => {
          const index = Math.max(0, Math.min(Math.floor(animationState.frame) - 1, totalScrollFrames - 1));
          const img = scrollImages[index];
          if (img) drawImage(img);
          
          if (onFrameUpdate) {
            onFrameUpdate(Math.floor(animationState.frame));
          }
        }
      });
    }, 100);

    const handleResize = () => {
      const index = Math.max(0, Math.min(Math.floor(animationState.frame) - 1, totalScrollFrames - 1));
      const img = scrollImages[index];
      if (img) drawImage(img);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (scrollAnimation) scrollAnimation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [totalScrollFrames, scrollImages, active]);

  return (
    <div 
      ref={containerRef} 
      style={{ height: active ? `${totalScrollFrames * 25}px` : '0px' }} 
      className={`relative w-full ${active ? '' : 'overflow-hidden pointer-events-none'}`}
    >
      <div className={`fixed inset-0 w-full h-screen bg-black z-0 pointer-events-none transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0 invisible'}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

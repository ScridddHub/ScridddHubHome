'use client';

import { useEffect, useRef, useState } from 'react';
import { Outfit, Syne } from 'next/font/google';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import CanvasScrubber, { SequenceConfig } from '@/components/CanvasScrubber';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '800'] });
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'] });

// Define active sequence config based on actual generated folders:
// - frame1build: 40 frames (PNG format)
// - frame2build: 120 frames (PNG format)
// - frame3build: 40 frames (PNG format)
// - frame4build: 64 frames (PNG format)
// - frame5build: 64 frames (PNG format)
// - frame6build: 64 frames (PNG format)
// - frame7build: 64 frames (PNG format)
// - frame8build: 64 frames (PNG format)
// - frame9build: 64 frames (PNG format)
// - frame10: 64 frames (PNG format)
const sequences: SequenceConfig[] = [
  { folder: 'frame1build', frames: 40 },
  { folder: 'frame2build', frames: 120 },
  { folder: 'frame3build', frames: 40 },
  { folder: 'frame4build', frames: 64 },
  { folder: 'frame5build', frames: 64 },
  { folder: 'frame6build', frames: 64 },
  { folder: 'frame7build', frames: 64 },
  { folder: 'frame8build', frames: 64 },
  { folder: 'frame9build', frames: 64 },
  { folder: 'frame10', frames: 64 }
];

// Stages of the construction story (All 10 active showcasing ScridddHub features!)
const storyStages = [
  {
    num: "01",
    title: "Customized ERP System",
    desc: "A fully tailored backend mapping your specific item rate libraries, material specs, and subcontractor ledgers into one secure database."
  },
  {
    num: "02",
    title: "High-End Sales Website",
    desc: "Propose digital blueprints, manage tender bids, and showcase ongoing progress to prospective clients in a premium brand portal."
  },
  {
    num: "03",
    title: "Supervisor & Client App",
    desc: "Native iOS and Android mobile apps keeping managers, sub-contractors, and investors connected with real-time site updates and photo uploads."
  },
  {
    num: "04",
    title: "Autonomous AI Manager",
    desc: "An active AI agent that monitors on-site inventory levels, auto-approves compliant delivery tickets, and flags cash leakage immediately."
  },
  {
    num: "05",
    title: "Geofenced Check-in",
    desc: "Workers check in at the gate via geofenced facial recognition, syncing attendance with digital timesheets to prevent labor disputes."
  },
  {
    num: "06",
    title: "Subcontractor Advancements",
    desc: " Carpenter and vendor cash advances are requested, approved, and logged in real-time matching physical milestones."
  },
  {
    num: "07",
    title: "Real-Time Site Ledger",
    desc: "Track every operational event, delivery invoice, and excavation volume log inside a central, transparent record ledger."
  },
  {
    num: "08",
    title: "BIM & CAD Wireframe Sync",
    desc: "Superimpose digital structural models directly over the raw ground using FPV wireframe mapping to predict clashes."
  },
  {
    num: "09",
    title: "Variation Change Orders",
    desc: "Log client-demanded modifications instantly on-site, automatically recalculating billings and locking escrow funding."
  },
  {
    num: "10",
    title: "The Leak-Free Workspace",
    desc: "From initial layout to the finished masterpiece. Every labor hour, brick, and dollar tracked under one unified command center."
  }
];

export default function Home() {
  const salesVideoRef = useRef<HTMLVideoElement>(null);
  const factoryVideoRef = useRef<HTMLVideoElement>(null);

  // States to control the transition montage
  const [montageStep, setMontageStep] = useState<'idle' | 'montage' | 'question' | 'solution'>('idle');
  const [activePhrase, setActivePhrase] = useState('');

  // States to control the active modal panel (About / Features / Advantages)
  const [activeModal, setActiveModal] = useState<'none' | 'about' | 'features' | 'advantages'>('none');
  
  // Tracking scroll frame of the construction sequence
  const [currentScrollFrame, setCurrentScrollFrame] = useState(1);

  // Sync state to a ref to prevent stale closures in mount event listeners
  const montageStepRef = useRef(montageStep);
  useEffect(() => {
    montageStepRef.current = montageStep;
  }, [montageStep]);

  // Prevent duplicate montage triggers from multiple fast wheel events
  const hasTriggeredMontage = useRef(false);

  // Skip delay control to prevent transition scrolls from triggering skips
  const allowSkipRef = useRef(false);
  const skipTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track if user has entered Section 3 (3D canvas scrubber) to control reverse scroll resets
  const hasEnteredSection3 = useRef(false);

  // Determine current active stage index (0-9) based on cumulative frame counts
  const getStageIndex = (frame: number) => {
    let accumulated = 0;
    for (let i = 0; i < sequences.length; i++) {
      accumulated += sequences[i].frames;
      if (frame <= accumulated) return i;
    }
    return sequences.length - 1;
  };
  const currentStageIndex = getStageIndex(currentScrollFrame);

  const handleFeaturesClick = () => {
    setActiveModal('none');
    setMontageStep('solution');
    
    // Smoothly scroll to 200vh (Section 3 start / frame1build)
    gsap.to(window, {
      scrollTo: window.innerHeight * 2,
      duration: 1.5,
      ease: 'power3.inOut'
    });
  };

  useEffect(() => {
    // Disable browser scroll restoration and force start at top on refresh
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    gsap.registerPlugin(ScrollToPlugin);

    const salesVideo = salesVideoRef.current;
    const factoryVideo = factoryVideoRef.current;
    if (!salesVideo || !factoryVideo) return;

    // Ensure factory video is paused on load
    factoryVideo.pause();
    factoryVideo.currentTime = 0;

    let hasStartedFactory = false;
    let scrollTimeout: NodeJS.Timeout;
    let phraseInterval: NodeJS.Timeout;
    let questionTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerHeight = viewportHeight * 0.5; // 50% scroll threshold (triggers at halfway mark)

      if (scrollY > triggerHeight) {
        if (!hasStartedFactory) {
          hasStartedFactory = true;
          factoryVideo.currentTime = 0;
          factoryVideo.play().catch(err => console.log("Factory video play blocked:", err));
          
          // Pause sales video immediately so it doesn't finish playing in the background
          salesVideo.pause();
        }

        // Track if they have actively scrolled down into the 3D frames scrubber (Section 3)
        if (scrollY > viewportHeight + 100 && montageStepRef.current === 'solution') {
          hasEnteredSection3.current = true;
        }

        // If they reverse scroll back to Section 2 from the canvas scrubber (Section 3)
        if (scrollY < viewportHeight - 15) {
          if (montageStepRef.current === 'solution' && hasEnteredSection3.current) {
            setMontageStep('idle');
            hasTriggeredMontage.current = false;
            hasEnteredSection3.current = false; // Reset section tracking
            
            // Reset skip timer and flag
            allowSkipRef.current = false;
            if (skipTimerRef.current) {
              clearTimeout(skipTimerRef.current);
              skipTimerRef.current = null;
            }

            // Resume factory video looping from start
            factoryVideo.currentTime = 0;
            factoryVideo.play().catch(err => console.log("Factory video play blocked:", err));
          }
        }

        // Only start the skip delay timer if we have fully scrolled to Section 2
        if (scrollY >= viewportHeight - 15) {
          if (!allowSkipRef.current && !skipTimerRef.current) {
            skipTimerRef.current = setTimeout(() => {
              allowSkipRef.current = true;
            }, 1500); // 1.5 seconds delay before skip gesture is active
          }
        }
      } else {
        // Reset states whenever user scrolls back to the Section 1 top half
        setMontageStep('idle');
        clearInterval(phraseInterval);
        clearTimeout(questionTimeout);
        hasTriggeredMontage.current = false;
        hasEnteredSection3.current = false; // Reset section tracking

        // Reset skip timer and flag
        allowSkipRef.current = false;
        if (skipTimerRef.current) {
          clearTimeout(skipTimerRef.current);
          skipTimerRef.current = null;
        }

        if (hasStartedFactory) {
          hasStartedFactory = false;
          factoryVideo.pause();
          factoryVideo.currentTime = 0;

          // Replay sales video from start if user scrolls back to top
          salesVideo.currentTime = 0;
          salesVideo.play().catch(err => console.log("Sales video play blocked:", err));
        }
      }
    };

    const handleSalesEnded = () => {
      // Explicitly pause the sales video to guarantee it freezes on the last frame
      salesVideo.pause();

      // Pause for 2 seconds before automatically scrolling to Section 2
      scrollTimeout = setTimeout(() => {
        gsap.to(window, {
          scrollTo: window.innerHeight,
          duration: 1.8,
          ease: 'power3.inOut'
        });

        // Start playing factory video
        if (!hasStartedFactory) {
          hasStartedFactory = true;
          factoryVideo.currentTime = 0;
          factoryVideo.play().catch(err => console.log("Factory video play blocked:", err));
        }
      }, 2000);
    };

    const handleFactoryEnded = () => {
      if (hasTriggeredMontage.current) return;
      hasTriggeredMontage.current = true;

      // Freeze factory video on last frame
      factoryVideo.pause();
      setMontageStep('montage');

      const phrases = [
        "UNAPPROVED RATE ESTIMATES!",
        "MILESTONE PAYMENTS BLOCKED!",
        "MATERIAL REJECTED AT GATE!",
        "ATTENDANCE LOG DISPUTES!",
        "BUDGET OVERRUN BY 15%!",
        "UNTRACKED CASH ADVANCES!",
        "ZERO ON-SITE VISIBILITY!"
      ];

      let currentIndex = 0;
      // Cycle through crisis phrases rapidly
      phraseInterval = setInterval(() => {
        if (currentIndex < phrases.length) {
          setActivePhrase(phrases[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(phraseInterval);
          setMontageStep('question');
          
          // Pause on the question for 1.0 second, then transition to brand reveal
          questionTimeout = setTimeout(() => {
            setMontageStep('solution');
          }, 1000);
        }
      }, 380); // Speed of the flashing montage
    };

    const handleWheel = (e: WheelEvent) => {
      if (allowSkipRef.current && montageStepRef.current === 'idle' && e.deltaY > 0) {
        handleFactoryEnded();
      }
    };

    let tsY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      tsY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (allowSkipRef.current && montageStepRef.current === 'idle') {
        const teY = e.touches[0].clientY;
        if (tsY - teY > 40) { // Swipe up / scroll down threshold
          handleFactoryEnded();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    salesVideo.addEventListener('ended', handleSalesEnded);
    factoryVideo.addEventListener('ended', handleFactoryEnded);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      salesVideo.removeEventListener('ended', handleSalesEnded);
      factoryVideo.removeEventListener('ended', handleFactoryEnded);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(scrollTimeout);
      clearTimeout(questionTimeout);
      if (skipTimerRef.current) {
        clearTimeout(skipTimerRef.current);
      }
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <main className={`w-full bg-black text-white min-h-screen relative ${outfit.className}`}>
      
      {/* Floating Header Navigation (Visible on all scroll stages) */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-8 md:p-12 z-50 pointer-events-none">
        <div className="flex space-x-8 text-xs font-semibold uppercase tracking-widest text-white/90">
          <span onClick={() => setActiveModal('about')} className="cursor-pointer pointer-events-auto hover:text-white transition">About</span>
          <span onClick={handleFeaturesClick} className="cursor-pointer pointer-events-auto hover:text-white transition">Features</span>
          <span onClick={() => setActiveModal('advantages')} className="cursor-pointer pointer-events-auto hover:text-white transition">Advantages</span>
        </div>
        <div className="text-xs font-semibold uppercase tracking-widest text-white/90 pointer-events-auto flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-8">
          <a href="tel:+919372652742" className="hover:text-white transition">+91 9372652742</a>
          <a href="mailto:scridddhub@gmail.com" className="hover:text-white transition">scridddhub@gmail.com</a>
        </div>
      </header>

      {/* SECTION 1: Sales Studio Video & Intro Problems (Relative - slides up) */}
      <section className="relative w-full h-screen bg-black overflow-hidden z-10">
        <video 
          ref={salesVideoRef}
          autoPlay 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        >
          <source src="/salesframe1.mp4" type="video/mp4" />
        </video>
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55 pointer-events-none" />

        {/* Asymmetrical Layout - Stage 1 (Sales Office) */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-x-16 p-8 md:p-24 pt-20 md:pt-24 z-20 pointer-events-none">
          
          {/* Left Column (Top aligned) */}
          <div className="flex flex-col justify-start items-start space-y-6 md:space-y-8 mt-0 max-w-full">
            <h1 className={`text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold uppercase tracking-tighter leading-[0.9] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${syne.className}`}>
              Endless<br />Changes
            </h1>
            
            <div className="max-w-xs space-y-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                The Scope Problem
              </h3>
              <div className="w-16 h-[2px] bg-white/70" />
              <p className="text-sm md:text-base font-semibold leading-relaxed text-white">
                Struggling to track and bill last-minute modifications demanded by clients after the final sign-off.
              </p>
            </div>
          </div>

          {/* Right Column (Offset lower) */}
          <div className="flex flex-col justify-start items-end space-y-6 md:space-y-8 mt-12 md:mt-24 text-right justify-self-end max-w-full">
            <h1 className={`text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold uppercase tracking-tighter leading-[0.9] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${syne.className}`}>
              Frozen<br />Cashflow
            </h1>
            
            <div className="max-w-xs space-y-4 flex flex-col items-end drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                The Trust Barrier
              </h3>
              <div className="w-16 h-[2px] bg-white/70" />
              <p className="text-sm md:text-base font-semibold leading-relaxed text-white">
                Clients hesitating to release critical milestone payments due to a complete lack of physical site visibility.
              </p>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-8 md:left-24 flex items-center space-x-4 z-20 pointer-events-none">
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          <span className="text-[10px] uppercase tracking-widest text-white font-bold font-sans">Scroll Down to Start the Journey</span>
        </div>

      </section>

      {/* SECTION 2: Factory floor looping video (Relative - slides up to reveal Section 3) */}
      <section className="relative w-full h-screen bg-black overflow-hidden z-10">
        <video 
          ref={factoryVideoRef}
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        >
          <source src="/factoryscene.mp4" type="video/mp4" />
        </video>
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55 pointer-events-none" />

        {/* Normal Stage 2 Text - Only visible when NOT in montage/solution state */}
        {montageStep === 'idle' && (
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-x-16 p-8 md:p-24 pt-20 md:pt-24 z-20 pointer-events-none">
            
            {/* Left Column (Factory Dimension Issue) */}
            <div className="flex flex-col justify-start items-start space-y-6 md:space-y-8 mt-0 max-w-full">
              <h1 className={`text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold uppercase tracking-tighter leading-[0.9] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${syne.className}`}>
                Material<br />Leakage
              </h1>
              
              <div className="max-w-xs space-y-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                  Manufacturing Wastage
                </h3>
                <div className="w-16 h-[2px] bg-white/70" />
                <p className="text-sm md:text-base font-semibold leading-relaxed text-white">
                  Mismatched measurements on the factory floor lead to expensive lumber and veneer cut wastage.
                </p>
              </div>
            </div>

            {/* Right Column (Factory Advance Issue) */}
            <div className="flex flex-col justify-start items-end space-y-6 md:space-y-8 mt-12 md:mt-24 text-right justify-self-end max-w-full">
              <h1 className={`text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold uppercase tracking-tighter leading-[0.9] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${syne.className}`}>
                Advance<br />Leaks
              </h1>
              
              <div className="max-w-xs space-y-4 flex flex-col items-end drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                  Untracked Outlays
                </h3>
                <div className="w-16 h-[2px] bg-white/70" />
                <p className="text-sm md:text-base font-semibold leading-relaxed text-white">
                  Advances handed out to carpenters and subcontractors without real-time, centralized ledger tracking.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Dynamic Overlay: Rapid-fire Crisis Montage */}
        {montageStep === 'montage' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30 p-8">
            <h2 className={`text-3xl md:text-5xl lg:text-7xl font-extrabold text-red-500 uppercase tracking-tighter text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] animate-pulse ${syne.className}`}>
              {activePhrase}
            </h2>
          </div>
        )}

        {/* Dynamic Overlay: The Question */}
        {montageStep === 'question' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-30 transition-all duration-1000 p-8">
            <h2 className="text-2xl md:text-4xl font-light text-white tracking-[0.25em] text-center uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              So, what is the solution?
            </h2>
          </div>
        )}

        {/* Dynamic Overlay: The Solution Reveal & Scroll Prompt (Screen Pauses here!) */}
        {montageStep === 'solution' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-30 transition-all duration-1000 p-8">
            <h1 className={`text-[9vw] font-extrabold text-white tracking-tighter text-center uppercase drop-shadow-[0_8px_24px_rgba(255,255,255,0.15)] ${syne.className}`}>
              ScridddHub.
            </h1>
            <div className="mt-8 flex flex-col items-center animate-bounce">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-3 font-sans">Scroll to experience the cure</span>
              <div className="w-1 h-12 bg-white/40 rounded-full" />
            </div>
          </div>
        )}

      </section>

      {/* SECTION 3: The Construction Build Solution (GSAP Scrubber Canvas) */}
      <CanvasScrubber
        sequences={sequences}
        active={montageStep === 'solution'}
        onFrameUpdate={(frame) => setCurrentScrollFrame(frame)}
      >
        {/* Asymmetrical Cinematic Overlay (Jesko Jets Style) */}
        {(() => {
          const isEvenStage = currentStageIndex % 2 === 0;
          const showTextOverlay = montageStep === 'solution' && currentScrollFrame > 1;
          return (
            <div className={`fixed inset-0 flex items-center p-8 md:p-24 z-30 pointer-events-none transition-all duration-1000 ${showTextOverlay ? 'opacity-100' : 'opacity-0'} ${isEvenStage ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xl space-y-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] ${isEvenStage ? 'text-left items-start' : 'text-right items-end flex flex-col'}`}>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tighter leading-[0.9] ${syne.className}`}>
                  {storyStages[currentStageIndex]?.title}
                </h2>
                <div className="w-20 h-[2px] bg-white/70" />
                <p className="text-sm md:text-base font-semibold leading-relaxed text-white/95 max-w-md">
                  {storyStages[currentStageIndex]?.desc}
                </p>
              </div>
            </div>
          );
        })()}
      </CanvasScrubber>

      {/* Full-screen Overlay Modals */}
      {activeModal !== 'none' && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 md:p-12 transition-all duration-500">
          
          {/* Subtle Background Glow spot */}
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Modal Container */}
          <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-black/40 border border-white/5 rounded-3xl p-6 md:p-16 shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-y-auto z-10 flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveModal('none')} 
              className="absolute top-8 right-8 text-white/40 hover:text-white text-2xl transition-all duration-300 pointer-events-auto hover:rotate-90"
            >
              ✕
            </button>

            {/* Left Column: Big Asymmetrical Title (4 cols) */}
            <div className="md:col-span-4 flex flex-col justify-between h-full border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-emerald-400 font-extrabold uppercase block font-sans">
                  {activeModal === 'about' && 'Our Vision'}
                  {activeModal === 'features' && 'Capabilities'}
                  {activeModal === 'advantages' && 'Operational Edge'}
                </span>
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-[0.9] ${syne.className}`}>
                  {activeModal === 'about' && 'Unified\nCommand'}
                  {activeModal === 'features' && 'Product\nPillars'}
                  {activeModal === 'advantages' && 'The Scriddd\nDifference'}
                </h2>
              </div>
              
              <div className="hidden md:block mt-auto">
                <h1 className="text-[5vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
                  {activeModal}
                </h1>
              </div>
            </div>

            {/* Right Column: Premium Content Blocks (8 cols) */}
            <div className="md:col-span-8 overflow-y-auto pr-2 space-y-8 font-sans">
              
              {/* Modal - About */}
              {activeModal === 'about' && (
                <div className="space-y-8">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                    ScridddHub is a high-performance operational engine engineered to bridge physical assets with digital records. We eliminate material leakage, automate subcontractor payments, and lock change-order variations for critical physical industries.
                  </p>
                  
                  <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-[0.25em] text-white/50 font-bold">Target Verticals</h3>
                    
                    <div className="space-y-4">
                      {/* Vertical 1 */}
                      <div className="group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-6 rounded-2xl flex gap-6 items-start transition-all duration-300 hover:border-white/10">
                        <span className="text-xs font-bold text-emerald-400 font-sans tracking-widest mt-1">01 /</span>
                        <div className="space-y-2">
                          <h4 className={`text-lg font-bold text-white uppercase tracking-tight ${syne.className}`}>Construction Developers</h4>
                          <p className="text-xs text-gray-400 leading-relaxed max-w-xl">Automate client invoicing, track on-site excavation metrics, and sync architectural blueprints with live field operations.</p>
                        </div>
                      </div>

                      {/* Vertical 2 */}
                      <div className="group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-6 rounded-2xl flex gap-6 items-start transition-all duration-300 hover:border-white/10">
                        <span className="text-xs font-bold text-emerald-400 font-sans tracking-widest mt-1">02 /</span>
                        <div className="space-y-2">
                          <h4 className={`text-lg font-bold text-white uppercase tracking-tight ${syne.className}`}>Interior Designers</h4>
                          <p className="text-xs text-gray-400 leading-relaxed max-w-xl">Manage specialized contractors, track advance payment approvals compliance, and update invoices dynamically based on client change orders.</p>
                        </div>
                      </div>

                      {/* Vertical 3 */}
                      <div className="group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-6 rounded-2xl flex gap-6 items-start transition-all duration-300 hover:border-white/10">
                        <span className="text-xs font-bold text-emerald-400 font-sans tracking-widest mt-1">03 /</span>
                        <div className="space-y-2">
                          <h4 className={`text-lg font-bold text-white uppercase tracking-tight ${syne.className}`}>Recycling Factories</h4>
                          <p className="text-xs text-gray-400 leading-relaxed max-w-xl">Link raw material logistics and weight scales with geofenced facial attendance gates, ensuring exact tracking of worker shift inputs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal - Features */}
              {activeModal === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Feature 1 */}
                  <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4 hover:border-white/10 transition duration-300">
                    <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Specs ERP</span>
                    <h4 className={`text-lg font-bold text-white uppercase ${syne.className}`}>Rate & Specification ERP</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">A central ledger containing all specifications, vendor details, and unit rate libraries. Any variation instantly recalculates costs and updates escrow funding logs.</p>
                  </div>

                  {/* Feature 2 */}
                  <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4 hover:border-white/10 transition duration-300">
                    <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">AI Manager</span>
                    <h4 className={`text-lg font-bold text-white uppercase ${syne.className}`}>Autonomous AI Site Manager</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">An active AI agent that monitors inventory compliance. It automatically scans delivery slips, verifies gate quantities, and flags cash-flow variances without manual oversight.</p>
                  </div>

                  {/* Feature 3 */}
                  <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4 hover:border-white/10 transition duration-300">
                    <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Portal</span>
                    <h4 className={`text-lg font-bold text-white uppercase ${syne.className}`}>Client Progress Portal</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Give investors and clients absolute visibility. Showcase live FPV site updates, digital blueprint variations, and construction milestones in a premium branded interface.</p>
                  </div>

                  {/* Feature 4 */}
                  <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4 hover:border-white/10 transition duration-300">
                    <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Verification</span>
                    <h4 className={`text-lg font-bold text-white uppercase ${syne.className}`}>Milestone Verification Gate</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Eliminate labor check-in fraud. Geofenced facial recognition matches actual worker hours with local payroll sheets automatically, ensuring trust-less payouts.</p>
                  </div>
                </div>
              )}

              {/* Modal - Advantages */}
              {activeModal === 'advantages' && (
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm leading-relaxed max-w-2xl font-light">
                    Traditional operations suffer from administrative lag, material leakage, and trust barriers. ScridddHub connects physical operations directly to digital records.
                  </p>

                  <div className="space-y-4 pt-2">
                    {/* Comparative Item 1 */}
                    <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4">
                      <h4 className={`text-base font-bold text-white uppercase tracking-wide ${syne.className}`}>Material Loss (Lumber/Veneer)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-red-400/80">Traditional Methods</span>
                          <p className="text-xs font-semibold">12% to 15% leakage at gate / factory floor</p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-emerald-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-emerald-400/85">ScridddHub Integration</span>
                          <p className="text-xs font-bold">0% unaccounted material logs</p>
                        </div>
                      </div>
                    </div>

                    {/* Comparative Item 2 */}
                    <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4">
                      <h4 className={`text-base font-bold text-white uppercase tracking-wide ${syne.className}`}>Subcontractor Advances</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-red-400/80">Traditional Methods</span>
                          <p className="text-xs font-semibold">Unverified milestone overrides & manual cash ledger advances</p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-emerald-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-emerald-400/85">ScridddHub Integration</span>
                          <p className="text-xs font-bold">Auto-milestone locks & digital payouts matching works</p>
                        </div>
                      </div>
                    </div>

                    {/* Comparative Item 3 */}
                    <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4">
                      <h4 className={`text-base font-bold text-white uppercase tracking-wide ${syne.className}`}>Variation Change Orders</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-red-400/80">Traditional Methods</span>
                          <p className="text-xs font-semibold">3-6 weeks disputes & invoice delays on modification requests</p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-emerald-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-emerald-400/85">ScridddHub Integration</span>
                          <p className="text-xs font-bold">Real-time dynamic billing with escrow funding updates</p>
                        </div>
                      </div>
                    </div>

                    {/* Comparative Item 4 */}
                    <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4">
                      <h4 className={`text-base font-bold text-white uppercase tracking-wide ${syne.className}`}>Labor Fraud & Shift Logs</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-red-400/80">Traditional Methods</span>
                          <p className="text-xs font-semibold">Manual timesheets & supervisor proxy logs at gates</p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-emerald-300 space-y-1">
                          <span className="text-[9px] tracking-wider uppercase font-bold text-emerald-400/85">ScridddHub Integration</span>
                          <p className="text-xs font-bold">Geofenced facial check-in matching actual hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
      
    </main>
  );
}

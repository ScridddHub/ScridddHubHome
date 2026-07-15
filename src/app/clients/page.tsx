'use client';

import { Outfit, Syne } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });
const syne = Syne({ subsets: ['latin'], weight: ['500', '600', '700', '800'] });

export default function ClientsPage() {
  return (
    <main className={`w-full bg-[#F8F9FA] text-[#111111] min-h-screen relative overflow-x-hidden ${outfit.className}`}>
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest text-black/80">
          <Link href="/" className="cursor-pointer hover:text-black transition flex items-center gap-2 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm">
            <span>←</span> Back to Home
          </Link>
        </div>
        <div className="hidden md:flex text-xs font-bold uppercase tracking-widest text-black/80 flex-row items-center gap-8 bg-white/50 backdrop-blur-md px-6 py-2.5 rounded-full border border-black/5 shadow-sm">
          <a href="tel:+919372652742" className="hover:text-black transition">+91 9372652742</a>
          <a href="mailto:scridddhub@gmail.com" className="hover:text-black transition">scridddhub@gmail.com</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-20 px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8 bg-white shadow-sm">
          Trusted Partners
        </div>
        <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.1] md:leading-[0.9] text-black ${syne.className}`}>
          Building <span className="italic font-light">visions</span> &<br className="hidden md:block" />
          {' '}creating <span className="italic font-light">reality</span> with ScridddHub
        </h1>
        <p className="mt-6 md:mt-8 text-black/60 max-w-xl text-sm md:text-base font-medium">
          We partner with futuristic companies focused on innovative operations, sustainability, and complete digital transparency.
        </p>
      </section>

      {/* Projects / Clients Showcase Section */}
      <section className="px-6 md:px-16 pb-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Main Client Card: Shivaji Enterprise */}
          <div className="lg:col-span-2 relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden group">
            {/* Background Image */}
            <Image 
              src="/ourclients/shivajienterprisesitephoto.webp" 
              alt="Shivaji Enterprise Site" 
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-6 left-6 flex gap-2 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Warehouse Construction
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Daily Operations ERP
              </span>
            </div>

            {/* Content (Bottom) */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="text-white">
                <h3 className={`text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2 ${syne.className}`}>
                  Shivaji Enterprise
                </h3>
                <p className="text-white/80 text-sm max-w-md font-light leading-relaxed">
                  ScridddHub powered the initial construction phase of their massive warehouse facility. Today, our custom ERP acts as their central nervous system, driving their daily operations and logistics flawlessly.
                </p>
              </div>
              <button className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-gray-100 transition flex items-center gap-2 shrink-0">
                View Case Study 
                <span className="text-lg leading-none mt-[-2px]">→</span>
              </button>
            </div>
          </div>

          {/* Secondary Client Card (Placeholder to match layout) */}
          <div className="relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden bg-[#EAEAEA] group flex flex-col p-8 justify-between">
            <div className="space-y-4 z-10">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden relative">
                <Image 
                  src="/ourclients/shivajienterprise.webp" 
                  alt="Shivaji Enterprise Logo" 
                  fill
                  priority
                  unoptimized
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>
              <h4 className={`text-2xl font-bold text-black uppercase tracking-tight leading-tight ${syne.className}`}>
                Smart operations<br />and automation
              </h4>
              <p className="text-black/60 text-xs leading-relaxed">
                We integrate advanced tracking technologies to improve the operational efficiency of large-scale commercial properties.
              </p>
            </div>
            
            <button className="self-start bg-white border border-black/10 text-black text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-black hover:text-white transition shadow-sm z-10">
              Read More
            </button>
            
            {/* Subtle decorative background element */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none" />
          </div>
          
        </div>
      </section>

      {/* Feedback Section */}
      <section className="px-6 md:px-16 pb-32 max-w-5xl mx-auto flex flex-col items-center text-center">
        <h2 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight text-black mb-16 ${syne.className}`}>
          Recent <span className="italic font-light">feedback</span><br />
          from our clients
        </h2>
        
        <div className="bg-white border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-10 md:p-16 relative w-full text-left">
          <p className="text-lg md:text-xl font-medium leading-relaxed text-black/80">
            "ScridddHub has been our operational backbone since day one. They didn't just help us track materials and contractor payments during the construction of our warehouse—their custom ERP now flawlessly runs our day-to-day operations. It's a complete, end-to-end digital transformation."
          </p>
          
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
              {/* Optional: Put a real avatar here if provided later */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">SE</div>
            </div>
            <div>
              <h5 className="font-bold text-sm text-black">Shivaji Enterprise</h5>
              <p className="text-xs text-black/50">Warehouse Director</p>
            </div>
          </div>

          <div className="absolute bottom-8 right-12 text-6xl text-black/5 font-serif leading-none rotate-180">
            "
          </div>
        </div>
      </section>
      
    </main>
  );
}

'use client';

import { Outfit, Syne } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });
const syne = Syne({ subsets: ['latin'], weight: ['500', '600', '700', '800'] });

export default function ShivajiEnterpriseCaseStudy() {
  return (
    <main className={`w-full bg-[#F8F9FA] text-[#111111] min-h-screen relative overflow-x-hidden ${outfit.className}`}>
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
        <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest text-black/80">
          <Link href="/clients" className="cursor-pointer hover:text-black transition flex items-center gap-2 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm">
            <span>←</span> Back to Clients
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-16 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-widest mb-6 bg-white shadow-sm">
          Case Study
        </div>
        <h1 className={`text-4xl md:text-6xl font-black tracking-tighter leading-tight text-black ${syne.className}`}>
          Shivaji Enterprise
        </h1>
        <p className="mt-6 text-black/60 max-w-2xl text-base md:text-lg font-medium">
          From the foundational construction of their warehouse to driving daily operational revenue, discover how ScridddHub engineered a complete digital transformation.
        </p>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-16 pb-20 max-w-6xl mx-auto">
        <div className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-xl">
          <Image 
            src="/ourclients/shivajienterprisesitephoto.webp" 
            alt="Shivaji Enterprise Site" 
            fill
            priority
            unoptimized
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="px-6 md:px-16 pb-32 max-w-5xl mx-auto space-y-24">
        
        {/* Phase 1: Construction & Savings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-emerald-600 font-bold tracking-widest uppercase text-[10px] mb-4">Phase 1: Operational Efficiency</div>
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-6 ${syne.className}`}>
              How We Saved Them Money
            </h2>
            <p className="text-black/70 leading-relaxed mb-6">
              During the aggressive construction phase of the Shivaji Enterprise warehouse, managing contractors, raw materials, and timelines was a logistical nightmare. Every delayed payment or misplaced material shipment cost them money.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold mt-0.5">✓</div>
                <p className="text-sm font-medium text-black/80"><span className="font-bold text-black">Eliminated Material Leakage:</span> Real-time tracking of every brick and steel beam ensured zero unaccounted loss.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold mt-0.5">✓</div>
                <p className="text-sm font-medium text-black/80"><span className="font-bold text-black">Automated Payments:</span> Subcontractors were paid automatically upon verifiable milestone completion, saving hundreds of hours of manual accounting.</p>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex flex-col items-center text-center justify-center h-full">
            <h3 className="text-6xl font-black text-emerald-500 mb-2">30%</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-black/50">Reduction in Operational Waste</p>
          </div>
        </div>

        {/* Phase 2: ERP & Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1 bg-black text-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center justify-center h-full">
            <h3 className="text-6xl font-black text-blue-400 mb-2">2.5x</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-white/50">Increase in Lead Conversion</p>
          </div>
          <div className="order-1 md:order-2">
            <div className="text-blue-600 font-bold tracking-widest uppercase text-[10px] mb-4">Phase 2: Lead Generation</div>
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-6 ${syne.className}`}>
              How We Made Them Money
            </h2>
            <p className="text-black/70 leading-relaxed mb-6">
              Once the warehouse was operational, the challenge shifted from construction to commerce. They needed clients. We transitioned their construction engine into a full-scale daily operations ERP equipped with an intelligent CRM.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold mt-0.5">✓</div>
                <p className="text-sm font-medium text-black/80"><span className="font-bold text-black">Lead Capture & Nurturing:</span> Automated funnels tracked incoming queries, ensuring no prospective partner slipped through the cracks.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold mt-0.5">✓</div>
                <p className="text-sm font-medium text-black/80"><span className="font-bold text-black">Data-Driven Decisions:</span> Deep analytics allowed Shivaji Enterprise to target high-value logistics contracts, driving massive revenue growth.</p>
              </li>
            </ul>
          </div>
        </div>

      </section>
      
    </main>
  );
}

import { Outfit, Syne } from 'next/font/google';
import Link from 'next/link';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '800'] });
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'] });

export default function ClientsPage() {
  return (
    <main className={`w-full bg-black text-white min-h-screen relative overflow-x-hidden ${outfit.className}`}>
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 md:p-12 z-50 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="flex space-x-8 text-xs font-semibold uppercase tracking-widest text-white/90">
            <Link href="/" className="cursor-pointer pointer-events-auto hover:text-white transition">
              ← Back to Home
            </Link>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/90 pointer-events-auto flex flex-row items-center gap-8">
            <a href="tel:+919372652742" className="hover:text-white transition">+91 9372652742</a>
            <a href="mailto:scridddhub@gmail.com" className="hover:text-white transition">scridddhub@gmail.com</a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="relative w-full min-h-screen pt-32 pb-16 px-6 md:px-16 flex flex-col md:grid md:grid-cols-12 gap-12 z-10">
        
        {/* Left Column: Big Asymmetrical Title (4 cols) */}
        <div className="md:col-span-4 flex flex-col justify-start md:sticky md:top-32 h-auto md:h-[calc(100vh-10rem)] border-b md:border-b-0 md:border-r border-white/10 pb-12 md:pb-0 md:pr-8">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.4em] text-emerald-400 font-extrabold uppercase block font-sans">
              Our Partners
            </span>
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9] ${syne.className}`}>
              Our<br/>Clients
            </h2>
          </div>
          
          <div className="hidden md:block mt-auto pb-12">
            <h1 className="text-[5vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
              clients
            </h1>
          </div>
        </div>

        {/* Right Column: Premium Content Blocks (8 cols) */}
        <div className="md:col-span-8 space-y-12 font-sans pt-4">
          
          <div className="space-y-8">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
              We partner with industry leaders across construction, manufacturing, and interior design to streamline their physical operations and digital workflows.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {/* Placeholder Client 1 */}
              <div className="group border border-white/5 bg-white/[0.01] p-8 rounded-3xl flex flex-col gap-6 items-start transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-emerald-400 font-bold font-sans text-xl">C1</div>
                <h4 className={`text-2xl font-bold text-white uppercase ${syne.className}`}>Client Name</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Description of the client and how ScridddHub helped them optimize their workflow. Detail their success story here.</p>
              </div>

              {/* Placeholder Client 2 */}
              <div className="group border border-white/5 bg-white/[0.01] p-8 rounded-3xl flex flex-col gap-6 items-start transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-emerald-400 font-bold font-sans text-xl">C2</div>
                <h4 className={`text-2xl font-bold text-white uppercase ${syne.className}`}>Client Name</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Description of the client and how ScridddHub helped them optimize their workflow. Detail their success story here.</p>
              </div>

              {/* Placeholder Client 3 */}
              <div className="group border border-white/5 bg-white/[0.01] p-8 rounded-3xl flex flex-col gap-6 items-start transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-emerald-400 font-bold font-sans text-xl">C3</div>
                <h4 className={`text-2xl font-bold text-white uppercase ${syne.className}`}>Client Name</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Description of the client and how ScridddHub helped them optimize their workflow. Detail their success story here.</p>
              </div>

              {/* Placeholder Client 4 */}
              <div className="group border border-white/5 bg-white/[0.01] p-8 rounded-3xl flex flex-col gap-6 items-start transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-emerald-400 font-bold font-sans text-xl">C4</div>
                <h4 className={`text-2xl font-bold text-white uppercase ${syne.className}`}>Client Name</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Description of the client and how ScridddHub helped them optimize their workflow. Detail their success story here.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </main>
  );
}

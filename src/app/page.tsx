'use client';

import CanvasScrubber from '@/components/CanvasScrubber';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '800'] });

export default function Home() {
  return (
    <main className={`w-full bg-black text-white min-h-screen ${outfit.className}`}>
      
      {/* Pure Scroll Animation Section */}
      <CanvasScrubber 
        loopFolder="sequence0"
        loopFrames={120}
        sequenceFolders={['sequence1', 'sequence2']} 
        framesPerSequence={120} 
      />
      
    </main>
  );
}

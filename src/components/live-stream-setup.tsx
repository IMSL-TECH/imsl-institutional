import { Button } from "./ui/button";
import { Play, Volume2, Pause } from "lucide-react";

import { motion } from "framer-motion"

export function LiveStreamPlayer(liveEmbedLink: string) {
    return (
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid-item-live-broadcast aspect-video md:col-span-1 bg-black/20 rounded-lg flex items-center justify-center relative">
        {/* Selo LIVE no canto superior direito */}
        <div className="absolute right-0 top-0 bg-red-500 text-white font-bold px-4 py-2 rounded-tr-lg rounded-bl-lg">
          LIVE
        </div>
  
        {/* Iframe do YouTube centralizado */}
        <iframe
          className="w-full h-full rounded-lg"
          src={`${liveEmbedLink}?autoplay=1&mute=1&controls=1`}
          title="Culto Online"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>
    );
  }
  
export function FakeLiveStreamPlayer() {
    return (
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid-item-live-broadcast aspect-video md:col-span-1 bg-black/20 rounded-lg flex items-center justify-center relative">
        <div className="absolute right-0 top-0 bg-white text-black font-bold px-4 py-2 rounded-tr-lg rounded-bl-lg">
          OFFILNE
        </div>
        <Button className="rounded-full w-16 h-16 flex items-center justify-center">
          <Play className="h-6 w-6 ml-1" />
        </Button>
  
        <div className=" absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
              <Pause className="h-4 w-4" />
            </Button>
            <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-white rounded-full"></div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
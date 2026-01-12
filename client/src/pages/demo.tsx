import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/warm_cafe_interior_scene.png";

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-serif text-xl">StoryBite</span>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium tracking-wide mb-6">
              <Play className="w-4 h-4" />
              Demo Showcase
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              See the <span className="italic text-amber-400">Magic</span> in Action
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Watch how we transformed The Rustic Bean's 30-year journey into a captivating visual story 
              that's been viewed over 2 million times.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden bg-stone-900 aspect-video shadow-2xl shadow-amber-500/10"
          >
            <img 
              src={heroImage}
              alt="Demo video placeholder"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-black/40" />
            
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsPlaying(!isPlaying)}
              data-testid="button-play-video"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying 
                    ? "bg-white/20 backdrop-blur-sm" 
                    : "bg-amber-500 group-hover:bg-amber-400"
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-black ml-1" />
                )}
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/60">0:00 / 2:34</span>
                  <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-amber-500 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    data-testid="button-toggle-mute"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white/70" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white/70" />
                    )}
                  </button>
                  <button 
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    data-testid="button-fullscreen"
                  >
                    <Maximize className="w-5 h-5 text-white/70" />
                  </button>
                </div>
              </div>
            </div>

            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/90 text-white text-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Playing
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {[
              { label: "Views", value: "2.1M+" },
              { label: "Engagement Rate", value: "12.4%" },
              { label: "New Customers", value: "340+" }
            ].map((stat) => (
              <div 
                key={stat.label}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <p className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</p>
                <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              More Success Stories
            </h2>
            <p className="text-white/60 mb-10">
              Browse examples from different industries and styles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Olive & Thyme", category: "Fine Dining", duration: "1:45" },
              { title: "Sakura Café", category: "Japanese Fusion", duration: "2:12" },
              { title: "Bean Counter", category: "Coffee Shop", duration: "1:58" }
            ].map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-video cursor-pointer"
                data-testid={`card-video-${index}`}
              >
                <img 
                  src={heroImage}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center">
                    <Play className="w-6 h-6 text-black ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">{video.category}</p>
                  <p className="font-serif text-lg">{video.title}</p>
                  <p className="text-sm text-white/50 mt-1">{video.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-t from-stone-900 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Ready to Create Your Story?
          </h2>
          <p className="text-white/60 mb-8">
            Join hundreds of businesses already captivating their audience with AI-generated videos.
          </p>
          <Button 
            size="lg"
            className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-6 text-lg rounded-full font-semibold"
            data-testid="button-create-story"
          >
            Start Creating
          </Button>
        </motion.div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-black" />
            </div>
            <span className="font-serif text-lg">StoryBite</span>
          </div>
          <p className="text-white/40 text-sm">© 2026 StoryBite. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
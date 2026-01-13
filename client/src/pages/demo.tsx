import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Play, Pause, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/warm_cafe_interior_scene.png";

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((error) => {
      console.log("Video autoplay error:", error);
    });
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch((error) => {
        console.log("Video play error:", error);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

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
              홈으로 돌아가기
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-serif text-xl">스토리바이트</span>
          </div>
        </div>
      </header>

      <section className="pt-20 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-stone-900 aspect-[9/16] shadow-2xl shadow-amber-500/10 max-w-md mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/ramen.mp4" type="video/mp4" />
            </video>
            
            <div 
              className={`absolute inset-0 flex items-center justify-center cursor-pointer group transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {[
            { value: "10분", label: "제작 시간" },
            { value: "AI 자동화", label: "제작 방식" },
            { value: "영상 콘텐츠", label: "결과물 유형" }     
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
              더 많은 성공 사례
            </h2>
            <p className="text-white/60 mb-10">
              다양한 업종과 스타일의 예시를 둘러보세요
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "올리브 앤 타임", category: "파인 다이닝", duration: "1:45" },
              { title: "사쿠라 카페", category: "일본식 퓨전", duration: "2:12" },
              { title: "빈 카운터", category: "커피숍", duration: "1:58" }
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
            당신의 스토리를 만들 준비가 되셨나요?
          </h2>
          <p className="text-white/60 mb-8">
            이미 수백 개의 비즈니스가 AI 생성 영상으로 고객을 사로잡고 있습니다.
          </p>
          <Button 
            size="lg"
            className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-6 text-lg rounded-full font-semibold"
            data-testid="button-create-story"
          >
            제작 시작하기
          </Button>
        </motion.div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-black" />
            </div>
            <span className="font-serif text-lg">스토리바이트</span>
          </div>
          <p className="text-white/40 text-sm">© 2026 스토리바이트. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
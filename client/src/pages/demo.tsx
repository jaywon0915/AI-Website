import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Play, Pause, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/warm_cafe_interior_scene.png";

type VideoCardProps = {
  title: string;
  category: string;
  duration: string;
  videoSrc: string;
  index: number;
  onClick: (videoSrc: string) => void;
};

function VideoCard({ title, category, duration, videoSrc, index, onClick }: VideoCardProps) {
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-video cursor-pointer"
      data-testid={`card-video-${index}`}
      onClick={() => onClick(videoSrc)}
      onMouseEnter={() => {
        const cardVideo = cardVideoRef.current;
        if (cardVideo) {
          cardVideo.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        const cardVideo = cardVideoRef.current;
        if (cardVideo) {
          cardVideo.pause();
          cardVideo.currentTime = 0;
        }
      }}
    >
      <video
        ref={cardVideoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center">
          <Play className="w-6 h-6 text-black ml-0.5" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">{category}</p>
        <p className="font-serif text-lg">{title}</p>
        <p className="text-sm text-white/50 mt-1">{duration}</p>
      </div>
    </motion.div>
  );
}

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("/ramen.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play on mount and when video source changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load(); // Reload video when source changes
    video.play().catch((error) => {
      console.log("Video autoplay error:", error);
    });
  }, [currentVideo]);

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

  const handleVideoClick = (videoSrc: string) => {
    setCurrentVideo(videoSrc);
    setIsPlaying(true);
    setShowControls(true);
    // Scroll to top to show the video
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            className={`relative rounded-3xl overflow-hidden bg-stone-900 shadow-2xl shadow-amber-500/10 mx-auto ${
              currentVideo === "/샌디레이크_영상.mp4" 
                ? "aspect-video max-w-4xl" 
                : "aspect-[9/16] max-w-md"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              key={currentVideo}
            >
              <source src={currentVideo} type="video/mp4" />
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

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "샌디레이크", category: "터키식 커피", duration: "2:34", videoSrc: "/샌디레이크_영상.mp4" },
              { title: "라멘", category: "일본식 라멘", duration: "2:00", videoSrc: "/ramen.mp4" }
            ]
            .filter((video) => video.videoSrc !== currentVideo)
            .map((video, index) => (
              <VideoCard
                key={video.title}
                title={video.title}
                category={video.category}
                duration={video.duration}
                videoSrc={video.videoSrc}
                index={index}
                onClick={handleVideoClick}
              />
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
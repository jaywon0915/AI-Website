import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Play, Sparkles, TrendingUp, Users, Video, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/warm_cafe_interior_scene.png";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src="/샌디레이크.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 video-overlay" />
      </motion.div>
      
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white/90 text-sm font-medium tracking-wide">
            <Sparkles className="w-4 h-4" />
            AI 기반 스토리텔링
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}  
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight max-w-5xl"
        >
          당신의 이야기를 
          <br />
          <span className="italic text-amber-300">더 많은 사람들에게</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed"
        >
          카페와 레스토랑의 특별한 여정을 AI가 만든 감동적인 영상으로 변환하여
          고객을 사로잡고 온라인 노출을 높이세요.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/demo">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-6 text-lg rounded-full group"
              data-testid="button-watch-demo"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              데모 보기
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm"
            data-testid="button-get-started"
          >
            시작하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "이야기를 들려주세요",
      description: "카페나 레스토랑의 열정, 역사, 특별한 여정을 공유해 주세요. 모든 디테일을 경청합니다."
    },
    {
      number: "02", 
      title: "AI 마법이 시작됩니다",
      description: "생성형 AI가 당신의 이야기를 감동적인 영상으로 변환하여 스토리에 생명을 불어넣습니다."
    },
    {
      number: "03",
      title: "고객을 사로잡고 성장하세요",
      description: "온라인인 플랫폼에서 영상을 공유. 고객들이 당신의 이야기에 공감하고 도달 범위가 확장됩니다."
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-card grain">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-amber-600 font-medium tracking-widest text-sm uppercase"></span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 text-foreground">
            말에서 <span className="italic text-amber-600">감동으로</span>
          </h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.15}>
              <div className="group relative p-8 rounded-3xl bg-white/50 border border-amber-100 hover:border-amber-200 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/5">
                <span className="font-serif text-7xl text-amber-200 group-hover:text-amber-300 transition-colors absolute -top-4 right-6">
                  {step.number}
                </span>
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              // Handle autoplay restrictions
              console.log("Video autoplay prevented:", error);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-32 px-6 bg-stone-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.08),transparent_60%)]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-amber-400 font-medium tracking-widest text-sm uppercase"></span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
            메뉴판을 넘어서 <span className="italic text-amber-400">경험을 선물하세요</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            포항 유일의 정통 터키식 커피, 그 이야기를 만나보세요.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <div 
            ref={containerRef}
            className="relative rounded-3xl overflow-hidden bg-stone-900 aspect-video shadow-2xl shadow-amber-500/10 group"
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/Sora_샌디레이크.mp4" type="video/mp4" />
            </video>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">대표 스토리</p>
                  <p className="font-serif text-xl">샌디레이크 — 전통 터키식 커피의 이야기</p>
                </div>
                <span className="text-white/60 text-sm">2:34</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-10 grid grid-cols-3 gap-6 text-center">
          {[
           { value: "10분", label: "제작 시간" },
           { value: "AI 자동화", label: "제작 방식" },
           { value: "영상 콘텐츠", label: "결과물 유형" }           
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-amber-400">{stat.value}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "온라인 노출 극대화",
      description: "영상 콘텐츠는 텍스트와 이미지보다 1200% 더 많이 공유됩니다. 피드에서 눈에 띄고 관심을 사로잡으세요.",
      stat: "1200%",
      statLabel: "더 많은 공유"
    },
    {
      icon: Users,
      title: "감정적 유대감 형성",
      description: "스토리는 유대감을 만듭니다. 고객이 매장에 방문하기 전에 비즈니스의 진심을 느끼게 하세요.",
      stat: "73%",
      statLabel: "고객 충성도"
    },
    {
      icon: Zap,
      title: "시간과 비용 절약",
      description: "비싼 영상 제작을 건너뛰세요. AI가 전문적인 퀄리티의 콘텐츠를 훨씬 빠르고 저렴하게 만들어 드립니다.",
      stat: "10배",
      statLabel: "빠른 제작"
    },
    {
      icon: Video,
      title: "플랫폼 맞춤 콘텐츠",
      description: "인스타그램, 틱톡, 유튜브, 웹사이트에 최적화된 영상을 받으세요. 하나의 스토리, 무한한 가능성.",
      stat: "5+",
      statLabel: "플랫폼"
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white grain relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.05),transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <span className="text-amber-400 font-medium tracking-widest text-sm uppercase">왜 스토리바이트인가</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
            <span className="italic text-amber-400">비주얼 스토리</span>의 힘
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            끝없는 스크롤 세상에서 진정성 있는 스토리가 돋보입니다.
            생성형 AI 스토리텔링이 경쟁 우위가 되는 이유입니다.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={benefit.title} delay={index * 0.1}>
              <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:bg-white/10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <benefit.icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl mb-3">{benefit.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-4">{benefit.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-amber-400">{benefit.stat}</span>
                      <span className="text-sm text-white/40 uppercase tracking-wider">{benefit.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramTrend() {
  const instagramVideoRef = useRef<HTMLVideoElement>(null);
  const instagramContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = instagramVideoRef.current;
    const container = instagramContainerRef.current;
    
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              // Handle autoplay restrictions
              console.log("Video autoplay prevented:", error);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-card to-background relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-widest text-sm uppercase">새로운 발견의 시대</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
            인스타그램이 <span className="italic text-amber-600">새로운 검색</span>입니다
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            MZ세대의 67%가 새로운 카페나 레스토랑을 방문하기 전에 인스타그램을 먼저 검색합니다.
            매력적인 콘텐츠가 없다면, 당신은 보이지 않습니다.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              {[
                {
                  stat: "67%",
                  title: "인스타그램 먼저 검색",
                  description: "새로운 맛집을 찾을 때, 고객들은 방문할 가치가 있는지 인스타그램을 먼저 확인합니다."
                },
                {
                  stat: "4.2배",
                  title: "릴스로 더 많은 발견",
                  description: "인스타그램 릴스의 영상 콘텐츠는 일반 게시물보다 4.2배 더 많은 비팔로워에게 도달합니다."
                },
                {
                  stat: "83%",
                  title: "비주얼 스토리 신뢰",
                  description: "고객들은 진정성 있는 비주얼 스토리를 공유하는 비즈니스를 더 신뢰하고 방문합니다."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-5 p-6 rounded-2xl bg-white/80 border border-amber-100 shadow-lg shadow-amber-500/5"
                >
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-bold text-gradient">{item.stat}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-amber-500 rounded-[2.5rem] blur-xl opacity-20" />
              <div className="relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-[2rem] p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                  <div>
                    <p className="text-white font-semibold text-sm">your_cafe</p>
                    <p className="text-white/50 text-xs">광고</p>
                  </div>
                </div>
                <div 
                  ref={instagramContainerRef}
                  className="aspect-[4/5] rounded-xl overflow-hidden mb-4"
                >
                  <video
                    ref={instagramVideoRef}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/샌디레이크1.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <p className="text-white text-sm">
                  <span className="font-semibold">조회수 12,847회</span>
                </p>
                <p className="text-white/70 text-sm mt-1">
                  우리의 이야기를 만나보세요 — 작은 가족 주방에서 당신의 단골 맛집이 되기까지 ✨
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-amber-500 via-amber-400 to-orange-400 text-black relative overflow-hidden grain">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_60%)]" />
      
      <AnimatedSection className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
          당신의 이야기를 시작할 준비가 되셨나요?
        </h2>
        <p className="mt-6 text-xl text-black/70 max-w-2xl mx-auto">
          이미 수백 개의 카페와 레스토랑이 AI 생성 스토리 영상으로 고객을 사로잡고 있습니다.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-black hover:bg-stone-800 text-white px-10 py-6 text-lg rounded-full font-semibold"
            data-testid="button-start-your-story"
          >
            스토리 시작하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Link href="/demo">
            <Button 
              size="lg"
              variant="outline"
              className="border-black/30 text-black hover:bg-black/10 px-10 py-6 text-lg rounded-full"
              data-testid="button-see-examples"
            >
              <Play className="w-5 h-5 mr-2" />
              예시 보기
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="font-serif text-2xl">스토리바이트</span>
        </div>
        <nav className="flex gap-8 text-white/60">
          <a href="#" className="hover:text-white transition-colors" data-testid="link-about">소개</a>
          <a href="#" className="hover:text-white transition-colors" data-testid="link-pricing">가격</a>
          <Link href="/demo" className="hover:text-white transition-colors" data-testid="link-demo">데모</Link>
          <a href="#" className="hover:text-white transition-colors" data-testid="link-contact">문의</a>
        </nav>
        <p className="text-white/40 text-sm">© 2026 스토리바이트. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <HowItWorks />
      <DemoVideo />
      <Benefits />
      <InstagramTrend />
      <CTA />
      <Footer />
    </main>
  );
}
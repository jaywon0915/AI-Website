import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Play, Sparkles, TrendingUp, Users, Video, Zap, ArrowRight, Star } from "lucide-react";
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
        <img 
          src={heroImage} 
          alt="Warm cafe interior"
          className="w-full h-full object-cover scale-110"
        />
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
            AI-Powered Storytelling
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight max-w-5xl"
        >
          Share Your Story
          <br />
          <span className="italic text-amber-300">Bite by Bite</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed"
        >
          Transform your cafe or restaurant's unique journey into stunning AI-generated videos 
          that captivate customers and amplify your online presence.
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
              Watch Demo
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm"
            data-testid="button-get-started"
          >
            Get Started
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
      title: "Tell Your Story",
      description: "Share the passion, history, and unique journey behind your cafe or restaurant. We listen to every detail."
    },
    {
      number: "02", 
      title: "AI Magic Happens",
      description: "Our generative AI transforms your narrative into stunning visuals, crafting scenes that bring your story to life."
    },
    {
      number: "03",
      title: "Captivate & Grow",
      description: "Share your video across platforms. Watch as customers connect with your story and your reach expands."
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-card grain">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-amber-600 font-medium tracking-widest text-sm uppercase">How It Works</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 text-foreground">
            From Words to <span className="italic text-amber-600">Wonder</span>
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
  return (
    <section className="py-32 px-6 bg-stone-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.08),transparent_60%)]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-amber-400 font-medium tracking-widest text-sm uppercase">See It In Action</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
            Watch the <span className="italic text-amber-400">Transformation</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            See how we turned The Rustic Bean's 30-year journey into a viral video with over 2 million views.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <div className="relative rounded-3xl overflow-hidden bg-stone-900 aspect-video shadow-2xl shadow-amber-500/10 group cursor-pointer">
            <img 
              src={heroImage}
              alt="Demo video"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            
            <div className="absolute inset-0 flex items-center justify-center" data-testid="button-demo-play">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full bg-amber-500 group-hover:bg-amber-400 flex items-center justify-center shadow-xl shadow-amber-500/30 transition-colors"
              >
                <Play className="w-10 h-10 text-black ml-1" />
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">Featured Story</p>
                  <p className="font-serif text-xl">The Rustic Bean — A Family Legacy</p>
                </div>
                <span className="text-white/60 text-sm">2:34</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-10 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "2.1M+", label: "Views" },
            { value: "12.4%", label: "Engagement" },
            { value: "340+", label: "New Customers" }
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
      title: "Boost Online Exposure",
      description: "Video content gets 1200% more shares than text and images combined. Stand out in feeds and capture attention.",
      stat: "1200%",
      statLabel: "More Shares"
    },
    {
      icon: Users,
      title: "Build Emotional Connections",
      description: "Stories create bonds. Let customers feel the heart behind your business before they even walk through the door.",
      stat: "73%",
      statLabel: "Customer Loyalty"
    },
    {
      icon: Zap,
      title: "Save Time & Resources",
      description: "Skip expensive video production. Our AI creates professional-quality content in a fraction of the time and cost.",
      stat: "10x",
      statLabel: "Faster Production"
    },
    {
      icon: Video,
      title: "Platform-Ready Content",
      description: "Get optimized videos for Instagram, TikTok, YouTube, and your website. One story, endless possibilities.",
      stat: "5+",
      statLabel: "Platforms"
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white grain relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.05),transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <span className="text-amber-400 font-medium tracking-widest text-sm uppercase">Why StoryBite</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
            The Power of <span className="italic text-amber-400">Visual Stories</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            In a world of endless scrolling, authentic stories cut through the noise. 
            Here's why generative AI storytelling is your competitive advantage.
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

function Testimonials() {
  const testimonials = [
    {
      quote: "Our video went viral on Instagram. We've had customers come in specifically saying they saw our story online.",
      author: "Maria Chen",
      role: "Owner, The Rustic Bean",
      rating: 5
    },
    {
      quote: "I never thought I could afford professional video content. StoryBite made it possible and the results exceeded all expectations.",
      author: "James Morrison",
      role: "Chef, Olive & Thyme",
      rating: 5
    },
    {
      quote: "The AI captured the essence of our 50-year family tradition perfectly. Our regulars were moved to tears.",
      author: "Sophie Nakamura",
      role: "Manager, Sakura Café",
      rating: 5
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-card to-background">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-widest text-sm uppercase">Success Stories</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
            Loved by <span className="italic text-amber-600">Storytellers</span>
          </h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.author} delay={index * 0.15}>
              <div className="h-full p-8 rounded-3xl bg-white border border-amber-100 shadow-lg shadow-amber-500/5">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl text-foreground leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
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
          Ready to Share Your Story?
        </h2>
        <p className="mt-6 text-xl text-black/70 max-w-2xl mx-auto">
          Join hundreds of cafes and restaurants already captivating customers with AI-generated story videos.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-black hover:bg-stone-800 text-white px-10 py-6 text-lg rounded-full font-semibold"
            data-testid="button-start-your-story"
          >
            Start Your Story
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
              See Examples
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
          <span className="font-serif text-2xl">StoryBite</span>
        </div>
        <nav className="flex gap-8 text-white/60">
          <a href="#" className="hover:text-white transition-colors" data-testid="link-about">About</a>
          <a href="#" className="hover:text-white transition-colors" data-testid="link-pricing">Pricing</a>
          <Link href="/demo" className="hover:text-white transition-colors" data-testid="link-demo">Demo</Link>
          <a href="#" className="hover:text-white transition-colors" data-testid="link-contact">Contact</a>
        </nav>
        <p className="text-white/40 text-sm">© 2026 StoryBite. All rights reserved.</p>
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
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
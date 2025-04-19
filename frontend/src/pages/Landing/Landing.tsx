import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HandCoins, ArrowRight } from "lucide-react";
import mt from "../../assets/mountain.mp4";
import Landing_nav from "@/components/nav/landing_nav";

export default function Landing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
      <div className="relative min-h-screen bg-[#0a0a0c] text-white overflow-hidden">
        <Landing_nav />
      {/* Background video with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={mt} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0c]/70 to-[#0a0a0c] z-[2]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        {/* Logo Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a1a1f] to-[#2a2a35] flex items-center justify-center border border-white/10 shadow-lg">
            <HandCoins className="w-10 h-10 text-blue-400" />
          </div>
        </motion.div>

        {/* What's New Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 flex items-center space-x-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          <span className="text-sm text-gray-300">What's New</span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-100">
            Let us help you manage
            <br />
            <span className="flex text-nowrap justify-center items-center">
              your flow with{" "}
              <span className="font-light italic ml-4 text-5xl md:text-7xl lg:text-8xl animate-pulse">
                Finlytics
              </span>
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Transform Financial Possibilities into Reality with Finlytics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <button className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/15 transition-all duration-300">
            <span className="flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </main>
    </div>
  );
}

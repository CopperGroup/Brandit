"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import CustomCursor from "../landing/custom-cursor"
import Link from "next/link"

export default function Banner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const bannerY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden banner-section">
      <CustomCursor />

      {/* Hero image with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: bannerY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full will-change-transform"
        >
          <img src="/assets/banner-home.jfif" alt="Hero image" className="w-full h-full object-cover"/>
        </motion.div>
      </div>

      {/* Enhanced Content overlay - Masterpiece Edition */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        {/* Multi-layered gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
        <div
          className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-70"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Military-inspired decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Tactical grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

          {/* Corner frame elements */}
          <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-white/20"></div>
          <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-white/20"></div>
          <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-white/20"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-white/20"></div>

          {/* Animated scan line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-olive-500/40 to-transparent"
            animate={{ y: [0, 2000, 0] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Tactical coordinates */}
          <div className="absolute top-6 right-6 text-white/30 text-xs font-mono">N 50°27&apos;12&quot; E 30°31&apos;24&quot;</div>
          <div className="absolute bottom-6 left-6 text-white/30 text-xs font-mono">GRID 38TUL8891307610</div>

          {/* Animated circles */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-olive-500/10 opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full border border-olive-500/10 opacity-20"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 5 }}
          />
        </div>

        <div className="max-w-xl px-8 text-center relative banner-content z-20">
          {/* Enhanced animated intro elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 border border-white/5 rotate-45 opacity-50"
            animate={{ rotate: 45, opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.p
            className="text-white/70 tracking-[0.3em] text-xs mb-3 uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Брендіт
          </motion.p>

          <motion.h1
            className="font-belleza text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            ВІЙСЬКОВИЙ СТИЛЬ
          </motion.h1>

          <motion.div
            className="w-16 h-[1px] bg-white/30 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <motion.p
            className="text-white/80 mb-10 max-w-md mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Військова естетика. Міський стиль. Повсякденний комфорт.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-olive-500/40"></div>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-olive-500/40"></div>

            <Link href="/catalog/?page=1&sort=default">
              <Button className="shop-button group bg-transparent border border-white/40 text-white hover:border-white rounded-none px-10 py-5 font-belleza tracking-widest overflow-hidden relative">
                <span className="relative z-10">КАТАЛОГ</span>
                <motion.span
                  className="ml-3 relative z-10 inline-flex"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
                <span className="absolute inset-0 bg-gradient-to-r from-olive-800/80 to-olive-700/80 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
              </Button>
            </Link>
          </motion.div>

          {/* Animated decorative elements around content */}
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-[1px]"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
          />
        </div>
      </div>
    </div>
  )
}


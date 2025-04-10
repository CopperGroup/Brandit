"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CatalogBanner() {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {/* Background image with enhanced parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <Image
          src="/assets/banner-catalog.jpg"
          alt="Каталог військового одягу"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>

        {/* Enhanced tactical overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

        {/* Animated scan line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-olive-500/60 to-transparent"
          animate={{ y: [0, 500, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Tactical coordinates and markings */}
        <div className="absolute top-6 right-6 text-white/30 text-xs font-mono">N 50°27'12" E 30°31'24"</div>
        <div className="absolute bottom-6 left-6 text-white/30 text-xs font-mono">GRID 38TUL8891307610</div>

        {/* Animated tactical elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-olive-500/20 opacity-30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full border border-olive-500/10 opacity-20"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Enhanced military-inspired decorative elements */}
      <div className="absolute top-8 left-8 w-32 h-32 border-t border-l border-white/20"></div>
      <div className="absolute top-8 right-8 w-32 h-32 border-t border-r border-white/20"></div>
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b border-l border-white/20"></div>
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b border-r border-white/20"></div>

      {/* Content with enhanced animations */}
      <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>
            <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">Тактична колекція</span>
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>
          </div>

          <h1 className="font-belleza text-5xl md:text-7xl text-white mb-8 tracking-wide relative">
            <span className="relative inline-block">
              ВІЙСЬКОВИЙ СТИЛЬ
              <motion.span
                className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-500/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-white/80 max-w-xl mx-auto mb-10 font-light"
          >
            Відкрийте для себе колекцію, що поєднує військову функціональність з міською елегантністю. Кожен елемент
            розроблений для максимальної ефективності та стилю.
          </motion.p>

          <div className="flex items-center justify-center text-white/80 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Головна
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Каталог</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

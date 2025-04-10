"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Store } from "@/constants/store"

export default function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  // Enhanced parallax effects
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1.02, 0.97])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -1])
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      {/* Enhanced background elements */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-olive-50"></div>

        {/* Luxury paper texture overlay */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        ></div>

        {/* Refined grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1 h-40 bg-gradient-to-b from-olive-700/30 to-transparent"></div>
      <div className="absolute top-0 left-0 w-40 h-1 bg-gradient-to-r from-olive-700/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1 h-40 bg-gradient-to-t from-olive-700/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-40 h-1 bg-gradient-to-l from-olive-700/30 to-transparent"></div>

      {/* Diagonal accent lines */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-700/10 rotate-45"></div>
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-700/10 rotate-45"></div>

      {/* Animated decorative circles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-olive-700/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-stone-300/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      ></motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div className="text-center mb-24" style={{ y: y1, opacity }}>
          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="h-px w-12 bg-olive-700/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <span className="text-olive-700 text-sm tracking-[0.35em] uppercase font-light">Колекція 2024</span>
            <motion.div
              className="h-px w-12 bg-olive-700/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          <h2 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-stone-800 tracking-wide relative inline-block mb-8">
            <span className="relative z-10">СЕЗОННА КОЛЕКЦІЯ</span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-700/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h2>

          <p className="max-w-2xl mx-auto text-stone-600 text-lg leading-relaxed font-light">
            Відкрийте для себе наші найновіші моделі, створені, щоб долати сезони та тренди. Кожен виріб виготовлений з
            увагою до деталей та відданістю якості.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {[
            {
              title: "Літні основи",
              desc: "Легкі тканини та функціональний дизайн для спекотних днів.",
              y: y1,
              scale: scale1,
              rotate: rotate1,
              season: "ЛІТО",
              src: "/assets/1s.jpg"
            },
            {
              title: "Осінній перехід",
              desc: "Багатошаровість та адаптивність для мінливої погоди.",
              y: y2,
              scale: scale2,
              rotate: rotate2,
              season: "ОСІНЬ",
              src: "/assets/2s.jpg"
            },
            {
              title: "Зимова класика",
              desc: "Теплі, функціональні речі з військовою естетикою.",
              y: y3,
              scale: scale1,
              rotate: rotate1,
              season: "ЗИМА",
              src: "/assets/3s.jpg"
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative transform-gpu"
              style={{
                y: item.y,
                scale: item.scale,
                rotate: item.rotate,
                willChange: "transform",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden group shadow-xl">
                {/* Luxury frame */}
                <div className="absolute inset-0 border border-stone-300/50 z-20 pointer-events-none"></div>
                <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-300/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/30 z-20 pointer-events-none"></div>

                {/* Season badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="relative">
                    <div className="bg-olive-700/90 text-white px-3 py-1 text-xs tracking-wider font-medium">
                      {item.season}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-stone-200">
                  <Image
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 transform-gpu will-change-transform group-hover:scale-[1.03] group-hover:brightness-105"
                    fill
                  />
                </div>

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-900/30 to-transparent mix-blend-color"></div>
                </div>

                <div className="absolute inset-0 flex items-end p-8">
                  <div className="w-full transform-gpu translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out will-change-transform">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-8 bg-white/60"></div>
                      <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </p>
                    </div>

                    <h3 className="font-belleza text-white text-2xl mb-4">{item.title}</h3>
                    <p className="text-white/80 text-sm mb-6 max-w-xs">{item.desc}</p>

                    <button className="text-white text-sm border-b border-white/50 pb-1 hover:border-white transition-colors flex items-center gap-2 group/btn">
                      Дослідити колекцію
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signature element */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
            <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
            <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} COLLECTIONS</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements with parallax */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-neutral-200/50 -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-neutral-200/30 -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
      />
    </section>
  )
}


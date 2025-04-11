"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Target, Compass, Award } from "lucide-react"
import Link from "next/link"

const heritageFeatures = [
  {
    icon: Shield,
    title: "ВІЙСЬКОВА ЕСТЕТИКА",
    description: "Дизайн, натхненний військовою формою, адаптований для повсякденного міського життя.",
  },
  {
    icon: Target,
    title: "СТИЛЬНІ ДЕТАЛІ",
    description: "Кишені, нашивки та фурнітура військового стилю, що додають характер повсякденному одягу.",
  },
  {
    icon: Compass,
    title: "УНІВЕРСАЛЬНІСТЬ",
    description: "Речі, які легко поєднуються між собою та з іншими елементами вашого гардеробу.",
  },
  {
    icon: Award,
    title: "СУЧАСНА ІНТЕРПРЕТАЦІЯ",
    description: "Класичні військові елементи, переосмислені для сучасної моди та повсякденного носіння.",
  },
]

export default function MilitaryHeritage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0.8])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Enhanced creative background with military-inspired elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 will-change-transform">
        {/* Base layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-olive-900/95 to-stone-950 z-10" />

        {/* Enhanced military texture overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Military Background')] bg-cover bg-center opacity-40 mix-blend-overlay z-10" />

        {/* Luxury texture overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        {/* Camouflage pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23556b2f' fillOpacity='0.2' fillRule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Enhanced tactical grid overlay */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

        {/* Diagonal tactical grid */}
        <div
          className="absolute inset-0 z-10 opacity-10"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)`,
            backgroundSize: `100px 100px`,
          }}
        />

        {/* Vignette effect with enhanced gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)] z-10" />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 z-10 opacity-20"
          animate={{
            background: [
              "linear-gradient(0deg, rgba(95,108,72,0.2) 0%, rgba(0,0,0,0) 100%)",
              "linear-gradient(0deg, rgba(95,108,72,0.3) 0%, rgba(0,0,0,0) 100%)",
              "linear-gradient(0deg, rgba(95,108,72,0.2) 0%, rgba(0,0,0,0) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Military-inspired decorative elements */}
        <div className="absolute top-[10%] left-[5%] w-40 h-40 border border-olive-500/20 rounded-full opacity-20 z-10"></div>
        <div className="absolute bottom-[15%] right-[10%] w-60 h-60 border border-olive-500/10 rounded-full opacity-15 z-10"></div>

        {/* Animated radar lines */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-olive-500/10 rounded-full opacity-20 z-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Tactical map elements */}
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-olive-500/40 rounded-full z-10"></div>
        <div className="absolute top-[20%] left-[15%] w-6 h-6 border border-olive-500/20 rounded-full z-10"></div>
        <div className="absolute top-[20%] left-[15%] w-12 h-12 border border-olive-500/10 rounded-full z-10"></div>

        <div className="absolute bottom-[30%] right-[25%] w-2 h-2 bg-olive-500/40 rounded-full z-10"></div>
        <div className="absolute bottom-[30%] right-[25%] w-6 h-6 border border-olive-500/20 rounded-full z-10"></div>
        <div className="absolute bottom-[30%] right-[25%] w-12 h-12 border border-olive-500/10 rounded-full z-10"></div>

        {/* Animated tactical scan line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-olive-500/30 to-transparent z-10"
          animate={{ y: [0, 2000, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Military coordinates and markings */}
        <div className="absolute top-[10%] right-[10%] text-olive-500/30 text-xs font-mono z-10">N 50°27&apos;12&quot;</div>
        <div className="absolute top-[12%] right-[10%] text-olive-500/30 text-xs font-mono z-10">E 30°31&apos;24&quot;</div>
        <div className="absolute bottom-[10%] left-[10%] text-olive-500/30 text-xs font-mono z-10">
          GRID 38TUL8891307610
        </div>

        {/* Compass rose */}
        <div className="absolute bottom-[5%] right-[5%] w-20 h-20 opacity-20 z-10">
          <div className="absolute inset-0 border border-olive-500/30 rounded-full"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/50"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/50"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/50"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-olive-500/50 text-xs">N</div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity: contentOpacity }} className="text-center mb-16 text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-belleza text-4xl md:text-5xl mb-6"
          >
            ВІЙСЬКОВИЙ СТИЛЬ ДЛЯ ПОВСЯКДЕННОГО ЖИТТЯ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-stone-200"
          >
            Наш одяг поєднує військову естетику з сучасними силуетами, створюючи стильні речі для повсякденного
            гардеробу. Від офісу до вечірніх зустрічей — військовий стиль, адаптований для міського життя.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {heritageFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900/90 -z-10" />
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 -z-10" />
              <div className="absolute -left-1 top-0 bottom-0 w-1 bg-olive-500" />
              <div className="absolute top-0 left-0 w-full h-full border border-white/5" />

              <div className="p-6 z-10">
                <div className="relative mb-6 inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-olive-700/20 rounded-full scale-[1.8] blur-md" />
                  <div className="relative bg-olive-900/80 p-3 rounded-full">
                    <feature.icon className="h-8 w-8 text-olive-300" />
                  </div>
                </div>
                <h3 className="font-belleza text-xl mb-3 text-white relative">
                  {feature.title}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-8 h-0.5 bg-olive-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "2rem" }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </h3>
                <p className="text-stone-300 mb-4 relative z-10">{feature.description}</p>

                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-olive-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/catalog?page=1&sort=default">
            <Button className="relative overflow-hidden group bg-transparent hover:bg-transparent text-white border border-olive-600 rounded-none px-10 py-6 font-belleza">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-olive-800 to-olive-700 group-hover:translate-y-0 translate-y-[100%] transition-transform duration-500" />
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-olive-700 to-olive-600 translate-y-0 group-hover:translate-y-[-100%] transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                ДОСЛІДИТИ НАШ СТИЛЬ
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


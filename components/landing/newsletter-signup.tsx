"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Store } from "@/constants/store"

export default function NewsletterSignup() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 -z-10"></div>

      {/* Luxury texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      ></div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-full bg-olive-900/10 -z-10"
        animate={{
          opacity: [0.05, 0.1, 0.05],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-stone-700/20 -z-10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      ></motion.div>

      {/* Accent lines with animation */}
      <motion.div
        className="absolute left-0 top-0 h-full w-[1px]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(168, 162, 158, 0.2), transparent)",
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute right-0 top-0 h-full w-[1px]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(168, 162, 158, 0.2), transparent)",
        }}
        animate={{
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Diagonal accent lines */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-500/10 rotate-45 -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-500/10 rotate-45 -z-10"></div>

      {/* Animated circles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-olive-800/5 blur-3xl -z-10"
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
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-stone-700/5 blur-3xl -z-10"
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
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative corner elements */}
          <div className="absolute -top-4 -left-4 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 border-olive-500/20 -z-10"></div>
          <div className="absolute -bottom-4 -right-4 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 border-olive-500/20 -z-10"></div>

          <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 p-6 sm:p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 opacity-5 -z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23a8a29e' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <motion.div
                  className="h-px w-8 sm:w-12 bg-olive-400/70"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                ></motion.div>
                <span className="text-olive-400 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase font-light">
                  Підписка
                </span>
                <motion.div
                  className="h-px w-8 sm:w-12 bg-olive-400/70"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>

              <h2 className="font-belleza text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white tracking-wide relative inline-block mb-4 sm:mb-8">
                <span className="relative z-10">ПРИЄДНУЙТЕСЬ ДО РЯДІВ</span>
                <motion.span
                  className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-[1px] sm:h-[2px] bg-olive-500/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h2>

              <p className="mb-6 sm:mb-8 md:mb-10 text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
                Підпишіться, щоб отримувати ексклюзивні пропозиції, ранній доступ до нових колекцій та тактичні поради
                щодо стилю, які доставляються прямо на вашу електронну пошту.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative">
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-500/30 hidden sm:block"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-500/30 hidden sm:block"></div>

                <Input
                  type="email"
                  placeholder="Ваша електронна адреса"
                  className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-4 sm:py-5 md:py-7 px-4 sm:px-6 focus:border-olive-600 transition-colors duration-300"
                />
                <div className="relative">
                  <Button className="relative z-10 bg-olive-700 hover:bg-olive-600 text-white rounded-none py-4 sm:py-5 md:py-7 px-6 sm:px-8 md:px-10 font-belleza tracking-wider group overflow-hidden w-full sm:w-auto">
                    <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <span className="truncate">ЗАПИСАТИСЯ ЗАРАЗ</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="inline-block flex-shrink-0"
                      >
                        →
                      </motion.span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                  </Button>
                  <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1 hidden sm:block"></div>
                </div>
              </div>

              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-stone-400 font-light max-w-2xl mx-auto">
                Підписуючись, ви погоджуєтесь з нашою Політикою конфіденційності та даєте згоду на отримання оновлень
                від нашої компанії. Ви можете відписатися в будь-який час.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Signature element */}
        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-4 sm:w-5 h-4 sm:h-5 border-t border-l border-olive-500/30"></div>
            <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-4 sm:w-5 h-4 sm:h-5 border-b border-r border-olive-500/30"></div>
            <span className="font-belleza text-stone-500 tracking-widest text-xs sm:text-sm px-4 sm:px-6">
              {Store.name} COMMUNITY
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

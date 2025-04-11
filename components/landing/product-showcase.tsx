"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

export default function ProductShowcase() {
  return (
    <section className="py-32 overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 -z-10"></div>

      {/* Luxury texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
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
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-stone-800/20 -z-10"
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
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-stone-800/5 blur-3xl -z-10"
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header section */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4 relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-olive-500/10 -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-olive-500/5 -z-10"></div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="h-px w-12 bg-olive-400/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.div>
              <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">КОЛЕКЦІЯ</span>
              <motion.div
                className="h-px w-12 bg-olive-400/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>

            <h2 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-white tracking-wide relative inline-block">
              <span className="relative z-10">ВИБРАНІ ТОВАРИ</span>
              <motion.span
                className="absolute -bottom-3 left-0 right-0 h-[1px] bg-olive-500/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-stone-300 font-light"
          >
            Відкрийте для себе наші найпопулярніші моделі, створені з увагою до деталей та відданістю якості. Кожен
            виріб — це поєднання військової естетики та сучасного дизайну.
          </motion.p>
        </div>

        {/* Enhanced products grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Товар 1 */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/catalog/tactical-field-jacket-m1" className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                  {/* Luxury frame */}
                  <div className="absolute inset-0 border border-stone-700/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-700/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-olive-500/50 z-20 pointer-events-none"></div>

                  {/* Image with enhanced hover effect */}
                  <div className="absolute inset-0 bg-stone-800">
                    <Image
                      src="/assets/1fp.jpg"
                      alt="Аметистовий блейзер - Модель у сірому блейзері з фіолетовою сорочкою"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-110"
                    />

                    {/* Gradient overlay with enhanced animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px w-8 bg-olive-500/70"></div>
                          <p className="text-olive-300 text-xs tracking-[0.2em] uppercase">Люкс блейзер</p>
                        </div>

                        <h4 className="font-belleza text-xl text-white mb-4">Аметистовий блейзер</h4>

                        <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-stone-900 border-0 rounded-none font-belleza py-2 px-4 text-xs tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 w-full justify-center">
                          <ShoppingBag className="h-4 w-4" /> ДОДАТИ ДО КОШИКА
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <div className="bg-olive-700 text-white px-3 py-1 text-xs tracking-wider font-medium">ЗНИЖКА</div>
                      <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Enhanced product info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-belleza text-lg text-white group-hover:text-olive-400 transition-colors duration-300">
                    Аметистовий блейзер
                  </h3>
                  <p className="text-sm text-stone-400">Люкс блейзер</p>
                </div>
                <div className="text-right">
                  <p className="font-belleza text-lg text-white">2 370 ₴</p>
                  <p className="text-sm text-stone-500 line-through">3 870 ₴</p>
                </div>
              </div>
            </motion.div>

            {/* Товар 2 */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/catalog/tactical-field-jacket-m1" className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                  {/* Luxury frame */}
                  <div className="absolute inset-0 border border-stone-700/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-700/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-olive-500/50 z-20 pointer-events-none"></div>

                  {/* Image with enhanced hover effect */}
                  <div className="absolute inset-0 bg-stone-800">
                    <Image
                      src="/assets/2fp.jpg"
                      alt="Бежевий блейзер - Модель у бежевому блейзері з білою сорочкою"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-110"
                    />

                    {/* Gradient overlay with enhanced animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px w-8 bg-olive-500/70"></div>
                          <p className="text-olive-300 text-xs tracking-[0.2em] uppercase">Люкс блейзер</p>
                        </div>

                        <h4 className="font-belleza text-xl text-white mb-4">Бежевий блейзер</h4>

                        <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-stone-900 border-0 rounded-none font-belleza py-2 px-4 text-xs tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 w-full justify-center">
                          <ShoppingBag className="h-4 w-4" /> ДОДАТИ ДО КОШИКА
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <div className="bg-stone-600 text-white px-3 py-1 text-xs tracking-wider font-medium">
                        НОВИНКА
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full border border-stone-500/30 transform translate-x-1 translate-y-1"></div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Enhanced product info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-belleza text-lg text-white group-hover:text-olive-400 transition-colors duration-300">
                    Бежевий блейзер
                  </h3>
                  <p className="text-sm text-stone-400">Люкс блейзер</p>
                </div>
                <div className="text-right">
                  <p className="font-belleza text-lg text-white">3 870 ₴</p>
                  <p className="text-sm text-stone-500 line-through">4 470 ₴</p>
                </div>
              </div>
            </motion.div>

            {/* Товар 3 */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/catalog/tactical-field-jacket-m1" className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                  {/* Luxury frame */}
                  <div className="absolute inset-0 border border-stone-700/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-700/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-olive-500/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-olive-500/50 z-20 pointer-events-none"></div>

                  {/* Image with enhanced hover effect */}
                  <div className="absolute inset-0 bg-stone-800">
                    <Image
                      src="/assets/3fp.jpg"
                      alt="Чорний блейзер - Модель у чорному блейзері з білою сорочкою"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-110"
                    />

                    {/* Gradient overlay with enhanced animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px w-8 bg-olive-500/70"></div>
                          <p className="text-olive-300 text-xs tracking-[0.2em] uppercase">Люкс блейзер</p>
                        </div>

                        <h4 className="font-belleza text-xl text-white mb-4">Чорний блейзер</h4>

                        <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-stone-900 border-0 rounded-none font-belleza py-2 px-4 text-xs tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 w-full justify-center">
                          <ShoppingBag className="h-4 w-4" /> ДОДАТИ ДО КОШИКА
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <div className="bg-olive-700 text-white px-3 py-1 text-xs tracking-wider font-medium">ЗНИЖКА</div>
                      <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Enhanced product info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-belleza text-lg text-white group-hover:text-olive-400 transition-colors duration-300">
                    Чорний блейзер
                  </h3>
                  <p className="text-sm text-stone-400">Люкс блейзер</p>
                </div>
                <div className="text-right">
                  <p className="font-belleza text-lg text-white">3 270 ₴</p>
                  <p className="text-sm text-stone-500 line-through">4 470 ₴</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              <Link href="/catalog/?page=1&sort=default">
                <button className="relative z-10 bg-transparent hover:bg-olive-700 text-white hover:text-white border border-stone-600 hover:border-olive-700 rounded-none py-4 px-12 font-belleza tracking-[0.2em] transition-all duration-500 text-sm md:text-base group overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    ПЕРЕГЛЯНУТИ ВСІ ТОВАРИ
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                </button>
              </Link>
              <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


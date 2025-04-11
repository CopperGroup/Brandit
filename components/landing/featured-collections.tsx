"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Store } from "@/constants/store"

const collections = [
  {
    title: "МІСЬКИЙ КАМУФЛЯЖ",
    description: "Камуфляжні принти, адаптовані для міського стилю",
    image: "/assets/2c.jpg",
    color: "bg-olive-900",
  },
  {
    title: "ПОВСЯКДЕННА УНІФОРМА",
    description: "Військово-натхненні базові речі для щоденного носіння",
    image: "/assets/1c.webp",
    color: "bg-stone-800",
  },
  {
    title: "ПОЛЬОВИЙ ШАРМ",
    description: "Елегантні інтерпретації польової форми для міста",
    image: "/assets/3c.jpg",
    color: "bg-neutral-800",
  },
]

export default function FeaturedCollections() {
  return (
    <section className="py-32 overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-50 -z-10"></div>

      {/* Luxury paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      ></div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] -z-10"></div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-full bg-olive-700/5 -z-10"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-stone-300/10 -z-10"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      ></motion.div>

      {/* Accent lines */}
      <div className="absolute top-0 left-0 w-1 h-40 bg-gradient-to-b from-olive-700/30 to-transparent -z-10"></div>
      <div className="absolute top-0 left-0 w-40 h-1 bg-gradient-to-r from-olive-700/30 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1 h-40 bg-gradient-to-t from-olive-700/30 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-1 bg-gradient-to-l from-olive-700/30 to-transparent -z-10"></div>

      {/* Diagonal accent lines */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-700/10 rotate-45 -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-700/10 rotate-45 -z-10"></div>

      {/* Animated decorative circles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-olive-700/5 blur-3xl -z-10"
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
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-stone-300/10 blur-3xl -z-10"
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
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="h-px w-12 bg-olive-700/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.div>
              <span className="text-olive-700 text-sm tracking-[0.35em] uppercase font-light">Колекції</span>
              <motion.div
                className="h-px w-12 bg-olive-700/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>

            <h2 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-stone-800 tracking-wide relative inline-block">
              <span className="relative z-10">ФІРМОВІ КОЛЕКЦІЇ</span>
              <motion.span
                className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-700/30"
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
            className="max-w-2xl mx-auto text-stone-600 text-lg leading-relaxed font-light"
          >
            Стильний одяг, що бездоганно поєднує військову естетику з сучасним повсякденним силуетом для міського життя.
            Кожна колекція створена з увагою до деталей та відданістю якості.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {collections.map((collection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-8 shadow-xl">
                {/* Luxury frame */}
                <div className="absolute inset-0 border border-stone-300/50 z-20 pointer-events-none"></div>
                <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-300/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/30 z-20 pointer-events-none"></div>

                {/* Collection number */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="relative">
                    <div className="bg-olive-700/90 text-white px-3 py-1 text-xs tracking-wider font-medium">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-stone-200">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                    fill
                  />
                </div>

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-900/30 to-transparent mix-blend-color"></div>
                </div>

                <div className="absolute inset-0 flex items-end p-8">
                  <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-8 bg-white/60"></div>
                      <p className="text-white/80 text-xs tracking-[0.2em] uppercase">Колекція</p>
                    </div>

                    <h3 className="font-belleza text-white text-2xl mb-3">{collection.title}</h3>
                    <p className="text-white/80 text-sm mb-8 max-w-xs leading-relaxed">{collection.description}</p>

                    <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-stone-900 border-0 rounded-none font-belleza py-2 px-4 text-xs tracking-wider transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                      <span>ДОСЛІДИТИ</span>
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

              <div className="relative pl-6 border-l border-stone-200">
                <h3 className="font-belleza text-2xl mb-3 text-stone-800 group-hover:text-olive-800 transition-colors duration-300">
                  {collection.title}
                </h3>
                <p className="text-stone-600 mb-5 font-light leading-relaxed">{collection.description}</p>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent text-stone-800 hover:text-olive-700 font-belleza group/btn flex items-center gap-2"
                >
                  <span>Переглянути колекцію</span>
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
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
    </section>
  )
}


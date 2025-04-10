"use client"

import { Store } from "@/constants/store"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "Військовий стиль ніколи не виглядав так елегантно. Я отримую компліменти щоразу, коли одягаю їхні речі. Якість просто вражає!",
    author: "Олександр Петренко",
    rating: 5,
  },
  {
    quote:
      "Нарешті бренд, який поєднує військову естетику з комфортом! Їхні речі виглядають так, ніби вони створені спеціально для мене.",
    author: "Марія Ковальчук",
    rating: 5,
  },
  {
    quote:
      "Я ніколи не отримував стільки компліментів щодо свого одягу. Цей бренд дійсно знає, як створювати речі поза часом.",
    author: "Віктор Лисенко",
    rating: 5,
  },
  {
    quote:
      "Цей бренд — все, що я шукав: стильний і якісний. Їхня колекція — ідеальне поєднання сучасних трендів і військової класики.",
    author: "Анна Шевченко",
    rating: 5,
  },
  {
    quote:
      "Я вражений тим, як цей бренд поєднує стиль з практичністю. Знаючи, що вони створені з увагою до деталей, я відчуваю себе впевнено.",
    author: "Денис Мороз",
    rating: 5,
  },
  {
    quote:
      "Я в захваті від універсальності їхніх речей. Можу одягнути той самий комплект на роботу чи зустріч з друзями, і він завжди виглядає доречно.",
    author: "Ірина Коваль",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-32 overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 -z-10"></div>

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

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">Відгуки</span>
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          <h2 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-white tracking-wide relative inline-block mb-8">
            <span className="relative z-10">ВІДГУКИ КЛІЄНТІВ</span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-500/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h2>

          <p className="max-w-2xl mx-auto text-stone-300 font-light">
            Що кажуть наші клієнти про військово-натхненний стиль для повсякденного життя. Відкрийте для себе враження
            тих, хто вже приєднався до нашої спільноти.
          </p>
        </motion.div>

        <div className="relative">
          {/* Decorative corner elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-olive-500/20 -z-10"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-olive-500/20 -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-700/30">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-stone-950 -z-10"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-olive-900/20 to-stone-950 transition-opacity duration-500 -z-10"></div>

                {/* Subtle border animation on hover */}
                <div className="absolute inset-0 border border-stone-800 group-hover:border-olive-800/30 transition-colors duration-500"></div>
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-olive-500/50 group-hover:w-full transition-all duration-700"></div>
                <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-olive-500/50 group-hover:w-full transition-all duration-700"></div>

                <div className="p-12 flex flex-col items-center text-center relative">
                  {/* Decorative quote marks */}
                  <div className="absolute top-6 left-6 text-4xl text-olive-700/20 font-serif">"</div>
                  <div className="absolute bottom-6 right-6 text-4xl text-olive-700/20 font-serif">"</div>

                  <div className="mb-8 relative">
                    <div className="flex mb-2 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-0.5 text-olive-400"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            fill="currentColor"
                          />
                        </motion.svg>
                      ))}
                    </div>
                    <motion.div
                      className="h-px w-12 bg-olive-700/30 mx-auto"
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>

                  <p className="text-lg mb-8 text-stone-300 font-light italic leading-relaxed relative">
                    "{testimonial.quote}"
                  </p>

                  <div className="mt-auto">
                    <div className="w-10 h-10 rounded-full bg-olive-900/30 mb-3 mx-auto flex items-center justify-center">
                      <span className="font-belleza text-lg text-olive-300">
                        {testimonial.author.split(" ")[0][0]}
                        {testimonial.author.split(" ")[1][0]}
                      </span>
                    </div>
                    <p className="text-white font-belleza">{testimonial.author}</p>
                    <p className="text-stone-500 text-sm">Клієнт</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-500/30"></div>
            <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-500/30"></div>
            <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} COMMUNITY</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


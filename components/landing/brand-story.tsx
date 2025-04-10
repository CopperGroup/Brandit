"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Store } from "@/constants/store"

export default function BrandStory() {
  return (
    <section className="py-32 overflow-hidden relative">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-olive-50 to-stone-100 -z-10"></div>

      {/* Luxury paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
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
      <div className="absolute top-0 left-0 w-1 h-40 bg-gradient-to-b from-olive-700/30 to-transparent"></div>
      <div className="absolute top-0 left-0 w-40 h-1 bg-gradient-to-r from-olive-700/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1 h-40 bg-gradient-to-t from-olive-700/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-40 h-1 bg-gradient-to-l from-olive-700/30 to-transparent"></div>

      {/* Diagonal accent lines */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-700/10 rotate-45"></div>
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-700/10 rotate-45"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-olive-700/30"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-olive-700/30"></div>

            <div className="mb-6 inline-block">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-olive-700/70"></div>
                <span className="text-olive-700 text-xs tracking-[0.25em] uppercase font-light">Est. 2023</span>
              </div>

              <motion.h2
                className="font-belleza text-4xl md:text-5xl lg:text-6xl text-stone-800 tracking-wide relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                НАША ІСТОРІЯ
                <motion.span
                  className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-700/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                ></motion.span>
              </motion.h2>
            </div>

            <div className="space-y-6">
              <motion.p
                className="text-stone-700 leading-relaxed font-light"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl font-belleza text-olive-800 float-left mr-3 mt-1">Н</span>аш бренд народився з
                любові до військової естетики та бажання привнести її в повсякденний гардероб. Ми створюємо одяг, який
                поєднує характерні військові елементи з сучасними силуетами для міського життя.
              </motion.p>

              <motion.p
                className="text-stone-700 leading-relaxed font-light"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Кожен виріб ретельно розроблений, щоб бути стильним, комфортним і універсальним. Ми приділяємо увагу
                деталям, які відображають військову спадщину — кишені, нашивки, фурнітура — але адаптуємо їх для
                повсякденного носіння.
              </motion.p>

              <motion.p
                className="text-stone-700 leading-relaxed font-light mb-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Наша місія — дозволити кожному додати характер військового стилю до свого гардеробу, не жертвуючи
                комфортом і не виглядаючи так, ніби ви щойно з полігону.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative inline-block"
              >
                <Link href="/our-history">
                  <Button className="relative z-10 bg-stone-800 hover:bg-stone-700 text-white rounded-none px-8 py-6 font-belleza tracking-wider group overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      ДІЗНАТИСЯ НАШУ ІСТОРІЮ
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </span>
                    <span className="absolute inset-0 bg-olive-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                  </Button>
                </Link>
                <div className="absolute top-0 left-0 w-full h-full border border-stone-500/20 transform translate-x-1 translate-y-1"></div>
              </motion.div>
            </div>

            {/* Timeline elements */}
            <div className="mt-16 relative hidden md:block">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-olive-700/20"></div>

              {[2023, 2024, 2025].map((year, index) => (
                <motion.div
                  key={year}
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-olive-700"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-olive-500 animate-ping opacity-75"></div>
                  </div>
                  <div>
                    <span className="font-belleza text-lg text-stone-800">{year}</span>
                    <p className="text-sm text-stone-600">
                      {index === 0
                        ? "Заснування бренду"
                        : index === 1
                          ? "Перша флагманська колекція"
                          : "Міжнародна експансія"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main image with frame */}
            <div className="relative aspect-[4/5] bg-stone-200 shadow-xl">
              <div className="absolute inset-0 border border-stone-400/20 z-20 pointer-events-none"></div>
              <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-400/10 z-20 pointer-events-none"></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/30 z-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/30 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/30 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/30 z-20 pointer-events-none"></div>

              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="w-full h-full">
                <Image
                  src="/assets/history-landing.jpg"
                  alt="Наша спадщина"
                  className="w-full h-full object-cover"
                  fill
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-olive-700/10 z-10"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-olive-700/10 z-10"
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>
            </div>

            {/* Overlapping secondary image */}
            <motion.div
              className="absolute -bottom-12 -left-12 w-2/3 aspect-square bg-olive-800 shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 border border-olive-700/30 z-20 pointer-events-none"></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 z-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 z-20 pointer-events-none"></div>

              <Image
                src="/assets/high-angle-landing.jpg"
                alt="Засновано 2023"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
                fill
              />

              {/* Vintage stamp effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full border-2 border-white/30 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="text-white font-belleza text-center">
                    <div className="text-xs tracking-[0.2em]">{Store.name}</div>
                    <div className="text-lg">2023</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/2 -right-8 transform -translate-y-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-olive-700/60"
                    style={{ opacity: 1 - i * 0.15 }}
                  ></div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 right-1/4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-[1px] bg-olive-700/30"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Brand values section */}
        <motion.div
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { title: "ЯКІСТЬ", desc: "Кожен виріб створений з найкращих матеріалів та з увагою до найменших деталей." },
            {
              title: "СТИЛЬ",
              desc: "Поєднання військової естетики з сучасними силуетами для створення унікального образу.",
            },
            { title: "КОМФОРТ", desc: "Функціональність і зручність є основою кожного елементу нашого одягу." },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className="relative p-8 bg-white/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 border border-stone-300/30"></div>
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-olive-700"></div>

              <h3 className="font-belleza text-2xl mb-4 text-stone-800">{value.title}</h3>
              <p className="text-stone-600 font-light">{value.desc}</p>

              <div className="absolute bottom-4 right-4 text-4xl font-belleza text-olive-700/10">
                {(index + 1).toString().padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Signature element */}
        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block relative">
              <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
              <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
              <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} HERITAGE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import { Store } from "@/constants/store"

const styleGuides = {
  office: [
    {
      title: "ДІЛОВИЙ МІЛІТАРІ",
      description:
        "Поєднайте оливкову сорочку з темними штанами карго та шкіряними черевиками для елегантного офісного образу з військовим характером.",
      image: "/assets/1d.jpg",
      accent: "#4A543A",
      number: "01",
    },
    {
      title: "ФОРМАЛЬНИЙ КАМУФЛЯЖ",
      description:
        "Додайте камуфляжний аксесуар до класичного костюму для тонкого натяку на військову естетику в діловому середовищі.",
      image: "/assets/2d.jpg",
      accent: "#57534E",
      number: "02",
    },
    {
      title: "ПОЛЬОВИЙ ШАРМ",
      description:
        "Жіночний силует польової куртки з поясом створює структурований образ, ідеальний для офісу з гнучким дрес-кодом.",
      image: "/assets/3d.jpg",
      accent: "#44403C",
      number: "03",
    },
  ],
  casual: [
    {
      title: "ВИХІДНИЙ ПАТРУЛЬ",
      description:
        "Поєднайте карго штани з базовою футболкою та курткою-бомбером для розслабленого вихідного образу з військовим відтінком.",
      image: "/assets/4d.jpg",
      accent: "#5F6C48",
      number: "01",
    },
    {
      title: "МІСЬКИЙ РОЗВІДНИК",
      description: "Багатошаровий образ з утилітарним жилетом, худі та джинсами для стильного повсякденного вигляду.",
      image: "/assets/5d.jpg",
      accent: "#78716C",
      number: "02",
    },
    {
      title: "КАМУФЛЯЖ І ДЕНИМ",
      description: "Класичне поєднання камуфляжного принту з денимом створює невимушений образ для щоденних справ.",
      image: "/assets/6d.jpg",
      accent: "#4A543A",
      number: "03",
    },
  ],
  evening: [
    {
      title: "ЕЛЕГАНТНИЙ КОМАНДИР",
      description:
        "Чорна військова куртка з мінімалістичними деталями над базовим чорним одягом для вишуканого вечірнього образу.",
      image: "/assets/7d.jpg",
      accent: "#1C1917",
      number: "01",
    },
    {
      title: "ВЕЧІРНІЙ КАМУФЛЯЖ",
      description: "Тонкі камуфляжні деталі на темному одязі створюють витончений вечірній образ з характером.",
      image: "/assets/8d.jpg",
      accent: "#343B2C",
      number: "02",
    },
    {
      title: "ПАРАДНИЙ ВИХІД",
      description: "Структурована сукня з військовими ґудзиками та деталями для стильного вечірнього образу.",
      image: "/assets/9d.jpg",
      accent: "#292524",
      number: "03",
    },
  ],
}

export default function StyleGuide() {
  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden relative bg-[#f9f8f6]">
      {/* Luxury paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      ></div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10"></div>

      {/* Elegant accent elements */}
      <div className="absolute top-0 left-0 w-[1px] h-96 bg-gradient-to-b from-olive-700/40 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[1px] h-96 bg-gradient-to-b from-stone-400/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-[1px] h-96 bg-gradient-to-t from-olive-700/40 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-[1px] h-96 bg-gradient-to-t from-stone-400/40 to-transparent"></div>

      {/* Luxury container with refined spacing */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px]">
        {/* Editorial header section */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 relative">
          <div className="absolute top-0 left-0 w-20 h-[1px] bg-olive-700/30"></div>
          <div className="absolute top-0 right-0 w-20 h-[1px] bg-olive-700/30"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-16 text-center"
          >
            <div className="inline-block mb-6">
              <span className="text-olive-700 text-xs tracking-[0.35em] uppercase font-light border-b border-olive-700/20 pb-2">
                Vol. 01 — Military Aesthetics
              </span>
            </div>

            <h2 className="font-belleza text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-stone-900 tracking-wide leading-[1.1] mb-6 sm:mb-8">
              СТИЛЬНИЙ
              <br className="hidden sm:block" /> ДОВІДНИК
            </h2>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-olive-700/40"></div>
              <div className="w-2 h-2 rounded-full bg-olive-700/60"></div>
              <div className="h-[1px] w-12 bg-olive-700/40"></div>
            </div>

            <p className="max-w-2xl mx-auto text-stone-600 text-lg leading-relaxed font-light mb-12">
              Як носити військовий стиль у різних життєвих ситуаціях — від офісу до вечірніх подій. Наш довідник
              допоможе вам створити досконалий образ для будь-якої нагоди.
            </p>

            <div className="inline-block relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-700/30"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-700/30"></div>
              <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} EDITION</span>
            </div>
          </motion.div>
        </div>

        {/* Luxury tabs section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-[1200px] mx-auto"
        >
          <Tabs defaultValue="office" className="w-full">
            {/* Editorial tab navigation */}
            <div className="relative mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-stone-200"></div>
              <TabsList className="flex w-full overflow-x-auto overflow-y-hidden justify-start sm:justify-center bg-transparent rounded-none mx-auto scrollbar-hide h-auto relative z-10 pb-2 sm:pb-0">
                {["office", "casual", "evening"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-0 relative font-belleza py-4 sm:py-6 px-4 sm:px-8 md:px-16 text-stone-400 whitespace-nowrap hover:text-stone-900 transition-colors duration-300 data-[state=active]:text-stone-900 data-[state=active]:bg-white"
                  >
                    <span className="relative z-10 tracking-[0.25em] text-sm md:text-base">
                      {tab === "office" ? "ОФІС" : tab === "casual" ? "ПОВСЯКДЕННЕ" : "ВЕЧІРНІЙ ВИХІД"}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-olive-700 data-[state=active]:w-full transition-all duration-500"></span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Luxury content sections */}
            {Object.entries(styleGuides).map(([key, styles]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                  {styles.map((style, index) => (
                    <motion.div
                      key={style.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer relative"
                    >
                      {/* Luxury image container with refined hover effects */}
                      <div className="relative aspect-[3/4] overflow-hidden mb-10 shadow-lg group-hover:shadow-xl transition-all duration-500">
                        {/* Style number */}
                        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-5 md:-left-5 z-20">
                          <div className="relative">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white flex items-center justify-center">
                              <span className="font-belleza text-xl sm:text-2xl text-stone-800">{style.number}</span>
                            </div>
                            <div className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-olive-700/20 transform translate-x-1 translate-y-1"></div>
                          </div>
                        </div>

                        {/* Image with luxury hover effect */}
                        <div className="absolute inset-0 bg-stone-100">
                          <img
                            src={style.image || "/placeholder.svg"}
                            alt={style.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        {/* Elegant overlay with refined typography */}
                        <div
                          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8"
                          style={{
                            background: `linear-gradient(to top, rgba(${
                              style.accent === "#4A543A"
                                ? "74, 84, 58"
                                : style.accent === "#57534E"
                                  ? "87, 83, 78"
                                  : style.accent === "#44403C"
                                    ? "68, 64, 60"
                                    : style.accent === "#5F6C48"
                                      ? "95, 108, 72"
                                      : style.accent === "#78716C"
                                        ? "120, 113, 108"
                                        : style.accent === "#1C1917"
                                          ? "28, 25, 23"
                                          : style.accent === "#343B2C"
                                            ? "52, 59, 44"
                                            : style.accent === "#292524"
                                              ? "41, 37, 36"
                                              : "74, 84, 58"
                            }, 0.85), rgba(${
                              style.accent === "#4A543A"
                                ? "74, 84, 58"
                                : style.accent === "#57534E"
                                  ? "87, 83, 78"
                                  : style.accent === "#44403C"
                                    ? "68, 64, 60"
                                    : style.accent === "#5F6C48"
                                      ? "95, 108, 72"
                                      : style.accent === "#78716C"
                                        ? "120, 113, 108"
                                        : style.accent === "#1C1917"
                                          ? "28, 25, 23"
                                          : style.accent === "#343B2C"
                                            ? "52, 59, 44"
                                            : style.accent === "#292524"
                                              ? "41, 37, 36"
                                              : "74, 84, 58"
                            }, 0.1))`,
                          }}
                        >
                          <div className="transform translate-y-6 sm:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100 relative z-20">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-[1px] bg-white/60"></div>
                              <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
                                {key === "office" ? "ОФІС" : key === "casual" ? "ПОВСЯКДЕННЕ" : "ВЕЧІР"}
                              </p>
                            </div>
                            <h3 className="font-belleza text-2xl text-white mb-6 tracking-wide">{style.title}</h3>
                            <Button
                              className="bg-white/90 backdrop-blur-sm hover:bg-white border-0 rounded-none font-belleza text-xs tracking-[0.1em] px-4 py-2 flex items-center gap-1 group/btn w-auto max-w-full truncate"
                              style={{
                                color:
                                  style.accent === "#4A543A"
                                    ? "#4A543A"
                                    : style.accent === "#57534E"
                                      ? "#57534E"
                                      : style.accent === "#44403C"
                                        ? "#44403C"
                                        : style.accent === "#5F6C48"
                                          ? "#5F6C48"
                                          : style.accent === "#78716C"
                                            ? "#78716C"
                                            : style.accent === "#1C1917"
                                              ? "#1C1917"
                                              : style.accent === "#343B2C"
                                                ? "#343B2C"
                                                : style.accent === "#292524"
                                                  ? "#292524"
                                                  : "#4A543A",
                              }}
                            >
                              <span className="truncate">ПЕРЕГЛЯНУТИ</span>
                              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Luxury content typography */}
                      <div className="relative pl-6 border-l border-stone-200">
                        <h3 className="font-belleza text-2xl mb-4 text-stone-900 group-hover:text-stone-700 transition-colors duration-300 tracking-wide">
                          {style.title}
                        </h3>
                        <p className="text-stone-600 leading-relaxed font-light">{style.description}</p>

                        <div className="mt-6 flex items-center gap-2 text-stone-500 group-hover:text-olive-700 transition-colors duration-300">
                          <Plus className="h-4 w-4" />
                          <span className="text-xs tracking-[0.15em] uppercase font-medium">Деталі</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Luxury stylist tip section */}
          <div className="mt-20 sm:mt-24 md:mt-32 lg:mt-40 relative px-4 sm:px-8 md:px-0">
            {/* Elegant divider - hidden on small screens */}
            <div className="hidden sm:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-stone-200"></div>

            {/* Luxury tip container */}
            <div className="relative max-w-3xl mx-auto">
              {/* Label - repositioned for mobile */}
              <div className="text-center mb-4 sm:mb-0 sm:absolute sm:-top-6 sm:left-1/2 sm:-translate-x-1/2 sm:bg-[#f9f8f6] sm:px-6 md:px-12">
                <span className="font-belleza text-stone-500 text-xs sm:text-sm tracking-[0.25em] inline-block sm:bg-transparent bg-[#f9f8f6] px-4 py-1">
                  ПОРАДА СТИЛІСТА
                </span>
              </div>

              {/* Border for small screens */}
              <div className="block sm:hidden w-full h-[1px] bg-stone-200 mb-8"></div>

              <div className="bg-[#f9f8f6] border border-stone-200 p-6 sm:p-8 md:p-12 lg:p-16 relative">
                {/* Corner decorations - adjusted for better mobile display */}
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-olive-700/40"></div>
                <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-olive-700/40"></div>

                <p className="text-stone-700 mb-6 sm:mb-8 md:mb-10 italic leading-relaxed text-center font-light text-base sm:text-lg md:text-xl">
                &quot;Ключ до носіння військового стилю в повсякденному житті —{" "}
                  <span className="font-normal text-stone-900">баланс</span>. Поєднуйте один-два військові елементи з
                  базовими речами, щоб створити гармонійний образ, який не виглядає як повна уніформа.&quot;
                </p>

                <div className="text-center">
                  <Button className="bg-transparent hover:bg-stone-900 text-stone-800 hover:text-white border border-stone-800 rounded-none px-4 xs:px-5 sm:px-8 md:px-12 py-2 xs:py-3 sm:py-4 font-belleza tracking-[0.1em] xs:tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 text-[10px] xs:text-xs inline-flex items-center gap-1 xs:gap-2 sm:gap-3 group max-w-full">
                    <span className="truncate">КОНСУЛЬТАЦІЯ СТИЛІСТА</span>
                    <ArrowRight className="h-3 w-3 xs:h-4 xs:w-4 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury footer section */}
          <div className="mt-20 sm:mt-24 md:mt-32 lg:mt-40 text-center">
            <div className="inline-block relative">
              <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
              <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
              <p className="text-stone-500 text-xs tracking-[0.25em] uppercase px-8 py-2">{Store.name} STYLE GUIDE</p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-olive-700/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-olive-700/40"></div>
              <div className="h-[1px] w-8 bg-olive-700/30"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

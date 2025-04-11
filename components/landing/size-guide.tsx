"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, Info } from "lucide-react"

const sizeCharts = {
  tops: [
    { size: "XS", chest: "86-91", waist: "71-76", sleeve: "81-83" },
    { size: "S", chest: "91-97", waist: "76-81", sleeve: "83-86" },
    { size: "M", chest: "97-102", waist: "81-86", sleeve: "86-89" },
    { size: "L", chest: "102-107", waist: "86-91", sleeve: "89-91" },
    { size: "XL", chest: "107-112", waist: "91-97", sleeve: "91-94" },
    { size: "XXL", chest: "112-117", waist: "97-102", sleeve: "94-97" },
  ],
  bottoms: [
    { size: "XS", waist: "71-76", hip: "86-91", inseam: "76-79" },
    { size: "S", waist: "76-81", hip: "91-97", inseam: "79-81" },
    { size: "M", waist: "81-86", hip: "97-102", inseam: "81-84" },
    { size: "L", waist: "86-91", hip: "102-107", inseam: "84-86" },
    { size: "XL", waist: "91-97", hip: "107-112", inseam: "86-89" },
    { size: "XXL", waist: "97-102", hip: "112-117", inseam: "89-91" },
  ],
  footwear: [
    { euSize: "39", ukSize: "6", usSize: "7", footLength: "24.5" },
    { euSize: "40", ukSize: "6.5", usSize: "7.5", footLength: "25.1" },
    { euSize: "41", ukSize: "7", usSize: "8", footLength: "25.7" },
    { euSize: "42", ukSize: "8", usSize: "9", footLength: "26.4" },
    { euSize: "43", ukSize: "9", usSize: "10", footLength: "27.0" },
    { euSize: "44", ukSize: "9.5", usSize: "10.5", footLength: "27.6" },
    { euSize: "45", ukSize: "10.5", usSize: "11.5", footLength: "28.3" },
    { euSize: "46", ukSize: "11", usSize: "12", footLength: "28.9" },
  ],
}

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState("tops")

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden relative">
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

      {/* Military-inspired decorative elements */}
      <div className="absolute top-[10%] left-[5%] w-40 h-40 border border-olive-500/20 rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-[15%] right-[10%] w-60 h-60 border border-olive-500/10 rounded-full opacity-15 -z-10"></div>

      {/* Animated radar lines */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-olive-500/10 rounded-full opacity-20 -z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Tactical map elements */}
      <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-olive-500/40 rounded-full -z-10"></div>
      <div className="absolute top-[20%] left-[15%] w-6 h-6 border border-olive-500/20 rounded-full -z-10"></div>
      <div className="absolute top-[20%] left-[15%] w-12 h-12 border border-olive-500/10 rounded-full -z-10"></div>

      <div className="absolute bottom-[30%] right-[25%] w-2 h-2 bg-olive-500/40 rounded-full -z-10"></div>
      <div className="absolute bottom-[30%] right-[25%] w-6 h-6 border border-olive-500/20 rounded-full -z-10"></div>
      <div className="absolute bottom-[30%] right-[25%] w-12 h-12 border border-olive-500/10 rounded-full -z-10"></div>

      {/* Animated tactical scan line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-olive-500/30 to-transparent -z-10"
        animate={{ y: [0, 2000, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Military coordinates and markings */}
      <div className="absolute top-[10%] right-[10%] text-olive-500/30 text-xs font-mono -z-10">N 50°27&apos;12&quot;</div>
      <div className="absolute top-[12%] right-[10%] text-olive-500/30 text-xs font-mono -z-10">E 30°31&apos;24&quot;</div>
      <div className="absolute bottom-[10%] left-[10%] text-olive-500/30 text-xs font-mono -z-10">
        GRID 38TUL8891307610
      </div>

      {/* Compass rose */}
      <div className="absolute bottom-[5%] right-[5%] w-20 h-20 opacity-20 -z-10">
        <div className="absolute inset-0 border border-olive-500/30 rounded-full"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/50"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/50"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/50"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-olive-500/50 text-xs">N</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="max-[420px]:hidden"
            >
              <Ruler className="h-6 w-6 text-olive-400" />
            </motion.div>
            <h2 className="font-belleza text-3xl sm:text-4xl md:text-5xl text-white">ДОВІДНИК РОЗМІРІВ</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-stone-300"
          >
            Знайдіть свій ідеальний розмір з нашим детальним довідником. Всі вимірювання вказані в сантиметрах.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Animated corner accents */}
          <motion.div
            className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-olive-500/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          ></motion.div>

          <motion.div
            className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-olive-500/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          ></motion.div>

          <Tabs defaultValue="tops" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="inline-flex w-full overflow-x-auto justify-start sm:justify-center bg-transparent rounded-none mb-8 sm:mb-12 border-b border-stone-700 p-0 gap-1 sm:gap-2 scrollbar-hide">
              <TabsTrigger
                value="tops"
                className="rounded-none border-0 relative font-belleza py-3 sm:py-4 px-4 sm:px-6 md:px-8 text-stone-400 data-[state=active]:text-white bg-transparent data-[state=active]:bg-transparent transition-all duration-300 overflow-hidden group whitespace-nowrap text-sm sm:text-base"
              >
                <span className="relative z-10">ВЕРХНІЙ ОДЯГ</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-olive-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === "tops" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span className="absolute inset-0 bg-stone-800/30 -z-0 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></motion.span>
              </TabsTrigger>
              <TabsTrigger
                value="bottoms"
                className="rounded-none border-0 relative font-belleza py-3 sm:py-4 px-4 sm:px-6 md:px-8 text-stone-400 data-[state=active]:text-white bg-transparent data-[state=active]:bg-transparent transition-all duration-300 overflow-hidden group whitespace-nowrap text-sm sm:text-base"
              >
                <span className="relative z-10">ШТАНИ</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-olive-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === "bottoms" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span className="absolute inset-0 bg-stone-800/30 -z-0 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></motion.span>
              </TabsTrigger>
              <TabsTrigger
                value="footwear"
                className="rounded-none border-0 relative font-belleza py-3 sm:py-4 px-4 sm:px-6 md:px-8 text-stone-400 data-[state=active]:text-white bg-transparent data-[state=active]:bg-transparent transition-all duration-300 overflow-hidden group whitespace-nowrap text-sm sm:text-base"
              >
                <span className="relative z-10">ВЗУТТЯ</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-olive-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === "footwear" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span className="absolute inset-0 bg-stone-800/30 -z-0 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></motion.span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tops" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone-800">
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        РОЗМІР
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        ГРУДИ (см)
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        ТАЛІЯ (см)
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        РУКАВ (см)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeCharts.tops.map((row, index) => (
                      <motion.tr
                        key={row.size}
                        className={index % 2 === 0 ? "bg-stone-800/50" : "bg-stone-800/30"}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="py-2 sm:py-3 px-3 sm:px-6 font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                          {row.size}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.chest}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.waist}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.sleeve}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </TabsContent>

            <TabsContent value="bottoms" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone-800">
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        РОЗМІР
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        ТАЛІЯ (см)
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        СТЕГНА (см)
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        ВНУТРІШНІЙ ШОВ (см)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeCharts.bottoms.map((row, index) => (
                      <motion.tr
                        key={row.size}
                        className={index % 2 === 0 ? "bg-stone-800/50" : "bg-stone-800/30"}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="py-2 sm:py-3 px-3 sm:px-6 font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                          {row.size}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.waist}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.hip}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.inseam}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </TabsContent>

            <TabsContent value="footwear" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone-800">
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        ЄС
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        UK
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        US
                      </th>
                      <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                        ДОВЖИНА СТОПИ (см)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeCharts.footwear.map((row, index) => (
                      <motion.tr
                        key={row.euSize}
                        className={index % 2 === 0 ? "bg-stone-800/50" : "bg-stone-800/30"}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="py-2 sm:py-3 px-3 sm:px-6 font-belleza text-white text-sm sm:text-base whitespace-nowrap">
                          {row.euSize}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.ukSize}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.usSize}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-6 text-stone-300 text-sm sm:text-base whitespace-nowrap">
                          {row.footLength}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </TabsContent>
          </Tabs>

          <motion.div
            className="mt-6 sm:mt-8 bg-stone-800/80 p-4 sm:p-6 flex items-start gap-3 sm:gap-4 border-l-2 border-olive-500"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Info className="h-6 w-6 text-olive-400 flex-shrink-0 mt-1" />
            </motion.div>
            <div>
              <h4 className="font-belleza text-base sm:text-lg mb-1 sm:mb-2 text-white">ЯК ВИМІРЯТИ</h4>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Для найточніших результатів, використовуйте м&apos;яку вимірювальну стрічку. Стійте прямо і розслаблено.
                Вимірювання грудей слід робити в найширшій частині, талії - в найвужчій частині, а стегон - в найширшій
                частині нижче талії.
              </p>
            </div>
          </motion.div>

          {/* Animated measurement tape graphic */}
          <motion.div
            className="absolute -bottom-10 -right-20 w-40 h-40 opacity-10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#A3A284" strokeWidth="2" />
              <circle cx="50" cy="50" r="35" stroke="#A3A284" strokeWidth="1" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#A3A284" strokeWidth="1" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="#A3A284" strokeWidth="1" />
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="15"
                  x2="50"
                  y2="20"
                  stroke="#A3A284"
                  strokeWidth="1"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Ruler,
  Info,
  CassetteTapeIcon as Tape,
  Maximize,
  Minimize,
  ArrowRight,
  CheckCircle2,
  Shield,
  Target,
  Compass,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

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

const measurementInstructions = {
  tops: [
    {
      title: "ГРУДИ",
      description: "Виміряйте навколо найширшої частини грудей, тримаючи стрічку горизонтально.",
      icon: <Maximize className="h-5 w-5" />,
    },
    {
      title: "ТАЛІЯ",
      description: "Виміряйте навколо природної лінії талії, тримаючи стрічку комфортно вільно.",
      icon: <Minimize className="h-5 w-5" />,
    },
    {
      title: "РУКАВ",
      description: "Виміряйте від центру спини шиї, через плече і вниз до зап'ястя.",
      icon: <Ruler className="h-5 w-5" />,
    },
  ],
  bottoms: [
    {
      title: "ТАЛІЯ",
      description: "Виміряйте навколо природної лінії талії, тримаючи стрічку комфортно вільно.",
      icon: <Minimize className="h-5 w-5" />,
    },
    {
      title: "СТЕГНА",
      description: "Виміряйте навколо найширшої частини стегон, тримаючи стрічку горизонтально.",
      icon: <Maximize className="h-5 w-5" />,
    },
    {
      title: "ВНУТРІШНІЙ ШОВ",
      description: "Виміряйте від промежини до низу щиколотки вздовж внутрішньої сторони ноги.",
      icon: <Ruler className="h-5 w-5" />,
    },
  ],
  footwear: [
    {
      title: "ДОВЖИНА СТОПИ",
      description: "Виміряйте від задньої частини п'яти до кінчика найдовшого пальця.",
      icon: <Ruler className="h-5 w-5" />,
    },
  ],
}

const conversionTips = [
  "Для проміжних розмірів, оберіть більший для вільнішої посадки або менший для щільнішої.",
  "Наше тактичне спорядження розроблено з урахуванням сучасної, атлетичної посадки.",
  "Матеріали військового класу можуть мати мінімальну усадку після першого прання.",
  "Для шарування під тактичними жилетами або спорядженням, розгляньте можливість вибору більшого розміру.",
]

const FadeInWhenVisible = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const TacticalCorners = ({ className = "", size = "md", opacity = 50, animate = false }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const cornerSize = sizes[size] || sizes.md

  return (
    <>
      {animate ? (
        <>
          <motion.div
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: cornerSize.split(" ")[0].replace("w-", ""),
              height: cornerSize.split(" ")[1].replace("h-", ""),
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`absolute top-0 left-0 border-t-2 border-l-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
          <motion.div
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: cornerSize.split(" ")[0].replace("w-", ""),
              height: cornerSize.split(" ")[1].replace("h-", ""),
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`absolute top-0 right-0 border-t-2 border-r-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
          <motion.div
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: cornerSize.split(" ")[0].replace("w-", ""),
              height: cornerSize.split(" ")[1].replace("h-", ""),
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`absolute bottom-0 left-0 border-b-2 border-l-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
          <motion.div
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: cornerSize.split(" ")[0].replace("w-", ""),
              height: cornerSize.split(" ")[1].replace("h-", ""),
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`absolute bottom-0 right-0 border-b-2 border-r-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute top-0 left-0 border-t-2 border-l-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
          <div
            className={`absolute top-0 right-0 border-t-2 border-r-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
          <div
            className={`absolute bottom-0 left-0 border-b-2 border-l-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
          <div
            className={`absolute bottom-0 right-0 border-b-2 border-r-2 border-olive-500/${opacity} ${cornerSize} ${className}`}
          />
        </>
      )}
    </>
  )
}

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState("tops")
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-stone-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950"></div>

        {/* Tactical grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(163,162,132,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(163,162,132,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Luxury texture overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        ></div>

        {/* Military coordinates and markings */}
        <div className="absolute top-[10%] right-[10%] text-olive-500/40 text-xs font-mono">N 50°27'12"</div>
        <div className="absolute top-[12%] right-[10%] text-olive-500/40 text-xs font-mono">E 30°31'24"</div>
        <div className="absolute bottom-[10%] left-[10%] text-olive-500/40 text-xs font-mono">
          GRID 38TUL8891307610
        </div>

        {/* Compass rose */}
        <div className="absolute bottom-[5%] right-[5%] w-20 h-20 opacity-30">
          <div className="absolute inset-0 border border-olive-500/50 rounded-full"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/70"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/70"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/70"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/70"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-olive-500/70 text-xs">N</div>
        </div>

        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-500/10 rotate-45"></div>
          <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-500/10 rotate-45"></div>
        </div>

        {/* Enhanced tactical corner elements */}
        <TacticalCorners size="xl" opacity={30} animate={true} />

        {/* Animated accent lines */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/30 to-transparent origin-left"
        />
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/30 to-transparent origin-right"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="inline-block relative mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="text-olive-500"
                >
                  <Tape className="h-7 w-7" />
                </motion.div>
                <h1 className="font-belleza text-4xl md:text-6xl text-white tracking-wider">
                  ТАКТИЧНА СИСТЕМА РОЗМІРІВ
                </h1>
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="text-olive-500"
                >
                  <Tape className="h-7 w-7" />
                </motion.div>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/60 to-transparent origin-center"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="max-w-2xl mx-auto text-stone-300 text-lg"
            >
              Точно розроблена система розмірів для оптимальної тактичної продуктивності. Всі вимірювання в сантиметрах.
            </motion.p>
          </motion.div>

          {/* Navigation breadcrumbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm text-stone-400 mb-12"
          >
            <Link href="/" className="hover:text-olive-500 transition-colors">
              ГОЛОВНА
            </Link>
            <span>
              <ChevronRight className="h-3 w-3" />
            </span>
            <span className="text-olive-500">ТАБЛИЦЯ РОЗМІРІВ</span>
          </motion.div>
        </div>
      </section>

      {/* Size Charts Section */}
      <section className="py-16 relative">
        {/* Tactical grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(163,162,132,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(163,162,132,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Diagonal accent lines */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-500/20 rotate-45"></div>
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-500/20 rotate-45"></div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeInWhenVisible delay={0.1}>
            <div className="max-w-4xl mx-auto relative">
              {/* Animated corner accents */}
              <TacticalCorners size="lg" opacity={60} />

              <Tabs defaultValue="tops" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="inline-flex w-auto mx-auto bg-transparent rounded-none mb-12 border-b border-stone-700 p-0 gap-2">
                  <TabsTrigger
                    value="tops"
                    className="rounded-none border-0 relative font-belleza py-4 px-8 text-stone-400 data-[state=active]:text-white bg-transparent data-[state=active]:bg-transparent transition-all duration-300 overflow-hidden group"
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
                    className="rounded-none border-0 relative font-belleza py-4 px-8 text-stone-400 data-[state=active]:text-white bg-transparent data-[state=active]:bg-transparent transition-all duration-300 overflow-hidden group"
                  >
                    <span className="relative z-10">НИЖНІЙ ОДЯГ</span>
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
                    className="rounded-none border-0 relative font-belleza py-4 px-8 text-stone-400 data-[state=active]:text-white bg-transparent data-[state=active]:bg-transparent transition-all duration-300 overflow-hidden group"
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

                <AnimatePresence mode="wait">
                  <TabsContent value="tops" className="mt-0">
                    <motion.div
                      key="tops"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-x-auto"
                    >
                      <div className="relative">
                        {/* Tactical frame */}
                        <TacticalCorners size="sm" opacity={60} />

                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-stone-800/80 via-stone-800/90 to-stone-800/80 border-b border-olive-500/30">
                              <th className="py-4 px-6 text-left font-belleza text-white">РОЗМІР</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ГРУДИ (см)</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ТАЛІЯ (см)</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">РУКАВ (см)</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ВИБРАТИ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.tops.map((row, index) => (
                              <motion.tr
                                key={row.size}
                                className={`${
                                  index % 2 === 0 ? "bg-stone-800/50" : "bg-stone-800/30"
                                } ${selectedSize === row.size ? "bg-olive-900/40" : ""} ${hoveredRow === row.size ? "bg-stone-700/40" : ""} cursor-pointer transition-colors duration-300`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => setSelectedSize(row.size)}
                                onMouseEnter={() => setHoveredRow(row.size)}
                                onMouseLeave={() => setHoveredRow(null)}
                              >
                                <td className="py-3 px-6 font-belleza text-white border-l-2 border-transparent group-hover:border-olive-500/50 transition-colors duration-300">
                                  {row.size}
                                </td>
                                <td className="py-3 px-6 text-stone-300">{row.chest}</td>
                                <td className="py-3 px-6 text-stone-300">{row.waist}</td>
                                <td className="py-3 px-6 text-stone-300">{row.sleeve}</td>
                                <td className="py-3 px-6">
                                  <div
                                    className={`w-6 h-6 rounded-full border ${
                                      selectedSize === row.size
                                        ? "border-olive-500 bg-olive-500/30"
                                        : "border-stone-600"
                                    } flex items-center justify-center transition-all duration-300`}
                                  >
                                    {selectedSize === row.size && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                      >
                                        <CheckCircle2 className="h-4 w-4 text-olive-400" />
                                      </motion.div>
                                    )}
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="bottoms" className="mt-0">
                    <motion.div
                      key="bottoms"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-x-auto"
                    >
                      <div className="relative">
                        {/* Tactical frame */}
                        <TacticalCorners size="sm" opacity={60} />

                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-stone-800/80 via-stone-800/90 to-stone-800/80 border-b border-olive-500/30">
                              <th className="py-4 px-6 text-left font-belleza text-white">РОЗМІР</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ТАЛІЯ (см)</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">СТЕГНА (см)</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ВНУТР. ШОВ (см)</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ВИБРАТИ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.bottoms.map((row, index) => (
                              <motion.tr
                                key={row.size}
                                className={`${
                                  index % 2 === 0 ? "bg-stone-800/50" : "bg-stone-800/30"
                                } ${selectedSize === row.size ? "bg-olive-900/40" : ""} ${hoveredRow === row.size ? "bg-stone-700/40" : ""} cursor-pointer transition-colors duration-300`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => setSelectedSize(row.size)}
                                onMouseEnter={() => setHoveredRow(row.size)}
                                onMouseLeave={() => setHoveredRow(null)}
                              >
                                <td className="py-3 px-6 font-belleza text-white border-l-2 border-transparent group-hover:border-olive-500/50 transition-colors duration-300">
                                  {row.size}
                                </td>
                                <td className="py-3 px-6 text-stone-300">{row.waist}</td>
                                <td className="py-3 px-6 text-stone-300">{row.hip}</td>
                                <td className="py-3 px-6 text-stone-300">{row.inseam}</td>
                                <td className="py-3 px-6">
                                  <div
                                    className={`w-6 h-6 rounded-full border ${
                                      selectedSize === row.size
                                        ? "border-olive-500 bg-olive-500/30"
                                        : "border-stone-600"
                                    } flex items-center justify-center transition-all duration-300`}
                                  >
                                    {selectedSize === row.size && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                      >
                                        <CheckCircle2 className="h-4 w-4 text-olive-400" />
                                      </motion.div>
                                    )}
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="footwear" className="mt-0">
                    <motion.div
                      key="footwear"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-x-auto"
                    >
                      <div className="relative">
                        {/* Tactical frame */}
                        <TacticalCorners size="sm" opacity={60} />

                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-stone-800/80 via-stone-800/90 to-stone-800/80 border-b border-olive-500/30">
                              <th className="py-4 px-6 text-left font-belleza text-white">РОЗМІР EU</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">РОЗМІР UK</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">РОЗМІР US</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ДОВЖИНА СТОПИ (см)</th>
                              <th className="py-4 px-6 text-left font-belleza text-white">ВИБРАТИ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.footwear.map((row, index) => (
                              <motion.tr
                                key={row.euSize}
                                className={`${
                                  index % 2 === 0 ? "bg-stone-800/50" : "bg-stone-800/30"
                                } ${selectedSize === row.euSize ? "bg-olive-900/40" : ""} ${hoveredRow === row.euSize ? "bg-stone-700/40" : ""} cursor-pointer transition-colors duration-300`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => setSelectedSize(row.euSize)}
                                onMouseEnter={() => setHoveredRow(row.euSize)}
                                onMouseLeave={() => setHoveredRow(null)}
                              >
                                <td className="py-3 px-6 font-belleza text-white border-l-2 border-transparent group-hover:border-olive-500/50 transition-colors duration-300">
                                  {row.euSize}
                                </td>
                                <td className="py-3 px-6 text-stone-300">{row.ukSize}</td>
                                <td className="py-3 px-6 text-stone-300">{row.usSize}</td>
                                <td className="py-3 px-6 text-stone-300">{row.footLength}</td>
                                <td className="py-3 px-6">
                                  <div
                                    className={`w-6 h-6 rounded-full border ${
                                      selectedSize === row.euSize
                                        ? "border-olive-500 bg-olive-500/30"
                                        : "border-stone-600"
                                    } flex items-center justify-center transition-all duration-300`}
                                  >
                                    {selectedSize === row.euSize && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                      >
                                        <CheckCircle2 className="h-4 w-4 text-olive-400" />
                                      </motion.div>
                                    )}
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>

                {/* Size selection info */}
                <AnimatePresence>
                  {selectedSize && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 p-6 bg-gradient-to-r from-olive-900/20 via-olive-900/30 to-olive-900/20 border border-olive-500/40 relative overflow-hidden"
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-olive-500/60"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-olive-500/60"></div>

                      {/* Diagonal accent line */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 border-[1px] border-olive-500/20 rotate-45"></div>
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 border-[1px] border-olive-500/20 rotate-45"></div>

                      <div className="flex items-center gap-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="text-olive-500"
                        >
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                        </motion.div>
                        <p className="text-white">
                          Розмір <span className="font-bold text-olive-300">{selectedSize}</span> вибрано. Цей розмір
                          рекомендується для оптимальної тактичної продуктивності на основі ваших вимірювань.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Measurement Instructions */}
      <section className="py-16 relative bg-gradient-to-b from-stone-900/70 to-stone-950/70">
        {/* Tactical grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(163,162,132,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(163,162,132,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0.1} className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="font-belleza text-3xl md:text-4xl text-white mb-4 relative z-10">ЯК ВИМІРЮВАТИ</h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/60 to-transparent origin-center"
              />
            </div>
            <p className="max-w-2xl mx-auto text-stone-300">
              Для оптимальної тактичної посадки дотримуйтесь цих точних інструкцій з вимірювання, використовуючи м'яку
              вимірювальну стрічку.
            </p>
          </FadeInWhenVisible>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === "tops" && (
                <motion.div
                  key="tops-instructions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {measurementInstructions.tops.map((instruction, index) => (
                    <FadeInWhenVisible key={instruction.title} delay={index * 0.1}>
                      <div className="bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 p-6 border-l-2 border-olive-500 relative group hover:bg-stone-800/90 transition-colors duration-300 h-full">
                        {/* Tactical corner */}
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-500/40"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-500/40"></div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-olive-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="flex items-start gap-4 relative z-10">
                          <div className="mt-1 text-olive-500 bg-olive-900/30 p-2 rounded-full">{instruction.icon}</div>
                          <div>
                            <h3 className="font-belleza text-lg text-white mb-2">{instruction.title}</h3>
                            <p className="text-stone-300 text-sm">{instruction.description}</p>
                          </div>
                        </div>
                      </div>
                    </FadeInWhenVisible>
                  ))}
                </motion.div>
              )}

              {activeTab === "bottoms" && (
                <motion.div
                  key="bottoms-instructions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {measurementInstructions.bottoms.map((instruction, index) => (
                    <FadeInWhenVisible key={instruction.title} delay={index * 0.1}>
                      <div className="bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 p-6 border-l-2 border-olive-500 relative group hover:bg-stone-800/90 transition-colors duration-300 h-full">
                        {/* Tactical corner */}
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-500/40"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-500/40"></div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-olive-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="flex items-start gap-4 relative z-10">
                          <div className="mt-1 text-olive-500 bg-olive-900/30 p-2 rounded-full">{instruction.icon}</div>
                          <div>
                            <h3 className="font-belleza text-lg text-white mb-2">{instruction.title}</h3>
                            <p className="text-stone-300 text-sm">{instruction.description}</p>
                          </div>
                        </div>
                      </div>
                    </FadeInWhenVisible>
                  ))}
                </motion.div>
              )}

              {activeTab === "footwear" && (
                <motion.div
                  key="footwear-instructions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {measurementInstructions.footwear.map((instruction, index) => (
                    <FadeInWhenVisible key={instruction.title} delay={index * 0.1}>
                      <div className="bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 p-6 border-l-2 border-olive-500 relative group hover:bg-stone-800/90 transition-colors duration-300 h-full">
                        {/* Tactical corner */}
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-500/40"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-500/40"></div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-olive-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="flex items-start gap-4 relative z-10">
                          <div className="mt-1 text-olive-500 bg-olive-900/30 p-2 rounded-full">{instruction.icon}</div>
                          <div>
                            <h3 className="font-belleza text-lg text-white mb-2">{instruction.title}</h3>
                            <p className="text-stone-300 text-sm">{instruction.description}</p>
                          </div>
                        </div>
                      </div>
                    </FadeInWhenVisible>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Size Conversion Tips */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0.2} className="max-w-4xl mx-auto">
            <div className="relative p-8 bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 border border-olive-500/30 overflow-hidden">
              {/* Enhanced tactical corners */}
              <TacticalCorners size="lg" opacity={50} />

              {/* Decorative diagonal lines */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-olive-500/10 rotate-45"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-olive-500/10 rotate-45"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="text-olive-500 bg-olive-900/30 p-2 rounded-full">
                  <Info className="h-5 w-5" />
                </div>
                <h3 className="font-belleza text-2xl text-white">ТАКТИЧНІ ПОРАДИ ЩОДО РОЗМІРІВ</h3>
              </div>

              <ul className="space-y-4">
                {conversionTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start gap-3 group"
                  >
                    <ArrowRight className="h-5 w-5 text-olive-500 flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform duration-300" />
                    <p className="text-stone-300 group-hover:text-white transition-colors duration-300">{tip}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Visual Measurement Guide */}
      <section className="py-16 relative bg-gradient-to-b from-stone-950/70 to-stone-900/70">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0.1} className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="font-belleza text-3xl md:text-4xl text-white mb-4 relative z-10">
                ВІЗУАЛЬНИЙ ПОСІБНИК З ВИМІРЮВАННЯ
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/60 to-transparent origin-center"
              />
            </div>
            <p className="max-w-2xl mx-auto text-stone-300">
              Використовуйте ці тактичні діаграми для точного позиціонування вимірювань.
            </p>
          </FadeInWhenVisible>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <FadeInWhenVisible delay={0.2}>
              <div className="relative p-6 bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 border border-olive-500/30 group hover:border-olive-500/50 transition-colors duration-300">
                {/* Enhanced tactical corners */}
                <TacticalCorners size="md" opacity={50} />

                <h3 className="font-belleza text-xl text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-olive-500" />
                  ВИМІРЮВАННЯ ВЕРХНЬОЇ ЧАСТИНИ ТІЛА
                </h3>

                <div className="aspect-square bg-gradient-to-br from-stone-700/50 to-stone-800/50 flex items-center justify-center p-4 border border-olive-500/20 group-hover:border-olive-500/40 transition-colors duration-300">
                  <div className="relative w-[240px] h-[300px]">
                    {/* Simple human torso outline */}
                    <svg viewBox="0 0 240 300" className="w-full h-full">
                      <path
                        d="M120,50 C160,50 180,70 190,100 C200,130 200,200 200,250 L160,250 L160,150 L80,150 L80,250 L40,250 C40,200 40,130 50,100 C60,70 80,50 120,50 Z"
                        fill="none"
                        stroke="#A3A284"
                        strokeWidth="2"
                      />
                      <circle cx="120" cy="30" r="20" fill="none" stroke="#A3A284" strokeWidth="2" />

                      {/* Measurement lines */}
                      <line x1="40" y1="100" x2="200" y2="100" stroke="#A3A284" strokeWidth="1" strokeDasharray="4" />
                      <text x="210" y="105" fill="#A3A284" fontSize="12">
                        Груди
                      </text>

                      <line x1="40" y1="130" x2="200" y2="130" stroke="#A3A284" strokeWidth="1" strokeDasharray="4" />
                      <text x="210" y="135" fill="#A3A284" fontSize="12">
                        Талія
                      </text>

                      <path
                        d="M190,100 C195,90 200,80 205,70 L215,75"
                        stroke="#A3A284"
                        strokeWidth="1"
                        strokeDasharray="4"
                      />
                      <text x="215" y="75" fill="#A3A284" fontSize="12">
                        Рукав
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="relative p-6 bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 border border-olive-500/30 group hover:border-olive-500/50 transition-colors duration-300">
                {/* Enhanced tactical corners */}
                <TacticalCorners size="md" opacity={50} />

                <h3 className="font-belleza text-xl text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-olive-500" />
                  ВИМІРЮВАННЯ НИЖНЬОЇ ЧАСТИНИ ТІЛА
                </h3>

                <div className="aspect-square bg-gradient-to-br from-stone-700/50 to-stone-800/50 flex items-center justify-center p-4 border border-olive-500/20 group-hover:border-olive-500/40 transition-colors duration-300">
                  <div className="relative w-[200px] h-[300px]">
                    {/* Simple human legs outline */}
                    <svg viewBox="0 0 200 300" className="w-full h-full">
                      <path
                        d="M60,50 L140,50 L130,100 L120,250 L100,250 L90,100 L60,50 Z"
                        fill="none"
                        stroke="#A3A284"
                        strokeWidth="2"
                      />

                      {/* Measurement lines */}
                      <line x1="40" y1="70" x2="160" y2="70" stroke="#A3A284" strokeWidth="1" strokeDasharray="4" />
                      <text x="165" y="75" fill="#A3A284" fontSize="12">
                        Талія
                      </text>

                      <line x1="30" y1="100" x2="170" y2="100" stroke="#A3A284" strokeWidth="1" strokeDasharray="4" />
                      <text x="175" y="105" fill="#A3A284" fontSize="12">
                        Стегна
                      </text>

                      <line x1="110" y1="100" x2="110" y2="250" stroke="#A3A284" strokeWidth="1" strokeDasharray="4" />
                      <text x="115" y="175" fill="#A3A284" fontSize="12">
                        Внутр. шов
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Military Quality Badges */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0.1} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 p-6 border border-olive-500/30 relative group hover:border-olive-500/50 transition-colors duration-300 text-center">
                <TacticalCorners size="sm" opacity={40} />
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-olive-500 mb-4">
                    <Shield className="h-12 w-12" />
                  </div>
                  <h3 className="font-belleza text-xl text-white mb-2">ВІЙСЬКОВА ЯКІСТЬ</h3>
                  <p className="text-stone-300 text-sm">
                    Наш одяг відповідає найвищим стандартам військової якості та довговічності.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 p-6 border border-olive-500/30 relative group hover:border-olive-500/50 transition-colors duration-300 text-center">
                <TacticalCorners size="sm" opacity={40} />
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-olive-500 mb-4">
                    <Target className="h-12 w-12" />
                  </div>
                  <h3 className="font-belleza text-xl text-white mb-2">ТОЧНА ПОСАДКА</h3>
                  <p className="text-stone-300 text-sm">
                    Наша система розмірів забезпечує ідеальну посадку для максимальної продуктивності.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-stone-800/70 via-stone-800/50 to-stone-800/70 p-6 border border-olive-500/30 relative group hover:border-olive-500/50 transition-colors duration-300 text-center">
                <TacticalCorners size="sm" opacity={40} />
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-olive-500 mb-4">
                    <Compass className="h-12 w-12" />
                  </div>
                  <h3 className="font-belleza text-xl text-white mb-2">ТАКТИЧНИЙ ДИЗАЙН</h3>
                  <p className="text-stone-300 text-sm">
                    Кожен елемент одягу розроблений з урахуванням тактичних потреб та функціональності.
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible delay={0.2} className="max-w-2xl mx-auto text-center">
            <div className="inline-block relative mb-4">
              <h2 className="font-belleza text-3xl text-white mb-2 relative z-10">ПОТРІБНА ДОПОМОГА?</h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/60 to-transparent origin-center"
              />
            </div>
            <p className="text-stone-300 mb-8">
              Наші тактичні спеціалісти готові допомогти з будь-якими питаннями щодо розмірів.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-olive-800 hover:bg-olive-700 text-white px-8 py-3 transition-colors duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">ЗВ'ЯЗАТИСЯ З КОМАНДОЮ ПІДТРИМКИ</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-olive-700 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  )
}

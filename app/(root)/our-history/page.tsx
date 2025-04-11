"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Map, Compass, FileText, ChevronRight, ArrowRight, Star, Award, Target } from "lucide-react"
import { Store } from "@/constants/store"

// Historical milestones data
const milestones = [
  {
    year: 2023,
    quarter: "Q1",
    title: "ЗАСНУВАННЯ БРЕНДУ",
    description:
      `Народження ${Store.name} як концепції, що поєднує військову естетику з міським стилем. Формування основної команди та розробка перших ескізів.`,
    image: "/placeholder.svg?height=600&width=800&text=Founding",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: false,
    tags: ["Заснування", "Концепція", "Дизайн"],
  },
  {
    year: 2023,
    quarter: "Q2",
    title: "ПЕРША КОЛЕКЦІЯ",
    description:
      "Розробка та запуск першої експериментальної колекції 'Тактичний Мінімалізм'. Тестування ринку та збір відгуків від перших клієнтів.",
    image: "/placeholder.svg?height=600&width=800&text=First+Collection",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: false,
    tags: ["Колекція", "Запуск", "Тестування"],
  },
  {
    year: 2023,
    quarter: "Q3",
    title: "ВІДКРИТТЯ ПЕРШОГО ШОУРУМУ",
    description:
      "Відкриття першого фізичного шоуруму в центрі Києва. Створення унікального простору, що відображає філософію бренду.",
    image: "/placeholder.svg?height=600&width=800&text=First+Showroom",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: false,
    tags: ["Шоурум", "Розширення", "Фізична присутність"],
  },
  {
    year: 2023,
    quarter: "Q4",
    title: "ЗАПУСК ОНЛАЙН-МАГАЗИНУ",
    description:
      "Розробка та запуск повноцінного онлайн-магазину з унікальним дизайном та функціоналом. Початок доставки по всій Україні.",
    image: "/placeholder.svg?height=600&width=800&text=Online+Store",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: false,
    tags: ["Онлайн", "Е-комерція", "Масштабування"],
  },
  {
    year: 2024,
    quarter: "Q1",
    title: "КОЛАБОРАЦІЯ З ВІЙСЬКОВИМИ ЕКСПЕРТАМИ",
    description:
      "Співпраця з військовими експертами для вдосконалення функціональності та автентичності виробів. Впровадження професійних тактичних елементів у повсякденний одяг.",
    image: "/placeholder.svg?height=600&width=800&text=Military+Collaboration",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: true,
    tags: ["Колаборація", "Експертиза", "Інновації"],
  },
  {
    year: 2024,
    quarter: "Q2",
    title: "РОЗШИРЕННЯ АСОРТИМЕНТУ",
    description:
      "Значне розширення асортименту продукції. Додавання нових категорій: взуття, аксесуари та спеціалізоване спорядження для міського використання.",
    image: "/placeholder.svg?height=600&width=800&text=Expansion",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: false,
    tags: ["Розширення", "Асортимент", "Зростання"],
  },
  {
    year: 2024,
    quarter: "Q3",
    title: "МІЖНАРОДНИЙ ДЕБЮТ",
    description:
      "Перший вихід на міжнародний ринок. Участь у міжнародних виставках моди та початок співпраці з дистриб'юторами в Європі.",
    image: "/placeholder.svg?height=600&width=800&text=International+Debut",
    location: "Берлін, Німеччина",
    coordinates: "N 52°31'12\" E 13°24'18\"",
    classified: false,
    tags: ["Міжнародний", "Експансія", "Виставки"],
  },
  {
    year: 2024,
    quarter: "Q4",
    title: "ЗАПУСК ЛІМІТОВАНОЇ КОЛЕКЦІЇ 'ТАКТИЧНА ЕЛЕГАНТНІСТЬ'",
    description:
      "Створення ексклюзивної лімітованої колекції, що поєднує елементи високої моди з тактичною функціональністю. Колекція отримала визнання критиків моди.",
    image: "/placeholder.svg?height=600&width=800&text=Limited+Collection",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: false,
    tags: ["Лімітована колекція", "Ексклюзив", "Визнання"],
  },
  {
    year: 2025,
    quarter: "Q1",
    title: "ВІДКРИТТЯ ВИРОБНИЧОГО ЦЕНТРУ",
    description:
      "Інвестиції у власне виробництво. Відкриття сучасного виробничого центру з використанням інноваційних технологій та екологічно чистих процесів.",
    image: "/placeholder.svg?height=600&width=800&text=Production+Center",
    location: "Львів, Україна",
    coordinates: "N 49°50'24\" E 24°01'30\"",
    classified: false,
    tags: ["Виробництво", "Інвестиції", "Технології"],
  },
  {
    year: 2025,
    quarter: "Q2",
    title: "ЗАПУСК ПРОГРАМИ СТАЛОГО РОЗВИТКУ",
    description:
      "Впровадження комплексної програми сталого розвитку. Перехід на екологічно чисті матеріали та відповідальні виробничі практики.",
    image: "/placeholder.svg?height=600&width=800&text=Sustainability",
    location: "Київ, Україна",
    coordinates: "N 50°27'12\" E 30°31'24\"",
    classified: false,
    tags: ["Сталий розвиток", "Екологія", "Відповідальність"],
  },
  {
    year: 2025,
    quarter: "Q3",
    title: "РОЗРОБКА ІННОВАЦІЙНИХ МАТЕРІАЛІВ",
    description:
      "Початок власних досліджень та розробок у сфері інноваційних тканин. Створення унікальних матеріалів, що поєднують військову міцність з комфортом повсякденного носіння.",
    image: "/placeholder.svg?height=600&width=800&text=Innovative+Materials",
    location: "Харків, Україна",
    coordinates: "N 49°59'24\" E 36°13'48\"",
    classified: true,
    tags: ["Інновації", "Дослідження", "Матеріали"],
  },
  {
    year: 2025,
    quarter: "Q4",
    title: "ГЛОБАЛЬНА ЕКСПАНСІЯ",
    description:
      "Відкриття представництв у ключових містах світу. Запуск глобальної маркетингової кампанії та значне розширення міжнародної присутності.",
    image: "/placeholder.svg?height=600&width=800&text=Global+Expansion",
    location: "Нью-Йорк, США",
    coordinates: "N 40°42'36\" W 74°00'00\"",
    classified: false,
    tags: ["Глобалізація", "Експансія", "Зростання"],
  },
]

// Key figures in the company's history
const keyFigures = [
  {
    name: "Олександр Ковальчук",
    role: "Засновник і Головний дизайнер",
    bio: `Колишній військовий дизайнер з 15-річним досвідом у створенні функціонального одягу. Заснував ${Store.name} з метою принести військову функціональність у повсякденне життя.`,
    image: "/placeholder.svg?height=400&width=400&text=Founder",
  },
  {
    name: "Марія Петренко",
    role: "Креативна директорка",
    bio: "Досвідчена дизайнерка з бекграундом у високій моді. Відповідає за поєднання військової естетики з сучасними трендами та елегантністю.",
    image: "/placeholder.svg?height=400&width=400&text=Creative+Director",
  },
  {
    name: "Віктор Лисенко",
    role: "Технічний директор",
    bio: "Експерт з інноваційних матеріалів та виробничих процесів. Забезпечує технічну досконалість та функціональність кожного виробу.",
    image: "/placeholder.svg?height=400&width=400&text=Technical+Director",
  },
]

export default function OurHistoryPage() {
  // State for interactive elements
  const [activeYear, setActiveYear] = useState<number>(2023)
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)
  const [showClassified, setShowClassified] = useState<boolean>(false)
  const [viewMode, setViewMode] = useState<"timeline" | "map" | "dossier">("timeline")

  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9])

  // Smooth scroll progress for timeline
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Filter milestones by active year
  const filteredMilestones = milestones.filter(
    (milestone) => milestone.year === activeYear && (showClassified || !milestone.classified),
  )

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setActiveYear(year)
    setSelectedMilestone(null)
  }

  // Handle milestone selection
  const handleMilestoneSelect = (index: number) => {
    setSelectedMilestone(selectedMilestone === index ? null : index)
  }

  // Toggle classified information
  const toggleClassified = () => {
    setShowClassified(!showClassified)
  }

  // Get unique years from milestones
  const years = [...new Set(milestones.map((milestone) => milestone.year))].sort()

  return (
    <main className="bg-stone-950 min-h-screen overflow-hidden" ref={containerRef}>
      {/* Enhanced Hero Section with Parallax and Tactical Elements */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background image with enhanced parallax effect */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: backgroundY, opacity }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <Image
            src="/assets/banner-history.jpg"
            alt={`Історія ${Store.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90"></div>

          {/* Enhanced tactical overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

          {/* Animated scan line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-olive-500/60 to-transparent"
            animate={{ y: [0, 700, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Tactical coordinates and markings */}
          <div className="absolute top-6 right-6 text-white/30 text-xs font-mono">N 50°27&apos;12&qout; E 30°31&apos;24&qout;</div>
          <div className="absolute bottom-6 left-6 text-white/30 text-xs font-mono">GRID 38TUL8891307610</div>

          {/* Animated tactical elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-olive-500/20 opacity-30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full border border-olive-500/10 opacity-20"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </motion.div>

        {/* Enhanced military-inspired decorative elements */}
        <div className="absolute top-8 left-8 w-32 h-32 border-t border-l border-white/20"></div>
        <div className="absolute top-8 right-8 w-32 h-32 border-t border-r border-white/20"></div>
        <div className="absolute bottom-8 left-8 w-32 h-32 border-b border-l border-white/20"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 border-b border-r border-white/20"></div>

        {/* Content with enhanced animations */}
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center items-center pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="h-px w-12 bg-olive-400/70"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.div>
              <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">Секретні архіви</span>
              <motion.div
                className="h-px w-12 bg-olive-400/70"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.div>
            </div>

            <h1 className="font-belleza text-4xl sm:text-5xl md:text-7xl text-white mb-8 tracking-wide relative">
              <span className="relative inline-block">
                ІСТОРІЯ {Store.name}
                <motion.span
                  className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-500/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-white/80 max-w-xl mx-auto mb-10 font-light"
            >
              Відкрийте для себе історію бренду, що змінив уявлення про військову естетику в повсякденному одязі. Від
              заснування до глобального визнання — кожен крок нашої місії.
            </motion.p>

            <div className="flex items-center justify-center text-white/80 text-sm max-sm:-mt-8">
              <Link href="/" className="hover:text-white transition-colors">
                Головна
              </Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-white">Наша історія</span>
            </div>
          </motion.div>
        </div>

        {/* View mode selector */}
        <div className="absolute bottom-1 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
          <div className="flex flex-wrap justify-center bg-stone-900/80 backdrop-blur-sm border border-stone-700/50 p-1 rounded-sm">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 text-sm font-belleza ${viewMode === "timeline" ? "bg-olive-700 text-white" : "text-stone-300 hover:text-white"} transition-colors`}
            >
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> ХРОНОЛОГІЯ
              </span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 text-sm font-belleza ${viewMode === "map" ? "bg-olive-700 text-white" : "text-stone-300 hover:text-white"} transition-colors`}
            >
              <span className="flex items-center gap-2">
                <Map className="h-4 w-4" /> КАРТА
              </span>
            </button>
            <button
              onClick={() => setViewMode("dossier")}
              className={`px-4 py-2 text-sm font-belleza ${viewMode === "dossier" ? "bg-olive-700 text-white" : "text-stone-300 hover:text-white"} transition-colors`}
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> ДОСЬЄ
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <section className="py-20 relative" ref={timelineRef}>
          {/* Enhanced background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 to-stone-900 -z-10"></div>

          {/* Tactical grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30 -z-10"></div>

          {/* Animated scan line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/40 to-transparent -z-10"
            animate={{ y: [0, 2000, 0] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <div className="container mx-auto px-3 sm:px-4 relative z-10">
            {/* Year selector */}
            <div className="flex justify-center mb-16 overflow-x-auto pb-2">
              <div className="flex flex-nowrap bg-stone-900/80 backdrop-blur-sm border border-stone-700/50 p-2 relative">
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-700/40"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-700/40"></div>

                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`px-6 py-3 font-belleza text-lg relative ${
                      activeYear === year ? "text-white" : "text-stone-400 hover:text-white"
                    } transition-colors`}
                  >
                    {year}
                    {activeYear === year && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-olive-500"
                        layoutId="activeYearIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Classified toggle */}
            <div className="flex justify-center mb-12">
              <button
                onClick={toggleClassified}
                className={`flex items-center gap-2 px-4 py-2 border ${
                  showClassified
                    ? "border-olive-500 text-olive-400"
                    : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-300"
                } transition-all duration-300 group relative`}
              >
                <div className={`w-3 h-3 rounded-full ${showClassified ? "bg-olive-500" : "bg-stone-700"}`}></div>
                <span className="text-sm tracking-wider">
                  {showClassified ? "СЕКРЕТНІ МАТЕРІАЛИ АКТИВОВАНО" : "СЕКРЕТНІ МАТЕРІАЛИ ЗАБЛОКОВАНО"}
                </span>
                {showClassified && (
                  <motion.div
                    className="absolute inset-0 border border-olive-500/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </button>
            </div>

            {/* Timeline visualization */}
            <div className="relative max-w-6xl mx-auto">
              {/* Central timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-stone-700 hidden md:block"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-stone-700 md:hidden"></div>

              {/* Timeline nodes */}
              {filteredMilestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.quarter}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center mb-16 md:mb-32 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline node */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div
                      className={`relative p-4 sm:p-6 border ${
                        milestone.classified
                          ? "border-amber-700/50 bg-stone-900/80"
                          : "border-stone-700/50 bg-stone-900/50"
                      } backdrop-blur-sm max-w-lg w-full`}
                    >
                      {/* Corner accents */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-olive-700/40"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-olive-700/40"></div>

                      {/* Classified marker */}
                      {milestone.classified && (
                        <div className="absolute -top-3 -right-3 transform rotate-12">
                          <div className="bg-amber-700/80 text-white px-3 py-1 text-xs tracking-wider font-medium">
                            СЕКРЕТНО
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-olive-400 text-xs tracking-wider">{milestone.quarter}</div>
                        <div className="h-px flex-grow bg-stone-700"></div>
                        <div className="text-stone-400 text-xs font-mono">{milestone.coordinates}</div>
                      </div>

                      <h3 className="font-belleza text-2xl text-white mb-4">{milestone.title}</h3>

                      <p className="text-stone-300 mb-6">{milestone.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {milestone.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-stone-800 text-stone-300 text-xs px-3 py-1 border-l border-olive-500/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-stone-400 text-sm flex items-center gap-2">
                          <Map className="h-4 w-4 text-olive-500" />
                          {milestone.location}
                        </div>

                        <button
                          onClick={() => handleMilestoneSelect(index)}
                          className="text-olive-400 hover:text-olive-300 text-sm flex items-center gap-1 group"
                        >
                          ДЕТАЛІ
                          <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {selectedMilestone === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 mt-6 border-t border-stone-700">
                              <div className="aspect-video relative overflow-hidden mb-6">
                                <Image
                                  src={milestone.image || "/placeholder.svg"}
                                  alt={milestone.title}
                                  fill
                                  className="object-cover"
                                />

                                {/* Image overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent"></div>

                                {/* Tactical overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <Clock className="h-5 w-5 text-olive-500 flex-shrink-0 mt-1" />
                                  <div>
                                    <h4 className="text-white font-medium mb-1">Хронологія події</h4>
                                    <p className="text-stone-400 text-sm">
                                      Подія відбулась у {milestone.quarter} {milestone.year} року та стала важливим
                                      кроком у розвитку бренду {Store.name}.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-3">
                                  <Target className="h-5 w-5 text-olive-500 flex-shrink-0 mt-1" />
                                  <div>
                                    <h4 className="text-white font-medium mb-1">Стратегічне значення</h4>
                                    <p className="text-stone-400 text-sm">
                                      Ця подія мала ключове значення для позиціонування бренду на ринку та формування
                                      його унікальної ідентичності.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-3">
                                  <Compass className="h-5 w-5 text-olive-500 flex-shrink-0 mt-1" />
                                  <div>
                                    <h4 className="text-white font-medium mb-1">Напрямок розвитку</h4>
                                    <p className="text-stone-400 text-sm">
                                      Після цієї події бренд зосередився на розширенні асортименту та вдосконаленні
                                      технологій виробництва.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Timeline connector */}
                  <div className="w-0 relative my-4 md:my-0">
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-olive-700 border-2 border-stone-900 z-10"></div>
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
                        index % 2 === 0 ? "left-0" : "right-0"
                      } w-10 h-[1px] bg-olive-500`}
                    ></div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map View */}
      {viewMode === "map" && (
        <section className="py-20 relative">
          {/* Enhanced background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 to-stone-900 -z-10"></div>

          {/* Map background */}
          <div className="absolute inset-0 opacity-20 -z-10">
            <Image
              src="/placeholder.svg?height=1080&width=1920&text=World+Map"
              alt="World Map"
              fill
              className="object-cover"
            />
          </div>

          {/* Tactical grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30 -z-10"></div>

          <div className="container mx-auto px-3 sm:px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="font-belleza text-4xl text-white mb-6">ГЕОГРАФІЯ РОЗВИТКУ</h2>
                <p className="text-stone-300 max-w-2xl mx-auto">
                  Інтерактивна карта ключових локацій, що відіграли важливу роль у становленні та розвитку бренду {Store.name}.
                </p>
              </div>

              <div className="aspect-[16/9] bg-stone-900/70 backdrop-blur-sm border border-stone-700/50 relative">
                {/* Map placeholder - in a real implementation, this would be an interactive map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-stone-400 text-center">
                    Інтерактивна карта історії {Store.name}
                    <br />
                    <span className="text-sm">(Тут буде розміщена інтерактивна карта з ключовими локаціями)</span>
                  </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-olive-700/40"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-olive-700/40"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-olive-700/40"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-olive-700/40"></div>

                {/* Map markers */}
                {[
                  { top: "30%", left: "48%", label: "Київ", size: "lg" },
                  { top: "28%", left: "52%", label: "Харків", size: "md" },
                  { top: "32%", left: "45%", label: "Львів", size: "md" },
                  { top: "25%", left: "30%", label: "Берлін", size: "sm" },
                  { top: "35%", left: "15%", label: "Нью-Йорк", size: "sm" },
                ].map((marker, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{ top: marker.top, left: marker.left }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                  >
                    <div className="relative">
                      <motion.div
                        className={`w-${marker.size === "lg" ? 4 : marker.size === "md" ? 3 : 2} h-${marker.size === "lg" ? 4 : marker.size === "md" ? 3 : 2} rounded-full bg-olive-500`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <motion.div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-${marker.size === "lg" ? 8 : marker.size === "md" ? 6 : 4} h-${marker.size === "lg" ? 8 : marker.size === "md" ? 6 : 4} rounded-full border border-olive-500/50`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                        <span className="text-olive-400 text-xs">{marker.label}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Compass rose */}
                <div className="absolute bottom-8 right-8 w-24 h-24 opacity-70">
                  <div className="absolute inset-0 border border-olive-500/30 rounded-full"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/50"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[10px] bg-olive-500/50"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/50"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-olive-500/50"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-olive-500/50 text-xs">
                    N
                  </div>
                </div>

                {/* Map coordinates */}
                <div className="absolute bottom-4 left-4 text-stone-500 text-xs font-mono">SCALE 1:20,000,000</div>
              </div>

              {/* Location list */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  { name: "Київ, Україна", desc: "Місце заснування бренду та головний офіс", events: 6 },
                  { name: "Львів, Україна", desc: "Виробничий центр та дослідницька база", events: 2 },
                  { name: "Харків, Україна", desc: "Центр розробки інноваційних матеріалів", events: 1 },
                  { name: "Берлін, Німеччина", desc: "Перший міжнародний шоурум", events: 1 },
                  { name: "Нью-Йорк, США", desc: "Центр глобальної експансії", events: 1 },
                ].map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-stone-900/50 border border-stone-700/50 p-6 relative group"
                  >
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-olive-700/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-olive-700/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <h3 className="font-belleza text-xl text-white mb-3">{location.name}</h3>
                    <p className="text-stone-400 mb-4">{location.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-olive-400 text-sm">{location.events} подій</span>
                      <button className="text-stone-300 hover:text-white text-sm flex items-center gap-1 group/btn">
                        ДЕТАЛІ
                        <ChevronRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dossier View */}
      {viewMode === "dossier" && (
        <section className="py-20 relative">
          {/* Enhanced background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 to-stone-900 -z-10"></div>

          {/* Paper texture */}
          <div
            className="absolute inset-0 opacity-10 -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px",
            }}
          ></div>

          <div className="container mx-auto px-3 sm:px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16 text-center">
                <div className="inline-block mb-6 relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-700/40"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-700/40"></div>
                  <div className="px-8 py-2">
                    <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">
                      Секретні матеріали
                    </span>
                  </div>
                </div>

                <h2 className="font-belleza text-4xl text-white mb-6">ДОСЬЄ КЛЮЧОВИХ ОСІБ</h2>
                <p className="text-stone-300 max-w-2xl mx-auto">
                  Інформація про ключових осіб, які стояли біля витоків бренду {Store.name} та сформували його унікальну
                  філософію.
                </p>
              </div>

              {/* Key figures */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {keyFigures.map((figure, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className="relative group"
                  >
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-700/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-700/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="bg-stone-900/70 border border-stone-700/50 overflow-hidden">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={figure.image || "/placeholder.svg"}
                          alt={figure.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent"></div>

                        {/* Tactical overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

                        {/* Stamp effect */}
                        <motion.div
                          className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-olive-500/30 flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <div className="text-olive-500/50 text-xs text-center font-belleza">
                            <div>{Store.name}</div>
                            <div>PERSONNEL</div>
                          </div>
                        </motion.div>

                        {/* Name and role */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="font-belleza text-2xl text-white mb-2">{figure.name}</h3>
                          <p className="text-olive-400 text-sm">{figure.role}</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="p-6 border-t border-stone-700/50">
                        <p className="text-stone-300 font-light">{figure.bio}</p>

                        {/* Achievements */}
                        <div className="mt-6 pt-6 border-t border-stone-800">
                          <h4 className="text-white font-belleza mb-4 flex items-center gap-2">
                            <Award className="h-4 w-4 text-olive-500" /> ДОСЯГНЕННЯ
                          </h4>
                          <ul className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                                <Star className="h-4 w-4 text-olive-500/70 flex-shrink-0 mt-1" />
                                <span>
                                  {i === 0
                                    ? "Розробка унікальної концепції бренду, що поєднує військову естетику з міською елегантністю."
                                    : i === 1
                                      ? "Впровадження інноваційних технологій у виробництво повсякденного одягу."
                                      : "Створення впізнаваного стилю, що став візитною карткою бренду {Store.name}."}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Company values */}
              <div className="mt-32">
                <div className="text-center mb-16">
                  <h2 className="font-belleza text-4xl text-white mb-6">ЦІННОСТІ КОМПАНІЇ</h2>
                  <p className="text-stone-300 max-w-2xl mx-auto">
                    Фундаментальні принципи, на яких побудовано бренд {Store.name} та які визначають кожне наше рішення.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Shield,
                      title: "ЯКІСТЬ",
                      desc: "Безкомпромісна якість у кожній деталі. Ми використовуємо лише найкращі матеріали та технології виробництва.",
                    },
                    {
                      icon: Target,
                      title: "ФУНКЦІОНАЛЬНІСТЬ",
                      desc: "Кожен елемент має своє призначення. Ми створюємо одяг, який не лише виглядає стильно, але й є практичним.",
                    },
                    {
                      icon: Compass,
                      title: "ІННОВАЦІЇ",
                      desc: "Постійний пошук нових рішень та технологій. Ми не боїмося експериментувати та впроваджувати сміливі ідеї.",
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-stone-900/50 border border-stone-700/50 p-8 relative"
                    >
                      <div className="absolute top-0 left-0 w-12 h-[2px] bg-olive-700"></div>

                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-full bg-olive-900/30 flex items-center justify-center">
                          <value.icon className="h-8 w-8 text-olive-400" />
                        </div>
                      </div>

                      <h3 className="font-belleza text-2xl text-white mb-4">{value.title}</h3>
                      <p className="text-stone-300 font-light">{value.desc}</p>

                      <div className="absolute bottom-4 right-4 text-4xl font-belleza text-olive-700/10">
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-stone-950 -z-10"></div>

        {/* Tactical grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30 -z-10"></div>

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light border-b border-olive-400/20 pb-2">
                  Станьте частиною історії
                </span>
              </div>

              <h2 className="font-belleza text-4xl md:text-5xl text-white mb-8">ПРИЄДНУЙТЕСЬ ДО {Store.name}</h2>

              <p className="text-stone-300 mb-12 max-w-2xl mx-auto">
                Наша історія продовжує писатися кожного дня. Станьте частиною бренду, що змінює уявлення про військову
                естетику в повсякденному одязі.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Link href="/catalog">
                  <Button className="bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider group overflow-hidden relative min-w-[200px]">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      КАТАЛОГ ПРОДУКЦІЇ
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                  </Button>
                </Link>

                <Link href="/contact-us">
                  <Button className="bg-transparent hover:bg-stone-800 text-white border border-stone-700 hover:border-white rounded-none py-5 px-10 font-belleza tracking-wider transition-all duration-300 min-w-[200px]">
                    ЗВ&apos;ЯЗАТИСЯ З НАМИ
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Military-inspired decorative element */}
      <div className="py-8 text-center bg-stone-950">
        <div className="inline-block relative">
          <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
          <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
          <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} HERITAGE EST. 2023</span>
        </div>
      </div>
    </main>
  )
}

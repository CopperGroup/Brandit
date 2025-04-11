"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Truck,
  Clock,
  MapPin,
  Globe,
  Shield,
  Package,
  AlertCircle,
  ChevronRight,
  Compass,
  Target,
  CheckCircle2,
  Locate,
  ArrowRight,
  Crosshair,
  Radar,
  Loader2,
  Hexagon,
  Clipboard,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Delivery options data
const deliveryOptions = [
  {
    id: "standard",
    name: "СТАНДАРТНА ДОСТАВКА",
    icon: Truck,
    time: "3-5 робочих днів",
    price: "₴100",
    description: "Стандартна доставка по всій території України через Нову Пошту або Укрпошту.",
    features: ["Відстеження замовлення", "SMS-сповіщення", "Доставка до відділення"],
    codeName: "ALPHA",
  },
  {
    id: "express",
    name: "ЕКСПРЕС ДОСТАВКА",
    icon: Clock,
    time: "1-2 робочих дні",
    price: "₴200",
    description: "Пришвидшена доставка для термінових замовлень з пріоритетною обробкою.",
    features: ["Пріоритетна обробка", "Відстеження в реальному часі", "SMS-сповіщення"],
    codeName: "BRAVO",
  },
  {
    id: "international",
    name: "МІЖНАРОДНА ДОСТАВКА",
    icon: Globe,
    time: "7-14 робочих днів",
    price: "₴500+",
    description: "Доставка замовлень за межі України через міжнародні служби доставки.",
    features: ["Міжнародне відстеження", "Митне оформлення", "Страхування вантажу"],
    codeName: "CHARLIE",
  },
  {
    id: "pickup",
    name: "САМОВИВІЗ",
    icon: MapPin,
    time: "Наступний день",
    price: "Безкоштовно",
    description: "Самовивіз із нашого фірмового магазину в центрі Києва.",
    features: ["Без додаткових витрат", "Примірка перед отриманням", "Консультація спеціаліста"],
    codeName: "DELTA",
  },
]

// Delivery FAQ data
const deliveryFAQ = [
  {
    question: "Як відстежити моє замовлення?",
    answer:
      "Після відправлення замовлення ви отримаєте електронний лист та SMS з номером для відстеження. Ви можете використовувати цей номер на сайті відповідної служби доставки або в розділі 'Відстеження замовлення' на нашому сайті.",
  },
  {
    question: "Чи можлива доставка в зону бойових дій?",
    answer:
      "На жаль, доставка в зони активних бойових дій тимчасово неможлива через безпекові причини. Ми постійно моніторимо ситуацію та відновлюємо доставку, як тільки це стає безпечним. Будь ласка, зв'яжіться з нашою службою підтримки для отримання актуальної інформації щодо вашого регіону.",
  },
  {
    question: "Що робити, якщо моє замовлення пошкоджене?",
    answer:
      "Якщо ви отримали пошкоджене замовлення, будь ласка, зробіть фотографії пошкоджень та зв'яжіться з нашою службою підтримки протягом 24 годин після отримання. Ми організуємо заміну або повернення коштів у найкоротші терміни.",
  },
  {
    question: "Чи можна змінити адресу доставки після оформлення замовлення?",
    answer:
      "Так, ви можете змінити адресу доставки, якщо замовлення ще не було відправлено. Для цього зв'яжіться з нашою службою підтримки якомога швидше. Якщо замовлення вже відправлено, зміна адреси може бути неможливою або потребувати додаткової оплати.",
  },
  {
    question: "Як розраховується вартість міжнародної доставки?",
    answer:
      "Вартість міжнародної доставки розраховується на основі ваги замовлення, країни призначення та обраного способу доставки. Точну вартість ви побачите на сторінці оформлення замовлення після введення адреси доставки.",
  },
  {
    question: "Чи є обмеження щодо розміру або ваги замовлення?",
    answer:
      "Для стандартної та експрес доставки максимальна вага одного пакунка становить 30 кг. Для великогабаритних замовлень може знадобитися спеціальна доставка, про що ми повідомимо вас додатково.",
  },
]

// Delivery status steps
const deliverySteps = [
  {
    id: 1,
    name: "ЗАМОВЛЕННЯ ПРИЙНЯТО",
    description: "Ваше замовлення успішно оформлено та передано в обробку.",
    icon: CheckCircle2,
    codeName: "SIERRA-1",
  },
  {
    id: 2,
    name: "ПІДГОТОВКА ДО ВІДПРАВЛЕННЯ",
    description: "Ми комплектуємо ваше замовлення та готуємо його до відправлення.",
    icon: Package,
    codeName: "TANGO-2",
  },
  {
    id: 3,
    name: "ПЕРЕДАНО В ДОСТАВКУ",
    description: "Ваше замовлення передано службі доставки та вирушило до вас.",
    icon: Truck,
    codeName: "UNIFORM-3",
  },
  {
    id: 4,
    name: "В ДОРОЗІ",
    description: "Замовлення в дорозі. Ви можете відстежувати його місцезнаходження.",
    icon: Compass,
    codeName: "VICTOR-4",
  },
  {
    id: 5,
    name: "ПРИБУЛО ДО ПУНКТУ ВИДАЧІ",
    description: "Замовлення прибуло до пункту видачі та готове до отримання.",
    icon: MapPin,
    codeName: "WHISKEY-5",
  },
  {
    id: 6,
    name: "ДОСТАВЛЕНО",
    description: "Замовлення успішно доставлено. Дякуємо за покупку!",
    icon: Target,
    codeName: "X-RAY-6",
  },
]

// Delivery partners
const deliveryPartners = [
  {
    id: "nova-poshta",
    name: "Нова Пошта",
    icon: Truck,
    description: "Доставка у відділення або поштомати Нової Пошти по всій Україні.",
    coverage: "Вся територія України",
    deliveryTime: "1-3 дні",
    trackingAvailable: true,
  },
  {
    id: "ukrposhta",
    name: "Укрпошта",
    icon: Package,
    description: "Доставка у відділення Укрпошти по всій території України.",
    coverage: "Вся територія України",
    deliveryTime: "3-5 днів",
    trackingAvailable: true,
  },
  {
    id: "store",
    name: "Фірмовий магазин",
    icon: MapPin,
    description: "Самовивіз із нашого фірмового магазину в центрі Києва.",
    coverage: "м. Київ",
    deliveryTime: "В день замовлення",
    trackingAvailable: false,
  },
]

// Delivery statistics
const deliveryStats = [
  {
    value: "98.7%",
    label: "Вчасних доставок",
    icon: Clock,
  },
  {
    value: "24/7",
    label: "Відстеження замовлень",
    icon: Radar,
  },
  {
    value: "100%",
    label: "Захист замовлень",
    icon: Shield,
  },
  {
    value: "1000+",
    label: "Пунктів видачі",
    icon: MapPin,
  },
]

// Tactical radar animation component
const TacticalRadar = () => {
  return (
    <div className="relative w-40 h-40 mx-auto">
      <div className="absolute inset-0 rounded-full border border-olive-500/30"></div>
      <div className="absolute inset-[10px] rounded-full border border-olive-500/20"></div>
      <div className="absolute inset-[20px] rounded-full border border-olive-500/10"></div>

      {/* Radar sweep */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1px] h-[50%] bg-olive-500/50 origin-bottom"
        style={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 bg-olive-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      {/* Blips */}
      <motion.div
        className="absolute top-[30%] left-[40%] w-2 h-2 bg-olive-500 rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />

      <motion.div
        className="absolute top-[60%] left-[70%] w-2 h-2 bg-olive-500 rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      />

      <motion.div
        className="absolute top-[20%] left-[60%] w-2 h-2 bg-olive-500 rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
      />
    </div>
  )
}

// Tactical loading animation component
const TacticalLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 mb-4">
        <motion.div
          className="absolute inset-0 border-2 border-olive-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-[4px] border-2 border-t-olive-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: -180 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Crosshair className="w-6 h-6 text-olive-500" />
        </div>
      </div>

      <div className="text-sm text-olive-500 font-mono">
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          ЗАВАНТАЖЕННЯ...
        </motion.span>
      </div>
    </div>
  )
}

// Tactical coordinates display component
const TacticalCoordinates = ({ lat = "50°27'12\"", long = "30°31'24\"" }) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toTimeString().split(" ")[0]
  }

  return (
    <div className="font-mono text-xs text-white/40 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-olive-500/50 rounded-full"></div>
        <span>
          LAT: {lat} | LONG: {long}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-olive-500/50 rounded-full"></div>
        <span>UTC: {formatTime(time)} | GRID: 38TUL8891307610</span>
      </div>
    </div>
  )
}

// Delivery calculator component
const DeliveryCalculator = () => {
  const [weight, setWeight] = useState(1)
  const [distance, setDistance] = useState(100)
  const [calculating, setCalculating] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const handleCalculate = () => {
    setCalculating(true)
    setResult(null)

    // Simulate calculation delay
    setTimeout(() => {
      // Simple formula: base price (50) + weight factor + distance factor
      const calculatedPrice = 50 + weight * 10 + distance * 0.2
      setResult(Math.round(calculatedPrice))
      setCalculating(false)
    }, 1500)
  }

  return (
    <div className="border border-stone-200 rounded-sm p-6 bg-white/50 backdrop-blur-sm">
      <h3 className="font-belleza text-xl mb-4">КАЛЬКУЛЯТОР ДОСТАВКИ</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-stone-600 mb-2">Вага посилки (кг)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0.1"
              max="30"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number.parseFloat(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 w-12 text-center font-mono">{weight}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-2">Відстань (км)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={distance}
              onChange={(e) => setDistance(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 w-16 text-center font-mono">{distance}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleCalculate}
        disabled={calculating}
        className="w-full bg-olive-800 hover:bg-olive-700 text-white rounded-sm"
      >
        {calculating ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            РОЗРАХУНОК...
          </span>
        ) : (
          <span>РОЗРАХУВАТИ ВАРТІСТЬ</span>
        )}
      </Button>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 border border-olive-200 bg-olive-50 rounded-sm"
        >
          <div className="text-center">
            <div className="text-sm text-stone-600 mb-1">Орієнтовна вартість доставки:</div>
            <div className="text-2xl font-belleza text-olive-800">₴{result}</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Tactical map marker component
const TacticalMapMarker = ({
  top,
  left,
  delay = 0,
  label,
}: { top: string; left: string; delay?: number; label?: string }) => {
  return (
    <motion.div
      className="absolute"
      style={{ top, left }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative">
        <div className="w-4 h-4 bg-olive-500 rounded-full relative">
          <div className="absolute inset-0 bg-olive-500 rounded-full animate-ping opacity-75"></div>
        </div>

        {label && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-stone-900/80 text-white text-xs py-1 px-2 rounded-sm font-mono">{label}</div>
          </div>
        )}

        {/* Tactical crosshair */}
        <div className="absolute -top-3 -left-3 w-10 h-10 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-olive-500/30"></div>
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-olive-500/30"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DeliveryPage() {
  const [selectedOption, setSelectedOption] = useState("standard")
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Tactical typing effect for section titles
  const TypedTitle = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 100)

      return () => clearInterval(interval)
    }, [text])

    return (
      <h2 className="font-belleza text-3xl mb-4 relative inline-block">
        {displayText}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: displayText.length < text.length ? Number.POSITIVE_INFINITY : 0 }}
          className="ml-1 inline-block w-2 h-6 bg-olive-500 align-middle"
        />
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute -bottom-2 left-0 h-[1px] bg-olive-500/30"
        />
      </h2>
    )
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-stone-900 flex flex-col items-center justify-center z-50">
        <TacticalLoading />

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{ duration: 2 }}
          className="w-64 h-1 bg-olive-500/30 mt-8 overflow-hidden"
        >
          <motion.div
            className="h-full bg-olive-500"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

        <div className="mt-4 text-white/50 font-mono text-xs">ЗАВАНТАЖЕННЯ ТАКТИЧНОЇ ІНФОРМАЦІЇ...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-100 overflow-hidden">
      {/* Hero Section */}
      <section ref={containerRef} className="relative h-[80vh] overflow-hidden">
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
          <img
            src="/assets/banner-dostavka.jpg"
            alt="Delivery hero"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Military-inspired decorative elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Tactical grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

          {/* Corner frame elements */}
          <div className="absolute top-8 left-8 w-32 h-32 border-t border-l border-white/20"></div>
          <div className="absolute top-8 right-8 w-32 h-32 border-t border-r border-white/20"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 border-b border-l border-white/20"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 border-b border-r border-white/20"></div>

          {/* Animated scan lines */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-olive-500/40 to-transparent"
            animate={{ y: [0, 1000, 0] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ y: [200, 1200, 200] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Tactical coordinates */}
          <div className="absolute top-6 right-6">
            <TacticalCoordinates />
          </div>

          {/* Tactical status indicators */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <span>СИСТЕМА ДОСТАВКИ: АКТИВНА</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
              <span>ВІДСТЕЖЕННЯ: ОНЛАЙН</span>
            </div>
          </div>

          {/* Tactical crosshair elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              className="relative w-40 h-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-olive-500/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          </div>
        </div>

        {/* Content with enhanced animations */}
        <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <div className="w-8 h-[1px] bg-white/30"></div>
              <p className="text-white/70 tracking-[0.3em] text-xs uppercase font-light">Брендіт</p>
              <div className="w-8 h-[1px] bg-white/30"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="font-belleza text-5xl md:text-7xl text-white mb-6 tracking-wide relative inline-block"
            >
              <span className="relative">
                ДОСТАВКА
                <motion.span
                  className="absolute -top-1 -right-1 w-2 h-2 bg-olive-500 rounded-full"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-30 h-[1px] bg-white/30 mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-white/80 mb-10 max-w-md mx-auto font-light"
            >
              <span className="relative">
                Тактична точність. Військова надійність. Безкомпромісна пунктуальність.
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </span>
            </motion.p>

            {/* Tactical radar animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mb-8"
            >
              <TacticalRadar />
            </motion.div>
          </motion.div>
        </div>

        {/* Tactical scan effect */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-olive-500/10 to-transparent"
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: [0, 0.2, 0], y: ["100%", "-100%", "-100%"] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 10 }}
        />
      </section>

      {/* div Content */}
      <section className="relative z-10 -mt-20 mb-20">
        <div className="container mx-auto px-4">
          {/* Delivery Options Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm shadow-lg overflow-hidden relative mb-20"
          >
            {/* Military-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-olive-500/20"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-olive-500/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-olive-500/20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-olive-500/20"></div>

            {/* Tactical grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none"></div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <TypedTitle text="ВАРІАНТИ ДОСТАВКИ" />
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Оберіть оптимальний варіант доставки, що відповідає вашим потребам. Ми гарантуємо безпечну та
                  своєчасну доставку вашого замовлення.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deliveryOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    onClick={() => setSelectedOption(option.id)}
                    className={cn(
                      "border p-6 rounded-sm cursor-pointer transition-all duration-300 relative overflow-hidden group",
                      selectedOption === option.id
                        ? "border-olive-500 bg-olive-50/50"
                        : "border-stone-200 hover:border-olive-300",
                    )}
                  >
                    {/* Selection indicator */}
                    {selectedOption === option.id && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-olive-500"></div>
                    )}

                    {/* Code name badge */}
                    <div className="absolute top-3 right-3">
                      <div
                        className={cn(
                          "text-xs font-mono py-1 px-2 rounded-sm",
                          selectedOption === option.id ? "bg-olive-500 text-white" : "bg-stone-100 text-stone-500",
                        )}
                      >
                        {option.codeName}
                      </div>
                    </div>

                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 relative",
                            selectedOption === option.id
                              ? "bg-olive-500 text-white"
                              : "bg-stone-100 text-stone-500 group-hover:bg-olive-100 group-hover:text-olive-600",
                          )}
                        >
                          <option.icon className="w-5 h-5" />

                          {/* Animated ring */}
                          {selectedOption === option.id && (
                            <motion.div
                              className="absolute inset-0 rounded-full border border-olive-500"
                              initial={{ scale: 1 }}
                              animate={{ scale: 1.2, opacity: [1, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            />
                          )}
                        </div>
                        <h3 className="font-belleza text-lg mb-1">{option.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-stone-400" />
                          <span className="text-sm text-stone-600">{option.time}</span>
                        </div>
                        <div className="text-lg font-medium mb-3">{option.price}</div>
                        <p className="text-sm text-stone-600 mb-4">{option.description}</p>
                      </div>

                      <div className="mt-auto">
                        <div className="border-t border-stone-100 pt-4 mt-2">
                          <p className="text-xs uppercase tracking-wider text-stone-400 mb-2">Включає:</p>
                          <ul className="space-y-2">
                            {option.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-olive-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-olive-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Delivery calculator */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-12 max-w-xl mx-auto"
              >
                <DeliveryCalculator />
              </motion.div>
            </div>
          </motion.div>

          {/* Delivery Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm shadow-lg overflow-hidden relative mb-20"
          >
            {/* Military-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-olive-500/20"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-olive-500/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-olive-500/20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-olive-500/20"></div>

            {/* Tactical grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none"></div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <TypedTitle text="ПОКАЗНИКИ ДОСТАВКИ" />
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Наші показники ефективності доставки, які підтверджують нашу надійність та професіоналізм.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {deliveryStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-stone-50 border border-stone-200 p-6 rounded-sm hover:border-olive-200 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-olive-50 flex items-center justify-center mb-3">
                        <stat.icon className="w-6 h-6 text-olive-600" />
                      </div>
                      <div className="text-2xl font-belleza text-stone-800 mb-1">{stat.value}</div>
                      <div className="text-sm text-stone-500 text-center">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Delivery Process Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm shadow-lg overflow-hidden relative mb-20"
          >
            {/* Military-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-olive-500/20"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-olive-500/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-olive-500/20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-olive-500/20"></div>

            {/* Tactical grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none"></div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <TypedTitle text="ПРОЦЕС ДОСТАВКИ" delay={0.2} />
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Відстежуйте шлях вашого замовлення від моменту оформлення до отримання. Кожен етап контролюється
                  нашими спеціалістами.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-stone-200 transform md:translate-x-[-0.5px]"></div>

                <div className="space-y-8 relative">
                  {deliverySteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setActiveStep(step.id)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={cn(
                        "relative flex flex-col md:flex-row gap-8",
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                      )}
                    >
                      {/* Timeline dot */}
                      <div
                        className={cn(
                          "absolute left-4 md:left-1/2 top-0 w-8 h-8 bg-white rounded-full border-2 transform translate-x-[-14px] md:translate-x-[-14px] flex items-center justify-center z-10 transition-all duration-300",
                          activeStep === step.id ? "border-olive-500 scale-125" : "border-stone-300",
                        )}
                      >
                        <step.icon
                          className={cn(
                            "w-4 h-4 transition-colors duration-300",
                            activeStep === step.id ? "text-olive-500" : "text-stone-400",
                          )}
                        />
                      </div>

                      {/* Content */}
                      <div
                        className={cn(
                          "md:w-1/2 pl-16 md:pl-0",
                          index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12",
                        )}
                      >
                        <div
                          className={cn(
                            "p-6 rounded-sm border transition-all duration-300 relative overflow-hidden",
                            activeStep === step.id
                              ? "bg-olive-50 border-olive-200 shadow-md"
                              : "bg-stone-50 border-stone-100 hover:border-olive-200",
                          )}
                        >
                          {/* Code name badge */}
                          <div className="absolute top-3 right-3">
                            <div
                              className={cn(
                                "text-xs font-mono py-1 px-2 rounded-sm",
                                activeStep === step.id ? "bg-olive-500 text-white" : "bg-stone-200 text-stone-500",
                              )}
                            >
                              {step.codeName}
                            </div>
                          </div>

                          <h3 className="font-belleza text-lg mb-2">{step.name}</h3>
                          <p className="text-stone-600 text-sm">{step.description}</p>

                          {/* Progress indicator */}
                          {activeStep === step.id && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1 }}
                              className="absolute bottom-0 left-0 h-[2px] bg-olive-500"
                            />
                          )}
                        </div>
                      </div>

                      {/* Empty space for the other side */}
                      <div className="md:w-1/2 hidden md:block"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Delivery Map */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm shadow-lg overflow-hidden relative mb-20"
          >
            {/* Military-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-olive-500/20"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-olive-500/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-olive-500/20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-olive-500/20"></div>

            {/* Tactical grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none"></div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <TypedTitle text="ЗОНА ПОКРИТТЯ" delay={0.4} />
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Ми здійснюємо доставку по всій території України та за її межі. Перегляньте карту покриття та оберіть
                  найзручніший пункт видачі.
                </p>
              </div>

              <div className="relative rounded-sm overflow-hidden border border-stone-200 h-[400px] mb-8">
                {/* Map placeholder - in a real implementation, this would be an actual map */}
                <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=400&width=800"
                    alt="Delivery map"
                    className="w-full h-full object-cover"
                  />

                  {/* Map overlay with tactical elements */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>

                  {/* Map markers */}
                  <TacticalMapMarker top="25%" left="33%" delay={0.5} label="Київ" />
                  <TacticalMapMarker top="50%" left="67%" delay={0.7} label="Харків" />
                  <TacticalMapMarker top="75%" left="25%" delay={0.9} label="Одеса" />
                  <TacticalMapMarker top="35%" left="75%" delay={1.1} label="Дніпро" />
                  <TacticalMapMarker top="65%" left="45%" delay={1.3} label="Львів" />

                  {/* Tactical grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="h-px bg-olive-500/10"></div>
                    <div className="h-px bg-olive-500/10"></div>
                    <div className="h-px bg-olive-500/10"></div>
                    <div className="h-px bg-olive-500/10"></div>
                  </div>

                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px bg-olive-500/10"></div>
                    <div className="w-px bg-olive-500/10"></div>
                    <div className="w-px bg-olive-500/10"></div>
                    <div className="w-px bg-olive-500/10"></div>
                  </div>

                  {/* Tactical coordinates */}
                  <div className="absolute top-2 left-2 text-xs font-mono text-stone-500">N 48°00&apos;00&quot; E 31°00&apos;00&quot;</div>

                  <div className="absolute bottom-2 right-2 text-xs font-mono text-stone-500">GRID: 36TUU00000000</div>

                  {/* Tactical scan effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-olive-500/5 to-transparent"
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: [0, 0.3, 0], y: ["0%", "100%", "100%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deliveryPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="border border-stone-200 p-6 rounded-sm hover:border-olive-200 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center">
                        <partner.icon className="w-5 h-5 text-olive-600" />
                      </div>
                      <h3 className="font-belleza text-lg">{partner.name}</h3>
                    </div>

                    <p className="text-stone-600 text-sm mb-4">{partner.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-stone-400" />
                        <span className="text-stone-600">Покриття: {partner.coverage}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-stone-400" />
                        <span className="text-stone-600">Час доставки: {partner.deliveryTime}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Locate className="w-4 h-4 text-stone-400" />
                        <span className="text-stone-600">
                          Відстеження: {partner.trackingAvailable ? "Доступно" : "Недоступно"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-olive-600 mt-auto">
                      <span>Знайти найближче відділення</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>

                    {/* Corner tactical element */}
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b border-r border-olive-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </div>

              {/* Interactive coverage selector */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-12 max-w-3xl mx-auto p-6 border border-stone-200 rounded-sm bg-stone-50"
              >
                <h3 className="font-belleza text-xl mb-4 text-center">ПЕРЕВІРИТИ ДОСТУПНІСТЬ ДОСТАВКИ</h3>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-stone-600 mb-2">Населений пункт</label>
                    <input
                      type="text"
                      placeholder="Введіть назву населеного пункту"
                      className="w-full border border-stone-200 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-olive-500"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm text-stone-600 mb-2">Поштовий індекс</label>
                    <input
                      type="text"
                      placeholder="Введіть поштовий індекс"
                      className="w-full border border-stone-200 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-olive-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button className="bg-olive-800 hover:bg-olive-700 text-white rounded-sm">ПЕРЕВІРИТИ</Button>
                  </div>
                </div>

                <div className="mt-4 text-center text-sm text-stone-500">
                  Введіть дані для перевірки доступності доставки у вашому регіоні
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Delivery FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm shadow-lg overflow-hidden relative mb-20"
          >
            {/* Military-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-olive-500/20"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-olive-500/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-olive-500/20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-olive-500/20"></div>

            {/* Tactical grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none"></div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <TypedTitle text="ЧАСТІ ЗАПИТАННЯ" delay={0.6} />
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Відповіді на найпоширеніші запитання щодо доставки замовлень.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {deliveryFAQ.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="border border-stone-200 rounded-sm overflow-hidden group"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline group-data-[state=open]:bg-olive-50 transition-colors duration-300">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-8 h-8 rounded-full bg-stone-100 group-data-[state=open]:bg-olive-100 flex items-center justify-center transition-colors duration-300">
                              <AlertCircle className="w-4 h-4 text-stone-500 group-data-[state=open]:text-olive-600 transition-colors duration-300" />
                            </div>
                            <span className="font-medium">{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 pt-0 text-stone-600">
                          <div className="pl-11 border-l-2 border-olive-100 py-2">{item.answer}</div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>

                {/* Additional support info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-8 p-6 border border-olive-200 bg-olive-50/50 rounded-sm"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-olive-100 flex items-center justify-center flex-shrink-0">
                      <Hexagon className="w-6 h-6 text-olive-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-belleza text-lg mb-1">Не знайшли відповідь на своє запитання?</h3>
                      <p className="text-stone-600 text-sm">
                        Зв&quot;яжіться з нашою службою підтримки, і ми з радістю допоможемо вам з будь-яким питанням щодо
                        доставки.
                      </p>
                    </div>

                    <Button className="bg-olive-800 hover:bg-olive-700 text-white rounded-sm whitespace-nowrap">
                      ЗВОРОТНІЙ ЗВ&quot;ЯЗОК
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Delivery Documents */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm shadow-lg overflow-hidden relative mb-20"
          >
            {/* Military-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-olive-500/20"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-olive-500/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-olive-500/20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-olive-500/20"></div>

            {/* Tactical grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none"></div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <TypedTitle text="ДОКУМЕНТИ ТА ПРАВИЛА" delay={0.8} />
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Ознайомтеся з правилами доставки та необхідними документами для отримання замовлення.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="border border-stone-200 p-6 rounded-sm hover:border-olive-200 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-olive-600" />
                    </div>
                    <h3 className="font-belleza text-lg">Правила доставки</h3>
                  </div>

                  <p className="text-stone-600 text-sm mb-4">
                    Детальна інформація про правила та умови доставки замовлень.
                  </p>

                  <div className="flex items-center gap-2 text-sm text-olive-600">
                    <span>Завантажити PDF</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="border border-stone-200 p-6 rounded-sm hover:border-olive-200 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center">
                      <Clipboard className="w-5 h-5 text-olive-600" />
                    </div>
                    <h3 className="font-belleza text-lg">Необхідні документи</h3>
                  </div>

                  <p className="text-stone-600 text-sm mb-4">
                    Перелік документів, необхідних для отримання замовлення.
                  </p>

                  <div className="flex items-center gap-2 text-sm text-olive-600">
                    <span>Переглянути інформацію</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="border border-stone-200 p-6 rounded-sm hover:border-olive-200 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-olive-600" />
                    </div>
                    <h3 className="font-belleza text-lg">Гарантії безпеки</h3>
                  </div>

                  <p className="text-stone-600 text-sm mb-4">
                    Інформація про гарантії безпеки та страхування доставки.
                  </p>

                  <div className="flex items-center gap-2 text-sm text-olive-600">
                    <span>Дізнатися більше</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-stone-900">
              <img
                src="/assets/catalog-dostavka.jpg"
                alt="CTA background"
                className="w-full h-full object-cover opacity-30"
              />
            </div>

            {/* Military-inspired decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Tactical grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>

              {/* Corner frame elements */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-white/20"></div>
              <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-white/20"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-white/20"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-white/20"></div>

              {/* Tactical scan effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-olive-500/10 to-transparent"
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: [0, 0.2, 0], y: ["0%", "100%", "100%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
              />
            </div>

            <div className="relative z-10 py-16 px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="font-belleza text-3xl md:text-4xl text-white mb-6"
              >
                ГОТОВІ ЗРОБИТИ ЗАМОВЛЕННЯ?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-white/80 max-w-2xl mx-auto mb-8"
              >
                Перейдіть до каталогу, оберіть товари та оформіть замовлення. Ми подбаємо про швидку та безпечну
                доставку.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative inline-block"
              >
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-500/40"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-500/40"></div>

                <Link href="/catalog?page=1&sort=default">
                    <Button className="shop-button group bg-transparent border border-white/40 text-white hover:border-white rounded-none px-10 py-5 font-belleza tracking-widest overflow-hidden relative">
                    <span className="relative z-10">ПЕРЕЙТИ ДО КАТАЛОГУ</span>
                    <motion.span
                        className="ml-3 relative z-10 inline-flex"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </motion.span>
                    <span className="absolute inset-0 bg-gradient-to-r from-olive-800/80 to-olive-700/80 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                    </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


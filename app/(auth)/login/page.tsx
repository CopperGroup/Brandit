"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, ArrowRight, Shield, ChevronRight, User } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import GoogleSignIn from "@/components/authButtons/GoogleSignIn"
import { fetchUserByEmail } from "@/lib/actions/user.actions"
import { Store } from "@/constants/store"
import Image from "next/image"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/")
    }
  }, [status, router])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [sessionId, setSessionId] = useState("LOADING")
  const [currentYear, setCurrentYear] = useState(2023)
  const [decorativeElements, setDecorativeElements] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: 10,
      x: 50,
      y: 50,
      delay: 0,
      duration: 15,
    })),
  )

  // Enable/disable login button based on form completion
  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [email, password])

  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(2, 10).toUpperCase())
  }, [])

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  useEffect(() => {
    setDecorativeElements(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 10 + 5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      })),
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setError("")

    try {
      // Check if user exists
      const result = await fetchUserByEmail({ email }, "json")
      const user = JSON.parse(result)

      if (user) {
        if (!user.selfCreated) {
          // Attempt to sign in with credentials
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          })

          if (res?.error) {
            setFormSubmitted(false)
            setError("Неправильний email або пароль")
            return
          }

          router.replace("/")
        } else {
          // User exists but was created with OAuth
          setFormSubmitted(false)
          setError("Цей email використовується для входу через Google")
        }
      } else {
        // User doesn't exist, redirect to signup
        setFormSubmitted(false)
        router.push("/signup")
      }
    } catch (error) {
      console.error(error)
      setFormSubmitted(false)
      setError("Помилка при вході. Спробуйте пізніше.")
    }
  }

  return (
    <main className="min-h-screen overflow-hidden relative bg-stone-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Military-inspired grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

        {/* Topographic map-like contours */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="100" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" fill="none" stroke="#96a477" strokeWidth="0.5" />
        </svg>

        {/* Animated decorative elements */}
        {decorativeElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full bg-olive-700/10"
            style={{
              width: `${el.size}px`,
              height: `${el.size}px`,
              left: `${el.x}%`,
              top: `${el.y}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: el.duration,
              delay: el.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-stone-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-olive-900/20 to-stone-950/80"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Tactical grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[size:100px_100px] opacity-20"></div>

          {/* Corner tactical elements */}
          <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-olive-600/30 opacity-70"></div>
          <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-olive-600/30 opacity-70"></div>

          {/* Tactical coordinates */}
          <div className="absolute top-4 left-4 text-olive-500/40 text-xs font-mono">LAT: 50°27'N</div>
          <div className="absolute top-4 right-4 text-olive-500/40 text-xs font-mono">LONG: 30°31'E</div>
          <div className="absolute bottom-4 left-4 text-olive-500/40 text-xs font-mono">SEC.LEVEL: ALPHA</div>
          <div className="absolute bottom-4 right-4 text-olive-500/40 text-xs font-mono">
            <motion.span
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              SYSTEM ACTIVE
            </motion.span>
          </div>
        </div>

        {/* Logo and navigation - repositioned to top center, above the card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center mb-12"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-olive-700/50 rotate-45"></div>
              <div className="absolute inset-0 border border-olive-700/30 rotate-45 scale-[0.8] group-hover:scale-[1.1] transition-transform duration-500"></div>
              <Shield className="h-6 w-6 text-olive-500" />
            </div>
            <span className="font-belleza text-3xl text-white tracking-wider">{Store.name}</span>
          </Link>
        </motion.div>

        {/* Main login container */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-lg overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.4)] border border-stone-800/50 relative">
          {/* Tactical overlay elements for the container */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Corner tactical elements */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-olive-600/40"></div>
              <div className="absolute top-0 left-0 h-full w-[2px] bg-olive-600/40"></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16">
              <div className="absolute top-0 right-0 w-full h-[2px] bg-olive-600/40"></div>
              <div className="absolute top-0 right-0 h-full w-[2px] bg-olive-600/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-olive-600/40"></div>
              <div className="absolute bottom-0 left-0 h-full w-[2px] bg-olive-600/40"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-olive-600/40"></div>
              <div className="absolute bottom-0 right-0 h-full w-[2px] bg-olive-600/40"></div>
            </div>

            {/* Status indicator */}
            <motion.div
              className="absolute top-3 right-3 w-2 h-2 rounded-full bg-olive-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Tactical ID */}
            <div className="absolute top-3 left-3 text-olive-500/60 text-[10px] font-mono tracking-wider">
              ID:VLX-AUTH-01
            </div>
          </div>

          {/* Left panel - Military imagery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative overflow-hidden hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/50 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/50 to-transparent z-10"></div>

            <Image
              src="/assets/banner-login.jpg"
              alt="Military aesthetic"
              fill
              className="w-full h-full object-cover"
            />

            {/* Overlay content */}
            <div className="absolute inset-0 z-30 flex flex-col justify-center p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="inline-block mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-olive-500/70"></div>
                    <motion.span
                      className="text-olive-400 text-xs tracking-[0.35em] uppercase font-light"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Est. 2023
                    </motion.span>
                  </div>
                </div>

                <h2 className="font-belleza text-4xl text-white mb-6 tracking-wide leading-tight">
                  ВІЙСЬКОВИЙ СТИЛЬ
                  <br />
                  ДЛЯ ПОВСЯКДЕННОГО
                  <br />
                  ЖИТТЯ
                </h2>

                <div className="w-16 h-[1px] bg-olive-700/50 mb-6"></div>

                <p className="text-stone-300 font-light mb-8 max-w-sm">
                  Приєднуйтесь до нашої спільноти та отримайте доступ до ексклюзивних пропозицій, ранніх колекцій та
                  персоналізованих рекомендацій.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  {["ЯКІСТЬ", "СТИЛЬ", "КОМФОРТ"].map((tag, i) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 + i * 0.2 }}
                      className="px-4 py-2 border border-olive-700/30 text-olive-400 text-xs tracking-widest relative group overflow-hidden"
                    >
                      <motion.div className="absolute inset-0 bg-olive-800/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10">{tag}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right panel - Login form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 bg-stone-900/80 backdrop-blur-sm p-8 md:p-12 relative"
          >
            {/* Tactical grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

            <div className="max-w-md mx-auto relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-8 bg-olive-500/70"></div>
                    <motion.span
                      className="text-olive-400 text-xs tracking-[0.35em] uppercase font-light"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Авторизація
                    </motion.span>
                  </div>
                  <h1 className="font-belleza text-4xl text-white mb-4 tracking-wide">ВХІД ДО СИСТЕМИ</h1>
                  <p className="text-stone-400 font-light">
                    Увійдіть до свого облікового запису, щоб отримати доступ до персоналізованих функцій.
                  </p>

                  {/* Tactical ID display */}
                  <div className="mt-4 flex items-center gap-2 text-olive-600/60 text-xs font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-olive-500/80"></div>
                    <span>SESSION: </span>
                    <span>{sessionId}</span>
                  </div>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* Email field */}
                  <div
                    className={`relative border-b ${
                      activeField === "email" ? "border-olive-500" : "border-stone-700"
                    } transition-colors duration-300 group`}
                  >
                    <div className="absolute left-0 top-0 pt-3 text-stone-500 group-hover:text-olive-400 transition-colors duration-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      className="w-full bg-transparent border-0 pl-8 pt-3 pb-3 text-white placeholder:text-stone-500 focus:ring-0 focus:outline-none"
                      required
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-olive-500 transition-all duration-300 ${
                        activeField === "email" ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>

                  {/* Password field */}
                  <div
                    className={`relative border-b ${
                      activeField === "password" ? "border-olive-500" : "border-stone-700"
                    } transition-colors duration-300 group`}
                  >
                    <div className="absolute left-0 top-0 pt-3 text-stone-500 group-hover:text-olive-400 transition-colors duration-300">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField(null)}
                      className="w-full bg-transparent border-0 pl-8 pt-3 pb-3 text-white placeholder:text-stone-500 focus:ring-0 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 pt-3 text-stone-500 hover:text-olive-400 transition-colors duration-300"
                    >
                      <span className="text-xs tracking-wider">{showPassword ? "ПРИХОВАТИ" : "ПОКАЗАТИ"}</span>
                    </button>
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-olive-500 transition-all duration-300 ${
                        activeField === "password" ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-900/30 border border-red-700/50 p-4 text-stone-300 text-sm flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">!</span>
                      </div>
                      <p>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 bg-transparent border border-stone-700 checked:bg-olive-700 checked:border-olive-700 focus:ring-0 focus:ring-offset-0 rounded-none"
                    />
                    <label htmlFor="remember" className="text-stone-400 text-sm">
                      Запам'ятати мене
                    </label>
                  </div>
                  <Link
                    href="/resetPass"
                    className="text-stone-400 hover:text-white text-sm transition-colors duration-300 relative group"
                  >
                    Забули пароль?
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={disabled || formSubmitted}
                    className={`relative w-full bg-olive-800 hover:bg-olive-700 text-white py-4 font-belleza tracking-wider overflow-hidden transition-all duration-300 group ${
                      disabled || formSubmitted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="absolute inset-0 w-full h-full">
                      <span className="absolute inset-0 bg-gradient-to-r from-olive-700 to-olive-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                    </span>

                    {/* Tactical corner elements */}
                    <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-olive-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-olive-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-olive-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-olive-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {formSubmitted ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>АВТОРИЗАЦІЯ...</span>
                        </div>
                      ) : (
                        <>
                          <span className="tracking-[0.15em]">УВІЙТИ</span>
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative flex items-center gap-3 py-2"
                >
                  <div className="flex-grow h-[1px] bg-stone-700"></div>
                  <span className="text-stone-500 text-xs tracking-wider">АБО</span>
                  <div className="flex-grow h-[1px] bg-stone-700"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <GoogleSignIn />

                  <button
                    type="button"
                    className="bg-stone-800 hover:bg-stone-700 text-white py-3 font-belleza tracking-wider relative overflow-hidden group flex items-center justify-center gap-2 border border-stone-700 hover:border-stone-600 transition-colors duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span>FACEBOOK</span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center pt-6"
                >
                  <p className="text-stone-400 text-sm">
                    Не маєте облікового запису?{" "}
                    <Link
                      href="/signup"
                      className="text-olive-400 hover:text-olive-300 transition-colors duration-300 relative group inline-flex items-center gap-1"
                    >
                      Зареєструватися
                      <ChevronRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Tactical footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-[1px] bg-olive-700/30"></div>
              <div className="text-olive-600/60 text-[10px] font-mono tracking-wider">SECURE CONNECTION</div>
              <div className="w-8 h-[1px] bg-olive-700/30"></div>
            </div>
            <p className="text-stone-500 text-xs tracking-wider">
              © {currentYear} {Store.name}. Військова естетика. Міський стиль. Повсякденний комфорт.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

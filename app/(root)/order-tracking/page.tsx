"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("")
  const [email, setEmail] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [orderStatus, setOrderStatus] = useState<null | {
    status: string
    date: string
    estimatedDelivery: string
    items: number
    steps: Array<{
      title: string
      date: string
      completed: boolean
    }>
  }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setError("")

    // Validate order ID format (example: VLX-12345)
    if (!orderId.match(/^VLX-\d{5}$/)) {
      setError("Невірний формат номера замовлення. Приклад: VLX-12345")
      setFormSubmitted(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, show results for a specific order ID
      if (orderId === "VLX-12345") {
        setOrderStatus({
          status: "В дорозі",
          date: "15.04.2025",
          estimatedDelivery: "18.04.2025",
          items: 3,
          steps: [
            {
              title: "Замовлення отримано",
              date: "15.04.2025, 09:23",
              completed: true,
            },
            {
              title: "Підтверджено",
              date: "15.04.2025, 10:45",
              completed: true,
            },
            {
              title: "Упаковано",
              date: "15.04.2025, 14:30",
              completed: true,
            },
            {
              title: "Відправлено",
              date: "16.04.2025, 09:15",
              completed: true,
            },
            {
              title: "В дорозі",
              date: "16.04.2025, 11:20",
              completed: true,
            },
            {
              title: "Доставлено",
              date: "Очікується",
              completed: false,
            },
          ],
        })
      } else {
        setError("Замовлення не знайдено. Перевірте номер замовлення та email.")
      }
      setFormSubmitted(false)
    }, 1500)
  }

  const resetForm = () => {
    setOrderStatus(null)
    setError("")
  }

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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">Відстеження</span>
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          <h1 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-white tracking-wide relative inline-block mb-8">
            <span className="relative z-10">ВІДСТЕЖЕННЯ ЗАМОВЛЕННЯ</span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-500/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h1>

          <p className="max-w-2xl mx-auto text-stone-300 font-light">
            Введіть номер вашого замовлення та email, щоб перевірити статус доставки.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {!orderStatus ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative corner elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-olive-500/20 -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-olive-500/20 -z-10"></div>

              <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-stone-300 text-sm flex items-center gap-2">
                        <Package className="h-4 w-4 text-olive-500" />
                        Номер замовлення <span className="text-olive-500">*</span>
                      </label>
                      <Input
                        className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                        placeholder="Наприклад: VLX-12345"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                      />
                      <p className="text-stone-500 text-xs">Формат: VLX-XXXXX, де X - цифри</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-stone-300 text-sm flex items-center gap-2">
                        <Search className="h-4 w-4 text-olive-500" />
                        Email <span className="text-olive-500">*</span>
                      </label>
                      <Input
                        className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                        placeholder="Введіть email, вказаний при замовленні"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-900/30 border border-red-700/50 p-4 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-stone-300 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={formSubmitted}
                      className="relative bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider overflow-hidden transition-colors duration-300 group"
                    >
                      {formSubmitted ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ПОШУК...
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          ВІДСТЕЖИТИ ЗАМОВЛЕННЯ
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t border-stone-700/50">
                  <h3 className="font-belleza text-xl text-white mb-4">Для тестування</h3>
                  <p className="text-stone-400 text-sm">
                    Використовуйте номер замовлення <span className="text-olive-400 font-medium">VLX-12345</span> з
                    будь-яким email для перегляду демо-результату.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Decorative corner elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-olive-500/20 -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-olive-500/20 -z-10"></div>

              <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 p-8 md:p-12">
                <div className="flex justify-between items-start mb-8 pb-8 border-b border-stone-700/50">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-olive-900/50 flex items-center justify-center">
                        <Package className="h-4 w-4 text-olive-400" />
                      </div>
                      <h2 className="font-belleza text-2xl text-white">Замовлення {orderId}</h2>
                    </div>
                    <p className="text-stone-400 text-sm">
                      Від {orderStatus.date} • {orderStatus.items} товарів
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-4 py-2 bg-olive-900/30 border border-olive-700/30">
                      <span className="text-olive-400 font-belleza tracking-wider">{orderStatus.status}</span>
                    </div>
                    <p className="text-stone-400 text-sm mt-2">Очікувана доставка: {orderStatus.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="font-belleza text-xl text-white mb-6">Статус доставки</h3>
                  <div className="space-y-6">
                    {orderStatus.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="relative">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              step.completed ? "bg-olive-700" : "bg-stone-800 border border-stone-700"
                            }`}
                          >
                            {step.completed && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          {index < orderStatus.steps.length - 1 && (
                            <div
                              className={`absolute top-6 left-1/2 -translate-x-1/2 w-[2px] h-12 ${
                                step.completed && orderStatus.steps[index + 1].completed
                                  ? "bg-olive-700"
                                  : "bg-stone-700"
                              }`}
                            ></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex justify-between items-start">
                            <h4 className={`font-belleza text-lg ${step.completed ? "text-white" : "text-stone-500"}`}>
                              {step.title}
                            </h4>
                            <span className={`text-sm ${step.completed ? "text-stone-400" : "text-stone-500"}`}>
                              {step.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={resetForm}
                    className="bg-transparent hover:bg-stone-800 text-white border border-stone-700 hover:border-white rounded-none py-3 px-6 font-belleza tracking-wider"
                  >
                    ← НАЗАД
                  </Button>
                  <Button className="bg-olive-700 hover:bg-olive-600 text-white rounded-none py-3 px-6 font-belleza tracking-wider">
                    ДЕТАЛІ ЗАМОВЛЕННЯ
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}


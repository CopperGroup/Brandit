"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Briefcase, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import { Store } from "@/constants/store"

export default function DropshipperPage() {
  const [formStep, setFormStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    const success = Math.random() > 0.2 // 80% success rate for demo

    if (success) {
      setFormSubmitted(true)
      setFormError(false)
    } else {
      setFormError(true)
    }
  }

  const nextStep = () => {
    setFormStep(formStep + 1)
  }

  const prevStep = () => {
    setFormStep(formStep - 1)
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
            <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">Партнерство</span>
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          <h1 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-white tracking-wide relative inline-block mb-8">
            <span className="relative z-10">ДЛЯ ДРОПШИПЕРІВ</span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-500/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h1>

          <p className="max-w-2xl mx-auto text-stone-300 font-light">
            Станьте нашим партнером та отримайте доступ до ексклюзивної колекції військово-натхненного одягу для вашого
            бізнесу. Заповніть форму нижче, щоб розпочати співпрацю.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Benefits section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {[
              {
                icon: Shield,
                title: "ЯКІСНІ ТОВАРИ",
                description: "Доступ до ексклюзивної колекції військово-натхненного одягу преміум-класу.",
              },
              {
                icon: Briefcase,
                title: "ГОТОВІ РІШЕННЯ",
                description: "Професійні фотографії, описи товарів та маркетингові матеріали для вашого бізнесу.",
              },
              {
                icon: TrendingUp,
                title: "ВИСОКА МАРЖА",
                description: "Конкурентні оптові ціни, що дозволяють встановлювати привабливу маржу.",
              },
              {
                icon: CheckCircle,
                title: "ШВИДКА ДОСТАВКА",
                description: "Ми відправляємо замовлення напряму вашим клієнтам протягом 24 годин.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900/90 -z-10" />
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 -z-10" />
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-olive-500" />
                <div className="absolute top-0 left-0 w-full h-full border border-white/5" />

                <div className="p-6 z-10">
                  <div className="relative mb-6 inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-olive-700/20 rounded-full scale-[1.8] blur-md" />
                    <div className="relative bg-olive-900/80 p-3 rounded-full">
                      <benefit.icon className="h-8 w-8 text-olive-300" />
                    </div>
                  </div>
                  <h3 className="font-belleza text-xl mb-3 text-white relative">
                    {benefit.title}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-8 h-0.5 bg-olive-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "2rem" }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </h3>
                  <p className="text-stone-300 mb-4 relative z-10">{benefit.description}</p>

                  <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-olive-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-olive-500/20 -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-olive-500/20 -z-10"></div>

            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 p-8 md:p-12 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div
                className="absolute inset-0 opacity-5 -z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23556b2f' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              {/* Form steps indicator */}
              <div className="flex justify-center mb-10">
                <div className="flex items-center">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-belleza text-lg ${
                          formStep >= step ? "bg-olive-700 text-white" : "bg-stone-800 text-stone-400"
                        } transition-colors duration-300`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div className="w-16 h-[1px] mx-2">
                          <div
                            className={`h-full ${
                              formStep > step ? "bg-olive-700" : "bg-stone-700"
                            } transition-colors duration-300`}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-olive-900/30 mb-6">
                    <CheckCircle className="h-10 w-10 text-olive-400" />
                  </div>
                  <h3 className="font-belleza text-3xl text-white mb-4">Заявку Відправлено!</h3>
                  <p className="text-stone-300 max-w-lg mx-auto mb-8">
                    Дякуємо за інтерес до співпраці з {Store.name}. Ми розглянемо вашу заявку та зв'яжемося з вами протягом 2-3
                    робочих днів.
                  </p>
                  <Button
                    className="bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider"
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormStep(1)
                    }}
                  >
                    ПОДАТИ НОВУ ЗАЯВКУ
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="font-belleza text-2xl text-white mb-8 text-center">Основна Інформація</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Ім'я та Прізвище</label>
                          <Input
                            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                            placeholder="Введіть ваше повне ім'я"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Назва Компанії</label>
                          <Input
                            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                            placeholder="Введіть назву вашої компанії"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Email</label>
                          <Input
                            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                            placeholder="email@example.com"
                            type="email"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Телефон</label>
                          <Input
                            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                            placeholder="+380 XX XXX XX XX"
                            type="tel"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="relative bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider overflow-hidden transition-colors duration-300"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            ДАЛІ
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                              className="inline-block"
                            >
                              →
                            </motion.span>
                          </span>
                          <motion.span
                            className="absolute bottom-0 left-0 h-[2px] bg-white"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="font-belleza text-2xl text-white mb-8 text-center">Бізнес-Інформація</h3>

                      <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Веб-сайт або Соціальні Мережі</label>
                          <Input
                            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                            placeholder="https://example.com або @username"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Канали Продажу</label>
                          <Select>
                            <SelectTrigger className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600">
                              <SelectValue placeholder="Оберіть основний канал продажу" />
                            </SelectTrigger>
                            <SelectContent className="bg-stone-800 border-stone-700 text-white">
                              <SelectItem value="website">Власний веб-сайт</SelectItem>
                              <SelectItem value="marketplace">Маркетплейс</SelectItem>
                              <SelectItem value="social">Соціальні мережі</SelectItem>
                              <SelectItem value="offline">Офлайн-магазин</SelectItem>
                              <SelectItem value="multiple">Декілька каналів</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Досвід у Дропшипінгу</label>
                          <Select>
                            <SelectTrigger className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600">
                              <SelectValue placeholder="Оберіть ваш досвід" />
                            </SelectTrigger>
                            <SelectContent className="bg-stone-800 border-stone-700 text-white">
                              <SelectItem value="none">Немає досвіду</SelectItem>
                              <SelectItem value="beginner">Початківець (до 1 року)</SelectItem>
                              <SelectItem value="intermediate">Середній (1-3 роки)</SelectItem>
                              <SelectItem value="advanced">Досвідчений (3+ років)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Очікуваний Обсяг Замовлень на Місяць</label>
                          <Select>
                            <SelectTrigger className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600">
                              <SelectValue placeholder="Оберіть очікуваний обсяг" />
                            </SelectTrigger>
                            <SelectContent className="bg-stone-800 border-stone-700 text-white">
                              <SelectItem value="small">1-10 замовлень</SelectItem>
                              <SelectItem value="medium">11-50 замовлень</SelectItem>
                              <SelectItem value="large">51-100 замовлень</SelectItem>
                              <SelectItem value="xlarge">100+ замовлень</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          className="bg-transparent hover:bg-stone-800 text-white border border-stone-700 hover:border-white rounded-none py-5 px-10 font-belleza tracking-wider"
                        >
                          ← НАЗАД
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="relative bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider overflow-hidden transition-colors duration-300"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            ДАЛІ
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                              className="inline-block"
                            >
                              →
                            </motion.span>
                          </span>
                          <motion.span
                            className="absolute bottom-0 left-0 h-[2px] bg-white"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="font-belleza text-2xl text-white mb-8 text-center">Додаткова Інформація</h3>

                      <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Чому ви хочете співпрацювати з {Store.name}?</label>
                          <Textarea
                            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-4 px-4 focus:border-olive-600 min-h-[120px]"
                            placeholder="Розкажіть нам, чому ви зацікавлені у співпраці з нашим брендом"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">
                            Які категорії товарів вас найбільше цікавлять?
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            {["Верхній одяг", "Штани", "Футболки та поло", "Сорочки", "Аксесуари", "Взуття"].map(
                              (category) => (
                                <div key={category} className="flex items-center space-x-3">
                                  <Checkbox
                                    id={category.toLowerCase()}
                                    className="border-stone-600 data-[state=checked]:bg-olive-700 data-[state=checked]:border-olive-700"
                                  />
                                  <label
                                    htmlFor={category.toLowerCase()}
                                    className="text-stone-300 text-sm cursor-pointer"
                                  >
                                    {category}
                                  </label>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-stone-300 text-sm">Додаткові коментарі або запитання</label>
                          <Textarea
                            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-4 px-4 focus:border-olive-600 min-h-[100px]"
                            placeholder="Будь-які додаткові коментарі або запитання, які ви хочете нам повідомити"
                          />
                        </div>

                        <div className="flex items-start space-x-3 pt-4">
                          <Checkbox
                            id="terms"
                            className="border-stone-600 data-[state=checked]:bg-olive-700 data-[state=checked]:border-olive-700 mt-1"
                            required
                          />
                          <label htmlFor="terms" className="text-stone-300 text-sm">
                            Я погоджуюсь з{" "}
                            <a href="#" className="text-olive-400 hover:text-olive-300 underline">
                              умовами співпраці
                            </a>{" "}
                            та даю згоду на обробку моїх персональних даних для розгляду моєї заявки на дропшипінг.
                          </label>
                        </div>

                        {formError && (
                          <div className="bg-red-900/30 border border-red-700/50 p-4 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-stone-300 text-sm">
                              Виникла помилка при відправці форми. Будь ласка, перевірте введені дані та спробуйте
                              знову.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          className="bg-transparent hover:bg-stone-800 text-white border border-stone-700 hover:border-white rounded-none py-5 px-10 font-belleza tracking-wider"
                        >
                          ← НАЗАД
                        </Button>
                        <Button
                          type="submit"
                          className="relative bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider overflow-hidden transition-colors duration-300"
                        >
                          <span className="relative z-10">ВІДПРАВИТИ ЗАЯВКУ</span>
                          <motion.span
                            className="absolute bottom-0 left-0 h-[2px] bg-white"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>

          {/* FAQ section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h3 className="font-belleza text-3xl text-white mb-12 text-center">Часті Запитання</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: `Як працює дропшипінг з ${Store.name}?`,
                  answer:
                    `Ви розміщуєте наші товари на своїх платформах продажу. Коли клієнт робить замовлення, ви передаєте його нам, а ми відправляємо товар безпосередньо вашому клієнту без згадки про ${Store.name} на упаковці.`,
                },
                {
                  question: "Які вимоги для партнерства?",
                  answer:
                    "Ми шукаємо партнерів, які поділяють наші цінності та естетику. Важливими факторами є наявність активних каналів продажу, розуміння цільової аудиторії та готовність до довгострокової співпраці.",
                },
                {
                  question: "Чи є мінімальний обсяг замовлень?",
                  answer:
                    "Ні, ми не встановлюємо мінімальний обсяг замовлень для наших дропшип-партнерів. Однак, більший обсяг замовлень може відкрити доступ до додаткових переваг та знижок.",
                },
                {
                  question: "Як швидко відбувається доставка?",
                  answer:
                    "Ми відправляємо замовлення протягом 24 годин після його отримання. Термін доставки залежить від місцезнаходження клієнта та обраного способу доставки, зазвичай це 1-3 дні по Україні.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-stone-800/50 border border-stone-700/30 p-6"
                >
                  <h4 className="font-belleza text-xl text-white mb-4 relative inline-block">
                    {faq.question}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-12 h-[1px] bg-olive-500/50"
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                      viewport={{ once: true }}
                    ></motion.span>
                  </h4>
                  <p className="text-stone-300 font-light">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <p className="text-stone-300 mb-6">Маєте додаткові запитання? Зв'яжіться з нашим відділом партнерства:</p>
            <p className="text-white font-belleza text-xl">partners@{Store.name}.ua</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


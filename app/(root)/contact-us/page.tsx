"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react"
import { Store } from "@/constants/store"

export default function ContactUsPage() {
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
            <span className="text-olive-400 text-sm tracking-[0.35em] uppercase font-light">Контакти</span>
            <motion.div
              className="h-px w-12 bg-olive-400/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          <h1 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-white tracking-wide relative inline-block mb-8">
            <span className="relative z-10">ЗВ&apos;ЯЖІТЬСЯ З НАМИ</span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-500/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h1>

          <p className="max-w-2xl mx-auto text-stone-300 font-light">
            Маєте запитання чи пропозиції? Заповніть форму нижче, і ми зв&apos;яжемося з вами якнайшвидше.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 p-8 h-full">
                <h3 className="font-belleza text-2xl text-white mb-8 relative inline-block">
                  КОНТАКТНА ІНФОРМАЦІЯ
                  <motion.span
                    className="absolute -bottom-2 left-0 w-12 h-[1px] bg-olive-500/50"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  ></motion.span>
                </h3>

                <div className="space-y-8 text-stone-300">
                  <motion.div
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-olive-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="h-5 w-5 text-olive-400" />
                    </div>
                    <div>
                      <h4 className="font-belleza text-white mb-2">Адреса</h4>
                      <p className="font-light">вул. Хрещатик 22, Київ, Україна</p>
                      <p className="text-sm text-stone-400 mt-1">Пн-Пт: 10:00 - 19:00, Сб: 10:00 - 17:00</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-olive-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="h-5 w-5 text-olive-400" />
                    </div>
                    <div>
                      <h4 className="font-belleza text-white mb-2">Телефон</h4>
                      <p className="font-light">+380 44 123 4567</p>
                      <p className="text-sm text-stone-400 mt-1">Пн-Пт: 9:00 - 20:00</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-olive-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="h-5 w-5 text-olive-400" />
                    </div>
                    <div>
                      <h4 className="font-belleza text-white mb-2">Email</h4>
                      <p className="font-light">info@{Store.name}.ua</p>
                      <p className="text-sm text-stone-400 mt-1">Відповідаємо протягом 24 годин</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-12 pt-8 border-t border-stone-700/50">
                  <h4 className="font-belleza text-white mb-4">Соціальні мережі</h4>
                  <div className="flex gap-4">
                    {["Instagram", "Facebook", "Twitter"].map((social, index) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-full bg-stone-800 hover:bg-olive-800 flex items-center justify-center transition-colors duration-300 relative group"
                        aria-label={social}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -3 }}
                      >
                        <span className="text-stone-300 group-hover:text-white transition-colors duration-300 text-sm font-belleza">
                          {social[0]}
                        </span>
                        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border border-stone-700 rounded-full scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 p-8">
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
                    <h3 className="font-belleza text-3xl text-white mb-4">Повідомлення Відправлено!</h3>
                    <p className="text-stone-300 max-w-lg mx-auto mb-8">
                      Дякуємо за ваше звернення. Ми розглянемо його та зв&apos;яжемося з вами якнайшвидше.
                    </p>
                    <Button
                      className="bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider"
                      onClick={() => setFormSubmitted(false)}
                    >
                      НАДІСЛАТИ НОВЕ ПОВІДОМЛЕННЯ
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="font-belleza text-2xl text-white mb-8 relative inline-block">
                      НАДІСЛАТИ ПОВІДОМЛЕННЯ
                      <motion.span
                        className="absolute -bottom-2 left-0 w-12 h-[1px] bg-olive-500/50"
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      ></motion.span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-stone-300 text-sm">Ім&apos;я та Прізвище</label>
                        <Input
                          className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600"
                          placeholder="Введіть ваше повне ім'я"
                          required
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
                    </div>

                    <div className="space-y-2 mb-6">
                      <label className="text-stone-300 text-sm">Тема</label>
                      <Select>
                        <SelectTrigger className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-6 px-4 focus:border-olive-600">
                          <SelectValue placeholder="Оберіть тему звернення" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-800 border-stone-700 text-white">
                          <SelectItem value="general">Загальне питання</SelectItem>
                          <SelectItem value="order">Питання щодо замовлення</SelectItem>
                          <SelectItem value="product">Питання щодо товару</SelectItem>
                          <SelectItem value="return">Повернення та обмін</SelectItem>
                          <SelectItem value="partnership">Співпраця</SelectItem>
                          <SelectItem value="other">Інше</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 mb-8">
                      <label className="text-stone-300 text-sm">Повідомлення</label>
                      <Textarea
                        className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-400 rounded-none py-4 px-4 focus:border-olive-600 min-h-[150px]"
                        placeholder="Введіть ваше повідомлення"
                        required
                      />
                    </div>

                    {formError && (
                      <div className="bg-red-900/30 border border-red-700/50 p-4 flex items-start gap-3 mb-6">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-stone-300 text-sm">
                          Виникла помилка при відправці форми. Будь ласка, перевірте введені дані та спробуйте знову.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="relative bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-10 font-belleza tracking-wider overflow-hidden transition-colors duration-300"
                      >
                        <span className="relative z-10">ВІДПРАВИТИ ПОВІДОМЛЕННЯ</span>
                        <motion.span
                          className="absolute bottom-0 left-0 h-[2px] bg-white"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-olive-500/20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-olive-500/20"></div>

              <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-700/50 p-4">
                <div className="aspect-[21/9] w-full bg-stone-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-stone-500 text-center">
                      Карта магазину {Store.name}
                      <br />
                      <span className="text-sm">вул. Хрещатик 22, Київ, Україна</span>
                    </p>
                  </div>
                  {/* In a real implementation, you would embed a map here */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/30"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/30"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/30"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/30"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


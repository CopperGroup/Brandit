"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Store } from "@/constants/store"

const faqItems = [
  {
    question: "Як замовити товар онлайн?",
    answer:
      "Виберіть бажаний товар, оберіть розмір та колір, додайте його до кошика. Перейдіть до оформлення замовлення, вкажіть свої контактні дані та адресу доставки. Оберіть спосіб оплати та підтвердіть замовлення. Ви отримаєте підтвердження на вашу електронну пошту.",
  },
  {
    question: "Скільки коштує доставка?",
    answer:
      "Доставка по Україні коштує 150 ₴. При замовленні на суму від 3000 ₴ доставка безкоштовна. Міжнародна доставка розраховується індивідуально залежно від країни призначення.",
  },
  {
    question: "Які способи доставки доступні?",
    answer:
      "Ми пропонуємо доставку через Нову Пошту, Укрпошту та кур'єрську доставку в межах великих міст. Термін доставки зазвичай становить 1-3 робочих дні залежно від вашого місцезнаходження.",
  },
  {
    question: "Як дізнатися про наявність товару?",
    answer:
      "Наявність товару вказана на сторінці кожного продукту. Якщо товар є в наявності, ви зможете додати його до кошика. Якщо товару немає, ви можете підписатися на сповіщення про його появу.",
  },
  {
    question: "Як обміняти або повернути товар?",
    answer:
      "Ви можете повернути або обміняти товар протягом 14 днів з моменту отримання. Товар має бути в оригінальній упаковці, з усіма бирками та в ідеальному стані. Заповніть форму повернення в особистому кабінеті або зв'яжіться з нашою службою підтримки.",
  },
  {
    question: "Чи можна змінити або скасувати замовлення?",
    answer:
      "Ви можете змінити або скасувати замовлення протягом 2 годин після його оформлення. Для цього зв'яжіться з нашою службою підтримки клієнтів за телефоном або електронною поштою, вказавши номер вашого замовлення.",
  },
]

export default function FaqSection() {
  return (
    <section className="py-32 overflow-hidden relative">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white -z-10"></div>

      {/* Luxury paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      ></div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] -z-10"></div>

      {/* Subtle side panels */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-stone-100/70 to-transparent -z-10"></div>
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-stone-100/70 to-transparent -z-10"></div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-olive-700/5 blur-3xl -z-10"
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
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-stone-300/10 blur-3xl -z-10"
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

      {/* Accent lines */}
      <div className="absolute top-0 left-0 w-1 h-40 bg-gradient-to-b from-olive-700/20 to-transparent -z-10"></div>
      <div className="absolute top-0 left-0 w-40 h-1 bg-gradient-to-r from-olive-700/20 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1 h-40 bg-gradient-to-t from-olive-700/20 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-1 bg-gradient-to-l from-olive-700/20 to-transparent -z-10"></div>

      {/* Diagonal accent lines */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-700/5 rotate-45 -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-700/5 rotate-45 -z-10"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="h-px w-12 bg-olive-700/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <span className="text-olive-700 text-sm tracking-[0.35em] uppercase font-light">Запитання</span>
            <motion.div
              className="h-px w-12 bg-olive-700/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          <h2 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-stone-800 tracking-wide relative inline-block mb-8">
            <span className="relative z-10">ЧАСТІ ЗАПИТАННЯ</span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-700/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h2>

          <p className="max-w-2xl mx-auto text-stone-600 text-lg leading-relaxed font-light">
            Знайдіть відповіді на найпоширеніші запитання про наші продукти, доставку та обслуговування клієнтів.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Decorative corner elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-olive-700/20 -z-10"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-olive-700/20 -z-10"></div>

          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-stone-200 pb-6 relative overflow-hidden"
                >
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                  {/* Animated accent line */}
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-olive-700/0 via-olive-700/30 to-olive-700/0 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                  <AccordionTrigger className="flex justify-between items-center w-full text-left py-5 font-belleza text-xl hover:no-underline group/trigger">
                    <div className="flex items-center">
                      <span className="text-olive-700/40 ml-1 mr-4 text-sm font-light">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="text-stone-800 group-hover/trigger:text-olive-800 transition-colors duration-300">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-4 text-stone-600 font-light leading-relaxed pl-12">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        {/* Additional help section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block max-w-2xl mx-auto p-8 border border-stone-200 bg-gradient-to-r from-stone-50/50 to-white/50">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-olive-700/30 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-olive-700/30 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-olive-700/30 -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-olive-700/30 translate-x-1/2 translate-y-1/2"></div>

            <p className="text-stone-700 mb-6">Не знайшли відповідь на своє запитання?</p>
            <Link href="/contact-us" scroll={true}>
              <Button className="bg-olive-700 hover:bg-olive-600 text-white rounded-none py-3 px-8 font-belleza tracking-wider group overflow-hidden relative">
                <span className="relative z-10">ЗВ'ЯЗАТИСЯ З НАМИ</span>
                <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Signature element */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
            <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
            <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} SUPPORT</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


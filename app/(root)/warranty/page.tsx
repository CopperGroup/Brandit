"use client"

import { Store } from "@/constants/store"
import { motion } from "framer-motion"
import { Shield, CheckCircle, Award, Repeat, Clock, FileText, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function GuaranteesPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const guaranteeCards = [
    {
      title: "ЯКІСТЬ МАТЕРІАЛІВ",
      icon: Shield,
      description:
        "Ми використовуємо лише найякісніші матеріали, які пройшли суворий контроль якості. Кожен елемент одягу створений для витримування екстремальних умов, зберігаючи при цьому свій вигляд та функціональність.",
      details: [
        "Тканини військового класу",
        "Посилені шви та кріплення",
        "Стійкість до зносу та вицвітання",
        "Перевірка на міцність та довговічність",
      ],
    },
    {
      title: "ГАРАНТІЯ ЗАДОВОЛЕННЯ",
      icon: CheckCircle,
      description:
        "Ми впевнені, що ви будете задоволені нашою продукцією. Якщо з будь-якої причини ви не задоволені своєю покупкою, ми пропонуємо 30-денну гарантію повернення коштів без зайвих питань.",
      details: [
        "30 днів на повернення",
        "Повне відшкодування",
        "Безкоштовна доставка при поверненні",
        "Швидка обробка запитів",
      ],
    },
    {
      title: "ДОВГОВІЧНІСТЬ",
      icon: Award,
      description:
        "Наш одяг створений для тривалого використання. Ми надаємо 2-річну гарантію на всі наші вироби, що покриває дефекти матеріалів та виробництва, забезпечуючи вам спокій та впевненість у вашій покупці.",
      details: [
        "2 роки гарантії на всі вироби",
        "Покриття дефектів матеріалів",
        "Покриття виробничих дефектів",
        "Документована історія гарантійних випадків",
      ],
    },
    {
      title: "ОБМІН ТА ПОВЕРНЕННЯ",
      icon: Repeat,
      description:
        "Ми розуміємо, що іноді розмір або стиль може не підійти. Наша політика обміну та повернення розроблена для максимальної зручності клієнтів, забезпечуючи простий та швидкий процес.",
      details: [
        "Безкоштовний обмін розміру",
        "Проста процедура повернення",
        "Швидка обробка запитів",
        "Підтримка клієнтів на кожному етапі",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Олександр К.",
      role: "Військовослужбовець",
      quote:
        `Куртка ${Store.name} пройшла зі мною через найскладніші умови і досі виглядає як нова. Якість дійсно відповідає заявленій гарантії.`,
      rating: 5,
    },
    {
      name: "Марія Т.",
      role: "Інструктор з виживання",
      quote:
        `Коли мені потрібно було замінити розмір, процес був неймовірно простим. Служба підтримки ${Store.name} перевершила всі мої очікування.`,
      rating: 5,
    },
    {
      name: "Віктор П.",
      role: "Міський дослідник",
      quote:
        "Після року інтенсивного використання, якість залишається незмінною. Це дійсно інвестиція, яка себе виправдовує.",
      rating: 5,
    },
  ]

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-200 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(68,64,60,0.3)_0,rgba(28,25,23,0)_50%)] pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      ></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-stone-950 -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-olive-800/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-olive-800/30 to-transparent"></div>

        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border border-olive-800/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 border border-olive-800/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-block"
            >
              <div className="px-4 py-1 border border-olive-500/30 bg-olive-900/10 rounded-sm text-olive-300 text-xs uppercase tracking-wider font-medium">
                Військова надійність
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-belleza mb-6 text-white relative"
            >
              <span className="relative inline-block">
                ГАРАНТІЇ <span className="text-olive-400">ЯКОСТІ</span>
                <motion.span
                  className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                ></motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-stone-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Наша продукція створена за військовими стандартами якості та надійності. Ми гарантуємо довговічність,
              функціональність та задоволення від кожного виробу.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-20 h-20 border-t border-l border-olive-500/20"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b border-r border-olive-500/20"></div>

              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src="/assets/banner-garantija.jpg"
                  alt={`Військова якість ${Store.name}`}
                  width={1000}
                  height={500}
                  className="object-cover w-full h-[300px] md:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent opacity-70"></div>

                <motion.div
                  className="absolute inset-0 border border-olive-500/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                ></motion.div>

                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-olive-500 animate-pulse"></div>
                  <span className="text-xs text-olive-300 uppercase tracking-wider">Сертифіковано</span>
                </div>

                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <h3 className="text-2xl font-belleza text-white mb-2">ВІЙСЬКОВА НАДІЙНІСТЬ</h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto">
                    Кожен виріб проходить суворий контроль якості за стандартами військового спорядження
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* div Guarantees Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-belleza text-white mb-6 inline-block relative">
              НАШІ ГАРАНТІЇ
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.span>
            </h2>
            <p className="text-stone-400 max-w-3xl mx-auto">
              Ми пропонуємо комплексні гарантії, які забезпечують вам повну впевненість у кожній покупці. Наша продукція
              створена для тих, хто цінує якість, надійність та довговічність.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            {guaranteeCards.map((card, index) => (
              <motion.div key={index} variants={fadeIn} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-sm transform group-hover:scale-[1.02] transition-transform duration-300"></div>
                <div className="absolute inset-0 border border-olive-500/20 rounded-sm"></div>
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-500/40"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-500/40"></div>

                <div className="p-8 relative z-10">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 rounded-sm bg-olive-900/30 border border-olive-500/30 flex items-center justify-center mr-4 shrink-0">
                      <card.icon className="w-6 h-6 text-olive-400" />
                    </div>
                    <h3 className="text-xl font-belleza text-white">{card.title}</h3>
                  </div>

                  <p className="text-stone-400 mb-6 leading-relaxed">{card.description}</p>

                  <ul className="space-y-3">
                    {card.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-olive-900/30 border border-olive-500/30 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <span className="w-1.5 h-1.5 bg-olive-400 rounded-full"></span>
                        </span>
                        <span className="text-stone-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Warranty Process Section */}
      <section className="py-20 relative bg-stone-900/30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-belleza text-white mb-6 inline-block relative">
              ГАРАНТІЙНИЙ ПРОЦЕС
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.span>
            </h2>
            <p className="text-stone-400 max-w-3xl mx-auto">
              Ми розробили простий та ефективний процес гарантійного обслуговування, щоб забезпечити вам максимальний
              комфорт та швидке вирішення будь-яких питань.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-olive-500/30 via-olive-500/20 to-olive-500/10 transform md:-translate-x-1/2"></div>

              {/* Timeline steps */}
              {[
                {
                  title: "ЗВЕРНЕННЯ",
                  icon: FileText,
                  description:
                    "Заповніть форму гарантійного звернення на нашому сайті або зв'яжіться з нашою службою підтримки клієнтів.",
                  position: "right",
                },
                {
                  title: "ОЦІНКА",
                  icon: Clock,
                  description:
                    "Наші спеціалісти проведуть оцінку вашого звернення протягом 48 годин та зв'яжуться з вами для уточнення деталей.",
                  position: "left",
                },
                {
                  title: "РІШЕННЯ",
                  icon: CheckCircle,
                  description:
                    "Ми запропонуємо оптимальне рішення: ремонт, заміна або повернення коштів, залежно від характеру проблеми.",
                  position: "right",
                },
                {
                  title: "ВИКОНАННЯ",
                  icon: Zap,
                  description:
                    "Ми оперативно виконаємо обране рішення, забезпечуючи максимальну швидкість та зручність для вас.",
                  position: "left",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-start mb-16 last:mb-0 ${
                    step.position === "right" ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:flex-row`}
                >
                  <div className={`flex-1 ${step.position === "right" ? "md:pr-12" : "md:pl-12"} pb-6 md:pb-0`}>
                    <div className="relative">
                      <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-500/30"></div>
                      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-500/30"></div>
                      <div className="p-6 bg-stone-800/30 border border-olive-500/10 rounded-sm">
                        <h3 className="text-xl font-belleza text-white mb-3">{step.title}</h3>
                        <p className="text-stone-400">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-olive-900 border-2 border-olive-500 md:mx-0 mx-auto md:my-0 my-4">
                    <step.icon className="w-4 h-4 text-olive-300" />
                    <div className="absolute w-16 h-16 rounded-full border border-olive-500/20 animate-ping opacity-20"></div>
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-belleza text-white mb-6 inline-block relative">
              ВІДГУКИ КЛІЄНТІВ
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.span>
            </h2>
            <p className="text-stone-400 max-w-3xl mx-auto">
              Наші клієнти діляться своїм досвідом використання гарантійного обслуговування та якості нашої продукції.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-sm transform group-hover:scale-[1.02] transition-transform duration-300"></div>
                <div className="absolute inset-0 border border-olive-500/20 rounded-sm"></div>
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-olive-500/40"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-olive-500/40"></div>

                <div className="p-8 relative z-10">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-olive-400 fill-olive-400" />
                    ))}
                  </div>

                  <p className="text-stone-300 mb-6 italic leading-relaxed">&qout;{testimonial.quote}&qout;</p>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-olive-900/30 border border-olive-500/30 flex items-center justify-center mr-3 shrink-0">
                      <span className="text-olive-400 font-medium">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-stone-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-950 -z-10"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative"
          >
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t border-l border-olive-500/20"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b border-r border-olive-500/20"></div>

            <h2 className="text-3xl md:text-4xl font-belleza text-white mb-6">МАЄТЕ ПИТАННЯ ЩОДО ГАРАНТІЙ?</h2>
            <p className="text-stone-400 mb-10 max-w-2xl mx-auto">
              Наша команда підтримки готова відповісти на всі ваші запитання та допомогти з будь-якими гарантійними
              випадками.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us" className="relative group">
                <div className="absolute inset-0 bg-olive-800 rounded-sm transform group-hover:translate-y-1 group-hover:translate-x-1 transition-transform duration-200"></div>
                <div className="relative px-8 py-3 bg-stone-900 border border-olive-500/50 rounded-sm text-white font-medium group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-200">
                  Зв&apos;язатися з нами
                </div>
              </Link>

              <Link href="/faq" className="relative group">
                <div className="absolute inset-0 bg-stone-700 rounded-sm transform group-hover:translate-y-1 group-hover:translate-x-1 transition-transform duration-200"></div>
                <div className="relative px-8 py-3 bg-stone-900 border border-stone-700 rounded-sm text-white font-medium group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-200">
                  Переглянути FAQ
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Document Downloads Section */}
      <section className="py-20 relative bg-stone-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-belleza text-white mb-6 inline-block relative">
              ДОКУМЕНТАЦІЯ
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-500/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.span>
            </h2>
            <p className="text-stone-400 max-w-3xl mx-auto">
              Завантажте офіційні документи щодо наших гарантій та політик обслуговування.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                title: "Гарантійна політика",
                icon: FileText,
                description: "Повний опис умов гарантії, процедур та покриття для всіх наших товарів.",
                buttonText: "Завантажити PDF",
              },
              {
                title: "Інструкція з догляду",
                icon: Shield,
                description:
                  "Рекомендації щодо догляду за виробами для забезпечення їх довговічності та збереження гарантії.",
                buttonText: "Завантажити PDF",
              },
              {
                title: "Форма гарантійного звернення",
                icon: CheckCircle,
                description: "Офіційна форма для подання гарантійної претензії або запиту на обслуговування.",
                buttonText: "Завантажити PDF",
              },
            ].map((doc, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="p-6 bg-stone-800/30 border border-olive-500/10 rounded-sm relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-olive-500/30"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-olive-500/30"></div>

                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-sm bg-olive-900/30 border border-olive-500/30 flex items-center justify-center mr-3 shrink-0">
                      <doc.icon className="w-5 h-5 text-olive-400" />
                    </div>
                    <h3 className="text-lg font-belleza text-white">{doc.title}</h3>
                  </div>

                  <p className="text-stone-400 mb-6 text-sm">{doc.description}</p>

                  <button className="w-full py-2 px-4 bg-stone-800 hover:bg-olive-900/50 border border-olive-500/30 rounded-sm text-white text-sm transition-colors duration-300 flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    {doc.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}


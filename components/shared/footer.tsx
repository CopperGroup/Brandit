"use client"

import { Store } from "@/constants/store"
import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react"

// Update the footerLinks array to include proper links to existing pages and sections
const footerLinks = [
  {
    title: "МАГАЗИН",
    links: [
      { name: "Нові надходження", href: "#" },
      { name: "Бестселери", href: "#" },
      { name: "Верхній одяг", href: "#" },
      { name: "Тактичне", href: "#" },
      { name: "Аксесуари", href: "#" },
      { name: "Розпродаж", href: "#" },
    ],
  },
  {
    title: "ІНФОРМАЦІЯ",
    links: [
      { name: "Про нас", href: "#" },
      { name: "Наша історія", href: "/our-history" },
      { name: "Сталість", href: "#" },
      { name: "Кар'єра", href: "#" },
      { name: "Блог", href: "#" },
      { name: "Преса", href: "#" },
      { name: "Для дропшиперів", href: "/for-dropshippers" },
    ],
  },
  {
    title: "ДОПОМОГА",
    links: [
      { name: "Доставка", href: "/delivery" },
      { name: "Повернення", href: "/warranty" },
      { name: "Розміри", href: "#size-guide" },
      { name: "FAQ", href: "#faq-section" },
      { name: "Контакти", href: "/contact-us" },
      { name: "Відстеження замовлення", href: "/order-tracking" },
    ],
  },
]

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
]

export default function Footer() {
  return (
    <footer className="pt-32 pb-16 overflow-hidden relative">
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

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-olive-500/30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-olive-500/30"></div>

            <h3 className="font-belleza text-3xl mb-8 text-white relative inline-block">
            {Store.name}
              <motion.span
                className="absolute -bottom-2 left-0 w-12 h-[1px] bg-olive-500/50"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.span>
            </h3>
            <p className="text-stone-400 mb-8 font-light leading-relaxed">
              Військова естетика. Міський стиль. Повсякденний комфорт. Створюємо одяг, що поєднує характер з
              елегантністю.
            </p>
            <div className="flex flex-col gap-4 text-stone-300">
              <motion.div
                className="flex items-center gap-3 group hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-olive-500" />
                </div>
                <span className="font-light">вул. Хрещатик 22, Київ, Україна</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 group hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-olive-500" />
                </div>
                <span className="font-light">info@{Store.name}.ua</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 group hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-olive-500" />
                </div>
                <span className="font-light">+380 44 123 4567</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Update the mapping function to use the new link structure */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h3 className="font-belleza text-xl mb-8 text-white relative inline-block">
                {section.title}
                <motion.span
                  className="absolute -bottom-2 left-0 w-8 h-[1px] bg-olive-500/50"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={typeof link === "string" ? link : link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={typeof link === "string" ? "#" : link.href}
                      className="text-stone-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group font-light"
                    >
                      <span className="w-0 h-[1px] bg-olive-500 group-hover:w-4 transition-all duration-300"></span>
                      {typeof link === "string" ? link : link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-stone-700 to-transparent"></div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-olive-800 flex items-center justify-center transition-colors duration-300 relative group"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                >
                  <social.icon className="h-4 w-4 text-stone-300 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border border-stone-700 rounded-full scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="text-stone-500 text-sm font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              &copy; {new Date().getFullYear()} {Store.name}. Всі права захищені.
            </motion.div>

            <div className="flex gap-6 text-sm text-stone-500">
              {["Політика конфіденційності", "Умови використання"].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-white transition-colors duration-300 relative group font-light"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {item}
                  <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-olive-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Signature element */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-500/30"></div>
            <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-500/30"></div>
            <span className="font-belleza text-stone-600 tracking-widest text-sm px-6">{Store.name} EST. 2023</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}


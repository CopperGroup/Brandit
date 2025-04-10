"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RefreshCw, Heart, ShoppingBag } from "lucide-react"
import { Store } from "@/constants/store"

const categories = {
  tops: [
    { name: "Польова Сорочка", image: "/placeholder.svg?height=300&width=300&text=Field Shirt", price: "2900 ₴" },
    { name: "Базова Футболка", image: "/placeholder.svg?height=300&width=300&text=Basic Tee", price: "1950 ₴" },
    { name: "Тактичний Светр", image: "/placeholder.svg?height=300&width=300&text=Tactical Sweater", price: "3450 ₴" },
  ],
  bottoms: [
    { name: "Карго Штани", image: "/placeholder.svg?height=300&width=300&text=Cargo Pants", price: "5300 ₴" },
    { name: "Тактичні Джинси", image: "/placeholder.svg?height=300&width=300&text=Tactical Jeans", price: "4800 ₴" },
    { name: "Міські Шорти", image: "/placeholder.svg?height=300&width=300&text=Urban Shorts", price: "3200 ₴" },
  ],
  outerwear: [
    { name: "Куртка Авіатор", image: "/placeholder.svg?height=300&width=300&text=Aviator Jacket", price: "7450 ₴" },
    { name: "Парка Міська", image: "/placeholder.svg?height=300&width=300&text=Urban Parka", price: "8950 ₴" },
    { name: "Польовий Жилет", image: "/placeholder.svg?height=300&width=300&text=Field Vest", price: "5600 ₴" },
  ],
  accessories: [
    {
      name: "Тактичний Рюкзак",
      image: "/placeholder.svg?height=300&width=300&text=Tactical Backpack",
      price: "4200 ₴",
    },
    { name: "Шапка Дозорна", image: "/placeholder.svg?height=300&width=300&text=Watch Cap", price: "1350 ₴" },
    { name: "Військовий Ремінь", image: "/placeholder.svg?height=300&width=300&text=Military Belt", price: "2100 ₴" },
  ],
}

export default function OutfitBuilder() {
  const [selectedItems, setSelectedItems] = useState({
    tops: categories.tops[0],
    bottoms: categories.bottoms[0],
    outerwear: categories.outerwear[0],
    accessories: categories.accessories[0],
  })

  const [activeCategory, setActiveCategory] = useState("tops")

  const handleItemSelect = (category, item) => {
    setSelectedItems({
      ...selectedItems,
      [category]: item,
    })
  }

  const handleRandomize = () => {
    setSelectedItems({
      tops: categories.tops[Math.floor(Math.random() * categories.tops.length)],
      bottoms: categories.bottoms[Math.floor(Math.random() * categories.bottoms.length)],
      outerwear: categories.outerwear[Math.floor(Math.random() * categories.outerwear.length)],
      accessories: categories.accessories[Math.floor(Math.random() * categories.accessories.length)],
    })
  }

  const calculateTotal = () => {
    return Object.values(selectedItems).reduce((total, item) => {
      return total + Number.parseInt(item.price.replace(/\D/g, ""))
    }, 0)
  }

  const categoryLabels = {
    tops: "ВЕРХ",
    bottoms: "НИЗ",
    outerwear: "ВЕРХНІЙ ОДЯГ",
    accessories: "АКСЕСУАРИ",
  }

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
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="h-px w-12 bg-olive-700/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.div>
              <span className="text-olive-700 text-sm tracking-[0.35em] uppercase font-light">Персоналізація</span>
              <motion.div
                className="h-px w-12 bg-olive-700/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>

            <h2 className="font-belleza text-5xl md:text-6xl lg:text-7xl text-stone-800 tracking-wide relative inline-block">
              <span className="relative z-10">СТВОРІТЬ СВІЙ ОБРАЗ</span>
              <motion.span
                className="absolute -bottom-3 left-0 right-0 h-[2px] bg-olive-700/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-stone-600 text-lg leading-relaxed font-light"
          >
            Відкрийте для себе ідеальне поєднання військового стилю для повсякденного життя з нашим генератором образів.
            Створіть свій унікальний стиль, що відображає вашу індивідуальність.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-olive-700/20 -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-olive-700/20 -z-10"></div>

            <div className="bg-white shadow-lg border border-stone-200/70 p-8 md:p-12 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div
                className="absolute inset-0 opacity-5 -z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23556b2f' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left side - Current outfit display */}
                <div className="relative aspect-[3/4] overflow-hidden shadow-lg">
                  {/* Luxury frame */}
                  <div className="absolute inset-0 border border-stone-300/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-300/30 z-20 pointer-events-none"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/30 z-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/30 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/30 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/30 z-20 pointer-events-none"></div>

                  <img
                    src="/placeholder.svg?height=800&width=600&text=Current Outfit"
                    alt="Current outfit"
                    className="w-full h-full object-cover"
                  />

                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80">
                    <div className="absolute inset-0 bg-gradient-to-t from-olive-900/20 to-transparent mix-blend-color"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-8 bg-white/60"></div>
                      <p className="text-white/80 text-xs tracking-[0.2em] uppercase">Образ</p>
                    </div>

                    <h3 className="font-belleza text-2xl text-white mb-2">МІСЬКИЙ РОЗВІДНИК</h3>
                    <p className="text-white/80 text-sm">
                      Поєднання тактичного жилета, базової футболки та карго штанів
                    </p>
                  </div>
                </div>

                {/* Right side - Outfit details and actions */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-olive-700/50"></div>
                    <h3 className="font-belleza text-2xl text-stone-800">ДЕТАЛІ ОБРАЗУ</h3>
                  </div>

                  <div className="space-y-6 mb-10">
                    {Object.entries(selectedItems).map(([category, item], index) => (
                      <motion.div
                        key={category}
                        className="flex items-center gap-5 border-b border-stone-200 pb-5"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="relative w-20 h-20 bg-white border border-stone-200 flex-shrink-0 overflow-hidden">
                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-olive-700/30 z-10 pointer-events-none"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-olive-700/30 z-10 pointer-events-none"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-olive-700/30 z-10 pointer-events-none"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-olive-700/30 z-10 pointer-events-none"></div>

                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-olive-700 tracking-wider uppercase mb-1">
                            {categoryLabels[category]}
                          </p>
                          <p className="font-belleza text-lg text-stone-800">{item.name}</p>
                          <p className="text-stone-600 font-light">{item.price}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-200">
                      <span className="font-belleza text-lg text-stone-700">ЗАГАЛЬНА ВАРТІСТЬ:</span>
                      <span className="font-belleza text-2xl text-stone-800">
                        {calculateTotal().toLocaleString()} ₴
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Button
                        onClick={handleRandomize}
                        className="relative z-10 w-full bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 font-belleza tracking-wider group overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                          <span className="hidden sm:inline">СТВОРИТИ НОВИЙ ОБРАЗ</span>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                      </Button>
                      <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1"></div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Button className="relative z-10 w-full bg-transparent hover:bg-stone-800 text-stone-800 hover:text-white border border-stone-300 hover:border-stone-800 rounded-none py-5 font-belleza tracking-wider transition-all duration-300 group overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <ShoppingBag className="h-4 w-4" /> КУПИТИ ВСЕ
                        </span>
                        <span className="absolute inset-0 bg-stone-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                      </Button>
                      <div className="absolute top-0 left-0 w-full h-full border border-stone-300/20 transform translate-x-1 translate-y-1"></div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      viewport={{ once: true }}
                    >
                      <Button className="w-full bg-transparent text-stone-600 hover:text-stone-800 border-none rounded-none py-3 font-belleza tracking-wider transition-colors duration-300 flex items-center justify-center gap-2">
                        <Heart className="h-4 w-4" /> ЗБЕРЕГТИ ОБРАЗ
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            viewport={{ once: true }}
          >
            <p className="text-stone-500 text-sm italic">
              Натисніть "СТВОРИТИ НОВИЙ ОБРАЗ", щоб побачити інші стильні комбінації з нашої колекції
            </p>
          </motion.div>
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
            <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} STYLE</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

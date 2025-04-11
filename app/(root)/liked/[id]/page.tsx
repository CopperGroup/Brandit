"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ArrowRight, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddToCart from "@/components/shared/AddToCart"
import { Store } from "@/constants/store"

// Mock data for liked products
const mockLikedProducts = [
  // {
  //   id: "tactical-field-jacket-m1",
  //   name: "ТАКТИЧНА ПОЛЬОВА КУРТКА M1",
  //   category: "Верхній одяг",
  //   image: "/placeholder.svg?height=800&width=600&text=Tactical+Jacket",
  //   price: 4470,
  //   priceWithoutDiscount: 5970,
  //   discount: 25,
  // },
  // {
  //   id: "military-cargo-pants",
  //   name: "ТАКТИЧНІ КАРГО ШТАНИ",
  //   category: "Штани",
  //   image: "/placeholder.svg?height=800&width=600&text=Cargo+Pants",
  //   price: 2870,
  //   priceWithoutDiscount: 2870,
  //   discount: 0,
  // },
  // {
  //   id: "tactical-combat-boots",
  //   name: "ТАКТИЧНІ БОЙОВІ ЧЕРЕВИКИ",
  //   category: "Взуття",
  //   image: "/placeholder.svg?height=800&width=600&text=Combat+Boots",
  //   price: 3970,
  //   priceWithoutDiscount: 4970,
  //   discount: 20,
  // },
  // {
  //   id: "military-field-cap",
  //   name: "ВІЙСЬКОВА ПОЛЬОВА КЕПКА",
  //   category: "Головні убори",
  //   image: "/placeholder.svg?height=800&width=600&text=Field+Cap",
  //   price: 1270,
  //   priceWithoutDiscount: 1570,
  //   discount: 19,
  // },
] as any

export default function LikedProductsPage() {
  const [likedProducts, setLikedProducts] = useState(mockLikedProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Simulate loading and handle hydration
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Remove product from liked items
  const removeFromLiked = (productId: string) => {
    setLikedProducts(likedProducts.filter((product) => product.id !== productId))
  }

  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-olive-700/20 border-t-olive-700 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 pt-8 pb-24 relative overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-50 -z-10"></div>

      {/* Luxury paper texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      ></div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] -z-10"></div>

      {/* Accent lines */}
      <div className="absolute top-0 left-0 w-1 h-40 bg-gradient-to-b from-olive-700/20 to-transparent -z-10"></div>
      <div className="absolute top-0 left-0 w-40 h-1 bg-gradient-to-r from-olive-700/20 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1 h-40 bg-gradient-to-t from-olive-700/20 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-1 bg-gradient-to-l from-olive-700/20 to-transparent -z-10"></div>

      {/* Diagonal accent lines */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] border-[1px] border-olive-700/5 rotate-45 -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] border-[1px] border-olive-700/5 rotate-45 -z-10"></div>

      {/* Animated decorative circles */}
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

      {/* Breadcrumbs */}
      <div className="bg-stone-100 py-3 border-b border-stone-200 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-stone-600">
            <Link href="/" className="hover:text-olive-700 transition-colors">
              Головна
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-stone-400">Уподобані товари</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-olive-500/10 -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-olive-500/5 -z-10"></div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="h-px w-12 bg-olive-700/70"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
            ></motion.div>
            <span className="text-olive-700 text-sm tracking-[0.35em] uppercase font-light">ОСОБИСТИЙ КАБІНЕТ</span>
            <motion.div
              className="h-px w-12 bg-olive-700/70"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 0.2 }}
            ></motion.div>
          </div>

          <h1 className="font-belleza text-4xl md:text-5xl lg:text-6xl text-stone-800 tracking-wide relative inline-block mb-6">
            <span className="relative z-10">УПОДОБАНІ ТОВАРИ</span>
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-[1px] bg-olive-700/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.span>
          </h1>

          <p className="max-w-2xl mx-auto text-stone-600 font-light">
            Тут зберігаються всі товари, які вас зацікавили. Ви можете додати їх до кошика або видалити зі списку
            уподобаних.
          </p>
        </motion.div>

        {likedProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
          >
            {likedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                  {/* Luxury frame */}
                  <div className="absolute inset-0 border border-stone-300/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 bottom-3 right-3 border border-stone-300/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-olive-700/50 z-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-olive-700/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-olive-700/50 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-olive-700/50 z-20 pointer-events-none"></div>

                  {/* Remove from liked button */}
                  <button
                    onClick={() => removeFromLiked(product.id)}
                    className="absolute top-4 right-4 z-30 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110"
                  >
                    <X className="h-4 w-4 text-stone-700" />
                  </button>

                  {/* Image with enhanced hover effect */}
                  <Link href={`/catalog/${product.id}`} className="block absolute inset-0 bg-stone-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-110"
                    />

                    {/* Gradient overlay with enhanced animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px w-8 bg-olive-500/70"></div>
                          <p className="text-olive-300 text-xs tracking-[0.2em] uppercase">{product.category}</p>
                        </div>

                        <h4 className="font-belleza text-xl text-white mb-4">{product.name}</h4>

                        <AddToCart
                          id={product.id}
                          name={product.name}
                          image={product.image}
                          price={product.price}
                          priceWithoutDiscount={product.priceWithoutDiscount || product.price}
                          variant="quick-add"
                          className=" border-0 rounded-none font-belleza py-2 px-4 text-xs tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 w-full bg-white/90 backdrop-blur-sm hover:bg-white text-stone-900"
                        />
                      </div>
                    </motion.div>
                  </Link>

                  {/* Enhanced badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="relative">
                        <div className="bg-olive-700 text-white px-3 py-1 text-xs tracking-wider font-medium">
                          -{product.discount}%
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced product info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-belleza text-lg text-stone-800 group-hover:text-olive-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-belleza text-lg text-stone-800">{product.price} ₴</p>
                    {product.priceWithoutDiscount > product.price && (
                      <p className="text-sm text-stone-500 line-through">{product.priceWithoutDiscount} ₴</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center py-20 max-w-2xl mx-auto"
          >
            <div className="relative mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center relative">
                <Heart className="h-10 w-10 text-stone-300" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-stone-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                ></motion.div>
              </div>
            </div>

            <h3 className="font-belleza text-2xl text-stone-800 mb-4">Ваш список уподобаних товарів порожній</h3>
            <p className="text-stone-600 mb-8">
              Додавайте товари, які вам сподобались, до списку уподобаних, щоб швидко знайти їх пізніше.
            </p>

            <div className="relative inline-block">
              <Link href="/catalog">
                <Button className="relative z-10 bg-transparent hover:bg-olive-700 text-stone-800 hover:text-white border border-stone-600 hover:border-olive-700 rounded-none py-4 px-12 font-belleza tracking-[0.2em] transition-all duration-500 text-sm md:text-base group overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    ПЕРЕЙТИ ДО КАТАЛОГУ
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      className="inline-block"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                </Button>
              </Link>
              <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1"></div>
            </div>
          </motion.div>
        )}

        {likedProducts.length > 0 && (
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative inline-block">
              <Link href="/catalog">
                <button className="relative z-10 bg-transparent hover:bg-olive-700 text-stone-800 hover:text-white border border-stone-600 hover:border-olive-700 rounded-none py-4 px-12 font-belleza tracking-[0.2em] transition-all duration-500 text-sm md:text-base group overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    ПРОДОВЖИТИ ПОКУПКИ
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      className="inline-block"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                </button>
              </Link>
              <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1"></div>
            </div>
          </motion.div>
        )}

        {/* Military-inspired decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="pt-16 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
            <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
            <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} MILITARY STYLE</span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

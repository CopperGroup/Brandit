"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Minus,
  Plus,
  ShoppingBag,
  X,
  ArrowLeft,
  Shield,
  Truck,
  CreditCard,
  Crosshair,
  ChevronRight,
} from "lucide-react"
import { trackFacebookEvent } from "@/helpers/pixel"
import { useAppContext } from "@/app/(root)/context"
import type { ProductType } from "@/lib/types/types"
import { motion, AnimatePresence } from "framer-motion"

export default function CartPage() {
  // @ts-ignore
  const { cartData, setCartData, priceToPay, setPriceToPay } = useAppContext()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState("")
  const orderButtonRef = useRef<HTMLDivElement>(null)
  const continueButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (showCursor) {
        setCursorPosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [showCursor])

  // Custom cursor effect for buttons
  useEffect(() => {
    const orderButton = orderButtonRef.current
    const continueButton = continueButtonRef.current

    if (orderButton) {
      orderButton.addEventListener("mouseenter", () => {
        setShowCursor(true)
        setCursorText("ПІДТВЕРДИТИ")
      })
      orderButton.addEventListener("mouseleave", () => {
        setShowCursor(false)
      })
    }

    if (continueButton) {
      continueButton.addEventListener("mouseenter", () => {
        setShowCursor(true)
        setCursorText("ПРОДОВЖИТИ")
      })
      continueButton.addEventListener("mouseleave", () => {
        setShowCursor(false)
      })
    }

    return () => {
      if (orderButton) {
        orderButton.removeEventListener("mouseenter", () => setShowCursor(true))
        orderButton.removeEventListener("mouseleave", () => setShowCursor(false))
      }
      if (continueButton) {
        continueButton.removeEventListener("mouseenter", () => setShowCursor(true))
        continueButton.removeEventListener("mouseleave", () => setShowCursor(false))
      }
    }
  }, [isLoaded])

  function removeProduct(index: number, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsUpdating(true)

    setTimeout(() => {
      cartData.splice(index, 1)
      setCartData((prev: any) => [...prev], cartData)
      setIsUpdating(false)
    }, 300)
  }

  function setCount(index: number, value: any) {
    value = Number(value)
    if (Number.isInteger(value)) {
      cartData[index].quantity = value
      setCartData((prev: any) => [...prev], cartData)
    } else {
      cartData[index].quantity = 1
      setCartData((prev: any) => [...prev], cartData)
    }
  }

  function plus(index: number, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (cartData[index].quantity < 999) {
      cartData[index].quantity++
      setCartData((prev: any) => [...prev], cartData)
    }
  }

  function minus(index: number, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (cartData[index].quantity > 1) {
      cartData[index].quantity--
      setCartData((prev: any) => [...prev], cartData)
    }
  }

  function delProduct(index: number, value: any) {
    value = Number(value)
    if (value < 1) {
      removeProduct(index, new MouseEvent("click") as any)
    }
  }

  const handleCheckout = () => {
    trackFacebookEvent("InitiateCheckout", {
      content_name: "Cart Checkout",
      content_ids: cartData.map((product: ProductType) => product.id),
      value: priceToPay,
      currency: "UAH",
      num_items: cartData.length,
    })
  }

  const totalPrice = cartData
    .reduce((acc: number, data: { price: number; quantity: number }) => acc + data.price * data.quantity, 0)
    .toFixed(2)

  if (!isLoaded) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-900 to-stone-800 text-white pb-20 relative overflow-hidden">
      {/* Custom Cursor */}
      <AnimatePresence>
        {showCursor && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPosition.x - 70,
              y: cursorPosition.y - 70,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            style={{
              width: "140px",
              height: "140px",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Outer ring - bright and visible */}
                <div className="absolute inset-0 border-2 border-white/80 rounded-full"></div>

                {/* Middle pulsing ring */}
                <div className="absolute inset-2 border-2 border-olive-300 rounded-full animate-pulse"></div>

                {/* Inner rotating ring */}
                <div className="absolute inset-4 border border-dashed border-white/60 rounded-full animate-spin-slow"></div>

                {/* Bright crosshair */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crosshair className="w-8 h-8 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]" />
                </div>

                {/* Coordinates with higher contrast */}
                <div className="absolute -bottom-4 -right-4 text-white text-[8px] font-mono bg-olive-900/80 px-1 py-0.5 border border-olive-300/80">
                  X:{Math.round(cursorPosition.x).toString().padStart(3, "0")} Y:
                  {Math.round(cursorPosition.y).toString().padStart(3, "0")}
                </div>

                {/* Button text with high visibility */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-olive-600 px-3 py-1 border border-white font-belleza text-sm tracking-wider text-white shadow-[0_0_10px_rgba(180,200,140,0.5)]">
                  {cursorText}
                  <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white"></div>
                  <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white"></div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-10 bg-olive-400/20 rounded-full blur-md"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1000&width=1000&text=Grid')] opacity-5"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-olive-900/20 blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-olive-900/20 blur-3xl"></div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/80 to-stone-900 z-10"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200&text=Military+Gear')] bg-cover bg-center opacity-20"></div>

        {/* Tactical overlay elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-0 left-0 w-40 h-40 border-t border-l border-olive-700/30"></div>
          <div className="absolute top-0 right-0 w-40 h-40 border-t border-r border-olive-700/30"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 border-b border-l border-olive-700/30"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 border-b border-r border-olive-700/30"></div>

          <div className="absolute top-10 left-10 w-5 h-5 border-t border-l border-olive-400/60"></div>
          <div className="absolute top-10 right-10 w-5 h-5 border-t border-r border-olive-400/60"></div>
          <div className="absolute bottom-10 left-10 w-5 h-5 border-b border-l border-olive-400/60"></div>
          <div className="absolute bottom-10 right-10 w-5 h-5 border-b border-r border-olive-400/60"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 h-full flex flex-col justify-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block mb-2 bg-olive-900/40 backdrop-blur-sm px-3 py-1 border-l-2 border-olive-500">
              <p className="text-olive-400 text-sm tracking-widest">ТАКТИЧНЕ СПОРЯДЖЕННЯ</p>
            </div>
            <h1 className="font-belleza text-6xl tracking-wider text-white mb-6 relative inline-block">
              БОЙОВИЙ КОШИК
              <div className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-olive-500"></div>
            </h1>
            <div className="flex items-center">
              <Link
                href="/catalog"
                className="flex items-center text-olive-400 hover:text-olive-300 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-full border border-olive-700/60 flex items-center justify-center mr-3 group-hover:border-olive-500 transition-colors duration-300">
                  <ArrowLeft size={14} />
                </div>
                <span className="relative font-belleza tracking-wider">
                  ПРОДОВЖИТИ МІСІЮ
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-olive-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-20 relative z-20">
        {cartData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-stone-800 bg-stone-800/20 backdrop-blur-sm p-12 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-stone-800/80 flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 border-2 border-dashed border-olive-700/30 rounded-full animate-spin-slow"></div>
              <ShoppingBag className="h-10 w-10 text-olive-400" />
            </div>
            <h2 className="font-belleza text-3xl text-white mb-3">ПОРОЖНІЙ КОШИК</h2>
            <p className="text-stone-400 max-w-md mx-auto mb-8">
              Здається, ви ще не додали жодного предмету спорядження до кошика. Час поповнити арсенал.
            </p>
            <Link href="/catalog">
              <Button className="bg-olive-700 hover:bg-olive-600 text-white border-none rounded-none min-w-[200px] py-6 font-belleza tracking-wider relative group overflow-hidden">
                <span className="relative z-10">ВІДВІДАТИ АРСЕНАЛ</span>
                <span className="absolute inset-0 bg-olive-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Section */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="border border-stone-800 bg-stone-900/60 backdrop-blur-sm overflow-hidden">
                <div className="bg-stone-800/40 p-4 border-b border-stone-700">
                  <div className="grid grid-cols-12 gap-4 font-belleza text-sm tracking-wider text-stone-300">
                    <div className="col-span-6 md:col-span-6">СПОРЯДЖЕННЯ</div>
                    <div className="col-span-2 text-center hidden md:block">ЦІНА</div>
                    <div className="col-span-3 md:col-span-2 text-center">КІЛЬКІСТЬ</div>
                    <div className="col-span-3 md:col-span-2 text-right">СУМА</div>
                  </div>
                </div>

                <div className={`transition-opacity duration-300 ${isUpdating ? "opacity-50" : "opacity-100"}`}>
                  <AnimatePresence>
                    {cartData.map((data: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-stone-800 last:border-b-0 group hover:bg-stone-800/20 transition-colors duration-300"
                      >
                        <div className="p-4">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            {/* Product */}
                            <div className="col-span-6 md:col-span-6">
                              <Link href={`/catalog/${data.id}`} className="flex items-center">
                                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden mr-4 group-hover:scale-105 transition-transform duration-300">
                                  <div className="absolute inset-0 bg-gradient-to-br from-stone-900/20 to-transparent z-10 pointer-events-none"></div>
                                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-olive-500/60 z-10 pointer-events-none"></div>
                                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-olive-500/60 z-10 pointer-events-none"></div>
                                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-olive-500/60 z-10 pointer-events-none"></div>
                                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-olive-500/60 z-10 pointer-events-none"></div>
                                  <Image
                                    width={80}
                                    height={80}
                                    alt={data.name}
                                    className="object-cover w-full h-full"
                                    src={data.image || "/placeholder.svg"}
                                  />
                                </div>
                                <div className="flex-grow">
                                  <div className="flex items-center mb-1">
                                    <div className="w-2 h-2 bg-olive-500 mr-2"></div>
                                    <p className="text-xs text-olive-400 tracking-wider">
                                      {data.category || "ТАКТИЧНЕ СПОРЯДЖЕННЯ"}
                                    </p>
                                  </div>
                                  <h3 className="font-belleza text-white group-hover:text-olive-300 transition-colors">
                                    {data.name}
                                  </h3>
                                </div>
                              </Link>
                            </div>

                            {/* Price */}
                            <div className="col-span-2 text-center hidden md:block">
                              {data.priceWithoutDiscount !== data.price && (
                                <p className="text-sm text-stone-500 line-through mb-1">
                                  {data.priceWithoutDiscount} ₴
                                </p>
                              )}
                              <p className="font-belleza text-white">{data.price} ₴</p>
                            </div>

                            {/* Quantity */}
                            <div className="col-span-3 md:col-span-2 flex justify-center">
                              <div className="flex items-center border border-stone-700 bg-stone-800/50 relative">
                                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-olive-500/60"></div>
                                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-olive-500/60"></div>
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-olive-500/60"></div>
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-olive-500/60"></div>

                                <Button
                                  onClick={(e) => minus(index, e)}
                                  variant="ghost"
                                  className="p-0 h-8 w-8 rounded-none hover:bg-olive-800 hover:text-white"
                                >
                                  <Minus size={14} />
                                </Button>
                                <input
                                  className="w-8 h-8 text-center focus:outline-none bg-transparent text-white"
                                  value={data.quantity}
                                  onChange={(e) => setCount(index, e.target.value)}
                                  onBlur={(e) => delProduct(index, e.target.value)}
                                  maxLength={3}
                                />
                                <Button
                                  onClick={(e) => plus(index, e)}
                                  variant="ghost"
                                  className="p-0 h-8 w-8 rounded-none hover:bg-olive-800 hover:text-white"
                                >
                                  <Plus size={14} />
                                </Button>
                              </div>
                            </div>

                            {/* Total & Remove */}
                            <div className="col-span-3 md:col-span-2 text-right flex items-center justify-end">
                              <p className="font-belleza text-white mr-3">
                                {(data.price * data.quantity).toFixed(2)} ₴
                              </p>
                              <button
                                onClick={(e) => removeProduct(index, e)}
                                className="w-6 h-6 flex items-center justify-center border border-stone-700 hover:border-olive-500 text-stone-500 hover:text-olive-400 transition-colors duration-300"
                                aria-label="Видалити"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="border border-stone-800 bg-stone-900/60 backdrop-blur-sm sticky top-4">
                <div className="p-6 border-b border-stone-800 relative">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-olive-700/60"></div>
                  <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-olive-700/60"></div>
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-olive-700/60"></div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-olive-700/60"></div>

                  <div className="relative">
                    <h2 className="font-belleza text-2xl text-white mb-2">БОЙОВИЙ ПІДСУМОК</h2>
                    <div className="w-16 h-0.5 bg-olive-500 mb-6"></div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400 flex items-center">
                          <div className="w-1 h-1 bg-olive-500 mr-2"></div>
                          Загальна кількість:
                        </span>
                        <span className="text-white font-belleza">
                          {cartData.reduce((acc: number, item: any) => acc + item.quantity, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400 flex items-center">
                          <div className="w-1 h-1 bg-olive-500 mr-2"></div>
                          Кількість найменувань:
                        </span>
                        <span className="text-white font-belleza">{cartData.length}</span>
                      </div>
                      <Separator className="bg-stone-700" />
                      <div className="flex justify-between pt-2">
                        <span className="text-stone-300 font-belleza">ЗАГАЛЬНА СУМА:</span>
                        <span className="font-belleza text-2xl text-white">{totalPrice} ₴</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div ref={orderButtonRef}>
                        <Link href="/order" className="block w-full" onClick={handleCheckout}>
                          <Button className="w-full bg-olive-700 hover:bg-olive-600 text-white rounded-none py-6 font-belleza tracking-wider relative group overflow-hidden">
                            <span className="relative z-10 flex items-center">
                              ОФОРМИТИ ЗАМОВЛЕННЯ
                              <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <span className="absolute inset-0 bg-olive-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

                            {/* Button corner decorations */}
                            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-olive-400/80"></span>
                            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-olive-400/80"></span>
                            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-olive-400/80"></span>
                            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-olive-400/80"></span>
                          </Button>
                        </Link>
                      </div>

                      <div ref={continueButtonRef}>
                        <Link href="/catalog" className="block w-full">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent hover:bg-stone-800 text-white border border-stone-700 hover:border-olive-500 rounded-none py-6 font-belleza tracking-wider relative group overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center">
                              ПРОДОВЖИТИ ПОКУПКИ
                              <ArrowLeft className="ml-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                            </span>
                            <span className="absolute inset-0 bg-stone-800/50 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></span>

                            {/* Button corner decorations */}
                            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stone-500/80"></span>
                            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-500/80"></span>
                            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-500/80"></span>
                            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stone-500/80"></span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center group">
                      <div className="w-10 h-10 rounded-full bg-olive-900/50 flex items-center justify-center mr-3 border border-olive-800 group-hover:border-olive-500 transition-all duration-300">
                        <Shield
                          size={18}
                          className="text-olive-400 group-hover:text-olive-300 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-belleza text-white text-sm group-hover:text-olive-300 transition-colors duration-300">
                          ГАРАНТІЯ ЯКОСТІ
                        </h3>
                        <p className="text-stone-400 text-xs">Військова перевірка всіх товарів</p>
                      </div>
                    </div>

                    <div className="flex items-center group">
                      <div className="w-10 h-10 rounded-full bg-olive-900/50 flex items-center justify-center mr-3 border border-olive-800 group-hover:border-olive-500 transition-all duration-300">
                        <Truck
                          size={18}
                          className="text-olive-400 group-hover:text-olive-300 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-belleza text-white text-sm group-hover:text-olive-300 transition-colors duration-300">
                          ШВИДКА ДОСТАВКА
                        </h3>
                        <p className="text-stone-400 text-xs">Отриман��я протягом 1-3 днів</p>
                      </div>
                    </div>

                    <div className="flex items-center group">
                      <div className="w-10 h-10 rounded-full bg-olive-900/50 flex items-center justify-center mr-3 border border-olive-800 group-hover:border-olive-500 transition-all duration-300">
                        <CreditCard
                          size={18}
                          className="text-olive-400 group-hover:text-olive-300 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-belleza text-white text-sm group-hover:text-olive-300 transition-colors duration-300">
                          БЕЗПЕЧНА ОПЛАТА
                        </h3>
                        <p className="text-stone-400 text-xs">Захищені платежі та транзакції</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Military-inspired decorative elements */}
      <div className="absolute bottom-10 left-10 w-40 h-40 border-b border-l border-olive-700/20 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 border-b border-r border-olive-700/20 pointer-events-none"></div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  )
}

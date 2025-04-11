"use client"

import type * as z from "zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from "@/app/(root)/context"
import { createOrder } from "@/lib/actions/order.actions"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { CheckCircle, Truck, CreditCard, MessageSquare, ShoppingCart, ArrowRight, Shield, User, MapPin, ChevronRight, ChevronLeft, Lock, Clock } from 'lucide-react'
import Confetti from "react-confetti"
import { trackFacebookEvent } from "@/helpers/pixel"
import { Separator } from "@/components/ui/separator"
import { Store } from "@/constants/store"
import { Card } from "@/components/ui/card"
import { OrderValidation } from "@/lib/validations/order"

type CartProduct = {
  id: string
  name: string
  image: string
  price: number
  priceWithoutDiscount: number
  quantity: number
}

const CreateOrder = ({ userId, email }: { userId: string; email: string }) => {
  const router = useRouter()
  const { cartData, setCartData } = useAppContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [isOrderCreated, setIsOrderCreated] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showThankYou, setShowThankYou] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const formContainerRef = useRef<HTMLDivElement>(null)

  const priceToPay = cartData.reduce(
    (acc: number, data: { price: number; quantity: number }) => acc + data.price * data.quantity,
    0,
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const form = useForm<z.infer<typeof OrderValidation>>({
    resolver: zodResolver(OrderValidation),
    defaultValues: {
      email: email,
      name: "",
      surname: "",
      phoneNumber: "",
      deliveryMethod: "",
      city: "",
      adress: "",
      postalCode: "",
      paymentType: "",
      comment: "",
    },
  })

  const products = cartData.map((product: CartProduct) => ({
    product: product.id,
    amount: product.quantity,
  }))

  const onSubmit = async (values: z.infer<typeof OrderValidation>) => {
    const createdOrder = await createOrder(
      {
        products: products,
        userId: userId,
        value: priceToPay,
        name: values.name,
        surname: values.surname,
        phoneNumber: values.phoneNumber,
        email: values.email,
        paymentType: values.paymentType,
        deliveryMethod: values.deliveryMethod,
        city: values.city,
        adress: values.adress,
        postalCode: values.postalCode,
        comment: values.comment,
      },
      "json",
    )

    const order = JSON.parse(createdOrder)

    trackFacebookEvent("Purchase", {
      value: priceToPay,
      currency: "UAH",
      content_ids: cartData.map((product: CartProduct) => product.id),
    })

    window.scrollTo({ top: 0, behavior: "smooth" })
    setCartData([])
    setIsOrderCreated(true)
    setOrderId(order.id)
    setTimeout(() => setShowThankYou(true), 2000)
    setTimeout(() => setShowConfetti(true), 2500)
  }

  const steps = [
    { icon: <User className="w-5 h-5" />, title: "Особисті дані" },
    { icon: <MapPin className="w-5 h-5" />, title: "Доставка" },
    { icon: <CreditCard className="w-5 h-5" />, title: "Оплата" },
    { icon: <MessageSquare className="w-5 h-5" />, title: "Підтвердження" },
  ]

  return (
    <div className="min-h-screen bg-white text-stone-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1000&width=1000&text=Grid')] opacity-10"></div>
        <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-olive-50/40 blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-olive-50/40 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 rounded-full bg-stone-50/40 blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 rounded-full bg-stone-50/40 blur-2xl"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-48 h-48 border-2 border-olive-200/40"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-olive-200/40"></div>
        <div className="absolute top-40 right-40 w-24 h-24 border-2 border-olive-200/50"></div>
        <div className="absolute bottom-40 left-40 w-24 h-24 border-2 border-olive-200/50"></div>

        {/* Additional tactical elements */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 border border-dashed border-olive-300/30 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 border border-dashed border-olive-300/30 rounded-full"></div>

        {/* Tactical corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-olive-400/50"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-olive-400/50"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-olive-400/50"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-olive-400/50"></div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] max-h-[500px] overflow-hidden bg-gradient-to-r from-stone-50 to-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200&text=Military+Gear')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white"></div>

        {/* Tactical overlay elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-48 h-48 border-t-2 border-l-2 border-olive-300/40"></div>
          <div className="absolute top-0 right-0 w-48 h-48 border-t-2 border-r-2 border-olive-300/40"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 border-b-2 border-l-2 border-olive-300/40"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border-b-2 border-r-2 border-olive-300/40"></div>

          {/* Additional tactical elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-olive-300/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-dashed border-olive-300/30 rounded-full"></div>

          {/* Tactical crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-40 h-1 bg-olive-400/20"></div>
            <div className="w-1 h-40 bg-olive-400/20 -mt-[20px] ml-[20px]"></div>
          </div>

          {/* Tactical coordinates */}
          <div className="absolute top-4 left-4 text-olive-400/40 text-xs font-mono">N 50°27&apos;18&quot;</div>
          <div className="absolute top-4 right-4 text-olive-400/40 text-xs font-mono">E 30°31&apos;25&quot;</div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 h-full flex flex-col justify-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-block mb-3 px-3 py-1 bg-olive-50/80 border-l-2 border-olive-300">
              <span className="text-olive-700 text-sm tracking-widest font-medium">ТАКТИЧНЕ СПОРЯДЖЕННЯ</span>
            </div>
            <h1 className="font-belleza text-5xl md:text-6xl tracking-wider text-stone-900 mb-4">
              ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
            </h1>
            <div className="h-0.5 w-32 bg-olive-300"></div>
            <p className="mt-4 text-stone-600 max-w-xl">
              Заповніть форму нижче для оформлення вашого замовлення. Наші менеджери зв&apos;яжуться з вами найближчим часом.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-0 right-0 w-full h-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full transform rotate-180"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </motion.div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12 relative z-20" ref={formContainerRef}>
        {isOrderCreated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full flex flex-col justify-center items-center py-12"
          >
            <AnimatePresence>
              {showConfetti && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 pointer-events-none z-50"
                >
                  <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.1}
                    colors={["#78716c", "#a8a29e", "#d6d3d1", "#e7e5e4", "#f5f5f4", "#3f6212", "#4d7c0f", "#65a30d"]}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-20 relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1],
                  scale: [0, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.6, 1],
                  ease: "easeInOut",
                }}
                onAnimationComplete={() => setAnimationComplete(true)}
                className="relative z-10"
              >
                <div className="w-36 h-36 md:w-48 md:h-48 bg-gradient-to-br from-white to-stone-50 rounded-full flex items-center justify-center shadow-xl border-2 border-olive-200 relative">
                  {/* Tactical corner elements */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-olive-300 rounded-tl-full"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-olive-300 rounded-tr-full"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-olive-300 rounded-bl-full"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-olive-300 rounded-br-full"></div>

                  {/* Tactical crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-full h-[2px] bg-olive-400"></div>
                    <div className="h-full w-[2px] bg-olive-400"></div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-olive-600" />
                  </motion.div>
                </div>
              </motion.div>

              <AnimatePresence>
                {animationComplete && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="absolute top-0 left-0 right-0 bottom-0 -z-10"
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-olive-100 animate-ping-slow opacity-30"></div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="absolute top-0 left-0 right-0 bottom-0 -z-20"
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-olive-50 animate-ping-slower opacity-20"></div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full max-w-3xl"
            >
              <Card className="p-8 md:p-12 shadow-xl border-stone-200 bg-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-olive-200 via-olive-300 to-olive-200"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-olive-100"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-olive-100"></div>

                {/* Diagonal decorative line */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -left-10 w-40 h-40 border-b border-olive-100 rotate-45"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 border-t border-olive-100 rotate-45"></div>
                </div>

                <motion.div
                  className="text-center relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <motion.h2
                    className="font-belleza text-4xl md:text-5xl text-stone-800 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    ЗАМОВЛЕННЯ СТВОРЕНО
                  </motion.h2>

                  <motion.div
                    className="w-20 h-0.5 bg-olive-300 mx-auto mb-6"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                  />

                  <motion.p
                    className="text-stone-600 mb-8 max-w-xl mx-auto text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    Дякуємо за ваше замовлення. Наш менеджер зв&apos;яжеться з вами найближчим часом для підтвердження
                    деталей.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <Button
                      onClick={() => router.push(`/myOrders/${orderId}`)}
                      className="bg-olive-700 hover:bg-olive-800 px-6 py-6 text-white transition-all duration-300 w-full sm:w-auto h-auto font-belleza tracking-wider relative group overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        {windowSize.width > 380 ? "ПЕРЕГЛЯНУТИ ДЕТАЛІ ЗАМОВЛЕННЯ" : "ПЕРЕГЛЯНУТИ ДЕТАЛІ"}
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <span className="absolute inset-0 bg-olive-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Button>
                  </motion.div>

                  {/* Order ID */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    className="inline-block px-6 py-3 bg-stone-50 border border-olive-100"
                  >
                    <span className="text-stone-500 mr-2">Номер замовлення:</span>
                    <span className="font-belleza tracking-wider text-olive-800">{orderId}</span>
                  </motion.div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Thank You Message */}
            <AnimatePresence>
              {showThankYou && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, delay: 1.9 }}
                  className="mt-8 font-belleza text-2xl text-olive-700 flex items-center"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ delay: 2.1, duration: 0.5 }}
                    className="mr-2"
                  >
                    ✦
                  </motion.span>
                  ДЯКУЄМО ЗА ПОКУПКУ
                  <motion.span
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ delay: 2.1, duration: 0.5 }}
                    className="ml-2"
                  >
                    ✦
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-2 border-stone-200 shadow-lg relative overflow-hidden"
                style={{
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.03)",
                }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-3 border-l-3 border-olive-300 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-3 border-r-3 border-olive-300 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-3 border-l-3 border-olive-300 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-3 border-r-3 border-olive-300 pointer-events-none"></div>

                {/* Additional tactical elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-olive-200 via-olive-400 to-olive-200"></div>
                <div className="absolute top-8 right-8 w-16 h-16 border-2 border-dashed border-olive-200/50 rounded-full pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-dashed border-olive-200/50 rounded-full pointer-events-none"></div>

                {/* Tactical grid lines */}
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500&text=+')] bg-[length:50px_50px] opacity-[0.03] pointer-events-none"></div>

                <div className="p-8 md:p-10">
                  {/* Progress Steps */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center w-full mb-8 relative">
                      {/* Progress line */}
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-100 -translate-y-1/2 rounded-full"></div>
                      <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-olive-400 to-olive-600 -translate-y-1/2 transition-all duration-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                      ></motion.div>

                      {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center z-10">
                          <motion.div
                            className={`rounded-full p-4 ${
                              currentStep > index + 1
                                ? "bg-gradient-to-br from-olive-500 to-olive-700 text-white shadow-lg shadow-olive-200/50"
                                : currentStep === index + 1
                                  ? "bg-gradient-to-br from-olive-400 to-olive-600 text-white shadow-lg shadow-olive-200/50"
                                  : "bg-white text-stone-400 border-2 border-stone-200 shadow-md"
                            } relative`}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 * index, duration: 0.3, type: "spring", stiffness: 300 }}
                          >
                            {currentStep > index + 1 ? <CheckCircle className="w-6 h-6" /> : step.icon}

                            {/* Step number */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-olive-700 border-2 border-olive-300 shadow-sm">
                              {index + 1}
                            </div>

                            {/* Tactical corner elements for active step */}
                            {currentStep === index + 1 && (
                              <>
                                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white/70"></div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white/70"></div>
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white/70"></div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white/70"></div>
                              </>
                            )}
                          </motion.div>
                          <span className="text-sm mt-3 font-medium text-center max-[450px]:hidden">{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center mb-6">
                              <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center mr-3 border border-olive-100">
                                <User className="w-5 h-5 text-olive-600" />
                              </div>
                              <div>
                                <h3 className="font-belleza text-xl text-stone-800">ОСОБИСТІ ДАНІ</h3>
                                <p className="text-stone-500 text-sm">Введіть ваші контактні дані для зв&apos;язку</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-stone-700 font-medium">Ім&apos;я</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12"
                                        placeholder="Введіть ваше ім'я"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="surname"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-stone-700 font-medium">Прізвище</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12"
                                        placeholder="Введіть ваше прізвище"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-stone-700 font-medium">Номер телефону</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12"
                                        placeholder="+380 XX XXX XX XX"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-stone-700 font-medium">Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12"
                                        placeholder="example@mail.com"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </motion.div>
                        )}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center mb-6">
                              <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center mr-3 border border-olive-100">
                                <MapPin className="w-5 h-5 text-olive-600" />
                              </div>
                              <div>
                                <h3 className="font-belleza text-xl text-stone-800">ДОСТАВКА</h3>
                                <p className="text-stone-500 text-sm">Вкажіть адресу та спосіб доставки</p>
                              </div>
                            </div>

                            <FormField
                              control={form.control}
                              name="deliveryMethod"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-stone-700 font-medium">Спосіб доставки</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12">
                                        <SelectValue placeholder="Виберіть спосіб доставки" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="border-stone-200">
                                      <SelectItem value="Нова пошта (У відділення)">
                                        Нова пошта (У відділення)
                                      </SelectItem>
                                      <SelectItem value="Нова пошта (До дому)">Нова пошта (Кур&apos;єр)</SelectItem>
                                      <SelectItem value="Укрпошта (У відділення)">Укрпошта (У відділення)</SelectItem>
                                      <SelectItem value="Укрпошта (До дому)">Укрпошта (Кур&apos;єр)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-stone-700 font-medium">Місто</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12"
                                        placeholder="Введіть назву міста"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="adress"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-stone-700 font-medium">Адреса</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12"
                                        placeholder="Вулиця, будинок, квартира"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-stone-700 font-medium">Поштовий код</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12"
                                        placeholder="Введіть поштовий індекс"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </motion.div>
                        )}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center mb-6">
                              <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center mr-3 border border-olive-100">
                                <CreditCard className="w-5 h-5 text-olive-600" />
                              </div>
                              <div>
                                <h3 className="font-belleza text-xl text-stone-800">ОПЛАТА</h3>
                                <p className="text-stone-500 text-sm">Виберіть зручний спосіб оплати</p>
                              </div>
                            </div>

                            <FormField
                              control={form.control}
                              name="paymentType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-stone-700 font-medium">Спосіб оплати</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-12">
                                        <SelectValue placeholder="Виберіть спосіб оплати" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="border-stone-200">
                                      <SelectItem value="Накладний платіж">Накладний платіж</SelectItem>
                                      <SelectItem value="Оплата карткою">Оплата карткою</SelectItem>
                                      <SelectItem value="Оплата при отриманні">Оплата при отриманні</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />

                            <div className="mt-6 p-6 bg-olive-50/50 border border-olive-100">
                              <div className="flex items-center mb-4">
                                <Lock className="w-5 h-5 text-olive-700 mr-2" />
                                <h3 className="font-belleza text-lg text-stone-800">БЕЗПЕЧНА ОПЛАТА</h3>
                              </div>
                              <p className="text-stone-600 text-sm">
                                Всі платежі обробляються через захищені канали зв&apos;язку. Ми не зберігаємо дані вашої
                                картки та використовуємо найсучасніші методи шифрування для захисту ваших персональних
                                даних.
                              </p>
                            </div>
                          </motion.div>
                        )}
                        {currentStep === 4 && (
                          <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center mb-6">
                              <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center mr-3 border border-olive-100">
                                <MessageSquare className="w-5 h-5 text-olive-600" />
                              </div>
                              <div>
                                <h3 className="font-belleza text-xl text-stone-800">ПІДТВЕРДЖЕННЯ</h3>
                                <p className="text-stone-500 text-sm">Перевірте дані та підтвердіть замовлення</p>
                              </div>
                            </div>

                            <FormField
                              control={form.control}
                              name="comment"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-stone-700 font-medium">Коментар до замовлення</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      rows={4}
                                      className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 resize-none"
                                      placeholder="Додаткова інформація щодо замовлення або доставки"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />

                            <div className="p-6 bg-olive-50/50 border border-olive-100">
                              <h3 className="font-belleza text-lg text-stone-800 mb-4">ПІДТВЕРДЖЕННЯ ЗАМОВЛЕННЯ</h3>
                              <p className="text-stone-600 text-sm mb-4">
                                Будь ласка, перевірте правильність введених даних перед підтвердженням замовлення. Після
                                підтвердження наш менеджер зв&apos;яжеться з вами для уточнення деталей.
                              </p>
                              <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-olive-600 mr-2" />
                                <p className="text-stone-700 text-sm font-medium">
                                  Натискаючи кнопку &quot;Підтвердити замовлення&quot;, ви погоджуєтесь з умовами доставки та
                                  оплати.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between mt-10">
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            variant="outline"
                            className="border-2 border-olive-300 text-olive-700 hover:bg-olive-50 hover:text-olive-800 hover:border-olive-400 h-12 px-6 font-belleza tracking-wider shadow-sm relative group overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center">
                              <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                              НАЗАД
                            </span>
                            <span className="absolute inset-0 bg-olive-100 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></span>
                          </Button>
                        )}

                        {currentStep < steps.length && (
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="ml-auto bg-gradient-to-r from-olive-600 to-olive-700 hover:from-olive-700 hover:to-olive-800 text-white h-12 px-6 font-belleza tracking-wider shadow-md relative group overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center">
                              ДАЛІ
                              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-olive-700 to-olive-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                          </Button>
                        )}

                        {currentStep === steps.length && (
                          <Button
                            type="submit"
                            className="ml-auto bg-gradient-to-r from-olive-600 to-olive-700 hover:from-olive-700 hover:to-olive-800 text-white h-12 px-8 font-belleza tracking-wider shadow-md relative group overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center">
                              ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
                              <CheckCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-olive-700 to-olive-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

                            {/* Tactical corner elements */}
                            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30"></span>
                            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30"></span>
                            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/30"></span>
                            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30"></span>
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </div>
                {/* Add scanline effect to the form container */}
                <div className="scanline"></div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="sticky top-6 bg-white border-2 border-stone-200 shadow-lg"
                style={{
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.03)",
                }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-14 h-14 border-t-3 border-l-3 border-olive-300 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-14 h-14 border-t-3 border-r-3 border-olive-300 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-14 h-14 border-b-3 border-l-3 border-olive-300 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-14 h-14 border-b-3 border-r-3 border-olive-300 pointer-events-none"></div>

                {/* Additional tactical elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-olive-200 via-olive-400 to-olive-200"></div>
                <div className="absolute top-1/4 right-4 w-12 h-12 border border-dashed border-olive-200/60 rounded-full pointer-events-none"></div>
                <div className="absolute bottom-1/4 left-4 w-12 h-12 border border-dashed border-olive-200/60 rounded-full pointer-events-none"></div>

                {/* Tactical grid pattern */}
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=300&text=+')] bg-[length:30px_30px] opacity-[0.03] pointer-events-none"></div>

                <div className="p-6 border-b border-stone-100">
                  <h2 className="font-belleza text-xl text-stone-800 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-olive-600" />
                    ВАШЕ ЗАМОВЛЕННЯ
                  </h2>
                </div>

                <div className="max-h-[calc(100vh-300px)] overflow-y-auto p-4">
                  {cartData.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-stone-500">Ваш кошик порожній</p>
                    </div>
                  ) : (
                    cartData.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center mb-4 pb-4 border-b border-stone-200 last:border-b-0 last:pb-0 last:mb-0 group hover:bg-olive-50/10 transition-colors duration-300 -mx-4 px-4 py-2 rounded"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden mr-4 bg-olive-50/40 border border-olive-200/50 group-hover:border-olive-300/70 transition-colors duration-300">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-olive-300 z-10 pointer-events-none"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-olive-300 z-10 pointer-events-none"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-olive-300 z-10 pointer-events-none"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-olive-300 z-10 pointer-events-none"></div>
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-belleza text-stone-800">{item.name}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-stone-500">Кількість: {item.quantity}</p>
                            <p className="font-medium text-olive-700">
                              {item.price.toFixed(2)} {Store.currency_sign}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-6 bg-olive-50/50 border-t border-olive-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-stone-600">Підсумок:</span>
                    <span className="font-medium text-stone-800">
                      {priceToPay.toFixed(2)} {Store.currency_sign}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Доставка:</span>
                    <span className="font-medium text-olive-600">Безкоштовно</span>
                  </div>
                  <Separator className="my-4 bg-olive-200/50" />
                  <div className="flex justify-between items-center">
                    <span className="font-belleza text-lg text-stone-800">ЗАГАЛЬНА СУМА:</span>
                    <span className="font-belleza text-xl text-olive-700">
                      {priceToPay.toFixed(2)} {Store.currency_sign}
                    </span>
                  </div>
                </div>

                <div className="p-6 border-t border-stone-100">
                  <div className="space-y-4">
                    <div className="flex items-center group hover:bg-olive-50/20 -mx-2 px-2 py-1 rounded transition-colors duration-300">
                      <div className="w-12 h-12 rounded-full bg-olive-50 flex items-center justify-center mr-3 border-2 border-olive-200 group-hover:border-olive-300 transition-colors duration-300 shadow-sm">
                        <Shield className="w-6 h-6 text-olive-600 group-hover:text-olive-700 transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-belleza text-stone-800 text-sm group-hover:text-olive-700 transition-colors duration-300">
                          ГАРАНТІЯ ЯКОСТІ
                        </h3>
                        <p className="text-stone-500 text-xs">Військова перевірка всіх товарів</p>
                      </div>
                    </div>

                    <div className="flex items-center group hover:bg-olive-50/20 -mx-2 px-2 py-1 rounded transition-colors duration-300">
                      <div className="w-12 h-12 rounded-full bg-olive-50 flex items-center justify-center mr-3 border-2 border-olive-200 group-hover:border-olive-300 transition-colors duration-300 shadow-sm">
                        <Truck className="w-6 h-6 text-olive-600 group-hover:text-olive-700 transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-belleza text-stone-800 text-sm group-hover:text-olive-700 transition-colors duration-300">
                          ШВИДКА ДОСТАВКА
                        </h3>
                        <p className="text-stone-500 text-xs">Отримання протягом 1-3 днів</p>
                      </div>
                    </div>

                    <div className="flex items-center group hover:bg-olive-50/20 -mx-2 px-2 py-1 rounded transition-colors duration-300">
                      <div className="w-12 h-12 rounded-full bg-olive-50 flex items-center justify-center mr-3 border-2 border-olive-200 group-hover:border-olive-300 transition-colors duration-300 shadow-sm">
                        <CreditCard className="w-6 h-6 text-olive-600 group-hover:text-olive-700 transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-belleza text-stone-800 text-sm group-hover:text-olive-700 transition-colors duration-300">
                          БЕЗПЕЧНА ОПЛАТА
                        </h3>
                        <p className="text-stone-500 text-xs">Захищені платежі та транзакції</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimated delivery */}
                <div className="p-6 border-t border-olive-100 bg-gradient-to-br from-white to-olive-50/30">
                  <div className="flex items-center mb-3">
                    <Clock className="w-5 h-5 text-olive-600 mr-2" />
                    <h3 className="font-belleza text-stone-800">ОРІЄНТОВНИЙ ЧАС ДОСТАВКИ</h3>
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-600 mb-2">
                    <span>Нова пошта:</span>
                    <span className="font-medium">1-2 дні</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>Укрпошта:</span>
                    <span className="font-medium">2-5 днів</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom decorative elements */}
      <div className="relative h-32 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-olive-50/20"></div>
        
        {/* Tactical grid overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200&text=+')] bg-[length:20px_20px] opacity-[0.03]"></div>
        
        {/* Tactical corner elements */}
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-3 border-l-3 border-olive-300/40"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 border-olive-300/40"></div>
      </div>

      <style jsx global>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .animate-ping-slower {
          animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        /* Tactical scan line effect */
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .scanline {
          position: absolute;
          width: 100%;
          height: 10px;
          background: linear-gradient(to bottom, rgba(122, 153, 80, 0), rgba(122, 153, 80, 0.1), rgba(122, 153, 80, 0));
          animation: scanline 3s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}

export default CreateOrder


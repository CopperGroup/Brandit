"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  Eye,
  Download,
  ShieldCheck,
  XCircle,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-2023-7845",
    date: "2023-04-15T10:30:00",
    status: "delivered",
    total: 4250,
    paymentMethod: "Оплата карткою",
    deliveryMethod: "Нова пошта (У відділення)",
    trackingNumber: "59000678432",
    items: [
      {
        id: "prod-1",
        name: "Тактичний рюкзак 'Defender'",
        image: "/placeholder.svg?height=80&width=80&text=Backpack",
        price: 2500,
        quantity: 1,
      },
      {
        id: "prod-2",
        name: "Тактичні рукавиці 'Stealth'",
        image: "/placeholder.svg?height=80&width=80&text=Gloves",
        price: 850,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD-2023-6932",
    date: "2023-03-28T14:45:00",
    status: "in_transit",
    total: 5600,
    paymentMethod: "Накладний платіж",
    deliveryMethod: "Нова пошта (Кур'єр)",
    trackingNumber: "59000543219",
    items: [
      {
        id: "prod-3",
        name: "Тактичний жилет 'Guardian'",
        image: "/placeholder.svg?height=80&width=80&text=Vest",
        price: 3800,
        quantity: 1,
      },
      {
        id: "prod-4",
        name: "Тактичний ліхтар 'NightHawk'",
        image: "/placeholder.svg?height=80&width=80&text=Flashlight",
        price: 1800,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2023-5421",
    date: "2023-02-10T09:15:00",
    status: "processing",
    total: 7200,
    paymentMethod: "Оплата карткою",
    deliveryMethod: "Укрпошта (У відділення)",
    trackingNumber: null,
    items: [
      {
        id: "prod-5",
        name: "Тактичні штани 'Ranger'",
        image: "/placeholder.svg?height=80&width=80&text=Pants",
        price: 2400,
        quantity: 1,
      },
      {
        id: "prod-6",
        name: "Тактична куртка 'Phantom'",
        image: "/placeholder.svg?height=80&width=80&text=Jacket",
        price: 4800,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2023-4310",
    date: "2023-01-05T16:20:00",
    status: "cancelled",
    total: 3200,
    paymentMethod: "Оплата при отриманні",
    deliveryMethod: "Нова пошта (У відділення)",
    trackingNumber: null,
    items: [
      {
        id: "prod-7",
        name: "Тактичний ремінь 'Enforcer'",
        image: "/placeholder.svg?height=80&width=80&text=Belt",
        price: 1200,
        quantity: 1,
      },
      {
        id: "prod-8",
        name: "Тактичні окуляри 'Viper'",
        image: "/placeholder.svg?height=80&width=80&text=Glasses",
        price: 2000,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-8976",
    date: "2024-03-20T11:30:00",
    status: "delivered",
    total: 6750,
    paymentMethod: "Оплата карткою",
    deliveryMethod: "Нова пошта (У відділення)",
    trackingNumber: "59000789123",
    items: [
      {
        id: "prod-9",
        name: "Тактичний шолом 'Sentinel'",
        image: "/placeholder.svg?height=80&width=80&text=Helmet",
        price: 5500,
        quantity: 1,
      },
      {
        id: "prod-10",
        name: "Тактичний компас 'Pathfinder'",
        image: "/placeholder.svg?height=80&width=80&text=Compass",
        price: 1250,
        quantity: 1,
      },
    ],
  },
]

// Status mapping for visual representation
const statusMap = {
  processing: {
    label: "В обробці",
    icon: <Clock className="w-5 h-5" />,
    color: "bg-amber-100 text-amber-700 border-amber-200",
    iconColor: "text-amber-500",
  },
  in_transit: {
    label: "В дорозі",
    icon: <Truck className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    iconColor: "text-blue-500",
  },
  delivered: {
    label: "Доставлено",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "bg-olive-100 text-olive-700 border-olive-200",
    iconColor: "text-olive-500",
  },
  cancelled: {
    label: "Скасовано",
    icon: <XCircle className="w-5 h-5" />,
    color: "bg-stone-100 text-stone-700 border-stone-200",
    iconColor: "text-stone-500",
  },
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState(mockOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date_desc")
  const [isLoading, setIsLoading] = useState(true)
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Handle filtering and sorting
  useEffect(() => {
    let result = [...orders]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Apply sorting
    switch (sortBy) {
      case "date_desc":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "date_asc":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "total_desc":
        result.sort((a, b) => b.total - a.total)
        break
      case "total_asc":
        result.sort((a, b) => a.total - b.total)
        break
      default:
        break
    }

    setFilteredOrders(result)
  }, [orders, searchTerm, statusFilter, sortBy])

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 relative">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1000&width=1000&text=Grid')] opacity-5"></div>
        <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-olive-50/20 blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-olive-50/20 blur-3xl"></div>

        {/* Tactical grid overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=40&width=40&text=+')] bg-[length:40px_40px] opacity-[0.02]"></div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-40 h-40 border border-dashed border-olive-300/10 rounded-full"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 border border-dashed border-olive-300/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-olive-300/10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-olive-300/10"></div>

        {/* Tactical coordinates */}
        <div className="absolute top-4 left-4 text-olive-400/20 text-xs font-mono">N 50°27&apos;18&quot;</div>
        <div className="absolute top-4 right-4 text-olive-400/20 text-xs font-mono">E 30°31&apos;25&quot;</div>
        <div className="absolute bottom-4 left-4 text-olive-400/20 text-xs font-mono">S 50°27&apos;18&quot;</div>
        <div className="absolute bottom-4 right-4 text-olive-400/20 text-xs font-mono">W 30°31&apos;25&quot;</div>
      </div>

      {/* Enhanced tactical corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-olive-400/30 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-olive-400/30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-olive-400/30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-olive-400/30 pointer-events-none"></div>

      {/* Additional corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-olive-400/10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-olive-400/10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-olive-400/10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-olive-400/10 pointer-events-none"></div>

      {/* Tactical crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
        <div className="w-40 h-1 bg-olive-500"></div>
        <div className="w-1 h-40 bg-olive-500 -mt-[20px] ml-[20px]"></div>
        <div className="w-10 h-10 border border-olive-500 rounded-full -mt-[25px] -ml-[5px]"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12 relative z-20">
        {/* Page Title with enhanced decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 text-center relative px-4"
        >
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100 hidden md:block"></div>
          <div className="absolute top-1/2 left-1/4 w-1/2 h-[1px] bg-olive-200/50 hidden md:block"></div>

          {/* Tactical corner elements for title */}
          <div className="absolute -top-6 left-1/4 w-8 h-8 border-t-2 border-l-2 border-olive-300/30 hidden md:block"></div>
          <div className="absolute -top-6 right-1/4 w-8 h-8 border-t-2 border-r-2 border-olive-300/30 hidden md:block"></div>
          <div className="absolute -bottom-6 left-1/4 w-8 h-8 border-b-2 border-l-2 border-olive-300/30 hidden md:block"></div>
          <div className="absolute -bottom-6 right-1/4 w-8 h-8 border-b-2 border-r-2 border-olive-300/30 hidden md:block"></div>

          <div className="relative inline-block px-4 md:px-10 py-2 bg-white">
            <h1 className="font-belleza text-3xl md:text-5xl tracking-wider text-stone-900 mb-4">МОЇ ЗАМОВЛЕННЯ</h1>
            <div className="h-0.5 w-24 md:w-32 bg-olive-300 mx-auto"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-[1px] bg-olive-200"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 md:w-8 h-[1px] bg-olive-100"></div>
          </div>

          <p className="mt-6 md:mt-8 text-stone-600 max-w-xl mx-auto relative px-4 text-sm md:text-base">
            <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 border-t border-l border-olive-300/50 rotate-45 hidden md:block"></span>
            Відстежуйте статус ваших замовлень, переглядайте історію покупок та керуйте доставкою ваших тактичних
            товарів.
            <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 border-b border-r border-olive-300/50 rotate-45 hidden md:block"></span>
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 bg-white border border-stone-200 p-4 md:p-6 shadow-sm relative overflow-hidden"
        >
          {/* Enhanced decorative corner elements */}
          <div className="absolute top-0 left-0 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-olive-300 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-olive-300 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-6 md:w-8 h-6 md:h-8 border-b-2 border-l-2 border-olive-300 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-olive-300 pointer-events-none"></div>
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-olive-400/50 pointer-events-none"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-olive-400/50 pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-olive-400/50 pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-olive-400/50 pointer-events-none"></div>

          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <Input
                placeholder="Пошук за номером замовлення або товаром"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-10 md:h-12"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 md:w-5 h-4 md:h-5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-10 md:h-12 pl-10">
                    <SelectValue placeholder="Статус замовлення" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі замовлення</SelectItem>
                    <SelectItem value="processing">В обробці</SelectItem>
                    <SelectItem value="in_transit">В дорозі</SelectItem>
                    <SelectItem value="delivered">Доставлено</SelectItem>
                    <SelectItem value="cancelled">Скасовано</SelectItem>
                  </SelectContent>
                </Select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 md:w-5 h-4 md:h-5" />
              </div>

              <div className="relative">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-stone-200 focus:border-olive-400 focus:ring-olive-100 h-10 md:h-12 pl-10">
                    <SelectValue placeholder="Сортування" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date_desc">Спочатку нові</SelectItem>
                    <SelectItem value="date_asc">Спочатку старі</SelectItem>
                    <SelectItem value="total_desc">За ціною (спадання)</SelectItem>
                    <SelectItem value="total_asc">За ціною (зростання)</SelectItem>
                  </SelectContent>
                </Select>
                <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 md:w-5 h-4 md:h-5" />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <div className="text-xs md:text-sm text-stone-500">
                Знайдено замовлень: <span className="font-medium text-olive-700">{filteredOrders.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 relative"
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20&text=+')] bg-[length:20px_20px] opacity-[0.02]"></div>

                {/* Tactical corner elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-olive-300/50"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-olive-300/50"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-olive-300/50"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-olive-300/50"></div>

                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-t-olive-500 border-r-olive-300 border-b-olive-200 border-l-olive-100 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-10 h-10 text-olive-500" />
                  </div>

                  {/* Enhanced tactical corner elements */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-olive-500"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-olive-500"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-olive-500"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-olive-500"></div>

                  {/* Tactical crosshair */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-20 h-[0.5px] bg-olive-500/20"></div>
                    <div className="w-[0.5px] h-20 bg-olive-500/20 -mt-[10px] ml-[10px]"></div>
                  </div>
                </div>

                <div className="mt-6 text-stone-600 font-belleza text-xl relative">
                  <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 border border-olive-300/50"></span>
                  ЗАВАНТАЖЕННЯ ЗАМОВЛЕНЬ
                  <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 border border-olive-300/50"></span>
                </div>

                <p className="text-stone-500 text-sm mt-2">Будь ласка, зачекайте...</p>

                {/* Decorative bottom line */}
                <div className="mt-6 w-32 h-[1px] bg-olive-200"></div>
                <div className="mt-1 w-16 h-[1px] bg-olive-100"></div>
              </motion.div>
            ) : filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-20 bg-white border border-stone-200 shadow-sm relative"
              >
                {/* Additional tactical elements */}
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20&text=+')] bg-[length:20px_20px] opacity-[0.02]"></div>
                <div className="absolute top-1/4 left-1/4 w-6 h-6 border border-dashed border-olive-300/20"></div>
                <div className="absolute bottom-1/4 right-1/4 w-6 h-6 border border-dashed border-olive-300/20"></div>
                <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-olive-300/30"></div>
                <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-olive-300/30"></div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-olive-300 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-olive-300 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-olive-300 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-olive-300 pointer-events-none"></div>

                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-olive-50 flex items-center justify-center border border-olive-200">
                    <Package className="w-16 h-16 text-olive-300" />

                    {/* Tactical elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 border-l border-dashed border-olive-300/50"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-6 border-l border-dashed border-olive-300/50"></div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-1 border-t border-dashed border-olive-300/50"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-1 border-t border-dashed border-olive-300/50"></div>
                    </div>
                  </div>

                  {/* Pulsing circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-olive-200/50 animate-ping-slow"></div>
                </div>

                <h3 className="mt-8 font-belleza text-2xl text-stone-800">ЗАМОВЛЕННЯ НЕ ЗНАЙДЕНО</h3>
                <p className="mt-2 text-stone-500 text-center max-w-md">
                  За вашим запитом не знайдено жодного замовлення. Спробуйте змінити параметри пошуку або оформіть нове
                  замовлення.
                </p>

                <Button
                  className="mt-6 bg-olive-700 hover:bg-olive-800 text-white h-12 px-6 font-belleza tracking-wider shadow-md relative group overflow-hidden"
                  asChild
                >
                  <Link href="/catalog">
                    <span className="relative z-10">ПЕРЕЙТИ ДО КАТАЛОГУ</span>
                    <span className="absolute inset-0 bg-olive-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </Link>
                </Button>
              </motion.div>
            ) : (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-stone-200 shadow-sm relative overflow-hidden"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-olive-300 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-olive-300 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-olive-300 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-olive-300 pointer-events-none"></div>

                  {/* Additional tactical elements */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-olive-400/30 pointer-events-none"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-olive-400/30 pointer-events-none"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-olive-400/30 pointer-events-none"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-olive-400/30 pointer-events-none"></div>

                  {/* Tactical coordinates */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-olive-400/10 text-[8px] font-mono tracking-widest">
                    TACTICAL ORDER
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-olive-400/10 text-[8px] font-mono tracking-widest">
                    MILITARY GRADE
                  </div>

                  {/* Order header */}
                  <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between border-b border-stone-100 relative">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 md:w-10 h-8 md:h-10 rounded-full ${statusMap[order.status as keyof typeof statusMap].color} flex items-center justify-center mr-3`}
                        >
                          {statusMap[order.status as keyof typeof statusMap].icon}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-belleza text-lg md:text-xl text-stone-800">{order.id}</h3>
                            <Badge
                              className={`${statusMap[order.status as keyof typeof statusMap].color} border text-xs md:text-sm`}
                            >
                              {statusMap[order.status as keyof typeof statusMap].label}
                            </Badge>
                          </div>
                          <p className="text-stone-500 text-xs md:text-sm mt-1 flex items-center">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            {formatDate(order.date)}
                          </p>
                        </div>
                      </div>

                      <div className="md:ml-6 mt-3 md:mt-0">
                        <p className="text-stone-500 text-xs md:text-sm">
                          Спосіб оплати: <span className="text-stone-700">{order.paymentMethod}</span>
                        </p>
                        <p className="text-stone-500 text-xs md:text-sm">
                          Спосіб доставки: <span className="text-stone-700">{order.deliveryMethod}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end mt-4 md:mt-0">
                      <div className="font-belleza text-lg md:text-xl text-olive-700 mb-2">
                        {order.total.toLocaleString()} ₴
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-olive-300 text-olive-700 hover:bg-olive-50 hover:text-olive-800 hover:border-olive-400 font-medium text-xs md:text-sm"
                        onClick={() => toggleOrderExpansion(order.id)}
                      >
                        {expandedOrder === order.id ? (
                          <span className="flex items-center">
                            Згорнути деталі <ChevronUp className="ml-1 w-3 h-3 md:w-4 md:h-4" />
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Показати деталі <ChevronDown className="ml-1 w-3 h-3 md:w-4 md:h-4" />
                          </span>
                        )}
                      </Button>
                    </div>

                    {/* Status line */}
                    <div
                      className={`absolute top-0 left-0 h-1 w-full ${
                        order.status === "delivered"
                          ? "bg-olive-500"
                          : order.status === "in_transit"
                            ? "bg-blue-500"
                            : order.status === "processing"
                              ? "bg-amber-500"
                              : "bg-stone-500"
                      }`}
                    ></div>
                  </div>

                  {/* Order details */}
                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                          <h4 className="font-belleza text-lg text-stone-800 mb-4 flex items-center">
                            <Package className="w-5 h-5 mr-2 text-olive-600" />
                            ТОВАРИ В ЗАМОВЛЕННІ
                          </h4>

                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center p-2 md:p-3 bg-white border border-stone-200 rounded-md group hover:border-olive-300 transition-colors duration-300"
                              >
                                <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 overflow-hidden mr-3 md:mr-4 bg-olive-50/40 border border-olive-200/50 group-hover:border-olive-300/70 transition-colors duration-300">
                                  <div className="absolute top-0 left-0 w-2 md:w-3 h-2 md:h-3 border-t border-l border-olive-300 z-10 pointer-events-none"></div>
                                  <div className="absolute top-0 right-0 w-2 md:w-3 h-2 md:h-3 border-t border-r border-olive-300 z-10 pointer-events-none"></div>
                                  <div className="absolute bottom-0 left-0 w-2 md:w-3 h-2 md:h-3 border-b border-l border-olive-300 z-10 pointer-events-none"></div>
                                  <div className="absolute bottom-0 right-0 w-2 md:w-3 h-2 md:h-3 border-b border-r border-olive-300 z-10 pointer-events-none"></div>
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-grow min-w-0">
                                  <h5 className="font-medium text-stone-800 group-hover:text-olive-700 transition-colors duration-300 text-sm md:text-base truncate">
                                    {item.name}
                                  </h5>
                                  <div className="flex justify-between items-center mt-1">
                                    <p className="text-xs md:text-sm text-stone-500">Кількість: {item.quantity}</p>
                                    <p className="font-medium text-olive-700 text-xs md:text-sm">
                                      {item.price.toLocaleString()} ₴
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 md:p-6 grid grid-cols-1 gap-4 md:gap-6">
                          <div>
                            <h4 className="font-belleza text-base md:text-lg text-stone-800 mb-3 md:mb-4 flex items-center">
                              <Truck className="w-4 h-4 md:w-5 md:h-5 mr-2 text-olive-600" />
                              ІНФОРМАЦІЯ ПРО ДОСТАВКУ
                            </h4>
                            <Card className="p-3 md:p-4 border-stone-200 bg-white">
                              <div className="space-y-2 md:space-y-3">
                                <div>
                                  <p className="text-xs md:text-sm text-stone-500">Спосіб доставки:</p>
                                  <p className="font-medium text-stone-800 text-sm md:text-base">
                                    {order.deliveryMethod}
                                  </p>
                                </div>

                                {order.trackingNumber && (
                                  <div>
                                    <p className="text-xs md:text-sm text-stone-500">Номер відстеження:</p>
                                    <div className="flex items-center flex-wrap gap-2">
                                      <p className="font-medium text-olive-700 text-sm md:text-base">
                                        {order.trackingNumber}
                                      </p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 md:h-8 px-2 text-olive-600 hover:text-olive-700 hover:bg-olive-50 text-xs md:text-sm"
                                      >
                                        <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                        Відстежити
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <p className="text-xs md:text-sm text-stone-500">Статус доставки:</p>
                                  <div className="flex items-center mt-1">
                                    <div
                                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                                        order.status === "delivered"
                                          ? "bg-olive-500"
                                          : order.status === "in_transit"
                                            ? "bg-blue-500"
                                            : order.status === "processing"
                                              ? "bg-amber-500"
                                              : "bg-stone-500"
                                      } mr-2`}
                                    ></div>
                                    <p className="font-medium text-stone-800 text-sm md:text-base">
                                      {statusMap[order.status as keyof typeof statusMap].label}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>

                          <div>
                            <h4 className="font-belleza text-base md:text-lg text-stone-800 mb-3 md:mb-4 flex items-center">
                              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 mr-2 text-olive-600" />
                              ДЕТАЛІ ЗАМОВЛЕННЯ
                            </h4>

                            <Card className="p-3 md:p-4 border-stone-200 bg-white">
                              <div className="space-y-2 md:space-y-3">
                                <div className="flex justify-between">
                                  <p className="text-xs md:text-sm text-stone-500">Вартість товарів:</p>
                                  <p className="font-medium text-stone-800 text-sm md:text-base">
                                    {order.total.toLocaleString()} ₴
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-xs md:text-sm text-stone-500">Доставка:</p>
                                  <p className="font-medium text-olive-600 text-sm md:text-base">Безкоштовно</p>
                                </div>
                                <Separator className="my-2 bg-stone-200" />
                                <div className="flex justify-between">
                                  <p className="font-belleza text-sm md:text-base text-stone-800">ЗАГАЛЬНА СУМА:</p>
                                  <p className="font-belleza text-base md:text-xl text-olive-700">
                                    {order.total.toLocaleString()} ₴
                                  </p>
                                </div>
                              </div>

                              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-stone-100">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-olive-300 text-olive-700 hover:bg-olive-50 hover:text-olive-800 hover:border-olive-400 font-medium text-xs md:text-sm py-1 md:py-2"
                                >
                                  <Download className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                                  Завантажити чек
                                </Button>
                              </div>
                            </Card>
                          </div>
                        </div>

                        {/* Order timeline */}
                        <div className="p-6 pt-0">
                          <h4 className="font-belleza text-lg text-stone-800 mb-4 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-olive-600" />
                            ІСТОРІЯ ЗАМОВЛЕННЯ
                          </h4>

                          <div className="relative pl-8 border-l-2 border-stone-200 space-y-6 py-2">
                            {order.status === "delivered" && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-olive-100 border-4 border-white flex items-center justify-center">
                                  <CheckCircle className="w-6 h-6 text-olive-600" />
                                </div>
                                <div className="ml-4">
                                  <p className="font-medium text-stone-800">Замовлення доставлено</p>
                                  <p className="text-sm text-stone-500">
                                    {formatDate(
                                      new Date(new Date(order.date).getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}

                            {(order.status === "delivered" || order.status === "in_transit") && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center">
                                  <Truck className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                  <p className="font-medium text-stone-800">Замовлення в дорозі</p>
                                  <p className="text-sm text-stone-500">
                                    {formatDate(
                                      new Date(new Date(order.date).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}

                            {(order.status === "delivered" ||
                              order.status === "in_transit" ||
                              order.status === "processing") && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-amber-100 border-4 border-white flex items-center justify-center">
                                  <Package className="w-6 h-6 text-amber-600" />
                                </div>
                                <div className="ml-4">
                                  <p className="font-medium text-stone-800">Замовлення в обробці</p>
                                  <p className="text-sm text-stone-500">
                                    {formatDate(
                                      new Date(new Date(order.date).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="relative">
                              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-stone-100 border-4 border-white flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-stone-600" />
                              </div>
                              <div className="ml-4">
                                <p className="font-medium text-stone-800">Замовлення створено</p>
                                <p className="text-sm text-stone-500">{formatDate(order.date)}</p>
                              </div>
                            </div>

                            {order.status === "cancelled" && (
                              <div className="relative">
                                <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-stone-100 border-4 border-white flex items-center justify-center">
                                  <XCircle className="w-6 h-6 text-stone-600" />
                                </div>
                                <div className="ml-4">
                                  <p className="font-medium text-stone-800">Замовлення скасовано</p>
                                  <p className="text-sm text-stone-500">
                                    {formatDate(
                                      new Date(new Date(order.date).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative footer */}
      <div className="relative h-24 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-olive-50/10"></div>

        {/* Tactical grid overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20&text=+')] bg-[length:20px_20px] opacity-[0.02]"></div>

        {/* Decorative elements */}
        <div className="container max-w-7xl mx-auto px-4 h-full relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100"></div>
          <div className="absolute top-1/2 left-1/4 w-1/2 h-[1px] bg-olive-200/30"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 border border-dashed border-olive-300/20 rounded-full"></div>
              <div className="absolute inset-2 border border-dashed border-olive-300/10 rounded-full"></div>
              <div className="absolute inset-4 border border-dashed border-olive-300/5 rounded-full"></div>
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  )
}

export default MyOrdersPage

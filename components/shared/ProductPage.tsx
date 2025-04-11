"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Minus, Plus, Heart, Share2, Shield, Truck, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store } from "@/constants/store"
import { pretifyProductName } from "@/lib/utils"
import ContentView from "../pixel/ContentView"
import ProductVariantSelector from "../interface/ProductVariantSelector"
import AddToCart from "./AddToCart"
import BuyNow from "./BuyNow"
export default function ProductPage({
  productJson,
  selectParams,
}: {
  productJson: string
  selectParams: Record<string, { _id: string; value: string }[]>
}) {
  const product = JSON.parse(productJson)
  const pretifiedName = pretifyProductName(product.name, [], product.articleNumber || "", 0)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Handle quantity changes
  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  // Clean description
  const optimizedDescription = product.description.replace(/<p>\s*<\/p>/g, "")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-olive-700/20 border-t-olive-700 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="bg-stone-50 min-h-screen" itemScope itemType="https://schema.org/Product">
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: pretifiedName,
            image: product.images[0],
            description: product.description.replace(/<[^>]*>?/gm, ""),
            sku: product.articleNumber,
            mpn: product.articleNumber,
            brand: {
              "@type": "Brand",
              name: Store.name,
            },
            offers: {
              "@type": "Offer",
              url: `${Store.domain}/product/${product._id}`,
              price: product.priceToShow,
              priceCurrency: "UAH",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: Store.name,
              },
            },
          }),
        }}
      />

      {/* Pixel tracking */}
      <ContentView
        productName={pretifiedName}
        productCategory={product.category}
        productId={product._id}
        contentType="product"
        value={product.priceToShow}
        currency="UAH"
      />

      {/* Breadcrumbs */}
      <div className="bg-stone-100 py-3 border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div
            className="flex items-center text-sm text-stone-600"
            itemProp="breadcrumb"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-olive-700 transition-colors" itemProp="item">
                <span itemProp="name">Головна</span>
              </Link>
              <meta itemProp="position" content="1" />
            </span>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/catalog" className="hover:text-olive-700 transition-colors" itemProp="item">
                <span itemProp="name">Каталог</span>
              </Link>
              <meta itemProp="position" content="2" />
            </span>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                href={`/catalog?category=${encodeURIComponent(product.category)}`}
                className="hover:text-olive-700 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{product.category}</span>
              </Link>
              <meta itemProp="position" content="3" />
            </span>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-stone-400 truncate max-w-[200px]" itemProp="name">
              {pretifiedName}
            </span>
          </div>
        </div>
      </div>

      {/* Product section - Masterpiece Edition */}
      <section className="py-16 relative overflow-hidden">
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative"
          >
            {/* Decorative corner elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 border-olive-700/20 hidden lg:block"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 border-olive-700/20 hidden lg:block"></div>

            {/* Product images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 border border-stone-200 shadow-lg max-w-[500px] mx-auto lg:mx-0 lg:max-w-full lg:max-h-[700px]">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/30 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/30 z-20 pointer-events-none"></div>

                <Image
                  src={product.images[activeImage] || "/placeholder.svg"}
                  alt={pretifiedName}
                  fill
                  className="object-contain transition-transform duration-700 hover:scale-105"
                  itemProp="image"
                />

                {/* Discount badge with enhanced styling */}
                {product.price > product.priceToShow && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <div className="bg-olive-700 text-white px-3 py-1 text-xs tracking-wider font-medium">
                        -{Math.round((1 - product.priceToShow / product.price) * 100)}%
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                    </div>
                  </div>
                )}

                {/* Military-inspired decorative elements */}
                <div className="absolute bottom-4 left-4 text-white/30 text-xs font-mono">{product.articleNumber}</div>
              </div>

              {/* Enhanced thumbnail gallery */}
              <div className="grid grid-cols-4 gap-4 max-w-[500px] mx-auto lg:mx-0">
                {product.images.map((image: string, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`relative aspect-square overflow-hidden border ${
                      activeImage === index ? "border-olive-700 shadow-md" : "border-stone-200"
                    } transition-all duration-300`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${pretifiedName} - вигляд ${index + 1}`}
                      fill
                      className="object-contain transition-transform duration-500 hover:scale-110"
                    />
                    {activeImage === index && <div className="absolute inset-0 bg-olive-700/10"></div>}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product details with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-8 bg-olive-700/70"></div>
                  <span className="text-olive-700 text-xs tracking-[0.25em] uppercase font-light">
                    {product.category}
                  </span>
                </div>
                <h1 className="font-belleza text-4xl text-stone-800 mb-4 relative inline-block" itemProp="name">
                  {pretifiedName}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[1px] bg-olive-700/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  ></motion.span>
                </h1>
                <div className="text-sm text-stone-500 mt-4">Артикул: {product.articleNumber}</div>
              </div>

              {/* Enhanced price display */}
              <div className="flex items-center gap-4 bg-stone-100/50 p-4 border-l-2 border-olive-700/30">
                <span
                  className="font-belleza text-3xl text-stone-800"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <span itemProp="price">{product.priceToShow}</span> ₴
                  <meta itemProp="priceCurrency" content="UAH" />
                  <link itemProp="availability" href="https://schema.org/InStock" />
                </span>
                {product.price > product.priceToShow && (
                  <span className="text-stone-500 line-through">{product.price} ₴</span>
                )}
                {product.price > product.priceToShow && (
                  <span className="ml-auto bg-olive-700/10 text-olive-800 px-3 py-1 text-sm font-medium">
                    Економія {product.price - product.priceToShow} ₴
                  </span>
                )}
              </div>

              {/* Product variant selector */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <ProductVariantSelector selectParams={selectParams} productId={product._id} />
              </motion.div>

              {/* Enhanced quantity selector */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="font-belleza text-lg text-stone-800">Кількість</h3>
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={decreaseQuantity}
                    className="w-12 h-12 border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(10, Math.max(1, Number.parseInt(e.target.value) || 1)))}
                    className="w-16 h-12 border-t border-b border-stone-300 text-center text-stone-800 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={increaseQuantity}
                    className="w-12 h-12 border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <AddToCart
                  id={product._id}
                  name={pretifiedName}
                  image={product.images[0]}
                  price={product.priceToShow}
                  priceWithoutDiscount={product.price}
                  variant="large"
                />

                <BuyNow
                  id={product._id}
                  name={pretifiedName}
                  image={product.images[0]}
                  price={product.priceToShow}
                  priceWithoutDiscount={product.price}
                  className="relative flex-1 min-w-[200px]"
                />

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-stone-300 hover:border-olive-700 text-stone-700 hover:text-olive-700 rounded-none w-12 h-12 p-0 flex items-center justify-center relative overflow-hidden group"
                  >
                    <Heart className="h-5 w-5 relative z-10" />
                    <span className="absolute inset-0 bg-olive-700/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-stone-300 hover:border-olive-700 text-stone-700 hover:text-olive-700 rounded-none w-12 h-12 p-0 flex items-center justify-center relative overflow-hidden group"
                  >
                    <Share2 className="h-5 w-5 relative z-10" />
                    <span className="absolute inset-0 bg-olive-700/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Enhanced shipping & returns */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="space-y-4 pt-6 border-t border-stone-200"
              >
                <div className="flex items-start gap-3 p-3 hover:bg-stone-100/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-olive-700/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5 text-olive-700" />
                  </div>
                  <div>
                    <h4 className="font-belleza text-stone-800">Безкоштовна доставка</h4>
                    <p className="text-sm text-stone-600">При замовленні від 1000 ₴</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-stone-100/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-olive-700/10 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-olive-700" />
                  </div>
                  <div>
                    <h4 className="font-belleza text-stone-800">Повернення та обмін</h4>
                    <p className="text-sm text-stone-600">Протягом 14 днів</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-stone-100/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-olive-700/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-olive-700" />
                  </div>
                  <div>
                    <h4 className="font-belleza text-stone-800">Гарантія якості</h4>
                    <p className="text-sm text-stone-600">
                      {product.params.find((param: { name: string; value: string }) => param.name === "Гарантія")
                        ?.value || "12 місяців"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Military-inspired decorative element */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                viewport={{ once: true }}
                className="pt-6 text-center"
              >
                <div className="inline-block relative">
                  <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
                  <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
                  <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} QUALITY</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product details tabs */}
      <section className="py-16 bg-stone-100 border-t border-b border-stone-200">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="flex w-full overflow-x-auto justify-start bg-transparent rounded-none mx-auto h-auto relative z-10 border-b border-stone-300 mb-8 gap-8">
              {["description", "specifications", "shipping", "reviews"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-0 relative font-belleza py-4 text-stone-500 whitespace-nowrap hover:text-stone-900 transition-colors duration-300 data-[state=active]:text-stone-900 bg-transparent data-[state=active]:bg-transparent"
                >
                  <span className="relative z-10 tracking-wide text-base uppercase">
                    {tab === "description"
                      ? "ОПИС"
                      : tab === "specifications"
                        ? "ХАРАКТЕРИСТИКИ"
                        : tab === "shipping"
                          ? "ДОСТАВКА ТА ОПЛАТА"
                          : "ВІДГУКИ"}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-olive-700 scale-x-0 data-[state=active]:scale-x-100 transition-transform duration-300"></span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="max-w-3xl mx-auto prose prose-stone" itemProp="description">
                <div dangerouslySetInnerHTML={{ __html: optimizedDescription }} />
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <div className="max-w-3xl mx-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {product.params.map((param: { name: string; value: string }, index: number) => (
                      <tr key={param.name} className={index % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="py-3 px-4 border border-stone-200 font-belleza text-stone-800 w-1/3">
                          {param.name}
                        </td>
                        <td className="py-3 px-4 border border-stone-200 text-stone-600">
                          {param.value.replaceAll("_", " ")}
                        </td>
                      </tr>
                    ))}
                    <tr className={product.params.length % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                      <td className="py-3 px-4 border border-stone-200 font-belleza text-stone-800 w-1/3">Артикул</td>
                      <td className="py-3 px-4 border border-stone-200 text-stone-600">{product.articleNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-0">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white p-6 border border-stone-200">
                  <h3 className="font-belleza text-xl text-stone-800 mb-4">Доставка</h3>
                  <ul className="space-y-3 text-stone-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-olive-700 mt-2"></div>
                      <span>Нова Пошта: 1-2 робочих дні (безкоштовно від 1000 ₴)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-olive-700 mt-2"></div>
                      <span>Укрпошта: 2-4 робочих дні (безкоштовно від 1000 ₴)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-olive-700 mt-2"></div>
                      <span>Кур&apos;єрська доставка по Києву: 1 робочий день (безкоштовно від 1500 ₴)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 border border-stone-200">
                  <h3 className="font-belleza text-xl text-stone-800 mb-4">Оплата</h3>
                  <ul className="space-y-3 text-stone-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-olive-700 mt-2"></div>
                      <span>Оплата при отриманні (Нова Пошта, Укрпошта)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-olive-700 mt-2"></div>
                      <span>Банківська карта (Visa, MasterCard)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-olive-700 mt-2"></div>
                      <span>Безготівковий розрахунок для юридичних осіб</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="max-w-3xl mx-auto text-center py-8">
                <h3 className="font-belleza text-2xl text-stone-800 mb-4">Відгуки про товар</h3>
                <p className="text-stone-600 mb-6">Цей товар ще не має відгуків. Будьте першим, хто залишить відгук!</p>
                <Button className="bg-olive-700 hover:bg-olive-600 text-white rounded-none py-4 px-8 font-belleza tracking-wider">
                  НАПИСАТИ ВІДГУК
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

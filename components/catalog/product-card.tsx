"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Eye, Heart, ShoppingBag } from "lucide-react"
import AddToCart from "../shared/AddToCart"

export default function ProductCard({ product, email, gridView, onQuickView, isHovered }) {
  const [isLiked, setIsLiked] = useState(product.likedBy?.includes(email))

  // Handle like
  const handleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Toggle like state
    setIsLiked(!isLiked)

    // Here you would implement the API call to update likes in the database
    // For example: await likeProduct(product.id, email);
  }

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Here you would implement the cart functionality
    // For example: addToCart(product.id, 1);
  }

  return (
    <>
      {gridView === "grid" ? (
        // Grid view
        <div className="group">
          <Link href={`/catalog/${product.id}`} className="block w-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 border border-stone-200 mb-5 shadow-sm group-hover:shadow-xl transition-all duration-500 max-w-[450px] mx-auto lg:mx-0 w-full">
              {/* Enhanced corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/40 z-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/40 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/40 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/40 z-20 pointer-events-none"></div>

              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-1000 group-hover:scale-110 shadow-inner"
              />

              {/* Enhanced badges with animations */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                {product.discount && (
                  <motion.div
                    className="relative"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="bg-olive-700 text-white px-3 py-1 text-xs tracking-wider font-medium">
                      -{product.discount}%
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                  </motion.div>
                )}
                {product.isNew && (
                  <motion.div
                    className="relative"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="bg-stone-800 text-white px-3 py-1 text-xs tracking-wider font-medium">НОВИНКА</div>
                    <div className="absolute top-0 left-0 w-full h-full border border-stone-600/30 transform translate-x-1 translate-y-1"></div>
                  </motion.div>
                )}
                {product.isBestseller && (
                  <motion.div
                    className="relative"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="bg-amber-700 text-white px-3 py-1 text-xs tracking-wider font-medium">
                      БЕСТСЕЛЕР
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full border border-amber-600/30 transform translate-x-1 translate-y-1"></div>
                  </motion.div>
                )}
              </div>

              {/* Enhanced stock status */}
              <div className="absolute top-4 left-4 z-20">
                <div
                  className={`px-3 py-1 text-xs tracking-wider font-medium ${
                    product.stockStatus === "В наявності" ? "bg-green-700/80 text-white" : "bg-amber-600/80 text-white"
                  }`}
                >
                  {product.stockStatus}
                </div>
              </div>

              {/* Enhanced tactical coordinates */}
              <div className="absolute bottom-4 left-4 text-white/40 text-xs font-mono z-20">{product.coordinates}</div>

              {/* Enhanced Quick actions overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                <div className="w-full space-y-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px w-8 bg-olive-500/70"></div>
                    <p className="text-olive-300 text-xs tracking-[0.2em] uppercase">{product.category}</p>
                  </div>

                  <h3 className="font-belleza text-xl text-white mb-4">{product.name}</h3>

                  {/* Product specs */}
                  {product.specs?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.specs.map((spec, i) => (
                        <span key={i} className="bg-white/10 backdrop-blur-sm text-white/90 text-xs px-2 py-1">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 max-w-[300px]">
                    <AddToCart
                      id={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      priceWithoutDiscount={product.priceWithoutDiscount || product.price}
                      variant="quick-add"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 ${isLiked ? "bg-white/30" : "bg-white/20"} backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-colors`}
                      onClick={handleLike}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? "fill-white" : ""}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onQuickView(product.id)
                      }}
                    >
                      <Eye className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div>
            <div className="mb-1 text-xs text-olive-700 tracking-wider uppercase flex items-center gap-2">
              <span>{product.category}</span>
              {/* Rating stars */}
              <div className="flex items-center ml-auto">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={i < product.rating ? "text-amber-500 fill-amber-500" : "text-stone-300"}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>

            <h3 className="font-belleza text-xl text-stone-800 group-hover:text-olive-700 transition-colors duration-300 mb-2">
              <Link href={`/catalog/${product.id}`}>{product.name}</Link>
            </h3>

            <div className="flex items-center gap-3 mb-3">
              <span className="font-belleza text-xl text-stone-800">{product.price} ₴</span>
              {product.priceWithoutDiscount && (
                <span className="text-sm text-stone-500 line-through">{product.priceWithoutDiscount} ₴</span>
              )}
              {product.discount && (
                <span className="bg-olive-700/10 text-olive-800 text-xs px-2 py-1 font-medium">
                  Економія {product.priceWithoutDiscount - product.price} ₴
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        // List view
        <div className="flex gap-8 group">
          <Link href={`/catalog/${product.id}`} className="w-1/3 flex-shrink-0">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group-hover:shadow-xl transition-all duration-500">
              {/* Enhanced corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/40 z-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/40 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/40 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/40 z-20 pointer-events-none"></div>

              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-1000 group-hover:scale-110 shadow-inner"
              />

              {/* Enhanced badges */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                {product.discount && (
                  <div className="relative">
                    <div className="bg-olive-700 text-white px-3 py-1 text-xs tracking-wider font-medium">
                      -{product.discount}%
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                  </div>
                )}
                {product.isNew && (
                  <div className="relative">
                    <div className="bg-stone-800 text-white px-3 py-1 text-xs tracking-wider font-medium">НОВИНКА</div>
                    <div className="absolute top-0 left-0 w-full h-full border border-stone-600/30 transform translate-x-1 translate-y-1"></div>
                  </div>
                )}
              </div>

              {/* Enhanced stock status */}
              <div className="absolute top-4 left-4 z-20">
                <div
                  className={`px-3 py-1 text-xs tracking-wider font-medium ${
                    product.stockStatus === "В наявності" ? "bg-green-700/80 text-white" : "bg-amber-600/80 text-white"
                  }`}
                >
                  {product.stockStatus}
                </div>
              </div>
            </div>
          </Link>

          <div className="flex-1">
            <div className="mb-1 text-xs text-olive-700 tracking-wider uppercase flex items-center gap-2">
              <span>{product.category}</span>
              {/* Rating stars */}
              <div className="flex items-center ml-auto">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={i < product.rating ? "text-amber-500 fill-amber-500" : "text-stone-300"}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>

            <h3 className="font-belleza text-xl text-stone-800 group-hover:text-olive-700 transition-colors duration-300 mb-2">
              <Link href={`/catalog/${product.id}`}>{product.name}</Link>
            </h3>

            <p className="text-stone-600 mb-4 line-clamp-3">
              {product.description ||
                "Військово-натхненний дизайн з увагою до деталей. Функціональність та стиль для повсякденного використання."}
            </p>

            {/* Product specs in list view */}
            {product.specs?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.specs.map((spec, i) => (
                  <span key={i} className="bg-stone-100 text-stone-700 text-xs px-2 py-1 border-l-2 border-olive-700">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mb-3">
              <span className="font-belleza text-xl text-stone-800">{product.price} ₴</span>
              {product.priceWithoutDiscount && (
                <span className="text-sm text-stone-500 line-through">{product.priceWithoutDiscount} ₴</span>
              )}
              {product.discount && (
                <span className="bg-olive-700/10 text-olive-800 text-xs px-2 py-1 font-medium">
                  Економія {product.priceWithoutDiscount - product.price} ₴
                </span>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="bg-olive-700 hover:bg-olive-600 text-white rounded-none py-3 px-6 font-belleza tracking-wider flex items-center gap-2 group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" /> ДОДАТИ ДО КОШИКА
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
              </Button>
              <Button
                variant="outline"
                onClick={handleLike}
                className={`border-stone-300 hover:border-olive-700 ${isLiked ? "text-olive-700 border-olive-700" : "text-stone-700"} hover:text-olive-700 rounded-none w-10 h-10 p-0 flex items-center justify-center`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-olive-700" : ""}`} />
              </Button>
              <Button
                variant="outline"
                className="border-stone-300 hover:border-olive-700 text-stone-700 hover:text-olive-700 rounded-none w-10 h-10 p-0 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onQuickView(product.id)
                }}
              >
                <Eye className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

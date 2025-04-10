"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X, Minus, Plus } from "lucide-react"
import { useAppContext } from "@/app/(root)/context"
import { trackFacebookEvent } from "@/helpers/pixel"
import type { ProductType } from "@/lib/types/types"

const CartSidebar = ({ setIsOpened }: { setIsOpened: (value: boolean) => void }) => {
  // @ts-ignore
  const { cartData, setCartData, priceToPay, setPriceToPay } = useAppContext()

  function hideCart() {
    setIsOpened(false)
  }

  function removeProduct(index: number, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    cartData.splice(index, 1)
    setCartData((prev: any) => [...prev], cartData)
  }

  function setCount(index: number, value: string) {
    const numValue = Number(value)
    if (Number.isInteger(numValue) && numValue > 0) {
      const newCartData = [...cartData]
      newCartData[index].quantity = numValue
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
    hideCart()

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
    .toFixed(0)

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <h2 className="font-belleza text-2xl tracking-wide">КОШИК</h2>
          <div className="bg-olive-700 text-white text-xs px-2 py-1 rounded-sm">{cartData.length} ТОВ.</div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            onClick={hideCart}
            className="text-white/80 hover:text-white text-sm flex items-center transition-colors duration-300 group"
          >
            <ShoppingCart size={16} className="mr-1" />
            <span className="relative">
              Повний кошик
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <button
            onClick={hideCart}
            className="text-white/80 hover:text-white transition-colors relative group"
            aria-label="Закрити кошик"
          >
            <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/20 transition-all duration-300 scale-0 group-hover:scale-100" />
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-grow overflow-auto p-6">
        {cartData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-stone-800/80 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-olive-400" />
            </div>
            <p className="text-stone-300 font-light mb-2">Ваш кошик порожній</p>
            <p className="text-stone-500 text-sm max-w-xs mx-auto">
              Здається, ви ще не додали жодного товару до кошика
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartData.map((item: any, index: number) => (
              <div key={index} className="group">
                <Link href={`/catalog/${item.id}`} className="block">
                  <div className="flex gap-4 p-4 border border-stone-800/50 bg-stone-800/20 group-hover:bg-stone-800/40 transition-colors duration-300">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-olive-700/30 z-10 pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-olive-700/30 z-10 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-olive-700/30 z-10 pointer-events-none"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-olive-700/30 z-10 pointer-events-none"></div>
                      <Image
                        width={80}
                        height={80}
                        alt={item.name}
                        className="object-cover w-full h-full"
                        src={item.image || "/placeholder.svg"}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-xs text-olive-400 tracking-wider uppercase mb-1">{item.category}</p>
                          <h3 className="font-belleza text-white group-hover:text-olive-300 transition-colors duration-300">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={(e) => removeProduct(index, e)}
                          className="text-stone-400 hover:text-olive-400 ml-1 flex-shrink-0 transition-colors duration-300"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-stone-700 rounded-none bg-stone-800/50">
                          <Button
                            onClick={(e) => minus(index, e)}
                            variant="ghost"
                            className="p-0 h-7 w-7 rounded-none hover:bg-olive-800 hover:text-white"
                          >
                            <Minus size={14} />
                          </Button>
                          <input
                            className="w-8 h-7 text-center focus:outline-none bg-transparent text-white"
                            value={item.quantity}
                            onChange={(e) => setCount(index, e.target.value)}
                            onBlur={(e) => delProduct(index, e.target.value)}
                            maxLength={3}
                          />
                          <Button
                            onClick={(e) => plus(index, e)}
                            variant="ghost"
                            className="p-0 h-7 w-7 rounded-none hover:bg-olive-800 hover:text-white"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <div className="text-right">
                          {item.priceWithoutDiscount !== item.price && (
                            <p className="text-sm font-normal text-stone-500 line-through">
                              {item.priceWithoutDiscount} ₴
                            </p>
                          )}
                          <p className="font-belleza text-white">{item.price} ₴</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-stone-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-stone-300 font-light">Разом:</span>
          <span className="font-belleza text-2xl text-white">{totalPrice} ₴</span>
        </div>
        <div className="space-y-3">
          <Link href="/order" className="block w-full" onClick={handleCheckout}>
            <Button
              disabled={cartData.length === 0}
              className="w-full bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 font-belleza tracking-wider"
            >
              ОФОРМИТИ ЗАМОВЛЕННЯ
            </Button>
          </Link>
          <Button
            onClick={hideCart}
            variant="outline"
            className="w-full bg-transparent hover:bg-stone-800 text-white border border-stone-700 hover:border-white rounded-none py-5 font-belleza tracking-wider"
          >
            ПРОДОВЖИТИ ПОКУПКИ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartSidebar

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, User, ChevronRight } from "lucide-react"
import Link from "next/link"
import CartSidebar from "./cart-sidebar"
import { useAppContext } from "@/app/(root)/context"
import { Store } from "@/constants/store"
import { signIn, signOut, useSession } from "next-auth/react"

// Replace the existing menuItems array with the one provided by the user

// Remove the collections array as it's not needed anymore

// Update the Header component to include the isAuthenticated state
export default function Header({ currentUserId, role }: { currentUserId: string, role: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  // This is a mock state - in a real app, you would get this from your auth context/provider
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  const { cartData } = useAppContext()

  const menuItems = [
    { name: "ГОЛОВНА", href: "/" },
    { name: "КАТАЛОГ", href: "/catalog?page=1&sort=default" },
    { name: "УПОДОБАНІ", href: `/liked/${currentUserId}`, requiresAuth: true },
    { name: "МОЇ ЗАМОВЛЕННЯ", href: `/myOrders/user/${currentUserId}`, requiresAuth: true },
    { name: "КОНТАКТИ", href: "/contact-us" },
    { name: "ДОСТАВКА", href: "/delivery" },
    { name: "ГАРАНТІЯ ТА СЕРВІСИ", href: "/warranty" },
    { name: "РОЗМІРИ", href: "/size-guide" },
    { name: "НАША ІСТОРІЯ", href: "/our-history" },
  ]

  // Calculate the total number of items in cart
  const cartItemCount = cartData ? cartData.reduce((total: number, item: any) => total + item.quantity, 0) : 0

  const { status } = useSession();

  useEffect(() => {
    if(status === "authenticated") {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [status])

  // Handle component mount to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Set initial scroll state
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!mounted) return

    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen, mounted])

  const handleAuth = () => {
    if(status === "authenticated") {
      signOut();
    } else {
      signIn();
    }
  }
  // Don't render anything until client-side
  if (!mounted) {
    return (
      <header className="h-[72px] md:h-[80px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-full">{/* Empty placeholder for SSR */}</div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3 bg-black shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "py-5 bg-black"
        } border-b ${scrolled ? "border-stone-800" : "border-transparent"}`}
        style={{ marginBottom: "-1px" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced styling */}
            <Link href="/" className="font-belleza text-3xl text-white tracking-wider relative group">
              <span className="relative z-10">{Store.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Right side icons - more elegant spacing, removed search */}
            <div className="flex items-center space-x-7">
              <Link
                href="/login"
                className="text-white/90 hover:text-white transition-colors hidden md:block relative group"
              >
                <User className="h-5 w-5" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <button
                className="text-white/90 hover:text-white transition-colors relative group"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-olive-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white/90 hover:text-white transition-colors relative group"
                aria-label="Відкрити меню"
              >
                <Menu className="h-6 w-6" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add spacer to prevent content from being hidden under fixed header */}
      <div className="h-[72px] md:h-[80px] bg-black"></div>

      {/* Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-in Menu - Masterpiece Edition */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-stone-900 to-stone-950 z-50 overflow-hidden"
          >
            <div className="p-8 h-full flex flex-col relative">
              {/* Subtle background elements */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

              <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-olive-700/20 to-transparent pointer-events-none" />

              <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-700/30 to-transparent pointer-events-none"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              {/* Menu Header - Refined */}
              <div className="flex justify-between items-center mb-12 pb-4 relative">
                <div className="relative">
                  <h2 className="font-belleza text-3xl text-white tracking-wide">МЕНЮ</h2>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-[1px] bg-olive-700/50"
                    initial={{ width: 0 }}
                    animate={{ width: "50%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/80 hover:text-white transition-colors relative group"
                  aria-label="Закрити меню"
                >
                  <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/20 transition-all duration-300 scale-0 group-hover:scale-100" />
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Items - Enhanced */}
              <nav className="flex-1 pr-2 overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-military">
                <ul className="space-y-1">
                  {["Admin", "Owner"].includes(role) && role && (
                    <motion.li
                      key="Admin"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center justify-between py-4 px-5 text-white/80 hover:text-white hover:bg-white/5 rounded-sm transition-all duration-300 group relative overflow-hidden"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.span className="absolute left-0 top-0 bottom-0 w-[2px] bg-olive-700/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                        <span className="font-belleza tracking-wide relative">
                          АДМІН
                          <motion.span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-olive-700/40 group-hover:w-full transition-all duration-500" />
                        </span>

                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      </Link>
                    </motion.li>
                  )}

                  {menuItems.map((item, index) => {
                    if (item.requiresAuth && !isAuthenticated) return null

                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (index + (["Admin", "Owner"].includes(role) && role  ? 1 : 0)) * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-between py-4 px-5 text-white/80 hover:text-white hover:bg-white/5 rounded-sm transition-all duration-300 group relative overflow-hidden"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <motion.span className="absolute left-0 top-0 bottom-0 w-[2px] bg-olive-700/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                          <span className="font-belleza tracking-wide relative">
                            {item.name}
                            <motion.span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-olive-700/40 group-hover:w-full transition-all duration-500" />
                          </span>

                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* Menu Footer - Refined */}
              <div className="mt-auto pt-8 border-t border-stone-800/50 relative">
                <motion.div
                  className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive-700/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                <div className="flex flex-col space-y-6">
                  <button
                    className="flex items-center text-white/70 hover:text-white transition-colors group"
                    onClick={() => {
                      setIsAuthenticated(!isAuthenticated);
                      handleAuth();
                      setIsMenuOpen(false)
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-stone-800/80 flex items-center justify-center mr-4 group-hover:bg-olive-900/30 transition-colors duration-300">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-belleza tracking-wide">{isAuthenticated ? "ВИЙТИ" : "УВІЙТИ"}</span>
                  </button>

                  <div className="flex items-center text-white/70 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-stone-800/80 flex items-center justify-center mr-4 group-hover:bg-olive-900/30 transition-colors duration-300">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <span className="font-belleza tracking-wide">КОШИК</span>
                    {cartItemCount > 0 && (
                      <span className="ml-2 bg-olive-700/80 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-8 text-white/40 text-sm">
                  <p>© {new Date().getFullYear()} {Store.name}. Всі права захищені.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-stone-900 to-stone-950 z-50 overflow-hidden"
            >
              <CartSidebar setIsOpened={setIsCartOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

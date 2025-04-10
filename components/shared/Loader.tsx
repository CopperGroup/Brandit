"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Store } from "@/constants/store"

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEM")

  useEffect(() => {
    const loadingTexts = [
      "INITIALIZING SYSTEM",
      "ESTABLISHING SECURE CONNECTION",
      "LOADING TACTICAL INTERFACE",
      "CALIBRATING DISPLAY PARAMETERS",
      "AUTHENTICATING USER CREDENTIALS",
      "PREPARING TACTICAL DATA",
      "SYSTEM READY",
    ]

    let currentTextIndex = 0

    // Update loading text
    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % loadingTexts.length
      setLoadingText(loadingTexts[currentTextIndex])
    }, 1500)

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 400)

    // Complete loading
    setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }, 4500)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]"
        >
          <div className="relative w-full max-w-md px-8">
            {/* Tactical frame */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-olive-500"></div>
            <div className="absolute -top-6 -right-6 w-12 h-12 border-t-2 border-r-2 border-olive-500"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-2 border-l-2 border-olive-500"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-olive-500"></div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-olive-500 rotate-45"></div>
                <div className="absolute inset-0 border border-olive-300/50 rotate-45 scale-[0.8]"></div>
                <span className="text-olive-500 font-bold text-xl">{Store.name}</span>
              </div>
            </motion.div>

            {/* Loading bar */}
            <div className="relative h-2 w-full bg-olive-900/30 mb-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-olive-500"
              />

              {/* Scan line effect */}
              <motion.div
                initial={{ left: "-20%" }}
                animate={{ left: "120%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "linear",
                }}
                className="absolute top-0 h-full w-[20%] bg-gradient-to-r from-transparent via-olive-300/40 to-transparent"
              />
            </div>

            {/* Progress text */}
            <div className="flex justify-between text-xs text-olive-500 mb-6">
              <span>SYS.INIT</span>
              <span>{Math.round(progress)}%</span>
            </div>

            {/* Loading text */}
            <motion.div
              key={loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-olive-400 text-sm font-mono tracking-wider"
            >
              {loadingText}
            </motion.div>

            {/* Tactical details */}
            <div className="absolute -bottom-12 left-0 right-0 flex justify-between text-[10px] text-olive-700/70 font-mono">
              <span>TACTICAL INTERFACE v2.4.1</span>
              <span>SECURE CONNECTION ESTABLISHED</span>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-[10px] text-olive-700/70 font-mono">
            LAT: 50°27′N
            <br />
            LON: 30°31′E
          </div>

          <div className="absolute bottom-4 left-4 text-[10px] text-olive-700/70 font-mono">
            SYSTEM: OPERATIONAL
            <br />
            SECURITY: ACTIVE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


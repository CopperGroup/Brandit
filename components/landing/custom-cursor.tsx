"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Crosshair } from "lucide-react"

export default function CustomCursor() {
  // Use refs for direct DOM manipulation without re-renders
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorCrosshairRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorText = cursorTextRef.current
    const cursorRing = cursorRingRef.current
    const cursorDot = cursorDotRef.current
    const cursorCrosshair = cursorCrosshairRef.current

    if (!cursor || !cursorText || !cursorRing || !cursorDot || !cursorCrosshair) return

    let isVisible = false
    let lastX = 0
    let lastY = 0
    let frameId: number

    // Smooth cursor movement with RAF
    const smoothMoveCursor = (e: MouseEvent) => {
      const targetX = e.clientX
      const targetY = e.clientY

      const moveCursor = () => {
        // Calculate distance between current position and target
        const dx = targetX - lastX
        const dy = targetY - lastY

        // Ease the movement (adjust the divisor for faster/slower movement)
        lastX += dx / 5
        lastY += dy / 5

        // Apply cursor position with transform for better performance
        cursor.style.transform = `translate(${lastX}px, ${lastY}px)`

        // Continue animation if not close enough to target
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          frameId = requestAnimationFrame(moveCursor)
        }
      }

      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(moveCursor)

      // Show/hide cursor based on whether we're in the banner section
      const inBannerSection = (e.target as Element).closest(".banner-section")

      if (inBannerSection && !isVisible) {
        cursor.style.opacity = "1"
        isVisible = true
      } else if (!inBannerSection && isVisible) {
        cursor.style.opacity = "0"
        isVisible = false
      }
    }

    // Handle button hover
    const handleButtonEnter = () => {
      cursor.classList.add("cursor-active")
      cursorText.style.opacity = "1"
      cursorRing.style.borderColor = "rgba(255, 255, 255, 0.8)"
      cursorDot.style.opacity = "0"
      cursorCrosshair.style.opacity = "0"

      // Add tactical animation
      cursor.classList.add("cursor-tactical-active")
    }

    const handleButtonLeave = () => {
      cursor.classList.remove("cursor-active")
      cursor.classList.remove("cursor-tactical-active")
      cursorText.style.opacity = "0"
      cursorRing.style.borderColor = "rgba(255, 255, 255, 0.6)"
      cursorDot.style.opacity = "1"
      cursorCrosshair.style.opacity = "1"
    }

    // Handle mouse down/up
    const handleMouseDown = () => {
      cursor.classList.add("cursor-down")
      cursorRing.style.transform = "scale(0.9)"
    }

    const handleMouseUp = () => {
      cursor.classList.remove("cursor-down")
      cursorRing.style.transform = "scale(1)"
    }

    // Add event listeners
    document.addEventListener("mousemove", smoothMoveCursor)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    const shopButton = document.querySelector(".shop-button")
    if (shopButton) {
      shopButton.addEventListener("mouseenter", handleButtonEnter)
      shopButton.addEventListener("mouseleave", handleButtonLeave)
    }

    // Get the banner section
    const bannerSection = document.querySelector(".banner-section")
    if (!bannerSection) return

    // Add hover effect to shop button
    const handleButtonEnterShop = () => {
      shopButton.classList.add("button-hover")
    }

    const handleButtonLeaveShop = () => {
      shopButton.classList.remove("button-hover")
    }

    // Add event listeners
    if (shopButton) {
      shopButton.addEventListener("mouseenter", handleButtonEnterShop)
      shopButton.addEventListener("mouseleave", handleButtonLeaveShop)
    }

    return () => {
      cancelAnimationFrame(frameId)
      document.removeEventListener("mousemove", smoothMoveCursor)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)

      if (shopButton) {
        shopButton.removeEventListener("mouseenter", handleButtonEnter)
        shopButton.removeEventListener("mouseleave", handleButtonLeave)
        shopButton.removeEventListener("mouseenter", handleButtonEnterShop)
        shopButton.removeEventListener("mouseleave", handleButtonLeaveShop)
      }
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 opacity-0 transition-opacity duration-300"
      style={{
        width: "40px",
        height: "40px",
        marginLeft: "-20px",
        marginTop: "-20px",
      }}
    >
      {/* Military-inspired cursor with tactical elements */}
      <div
        ref={cursorRingRef}
        className="absolute inset-0 rounded-full border-2 border-white/60 transition-all duration-200 cursor-ring"
      ></div>

      <div
        ref={cursorDotRef}
        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      ></div>

      <div ref={cursorCrosshairRef} className="absolute inset-0 opacity-70 transition-opacity duration-200">
        <Crosshair className="w-full h-full text-white/60 opacity-70" />
      </div>

      {/* Tactical coordinates */}
      <div className="absolute -bottom-5 -right-10 text-white/40 text-[8px] font-mono tracking-tight">
        X:<span className="text-olive-400/80">00.00</span> Y:<span className="text-olive-400/80">00.00</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={cursorTextRef}
          className="text-white font-belleza flex items-center gap-2 tracking-wider opacity-0 transition-opacity duration-300 bg-black/40 backdrop-blur-md px-4 py-2 rounded-none border border-olive-500/50 relative"
        >
          <span className="relative z-10">КАТАЛОГ</span>
          <ArrowRight className="h-4 w-4 relative z-10" />
          <div className="absolute top-0 left-0 w-full h-full bg-olive-800/20"></div>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-olive-400/80"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-olive-400/80"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-olive-400/80"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-olive-400/80"></div>
        </div>
      </div>

      <style jsx>{`
  .cursor-active {
    width: 140px !important;
    height: 140px !important;
    margin-left: -70px !important;
    margin-top: -70px !important;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    border-radius: 0 !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .cursor-active .cursor-ring {
    border-color: white;
    border-radius: 0 !important;
    animation: none;
  }
  
  .cursor-down {
    transform: scale(0.9) !important;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.6; }
  }
  
  .cursor-ring {
    animation: pulse 2s infinite ease-in-out;
  }
  
  @keyframes tactical-scan {
    0% { height: 0; top: 0; opacity: 0.7; }
    30% { height: 100%; top: 0; opacity: 0.7; }
    60% { height: 0; top: 100%; opacity: 0.7; }
    100% { height: 0; top: 0; opacity: 0.7; }
  }
  
  .cursor-tactical-active::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    background: linear-gradient(to bottom, transparent, rgba(150, 164, 119, 0.5), transparent);
    animation: tactical-scan 2s infinite;
    z-index: -1;
  }
  
  .cursor-tactical-active::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 1px dashed rgba(150, 164, 119, 0.3);
    opacity: 0;
    animation: fade-in-out 2s infinite alternate;
  }
  
  @keyframes fade-in-out {
    0% { opacity: 0.2; }
    100% { opacity: 0.6; }
  }
`}</style>
    </div>
  )
}


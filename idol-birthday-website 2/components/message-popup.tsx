"use client"

import { useEffect } from "react"

interface MessagePopupProps {
  isOpen: boolean
  onClose: () => void
  message: {
    username: string
    message: string
    emoji?: string
    year: string
  } | null
}

export function MessagePopup({ isOpen, onClose, message }: MessagePopupProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !message) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Popup Container */}
      <div className="relative w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Outer Green Border */}
        <div
          className="w-full h-full border-8"
          style={{
            backgroundColor: "#15803d",
            borderStyle: "solid",
            borderWidth: "8px",
            borderColor: "#15803d",
          }}
        >
          {/* Inner Yellow Border */}
          <div
            className="w-full h-full border-4 flex flex-col"
            style={{
              backgroundColor: "#fbbf24",
              borderStyle: "solid",
              borderWidth: "4px",
              borderColor: "#fbbf24",
            }}
          >
            {/* Content Area */}
            <div
              className="flex-1 flex flex-col relative"
              style={{
                backgroundColor: "#f5f5dc",
                minHeight: "400px",
              }}
            >
              {/* Header Section */}
              <div
                className="flex items-center justify-between px-4 py-3 relative"
                style={{
                  backgroundColor: "#22c55e",
                  borderBottom: "2px solid #15803d",
                }}
              >
                {/* Left side with seal icon and username */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src="/seal_icon_1.png"
                      alt="Seal icon"
                      className="w-10 h-10 object-contain"
                      style={{
                        imageRendering: "pixelated",
                        imageRendering: "-moz-crisp-edges",
                        imageRendering: "crisp-edges",
                      }}
                    />
                  </div>
                  <span className="text-black pixel-font font-bold text-sm">from {message.username}</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 hover:scale-105 transition-transform flex items-center justify-center"
                  style={{
                    background: "transparent",
                    border: "none",
                  }}
                >
                  <img
                    src="/x_button.png"
                    alt="Close"
                    className="w-8 h-8 object-contain"
                    style={{
                      imageRendering: "pixelated",
                      imageRendering: "-moz-crisp-edges",
                      imageRendering: "crisp-edges",
                    }}
                  />
                </button>
              </div>

              {/* Message Content with Scroll */}
              <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-200">
                <div className="space-y-4">
                  {/* Emoji Display */}
                  {message.emoji && (
                    <div className="text-center mb-4">
                      <span className="text-4xl">{message.emoji}</span>
                    </div>
                  )}

                  {/* Message Text */}
                  <div className="text-black pixel-font leading-relaxed text-sm">
                    <p className="whitespace-pre-wrap break-words">{message.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

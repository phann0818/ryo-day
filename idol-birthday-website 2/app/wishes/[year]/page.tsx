"use client"

import Link from "next/link"
import { ArrowLeft, RefreshCw, AlertCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useMessages } from "@/hooks/use-messages"
import { MessagePopup } from "@/components/message-popup"
import { useRef, useCallback, useState } from "react"

interface Message {
  username: string
  message: string
  emoji?: string
  year: string
}

export default function WishesPage({ params }: { params: { year: string } }) {
  const { messages, loading, error, hasMore, total, loadMore, refresh } = useMessages(params.year)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Truncate message to 120 characters
  const truncateMessage = (message: string, maxLength = 120) => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength) + "..."
  }

  // Handle popup open
  const openPopup = (message: Message) => {
    setSelectedMessage(message)
    setIsPopupOpen(true)
  }

  // Handle popup close
  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedMessage(null)
  }

  // Infinite scroll implementation
  const lastMessageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, loadMore],
  )

  // 15 Sample messages for testing
  const sampleMessages = [
    {
      username: "ファン1",
      message:
        "ベトナムの皆さんからは、このウェブサイトを通して、NCT WISHのメンバーであるリョウに私たちの願いを届けたいと思っています。私たちの願いを通じて、リョウがもっと高く、さらに強く、健康に成長し、NCT WISHと共に素晴らしいアイドルになるように。リョウの笑顔が私たちの心を温かくしてくれます。いつも応援しています！あなたの才能と努力にいつも感動しています。これからも健康で幸せでいてください。\n\nあなたの歌声に癒されています。いつも素敵なパフォーマンスをありがとう。これからもずっと応援しています。ベトナムのファンとして誇りに思います。お体に気をつけて、いつまでも輝いていてください。",
      emoji: "🌟",
      year: params.year,
    },
    {
      username: "ファン2",
      message:
        "リョウくん、お誕生日おめでとうございます！あなたの才能と努力にいつも感動しています。これからも健康で幸せでいてください。ベトナムから愛を込めて。あなたの歌声に癒されています。いつも素敵なパフォーマンスをありがとう。\n\nあなたの笑顔が世界を明るくします。いつも幸せをありがとう。これからも素晴らしい音楽を聞かせてください。ベトナムから愛を送ります。",
      emoji: "💫",
      year: params.year,
    },
    {
      username: "ファン3",
      message:
        "ベトナムの皆さんからは、このウェブサイトを通して、NCT WISHのメンバーであるリョウに私たちの願いを届けたいと思っています。私たちの願いを通じて、リョウがもっと高く、さらに強く、健康に成長し、NCT WISHと共に素晴らしいアイドルになるように。頑張って！あなたのダンスが大好きです。いつも元気をもらっています。\n\nあなたのパフォーマンスを見るたびに元気をもらっています。これからもずっと応援しています。",
      emoji: "✨",
      year: params.year,
    },
    {
      username: "ファン4",
      message:
        "リョウくん、いつも素敵なパフォーマンスをありがとう！あなたの歌声に癒されています。これからもずっと応援しています。\n\nあなたの優しさと才能に心から感謝しています。これからも素晴らしい音楽を聞かせてください。",
      emoji: "🎉",
      year: params.year,
    },
    {
      username: "ファン5",
      message:
        "ベトナムの皆さんからは、このウェブサイトを通して、NCT WISHのメンバーであるリョウに私たちの願いを届けたいと思っています。私たちの願いを通じて、リョウがもっと高く、さらに強く、健康に成長し、NCT WISHと共に素晴らしいアイドルになるように。愛しています。あなたの笑顔が世界を明るくします。いつも幸せをありがとう。\n\nあなたの存在が私たちの希望です。いつも応援しています。あなたのファンでいることを誇りに思います。",
      emoji: "💖",
      year: params.year,
    },
    {
      username: "ファン6",
      message:
        "リョウくん、あなたの努力と情熱にいつも感動しています。これからも応援し続けます。ベトナムのファンより愛を込めて。健康に気をつけてくださいね。あなたの優しさと才能に心から感謝しています。\n\nこれからも素晴らしい音楽を聞かせてください。ベトナムから愛を送ります。",
      emoji: "🌈",
      year: params.year,
    },
    {
      username: "ファン7",
      message:
        "Happy Birthday Ryo! あなたの夢が全て叶いますように。ベトナムから応援しています！いつも幸せをありがとう。\n\nあなたの成功を心から祈っています。これからも応援し続けます。",
      emoji: "🎂",
      year: params.year,
    },
    {
      username: "ファン8",
      message:
        "リョウくん、あなたのパフォーマンスを見るたびに元気をもらっています。これからもずっと応援しています。ベトナムのファンとして誇りに思います。お体に気をつけて、いつまでも輝いていてください。あなたの音楽とパフォーマンスが私の人生を変えました。\n\nありがとう。これからも頑張ってください。ベトナムより愛を込めて。いつまでも輝いていてください。",
      emoji: "⭐",
      year: params.year,
    },
    {
      username: "ファン9",
      message:
        "リョウくん大好き！あなたの歌とダンスが最高です。いつも幸せをありがとう。これからも素晴らしい音楽を聞かせてください。\n\nあなたのファンでいることを誇りに思います。これからもずっと応援します。",
      emoji: "💝",
      year: params.year,
    },
    {
      username: "ファン10",
      message:
        "ベトナムの皆さんからは、このウェブサイトを通して、NCT WISHのメンバーであるリョウに私たちの願いを届けたいと思っています。私たちの願いを通じて、リョウがもっと高く、さらに強く、健康に成長し、NCT WISHと共に素晴らしいアイドルになるように。あなたの存在が私たちの希望です。いつも応援しています。\n\nあなたの笑顔が一番好きです。いつも応援しています。あなたの成功を心から祈っています。",
      emoji: "🌸",
      year: params.year,
    },
    {
      username: "ファン11",
      message:
        "リョウくん、あなたの優しさと才能に心から感謝しています。これからも素晴らしい音楽を聞かせてください。ベトナムから愛を送ります。あなたのファンでいることを誇りに思います。\n\nこれからもずっと応援します。健康に気をつけてください。",
      emoji: "🎵",
      year: params.year,
    },
    {
      username: "ファン12",
      message:
        "お誕生日おめでとう！リョウくんの笑顔が一番好きです。いつも応援しています。あなたの成功を心から祈っています。\n\nこれからも応援し続けます。健康に気をつけてくださいね。",
      emoji: "😊",
      year: params.year,
    },
    {
      username: "ファン13",
      message:
        "ベトナムの皆さんからは、このウェブサイトを通して、NCT WISHのメンバーであるリョウに私たちの願いを届けたいと思っています。私たちの願いを通じて、リョウがもっと高く、さらに強く、健康に成長し、NCT WISHと共に素晴らしいアイドルになるように。あなたのファンでいることを誇りに思います。これからもずっと応援します。健康に気をつけてください。\n\nいつまでも愛しています。あなたの成功を心から祈っています。これからも応援し続けます。",
      emoji: "🏆",
      year: params.year,
    },
    {
      username: "ファン14",
      message:
        "リョウくん、あなたの音楽とパフォーマンスが私の人生を変えました。ありがとう。これからも頑張ってください。ベトナムより愛を込めて。いつまでも輝いていてください。\n\nあなたの存在が私たちの希望です。いつも応援しています。",
      emoji: "🎤",
      year: params.year,
    },
    {
      username: "ファン15",
      message:
        "ベトナムの皆さんからは、このウェブサイトを通して、NCT WISHのメンバーであるリョウに私たちの願いを届けたいと思っています。私たちの願いを通じて、リョウがもっと高く、さらに強く、健康に成長し、NCT WISHと共に素晴らしいアイドルになるように。最後のメッセージです。いつまでも愛しています。あなたの成功を心から祈っています。これからも応援し続けます。\n\nあなたのファンでいることを誇りに思います。健康に気をつけて、いつまでも輝いていてください。お体に気をつけてくださいね。",
      emoji: "💕",
      year: params.year,
    },
  ]

  // Use sample messages if no real messages and not loading
  const displayMessages = messages.length > 0 ? messages : !loading ? sampleMessages : []

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col" style={{ backgroundColor: "#259957" }}>
      {/* Header */}
      <header className="relative z-10 w-full flex-shrink-0 h-16 sm:h-20 md:h-24">
        <div
          className="relative h-full flex items-center justify-between px-2 sm:px-4 md:px-6 w-full"
          style={{
            backgroundImage: "url('/header.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Link href="/">
            <Button variant="ghost" className="text-black hover:text-gray-700 hover:bg-transparent pixel-font text-sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-black text-center tracking-wider pixel-font">
            Messages {params.year} ({displayMessages.length})
          </h1>
          <Button
            onClick={refresh}
            variant="ghost"
            size="sm"
            className="text-black hover:text-gray-700 hover:bg-transparent pixel-font"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-4 pb-2">
        {/* Error State */}
        {error && (
          <Alert className="mb-6 max-w-2xl mx-auto bg-red-100 border-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="pixel-font text-red-800 text-sm">
              {error}. Using sample messages for now.
            </AlertDescription>
          </Alert>
        )}

        {/* Messages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {displayMessages.map((message, index) => (
            <div
              key={`${message.username}-${index}`}
              ref={index === displayMessages.length - 1 ? lastMessageElementRef : null}
              className="relative hover:scale-105 transition-all duration-300"
              style={{
                backgroundImage: "url('/message_card_bg.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                aspectRatio: "1",
                minHeight: "280px",
                maxHeight: "320px",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                {/* User Info */}
                <div className="flex items-center space-x-2 mb-3 flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-200 rounded-full flex items-center justify-center text-xs sm:text-sm">
                    {message.emoji || "💌"}
                  </div>
                  <h4 className="font-bold text-black text-xs sm:text-sm pixel-font truncate">{message.username}</h4>
                </div>

                {/* Message Text - Fixed layout */}
                <div className="flex-1 flex items-center justify-center py-2 mb-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-black leading-relaxed text-xs sm:text-sm pixel-font text-center px-2 py-1 break-words">
                      {truncateMessage(message.message, 120)}
                    </p>
                  </div>
                </div>

                {/* Button - Fixed positioning inside frame */}
                <div className="flex justify-center flex-shrink-0">
                  <div
                    className="relative inline-block cursor-pointer hover:scale-105 transition-transform"
                    style={{
                      backgroundImage: "url('/button.png')",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "80px",
                      height: "32px",
                    }}
                  >
                    <button
                      className="w-full h-full bg-transparent text-white font-bold pixel-font flex items-center justify-center"
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "12px",
                        lineHeight: "1",
                        padding: "0",
                        margin: "0",
                        color: "white",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                        letterSpacing: "1px",
                      }}
                      onClick={() => openPopup(message)}
                    >
                      続き
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Cards */}
          {loading && (
            <>
              {[...Array(4)].map((_, index) => (
                <div
                  key={`loading-${index}`}
                  className="relative animate-pulse"
                  style={{
                    backgroundImage: "url('/message_card_bg.png')",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    aspectRatio: "1",
                    minHeight: "280px",
                    maxHeight: "320px",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-black pixel-font text-xs">Loading...</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Load More Button - Only button.png */}
        {hasMore && !loading && displayMessages.length > 0 && (
          <div className="flex justify-center py-6 mt-4">
            <div
              className="relative cursor-pointer hover:scale-105 transition-all duration-300 flex items-center justify-center"
              style={{
                backgroundImage: "url('/button.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "140px",
                height: "40px",
              }}
              onClick={loadMore}
            >
              <button
                className="w-full h-full bg-transparent text-white font-bold pixel-font text-sm flex items-center justify-center gap-1"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                  letterSpacing: "1px",
                }}
              >
                More <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && displayMessages.length > 0 && (
          <div className="flex justify-center py-4">
            <div className="flex items-center gap-2">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
              <p className="text-yellow-200 pixel-font text-xs">Loading more...</p>
            </div>
          </div>
        )}

        {/* End of Messages */}
        {!hasMore && displayMessages.length > 0 && !loading && (
          <div className="flex justify-center py-4">
            <div className="text-center">
              <div className="text-xl mb-1">🎉</div>
              <p className="text-yellow-200 font-bold pixel-font text-sm">All messages loaded!</p>
            </div>
          </div>
        )}
      </main>

      {/* Reduced Footer */}
      <footer className="relative z-10 w-full flex-shrink-0 h-8 sm:h-10">
        <div
          className="relative h-full flex items-center justify-end px-2 sm:px-4 md:px-6 w-full"
          style={{
            backgroundImage: "url('/footer.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <p className="text-xs text-black pixel-font font-bold">from Vietnamese fans</p>
        </div>
      </footer>

      {/* Message Popup */}
      <MessagePopup isOpen={isPopupOpen} onClose={closePopup} message={selectedMessage} />
    </div>
  )
}

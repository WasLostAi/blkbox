"use client"

import { useState, useEffect, useCallback } from "react"

interface TypingAnimationProps {
  baseText: string
  replacementWords: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayAfterComplete?: number
  className?: string
}

export default function TypingAnimation({
  baseText = "It's ",
  replacementWords,
  typingSpeed = 100,
  deletingSpeed = 80,
  delayAfterComplete = 2000,
  className = "",
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTypingBase, setIsTypingBase] = useState(true)
  const [currentBaseIndex, setCurrentBaseIndex] = useState(0)

  const typeBase = useCallback(() => {
    if (currentBaseIndex < baseText.length) {
      setDisplayText(baseText.substring(0, currentBaseIndex + 1))
      setCurrentBaseIndex(currentBaseIndex + 1)
    } else {
      setIsTypingBase(false)
      setIsDeleting(false)
    }
  }, [baseText, currentBaseIndex])

  const typeWord = useCallback(() => {
    const currentWord = replacementWords[wordIndex]
    const currentText = baseText + displayText.substring(baseText.length)

    if (!isDeleting) {
      // Typing the word
      if (currentText.length < baseText.length + currentWord.length) {
        setDisplayText(baseText + currentWord.substring(0, currentText.length - baseText.length + 1))
      } else {
        // Finished typing the word
        setTimeout(() => setIsDeleting(true), delayAfterComplete)
      }
    } else {
      // Deleting the word
      if (currentText.length > baseText.length) {
        setDisplayText(currentText.substring(0, currentText.length - 1))
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false)
        setWordIndex((wordIndex + 1) % replacementWords.length)
      }
    }
  }, [baseText, displayText, isDeleting, wordIndex, replacementWords, delayAfterComplete])

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (isTypingBase) {
          typeBase()
        } else {
          typeWord()
        }
      },
      isTypingBase ? typingSpeed : isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timer)
  }, [isTypingBase, typeBase, typeWord, isDeleting, typingSpeed, deletingSpeed])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  )
}

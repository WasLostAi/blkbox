"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import CyberButton from "./cyber-button"

// Import the generatePDF function directly
const generatePDF = async () => {
  try {
    // Dynamic import to avoid SSR issues
    const { generatePDF: generatePDFFunction } = await import("./whitepaper-pdf")
    await generatePDFFunction()
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}

export default function PDFDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      await generatePDF()
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <CyberButton
      onClick={handleDownload}
      disabled={isGenerating}
      size="lg"
      glowColor="pink"
      className="flex items-center gap-2"
    >
      {isGenerating ? (
        "GENERATING..."
      ) : (
        <>
          <Download size={16} />
          DOWNLOAD_WHITEPAPER
        </>
      )}
    </CyberButton>
  )
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderMarkdown(text: string) {
  // Convert headers
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // Convert bold
  text = text.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  
  // Convert italic
  text = text.replace(/\*(.*?)\*/gim, '<em>$1</em>')
  
  // Convert inline code
  text = text.replace(/`(.*?)`/gim, '<code>$1</code>')
  
  // Convert code blocks
  text = text.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
  
  // Convert links
  text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')
  
  // Convert line breaks
  text = text.replace(/\n/gim, '<br>')
  
  return text
}

export function convertToAscii(inputString: string) {
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "")
  return asciiString
}
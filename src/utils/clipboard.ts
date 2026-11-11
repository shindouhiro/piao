/**
 * Robust clipboard copy supporting modern Clipboard API and fallback execCommand
 * Works in WeChat in-app browser (TBS / XWeb), Mobile Safari, Android Webview, and Chrome
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false

  // 1. Try modern navigator.clipboard
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fallback below
    }
  }

  // 2. Fallback to hidden textarea with execCommand
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    // Ensure element is outside visible screen but part of layout
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    textArea.setAttribute('readonly', '')
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)

    // Selection handling for iOS Safari
    textArea.focus()
    textArea.select()
    textArea.setSelectionRange(0, 99999)

    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    return successful
  } catch (err) {
    console.error('Copy fallback failed:', err)
    return false
  }
}

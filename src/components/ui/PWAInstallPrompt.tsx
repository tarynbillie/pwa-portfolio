import { useState, useEffect } from 'react'
import { X, Share } from 'lucide-react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const SESSION_KEY = 'pwa-prompt-dismissed'

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !('MSStream' in window)
}

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true)
  )
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [iosMode, setIosMode] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (sessionStorage.getItem(SESSION_KEY)) return

    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    if (isIOS()) {
      setIosMode(true)
      setVisible(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(false)
  }

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <div className="pwa-prompt" role="dialog" aria-label="Install app">
      <img src="/taryn.png" alt="" className="pwa-prompt-avatar" />

      <div className="pwa-prompt-body">
        <p className="pwa-prompt-title">Add to home screen</p>
        {iosMode ? (
          <p className="pwa-prompt-sub">
            Tap <Share size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
            then "Add to Home Screen"
          </p>
        ) : (
          <p className="pwa-prompt-sub">Install this portfolio as an app</p>
        )}
      </div>

      {!iosMode && (
        <button className="pwa-prompt-btn btn btn-primary" onClick={install}>
          Install
        </button>
      )}

      <button className="pwa-prompt-close" onClick={dismiss} aria-label="Dismiss">
        <X size={13} strokeWidth={2} />
      </button>
    </div>
  )
}

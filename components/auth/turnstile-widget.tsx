'use client'

import { useEffect, useRef, useState } from 'react'

type TurnstileWidgetProps = {
  siteKey?: string
  onTokenChange: (token: string | null) => void
}

type TurnstileRenderOptions = {
  sitekey: string
  callback: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
}

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string
  remove: (widgetId: string) => void
  reset: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let turnstileScriptPromise: Promise<void> | null = null

function loadTurnstileScript(): Promise<void> {
  if (turnstileScriptPromise) {
    return turnstileScriptPromise
  }

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-turnstile="true"]')

    if (existingScript) {
      if (window.turnstile) {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Turnstile script.')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.dataset.turnstile = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Turnstile script.'))
    document.head.appendChild(script)
  })

  return turnstileScriptPromise
}

export function TurnstileWidget({ siteKey, onTokenChange }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (!siteKey) {
      onTokenChange(null)
      setLoadError('Bot protection is unavailable. Please contact support.')
      return
    }

    let isMounted = true

    const setupWidget = async () => {
      try {
        await loadTurnstileScript()

        if (!isMounted || !containerRef.current || !window.turnstile) {
          return
        }

        setLoadError(null)
        onTokenChange(null)

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onTokenChange(token),
          'expired-callback': () => onTokenChange(null),
          'error-callback': () => {
            onTokenChange(null)
            setLoadError('Bot check failed. Please retry.')
          },
          theme: 'auto',
        })
      } catch {
        if (isMounted) {
          onTokenChange(null)
          setLoadError('Failed to load bot protection challenge.')
        }
      }
    }

    setupWidget()

    return () => {
      isMounted = false

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [siteKey, onTokenChange])

  return (
    <div className="space-y-2">
      <div ref={containerRef} />
      {loadError && <p className="text-xs text-red-700">{loadError}</p>}
    </div>
  )
}
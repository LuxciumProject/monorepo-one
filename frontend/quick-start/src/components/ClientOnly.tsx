'use client'

import { useEffect, useState, type PropsWithChildren } from 'react'

/**
 * A wrapper component that only renders its children on the client side
 * @param children - The content to render on the client
 * @returns The wrapped content or a fallback during SSR
 */
export function ClientOnly({ children }: PropsWithChildren)  {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return  isClient?  children:   < h1 >'Prerendered'</h1 >
    // < h1 > { isClient? 'This is never prerendered': 'Prerendered' }</ >
}

export default ClientOnly

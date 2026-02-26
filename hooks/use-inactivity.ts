import { useEffect } from "react"

export default function useInactivity(
  timeout: number,
  onInactive: () => void
) {
  useEffect(() => {
    const timer = setTimeout(onInactive, timeout)

    return () => clearTimeout(timer)
  }, [timeout])
}
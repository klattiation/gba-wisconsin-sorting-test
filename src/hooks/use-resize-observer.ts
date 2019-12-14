import { MutableRefObject, useState, useEffect } from "react"
import ResizeObserver from "resize-observer-polyfill"

const useResizeObserver = (ref: MutableRefObject<any>) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null)
  useEffect(() => {
    const observeTarget = ref.current
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect as DOMRectReadOnly)
      })
    })
    resizeObserver.observe(observeTarget)
    return () => {
      resizeObserver.unobserve(observeTarget)
    }
  }, [ref])
  return dimensions
}

export default useResizeObserver

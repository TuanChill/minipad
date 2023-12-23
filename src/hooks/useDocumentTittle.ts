import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"
// hook to set document title
export function useDocumentTitle(title: string): void {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title
  }, [title])
}
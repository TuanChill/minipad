import { useEffect, useLayoutEffect } from 'react'
// hook to switch between useLayoutEffect and useEffect
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
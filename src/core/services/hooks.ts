import { useEffect, useState, useCallback, useMemo } from "react";

export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useWindowWidth(delay = 200) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const dimensions = useDebounce(windowSize, delay);

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return dimensions;
}

export function useBreakpoint() {
  const { width } = useWindowWidth();
  const getBreakpoint = useCallback(
    () =>
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--breakpoint")
        .replace(/"/g, "")
        .trim(),
    []
  );

  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    setBreakpoint(getBreakpoint());
  }, [getBreakpoint, width]);

  return breakpoint;
}

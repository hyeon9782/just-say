import { useEffect, useState } from "react";

// 쓰로틀을 구현한 커스텀 훅
function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      setThrottledValue(value);
    }, delay);

    setTimerId(newTimerId);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [value, delay, timerId]);

  return throttledValue;
}

export default useThrottle;

import { useState, useEffect } from "react";

export function useCursorBlink(interval = 500) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), interval);
    return () => clearInterval(t);
  }, [interval]);

  return visible;
}

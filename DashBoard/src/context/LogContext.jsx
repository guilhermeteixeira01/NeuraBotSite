// src/context/LogContext.jsx
import { createContext, useCallback, useContext, useState } from 'react';

const LogContext = createContext(null);

export function LogProvider({ children }) {
  const [logLines, setLogLines] = useState([]);

  const addLog = useCallback((bot, level, msg) => {
    const t = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setLogLines((prev) => {
      const next = [...prev, { t, bot, level, msg }];
      return next.length > 200 ? next.slice(-200) : next;
    });
  }, []);

  const clearLogs = useCallback(() => setLogLines([]), []);

  return (
    <LogContext.Provider value={{ logLines, addLog, clearLogs }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLog() {
  return useContext(LogContext);
}

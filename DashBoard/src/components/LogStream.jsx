// src/components/LogStream.jsx
import { useEffect, useRef } from 'react';
import './LogStream.css';

function stripAnsi(str) {
  return str.replace(/\x1B\[[0-9;]*m/g, '');
}

// Parseia uma linha bruta do PM2 em { time, app, level, msg }
function parsePm2Line(raw) {
  if (typeof raw === 'object' && raw !== null) {
    raw = raw.msg || raw.data || raw.message || JSON.stringify(raw);
  }

  let time = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  let app = '';
  let msg = stripAnsi(String(raw)).trim();

  // Extrai timestamp ISO no início
  const tsMatch = msg.match(
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)/
  );
  if (tsMatch) {
    const d = new Date(tsMatch[1]);
    time = isNaN(d)
      ? tsMatch[1]
      : d.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    msg = msg.slice(tsMatch[0].length).replace(/^:\s*/, '');
  }

  // Extrai nome do app (word antes de ":")
  const appMatch = msg.match(/^\d+\|([\w-]+)\s+\|\s*/);
  if (appMatch) {
    app = appMatch[1];
    msg = msg.replace(appMatch[0], '');
  }

  // Detecta nível
  let level = 'info';
  if (/\[?(error|err|fatal)\]?/i.test(msg)) level = 'error';
  else if (/\[?(warn|warning)\]?/i.test(msg)) level = 'warn';
  else if (/\[?(success|ok|ready|started)\]?/i.test(msg)) level = 'success';
  else if (/\[?(debug|verbose)\]?/i.test(msg)) level = 'debug';

  return { time, app, level, msg };
}

const LEVEL_META = {
  error: { label: 'ERR', color: 'var(--red)', bg: 'rgba(240,71,71,0.08)' },
  warn: { label: 'WRN', color: 'var(--yellow)', bg: 'rgba(250,166,26,0.08)' },
  success: { label: 'OK ', color: 'var(--green)', bg: 'rgba(35,209,139,0.08)' },
  debug: { label: 'DBG', color: 'var(--text3)', bg: 'transparent' },
  info: { label: 'INF', color: 'var(--text2)', bg: 'transparent' },
};

export default function LogStream({ lines = [], height = 200 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);

  const parsed = lines.map(parsePm2Line);

  return (
    <div className="log-stream" style={{ height }} ref={ref}>
      {parsed.length === 0 && (
        <div className="log-empty">
          <span className="log-empty-icon">⬡</span>
          <span>Nenhuma entrada ainda...</span>
        </div>
      )}
      {parsed.map((l, i) => {
        const meta = LEVEL_META[l.level] || LEVEL_META.info;
        return (
          <div className={`log-line log-line-${l.level}`} key={i}>
            {l.time && (
              <span className="log-time">
                [{l.time}]
              </span>
            )}

            <span className="log-msg">
              {l.msg}
            </span>
          </div>
        );
      })}
    </div>
  );
}
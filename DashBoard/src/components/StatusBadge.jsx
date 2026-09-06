// src/components/StatusBadge.jsx
const STATUS_MAP = {
  online: ['badge-online', 'online'],
  stopped: ['badge-stopped', 'offline'],
  error: ['badge-error', 'error'],
  errored: ['badge-error', 'errored'],
};

export default function StatusBadge({ status }) {
  const [cls, lbl] = STATUS_MAP[status] || ['badge-offline', 'offline'];
  return (
    <span className={`badge ${cls}`}>
      <span className="dot" />
      {lbl}
    </span>
  );
}

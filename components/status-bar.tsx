export default function StatusBar({ time }: { time: string }) {
  return (
    <div className="status-bar" aria-label={`현재 시간 ${time}, 배터리 충전됨`}>
      <span className="status-left">{time}</span>
      <div className="status-right">
        <span className="signal" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <svg
          width="16"
          height="13"
          viewBox="0 0 20 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 5a12 12 0 0 1 16 0M5 8a8 8 0 0 1 10 0M8 11a3 3 0 0 1 4 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="14" r="1.3" fill="currentColor" />
        </svg>
        <span className="battery" aria-hidden="true" />
      </div>
    </div>
  );
}

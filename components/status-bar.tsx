type StatusBarProps = {
  time: string;
  dark?: boolean;
};

export default function StatusBar({ time, dark = false }: StatusBarProps) {
  return (
    <div className={`status-bar${dark ? " dark" : ""}`} aria-hidden="true">
      <span>{time}</span>
      <div className="status-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.3c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .6C5.3.6 2.8 1.6.9 3.5L2 4.7a8.5 8.5 0 0 1 6-2.4z" />
          <path d="M8 5.6c1.4 0 2.7.5 3.7 1.4l1.1-1.2A7.1 7.1 0 0 0 8 3.9c-1.8 0-3.5.7-4.8 1.9L4.3 7c1-.9 2.3-1.4 3.7-1.4z" />
          <path d="M8 8.9c.6 0 1.1.2 1.5.6L8 11.2 6.5 9.5c.4-.4.9-.6 1.5-.6z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="18" height="9" rx="2.5" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

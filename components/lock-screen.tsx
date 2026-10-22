import { imagePaths } from "@/data/image-paths";
import { lockscreenNotifications } from "@/data/notifications";

type LockScreenProps = {
  time: string;
  date: string;
  onUnlock: () => void;
};

export default function LockScreen({ time, date, onUnlock }: LockScreenProps) {
  return (
    <section
      className="lock-screen"
      aria-label="잠금 화면"
      style={{ backgroundImage: `url(${imagePaths.lockscreen})` }}
    >
      <div className="lock-clock">
        <div className="lock-date">{date || "\u00a0"}</div>
        <div className="lock-time">{time || "\u00a0"}</div>
      </div>

      <div className="notification-stack">
        {lockscreenNotifications.slice(0, 3).map((n, index) => (
          <div key={`${n.title}-${index}`} className="notification-card">
            <span className="notification-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.6 2.5c.4 3-1.2 4.6-2.6 6-.6-1-.8-1.9-.8-2.9C6.7 7.3 5 10 5 13.3 5 17.6 8.1 21 12 21s7-3.1 7-7.4c0-4.9-3.4-8.6-6.4-11.1z" />
              </svg>
            </span>
            <div className="notification-text">
              <div className="notification-top">
                <span className="notification-app">{n.app}</span>
                <span className="notification-meta">{n.meta}</span>
              </div>
              <div className="notification-body">{n.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="lock-bottom">
        <div className="lock-tools">
          <span className="tool-badge" aria-hidden="true">
            <FlashlightIcon />
          </span>
          <span className="tool-badge" aria-hidden="true">
            <CameraIcon />
          </span>
        </div>
        <button type="button" className="unlock-pill" onClick={onUnlock}>
          {"눌러서 잠금 해제"}
        </button>
        <span className="lock-indicator" aria-hidden="true" />
      </div>
    </section>
  );
}

function FlashlightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h10v4l-3 4v10h-4V11L7 7z" strokeLinejoin="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

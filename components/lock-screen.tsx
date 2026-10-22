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
      style={{
        backgroundColor: "#2a3147",
        backgroundImage: `url(${imagePaths.lockscreen})`,
      }}
    >
      <div className="lock-screen-content">
        <div style={{ textAlign: "center" }}>
          <div className="lock-date">{date}</div>
          <div className="lock-time">{time}</div>

          <div className="notification-stack" style={{ marginTop: 28, textAlign: "left" }}>
            {lockscreenNotifications.slice(0, 3).map((n, index) => (
              <div
                key={`${n.title}-${index}`}
                className="notification-card"
                style={{ zIndex: 3 - index, opacity: 1 - index * 0.2 }}
              >
                <div className="notification-top">
                  <div className="notification-app">
                    <span className="notification-dot" />
                    {n.app}
                  </div>
                  <span className="notification-meta" style={{ marginTop: 0 }}>
                    {n.meta}
                  </span>
                </div>
                <div className="notification-body">{n.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="lock-tools">
            <span className="tool-badge" aria-hidden="true">
              <FlashlightIcon />
            </span>
            <span className="tool-badge" aria-hidden="true">
              <CameraIcon />
            </span>
          </div>
          <div className="unlock-row" style={{ marginTop: 18 }}>
            <button type="button" className="unlock-pill" onClick={onUnlock}>
              {"눌러서 잠금 해제"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlashlightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h10v4l-3 4v10h-4V11L7 7z" strokeLinejoin="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

"use client";

import { useEffect } from "react";

type UnavailablePopupProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export default function UnavailablePopup({ title, message, onClose }: UnavailablePopupProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-message"
      onClick={onClose}
    >
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-content">
          <h2 id="popup-title" className="popup-title">
            {title}
          </h2>
          <p id="popup-message" className="popup-message">
            {message}
          </p>
        </div>
        <div className="popup-actions">
          <button type="button" onClick={onClose} autoFocus>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

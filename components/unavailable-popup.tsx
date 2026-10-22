type UnavailablePopupProps = {
  appName: string;
  onClose: () => void;
};

export default function UnavailablePopup({ appName, onClose }: UnavailablePopupProps) {
  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="popup-card">
        <div className="popup-content">
          <div id="popup-title" className="popup-title">
            {appName}
          </div>
          <div className="popup-message">이 앱은 열람할 수 없습니다.</div>
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

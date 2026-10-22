import type { ReactNode } from "react";

type AppHeaderProps = {
  title: ReactNode;
  onBack: () => void;
  backLabel: string;
  backText?: string;
  large?: boolean;
  right?: ReactNode;
};

export default function AppHeader({
  title,
  onBack,
  backLabel,
  backText,
  large = false,
  right,
}: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-bar">
        <button type="button" className="back-button" onClick={onBack} aria-label={backLabel}>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 2 2 10l8 8" />
          </svg>
          {backText ? <span>{backText}</span> : null}
        </button>
        {!large ? <div className="app-header-title">{title}</div> : <span />}
        <div className="app-header-right">{right}</div>
      </div>
      {large ? <h1 className="large-title">{title}</h1> : null}
    </header>
  );
}

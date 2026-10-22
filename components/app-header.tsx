import type { ReactNode } from "react";

type AppHeaderProps = {
  title: ReactNode;
  onBack: () => void;
  backLabel: string;
};

export default function AppHeader({ title, onBack, backLabel }: AppHeaderProps) {
  return (
    <header className="header-bar" style={{ height: "auto", padding: "50px 16px 10px" }}>
      <div className="header-left">
        <button type="button" className="back-button" onClick={onBack} aria-label={backLabel}>
          {"‹"}
        </button>
        <div className="screen-title">{title}</div>
      </div>
    </header>
  );
}

type StatusBarProps = {
  time: string;
  dark?: boolean;
};

export default function StatusBar({ time, dark = false }: StatusBarProps) {
  return (
    <div className={`status-bar${dark ? " dark" : ""}`} aria-hidden="true">
      <span className="status-left">{time}</span>
      <div className="status-right">
        <span className="signal">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="battery" />
      </div>
    </div>
  );
}

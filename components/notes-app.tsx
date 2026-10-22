"use client";

import { useState, type FormEvent } from "react";
import { notes, type Note } from "@/data/notes";
import AppHeader from "@/components/app-header";

type NotesAppProps = {
  onClose: () => void;
};

export default function NotesApp({ onClose }: NotesAppProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});

  const activeNote = notes.find((n) => n.id === activeId);

  return (
    <div className="app-window notes-screen" role="region" aria-label="메모">
      <AppHeader title="메모" onBack={onClose} backLabel="홈으로" large />
      <p className="notes-count">{`${notes.length}개의 메모`}</p>
      <ul className="notes-list">
        {notes.map((note) => {
          const isLocked = note.locked && !unlocked[note.id];
          return (
            <li key={note.id}>
              <button type="button" className="note-item" onClick={() => setActiveId(note.id)}>
                <span className="note-top">
                  <span className="note-title">{note.title}</span>
                  {note.locked ? <LockIcon open={!isLocked} /> : null}
                </span>
                <span className="note-preview">{isLocked ? "잠긴 메모" : note.preview}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {activeNote ? (
        <div className="app-window notes-screen detail" role="region" aria-label={activeNote.title}>
          <AppHeader title="" onBack={() => setActiveId(null)} backLabel="메모 목록으로" backText="메모" />
          {activeNote.locked && !unlocked[activeNote.id] ? (
            <PasswordGate
              note={activeNote}
              onUnlock={() => setUnlocked((prev) => ({ ...prev, [activeNote.id]: true }))}
            />
          ) : (
            <article className="note-detail">
              <h2>{activeNote.title}</h2>
              <p>{activeNote.content}</p>
            </article>
          )}
        </div>
      ) : null}
    </div>
  );
}

function PasswordGate({ note, onUnlock }: { note: Note; onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value === note.password) {
      onUnlock();
    } else {
      setError("암호가 올바르지 않습니다.");
      setValue("");
    }
  }

  return (
    <form className="password-box" onSubmit={handleSubmit}>
      <span className="password-icon" aria-hidden="true">
        <LockIcon open={false} />
      </span>
      <label htmlFor="note-password">이 메모는 잠겨 있습니다.</label>
      <p className="password-hint">암호를 입력하여 메모를 보세요.</p>
      <input
        id="note-password"
        type="password"
        inputMode="numeric"
        autoComplete="off"
        placeholder="암호"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError("");
        }}
        autoFocus
      />
      {error ? (
        <span className="error-text" role="alert">
          {error}
        </span>
      ) : null}
      <button type="submit">확인</button>
    </form>
  );
}

function LockIcon({ open }: { open: boolean }) {
  return (
    <svg className="note-lock" width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-label={open ? "잠금 해제됨" : "잠김"} role="img">
      <rect x="1.5" y="7" width="11" height="8" rx="2" fill="currentColor" stroke="none" />
      <path d={open ? "M4 7V4.5a3 3 0 0 1 5.8-1" : "M4 7V4.5a3 3 0 0 1 6 0V7"} strokeLinecap="round" />
    </svg>
  );
}

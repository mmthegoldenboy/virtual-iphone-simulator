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

  if (activeNote) {
    const needsPassword = activeNote.locked && !unlocked[activeNote.id];
    return (
      <div className="app-window notes-screen">
        <AppHeader title="메모" onBack={() => setActiveId(null)} backLabel="메모 목록으로" />
        {needsPassword ? (
          <PasswordGate
            note={activeNote}
            onUnlock={() => setUnlocked((prev) => ({ ...prev, [activeNote.id]: true }))}
          />
        ) : (
          <article className="note-detail">
            <h3>{activeNote.title}</h3>
            <p>{activeNote.content}</p>
          </article>
        )}
      </div>
    );
  }

  return (
    <div className="app-window notes-screen">
      <AppHeader title="메모" onBack={onClose} backLabel="홈으로" />
      <div className="notes-list">
        {notes.map((note) => (
          <button key={note.id} type="button" className="note-item" onClick={() => setActiveId(note.id)}>
            <div className="note-top">
              <span className="note-title">{note.title}</span>
              {note.locked ? <span className="note-lock">잠김</span> : null}
            </div>
            <div className="note-preview">
              {note.locked && !unlocked[note.id] ? "잠긴 메모" : note.preview}
            </div>
          </button>
        ))}
      </div>
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
      <label htmlFor="note-password">이 메모는 잠겨 있습니다. 암호를 입력하세요.</label>
      <input
        id="note-password"
        type="password"
        inputMode="numeric"
        autoComplete="off"
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

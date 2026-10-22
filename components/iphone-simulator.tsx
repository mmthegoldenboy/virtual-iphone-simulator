"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { apps } from "@/data/apps";
import { contacts } from "@/data/contacts";
import { conversations } from "@/data/conversations";
import { notes } from "@/data/notes";
import { lockscreenNotifications } from "@/data/notifications";

const formatTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatDate = () => {
  return new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

type Screen =
  | "lockscreen"
  | "home"
  | "messages-list"
  | "messages-chat"
  | "notes-list"
  | "notes-detail"
  | "note-password"
  | "popup";

export default function IphoneSimulator() {
  const [screen, setScreen] = useState<Screen>("lockscreen");
  const [selectedContactId, setSelectedContactId] = useState("captain-hollander");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id ?? null);
  const [notePassword, setNotePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [unlockedNotes, setUnlockedNotes] = useState<Record<string, boolean>>({});
  const [popupApp, setPopupApp] = useState<{ name: string; message: string } | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const selectedContact = useMemo(
    () => contacts.find((contact) => contact.id === selectedContactId) ?? contacts[0],
    [selectedContactId]
  );

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.contactId === selectedContactId) ??
      conversations[0],
    [selectedContactId]
  );

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) ?? notes[0],
    [selectedNoteId]
  );

  const openApp = (appId: string) => {
    const app = apps.find((item) => item.id === appId);
    if (!app) return;

    if (appId === "messages") {
      setScreen("messages-list");
      return;
    }

    if (appId === "notes") {
      setSelectedNoteId(notes[0]?.id ?? null);
      setScreen("notes-list");
      return;
    }

    const popupMessage = app.popupMessage ?? "이 콘텐츠는 열람할 수 없습니다.";
    setPopupApp({ name: app.name, message: popupMessage });
    setScreen("popup");
  };

  const closePopup = () => {
    setPopupApp(null);
    setScreen("home");
  };

  const unlockPhone = () => {
    setScreen("home");
  };

  const openMessageThread = (contactId: string) => {
    setSelectedContactId(contactId);
    setScreen("messages-chat");
  };

  const openNote = (noteId: string) => {
    const target = notes.find((note) => note.id === noteId);
    if (!target) return;

    if (target.locked) {
      setSelectedNoteId(noteId);
      setPasswordError(false);
      setNotePassword("");
      setScreen("note-password");
      return;
    }

    setSelectedNoteId(noteId);
    setScreen("notes-detail");
  };

  const handlePasswordSubmit = () => {
    const target = notes.find((note) => note.id === selectedNoteId);
    if (!target || !target.password) return;

    if (notePassword === target.password) {
      setUnlockedNotes((prev) => ({ ...prev, [target.id]: true }));
      setPasswordError(false);
      setScreen("notes-detail");
      return;
    }

    setPasswordError(true);
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [selectedContactId, screen]);

  const currentTime = formatTime();
  const currentDate = formatDate();

  return (
    <div className="app-shell">
      <div className="iphone-frame">
        <div className="iphone-screen">
          <div className="notch" />

          {screen === "lockscreen" && (
            <div className="lock-screen" style={{ backgroundImage: "url('/images/lockscreen.png')" }}>
              <div className="status-bar">
                <div className="status-left">{currentTime}</div>
                <div className="status-right">
                  <div className="signal" aria-label="signal strength">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="battery" aria-label="battery" />
                </div>
              </div>

              <div className="lock-screen-content">
                <div>
                  <div className="lock-time">{currentTime}</div>
                  <div className="lock-date">{currentDate}</div>

                  <div className="notification-stack">
                    {lockscreenNotifications.map((notification, index) => (
                      <div
                        key={`${notification.app}-${notification.title}-${index}`}
                        className="notification-card"
                        style={{ zIndex: 10 - index }}
                      >
                        <div className="notification-top">
                          <div className="notification-app">
                            <span className="notification-dot" />
                            {notification.app}
                          </div>
                        </div>
                        <div className="notification-body">{notification.title}</div>
                        <div className="notification-meta">{notification.meta}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lock-tools">
                  <div className="tool-badge" aria-label="flashlight">
                    🔦
                  </div>
                  <div className="tool-badge" aria-label="camera">
                    📷
                  </div>
                </div>
              </div>

              <div className="unlock-row">
                <button className="unlock-pill" onClick={unlockPhone} type="button">
                  잠금 해제
                </button>
              </div>
            </div>
          )}

          {screen === "home" && (
            <div className="home-screen" style={{ backgroundImage: "url('/images/homescreen.png')" }}>
              <div className="status-bar">
                <div className="status-left">{currentTime}</div>
                <div className="status-right">
                  <div className="signal">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="battery" />
                </div>
              </div>

              <div className="home-content">
                <div />

                <div className="app-grid">
                  {apps.map((app) => (
                    <button
                      key={app.id}
                      className="app-tile"
                      onClick={() => openApp(app.id)}
                      type="button"
                    >
                      <div className="app-icon">
                        {app.image ? (
                          <img src={app.image} alt={app.name} />
                        ) : (
                          <span>{app.icon}</span>
                        )}
                      </div>
                      <span className="app-name">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(screen === "messages-list" || screen === "messages-chat") && (
            <div className="app-window messages-list-screen">
              <div className="header-bar">
                <div className="header-left">
                  {screen === "messages-chat" && (
                    <button className="back-button" onClick={() => setScreen("messages-list")} type="button">
                      ‹
                    </button>
                  )}
                </div>
                <div className="screen-title" style={{ marginLeft: screen === "messages-chat" ? 0 : "auto" }}>
                  {screen === "messages-chat" ? selectedContact.name : "메시지"}
                </div>
                <div className="header-right" />
              </div>

              {screen === "messages-list" && (
                <>
                  <div className="messages-header">
                    <input className="search-box" placeholder="검색" readOnly />
                  </div>
                  <div className="conversation-list">
                    {contacts.map((contact) => {
                      const preview =
                        conversations.find((conversation) => conversation.contactId === contact.id)?.messages.at(-1)
                          ?.content ?? contact.lastPreview;

                      return (
                        <button
                          key={contact.id}
                          className="conversation-item"
                          onClick={() => openMessageThread(contact.id)}
                          type="button"
                        >
                          <div className={`avatar ${contact.id === "captain-hollander" ? "blue" : "green"}`}>
                            {contact.avatarText}
                          </div>

                          <div className="conversation-meta">
                            <div className="contact-name-row">
                              <span className="contact-name">{contact.name}</span>
                              <span className="last-time">오후</span>
                            </div>
                            <div className="preview-row">
                              <span className="preview-text">{preview}</span>
                              {contact.unreadCount ? <span className="unread-badge">{contact.unreadCount}</span> : null}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {screen === "messages-chat" && (
                <div className="chat-screen">
                  <div className="chat-bg" style={{ backgroundImage: "url('/images/lockscreen.png')" }} />

                  <div className="chat-header">
                    <div className="chat-identity">
                      <div className="avatar blue">{selectedContact.avatarText}</div>
                      <div className="chat-name">{selectedContact.name}</div>
                    </div>
                  </div>

                  <div className="chat-body" ref={chatScrollRef}>
                    {selectedConversation.messages.map((message) => (
                      <div key={message.id} className={`chat-row ${message.sender === "me" ? "me" : "other"}`}>
                        {message.sender === "other" && <div className="typing-avatar">CH</div>}

                        <div className="bubble-stack">
                          <div className={`chat-bubble ${message.sender === "me" ? "me" : "other"}`}>
                            {message.content}
                          </div>
                          {message.sender === "me" && message.read && <div className="read-mark">읽음</div>}
                        </div>
                      </div>
                    ))}

                    <div className="typing-row">
                      <div className="typing-avatar">CH</div>
                      <div className="typing-bubble">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  </div>

                  <div className="chat-input-box">
                    <input className="chat-input" value="메시지" readOnly />
                  </div>
                </div>
              )}
            </div>
          )}

          {(screen === "notes-list" || screen === "notes-detail" || screen === "note-password") && (
            <div className="app-window notes-screen">
              <div className="header-bar">
                <div className="header-left">
                  {(screen === "notes-detail" || screen === "note-password") && (
                    <button className="back-button" onClick={() => setScreen("notes-list")} type="button">
                      ‹
                    </button>
                  )}
                </div>
                <div className="screen-title">메모</div>
                <div className="header-right" />
              </div>

              {screen === "notes-list" && (
                <div className="notes-list">
                  {notes.map((note) => (
                    <button
                      key={note.id}
                      className="note-item"
                      type="button"
                      onClick={() => openNote(note.id)}
                    >
                      <div className="note-top">
                        <span className="note-title">{note.title}</span>
                        {note.locked && <span className="note-lock">🔒</span>}
                      </div>
                      <div className="note-preview">{note.preview}</div>
                    </button>
                  ))}
                </div>
              )}

              {screen === "note-password" && selectedNote && (
                <div className="password-box">
                  <label>잠금 메모 비밀번호</label>
                  <input
                    type="password"
                    value={notePassword}
                    onChange={(event) => {
                      setNotePassword(event.target.value);
                      setPasswordError(false);
                    }}
                    inputMode="numeric"
                    placeholder="숫자 6자리"
                  />
                  {passwordError && <div className="error-text">비밀번호가 틀렸습니다.</div>}
                  <button onClick={handlePasswordSubmit} type="button">
                    확인
                  </button>
                </div>
              )}

              {screen === "notes-detail" && selectedNote && (
                <div className="note-detail">
                  <h3>{selectedNote.title}</h3>
                  <p>
                    {selectedNote.locked && !(unlockedNotes[selectedNote.id] ?? false)
                      ? "잠긴 메모입니다."
                      : selectedNote.content}
                  </p>
                </div>
              )}
            </div>
          )}

          {screen === "popup" && popupApp && (
            <div className="popup-overlay" onClick={closePopup} role="button" tabIndex={0} onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                closePopup();
              }
            }}>
              <div className="popup-card" onClick={(event) => event.stopPropagation()}>
                <div className="popup-content">
                  <div className="popup-title">{popupApp.name}</div>
                  <div className="popup-message">{popupApp.message}</div>
                </div>
                <div className="popup-actions">
                  <button onClick={closePopup} type="button">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

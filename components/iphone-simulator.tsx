"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { apps } from "@/data/apps";
import { contacts } from "@/data/contacts";
import { conversations } from "@/data/conversations";
import { notes } from "@/data/notes";
import { imagePaths } from "@/data/image-paths";
import { AppIcon } from "./app-icon";
import { lockscreenNotifications } from "@/data/notifications";

const formatTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDate = () => {
  return new Date().toLocaleDateString("en-US", {
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
  const [clock, setClock] = useState({ time: "9:41", date: "Thursday, October 22" });
  const [search, setSearch] = useState("");
  const swipeStart = useRef<number | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const selectedContact = useMemo(
    () => contacts.find((contact) => contact.id === selectedContactId) ?? contacts[0],
    [selectedContactId]
  );

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.contactId === selectedContactId),
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

    const popupMessage = "This app is a preview. Its content is private in this simulator.";
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

  useEffect(() => {
    const update = () => setClock({ time: formatTime(), date: formatDate() });
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const currentTime = clock.time;
  const currentDate = clock.date;
  const contactLabel = (contact: typeof contacts[number]) => contact.name?.trim() || contact.phone?.trim() || "Unknown contact";

  return (
    <div className="app-shell">
      <div className="iphone-frame">
        <button className="side-lock" aria-label="Lock phone" onClick={() => setScreen("lockscreen")} />
        <div className="iphone-screen">
          <div className="notch" />

          {screen === "lockscreen" && (
            <div className="lock-screen" style={{ backgroundImage: `url(${imagePaths.lockscreen})` }}
              onPointerDown={(event) => { swipeStart.current = event.clientY; }}
              onPointerUp={(event) => { if (swipeStart.current !== null && swipeStart.current - event.clientY > 45) unlockPhone(); swipeStart.current = null; }}
              onPointerCancel={() => { swipeStart.current = null; }}>

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
                  <div className="lock-symbol" aria-hidden="true">♙</div><div className="lock-time">{currentTime}</div>
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

              </div>

              <div className="unlock-row">
                <button className="unlock-pill" onClick={unlockPhone} type="button">
                  Swipe up or tap to unlock
                </button>
              </div>
            </div>
          )}

          {(screen === "home" || screen === "popup") && (
            <div className="home-screen" style={{ backgroundImage: `url(${imagePaths.homescreen})` }}>
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
                <div className="home-date">{currentDate}<span>Make yourself at home.</span></div>

                <div className="app-grid">
                  {apps.map((app) => (
                    <button
                      key={app.id}
                      className="app-tile"
                      onClick={() => openApp(app.id)}
                      type="button"
                    >
                      <div className="icon-wrap">
                        <AppIcon id={app.id} image={app.image} />
                        {app.badge && <span className="app-badge">{app.badge}</span>}
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
                    <button aria-label="Back" className="back-button" onClick={() => setScreen("messages-list")} type="button">
                      ‹
                    </button>
                  )}
                </div>
                <div className="screen-title" style={{ marginLeft: screen === "messages-chat" ? 0 : "auto" }}>
                  {screen === "messages-chat" ? contactLabel(selectedContact) : "Messages"}
                </div>
                <div className="header-right" />
              </div>

              {screen === "messages-list" && (
                <>
                  <div className="messages-header">
                    <h1>Messages</h1><input className="search-box" aria-label="Search conversations" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
                  </div>
                  <div className="conversation-list">
                    {search && !contacts.some((contact) => `${contactLabel(contact)} ${contact.lastPreview}`.toLowerCase().includes(search.toLowerCase())) && <p className="empty-state">No conversations found.</p>}
                    {contacts.filter((contact) => `${contactLabel(contact)} ${contact.lastPreview}`.toLowerCase().includes(search.toLowerCase())).map((contact) => {
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
                              <span className="contact-name">{contactLabel(contact)}</span>
                              <span className="row-chevron" aria-hidden="true">›</span>
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
                  

                  <div className="chat-header">
                    <div className="chat-identity">
                      <div className="avatar blue">{selectedContact.avatarText}</div>
                      <div className="chat-name">{contactLabel(selectedContact)}</div>
                    </div>
                  </div>

                  <div className="chat-body" ref={chatScrollRef}>
                    {selectedConversation?.messages.map((message) => (
                      <div key={message.id} className={`chat-row ${message.sender === "me" ? "me" : "other"}`}>
                        {message.sender === "other" && <div className="typing-avatar">{selectedContact.avatarText}</div>}

                        <div className="bubble-stack">
                          <div className={`chat-bubble ${message.sender === "me" ? "me" : "other"}`}>
                            {message.content}
                          </div>
                          {message.sender === "me" && message.read && <div className="read-mark">Read</div>}
                        </div>
                      </div>
                    ))}

                    {!selectedConversation && <p className="empty-state">No messages yet.<br />This conversation is ready for a new story.</p>}
                  </div>

                  <div className="chat-input-box">
                    <input className="chat-input" placeholder="iMessage · preview only" aria-label="Message preview" readOnly />
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
                    <button aria-label="Back" className="back-button" onClick={() => setScreen("notes-list")} type="button">
                      ‹
                    </button>
                  )}
                </div>
                <div className="screen-title">Notes</div>
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
                        {note.locked && <span className="note-lock">Locked</span>}
                      </div>
                      <div className="note-preview">{note.preview}</div>
                    </button>
                  ))}
                </div>
              )}

              {screen === "note-password" && selectedNote && (
                <div className="password-box">
                  <label>Demo note passcode</label>
                  <input
                    type="password"
                    value={notePassword}
                    onChange={(event) => {
                      setNotePassword(event.target.value);
                      setPasswordError(false);
                    }}
                    inputMode="numeric"
                    placeholder="6-digit demo code"
                  />
                  {passwordError && <div className="error-text">Incorrect demo code. Try again.</div>}
                  <button onClick={handlePasswordSubmit} type="button">
                    Done
                  </button>
                </div>
              )}

              {screen === "notes-detail" && selectedNote && (
                <div className="note-detail">
                  <h3>{selectedNote.title}</h3>
                  <p>
                    {selectedNote.locked && !(unlockedNotes[selectedNote.id] ?? false)
                      ? "This demo note is locked."
                      : selectedNote.content}
                  </p>
                </div>
              )}
            </div>
          )}

          {screen !== "lockscreen" && <button className="home-indicator" aria-label="Return to home screen" onClick={() => { setPopupApp(null); setScreen("home"); }} />}
          {screen === "popup" && popupApp && (
            <div className="popup-overlay" onClick={closePopup} role="button" tabIndex={0} onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                closePopup();
              }
            }}>
              <div className="popup-card" role="dialog" aria-modal="true" aria-label={popupApp.name} onClick={(event) => event.stopPropagation()}>
                <div className="popup-content">
                  <div className="popup-title">{popupApp.name}</div>
                  <div className="popup-message">{popupApp.message}</div>
                </div>
                <div className="popup-actions">
                  <button onClick={closePopup} type="button">
                    Done
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

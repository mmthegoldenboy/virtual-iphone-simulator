"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AppIcon from "./app-icon";
import StatusBar from "./status-bar";
import { imagePaths } from "@/data/image-paths";
import { apps, dockAppIds } from "@/data/apps";
import { contacts, contactName, contactInitials } from "@/data/contacts";
import { conversations } from "@/data/conversations";
import { notes } from "@/data/notes";
import { lockscreenNotifications } from "@/data/notifications";

const formatTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    hour12: false,
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
  const [clock, setClock] = useState("9:41");
  const [date, setDate] = useState("10월 22일 목요일");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const tick = () => {
      setClock(formatTime());
      setDate(formatDate());
    };
    tick();
    const timer = window.setInterval(tick, 30000);
    return () => window.clearInterval(timer);
  }, []);
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedContactId, setSelectedContactId] =
    useState("captain-hollander");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    notes[0]?.id ?? null,
  );
  const [notePassword, setNotePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [unlockedNotes, setUnlockedNotes] = useState<Record<string, boolean>>(
    {},
  );
  const [popupApp, setPopupApp] = useState<{
    name: string;
    message: string;
  } | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const selectedContact = useMemo(
    () =>
      contacts.find((contact) => contact.id === selectedContactId) ??
      contacts[0],
    [selectedContactId],
  );

  const selectedConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.contactId === selectedContactId,
      ) ?? { id: "empty", contactId: selectedContactId, messages: [] },
    [selectedContactId],
  );

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) ?? notes[0],
    [selectedNoteId],
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

    if (target.locked && !unlockedNotes[target.id]) {
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

  const currentTime = clock;
  const currentDate = date;

  return (
    <div className="app-shell">
      <div className="iphone-frame">
        <div
          className={`iphone-screen ${screen === "home" || screen === "lockscreen" || screen === "popup" ? "wallpaper-mode" : "light-mode"}`}
        >
          <div className="notch">
            <span />
          </div>
          <StatusBar time={currentTime} />

          {screen === "lockscreen" && (
            <div
              className="lock-screen"
              style={{ backgroundImage: `url(${imagePaths.lockscreen})` }}
            >
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
                        <div className="notification-body">
                          {notification.title}
                        </div>
                        <div className="notification-meta">
                          {notification.meta}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lock-tools">
                  <div className="tool-badge" aria-label="손전등">
                    ⌁
                  </div>
                  <div className="tool-badge" aria-label="카메라">
                    ▣
                  </div>
                </div>
              </div>

              <div className="unlock-row">
                <button
                  className="unlock-pill"
                  onClick={unlockPhone}
                  type="button"
                >
                  잠금 해제
                </button>
              </div>
            </div>
          )}

          {(screen === "home" || screen === "popup") && (
            <div
              className="home-screen"
              style={{ backgroundImage: `url(${imagePaths.homescreen})` }}
            >
              <div className="home-content">
                <div className="home-date">
                  {currentDate}
                  <span>좋은 하루 보내세요</span>
                </div>

                <div className="app-grid">
                  {apps
                    .filter((app) => !dockAppIds.includes(app.id))
                    .map((app) => (
                      <button
                        key={app.id}
                        className="app-tile"
                        onClick={() => openApp(app.id)}
                        type="button"
                      >
                        <AppIcon
                          image={app.image}
                          glyph={app.icon}
                          id={app.id}
                        />
                        <span className="app-name">{app.name}</span>
                      </button>
                    ))}
                </div>
                <div className="home-bottom">
                  <div className="page-dots">
                    <i />
                    <i />
                  </div>
                  <div className="dock">
                    {apps
                      .filter((app) => dockAppIds.includes(app.id))
                      .sort(
                        (a, b) =>
                          dockAppIds.indexOf(a.id) - dockAppIds.indexOf(b.id),
                      )
                      .map((app) => {
                        return (
                          <button
                            key={app.id}
                            className="app-tile"
                            aria-label={app.name}
                            onClick={() => openApp(app.id)}
                          >
                            <AppIcon
                              image={app.image}
                              glyph={app.icon}
                              id={app.id}
                            />
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(screen === "messages-list" || screen === "messages-chat") && (
            <div className="app-window messages-list-screen">
              <div className="header-bar">
                <div className="header-left">
                  {screen === "messages-chat" && (
                    <button
                      className="back-button"
                      aria-label="목록으로 돌아가기"
                      onClick={() => setScreen("messages-list")}
                      type="button"
                    >
                      ‹
                    </button>
                  )}
                </div>
                <div className="screen-title">
                  {screen === "messages-chat"
                    ? contactName(selectedContact)
                    : "메시지"}
                </div>
                <div className="header-right" />
              </div>

              {screen === "messages-list" && (
                <>
                  <div className="messages-header">
                    <input
                      className="search-box"
                      placeholder="검색"
                      aria-label="메시지 검색"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                  <div className="conversation-list">
                    {!contacts.some((contact) =>
                      `${contactName(contact)} ${contact.lastPreview}`
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                    ) && <p className="empty-state">검색 결과가 없습니다.</p>}
                    {contacts
                      .filter((contact) =>
                        `${contactName(contact)} ${contact.lastPreview}`
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                      )
                      .map((contact) => {
                        const preview =
                          conversations
                            .find(
                              (conversation) =>
                                conversation.contactId === contact.id,
                            )
                            ?.messages.at(-1)?.content ?? contact.lastPreview;

                        return (
                          <button
                            key={contact.id}
                            className="conversation-item"
                            onClick={() => openMessageThread(contact.id)}
                            type="button"
                          >
                            <div
                              className={`avatar ${contact.id === "captain-hollander" ? "blue" : "green"}`}
                            >
                              {contactInitials(contact)}
                            </div>

                            <div className="conversation-meta">
                              <div className="contact-name-row">
                                <span className="contact-name">
                                  {contactName(contact)}
                                </span>
                                <span
                                  className="row-chevron"
                                  aria-hidden="true"
                                >
                                  ›
                                </span>
                              </div>
                              <div className="preview-row">
                                <span className="preview-text">{preview}</span>
                                {contact.unreadCount ? (
                                  <span className="unread-badge">
                                    {contact.unreadCount}
                                  </span>
                                ) : null}
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
                  <div
                    className="chat-bg"
                    style={{ backgroundImage: `url(${imagePaths.lockscreen})` }}
                  />

                  <div className="chat-header">
                    <div className="chat-identity">
                      <div className="avatar blue">
                        {contactInitials(selectedContact)}
                      </div>
                      <div className="chat-name">
                        {contactName(selectedContact)}
                      </div>
                    </div>
                  </div>

                  <div className="chat-body" ref={chatScrollRef}>
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`chat-row ${message.sender === "me" ? "me" : "other"}`}
                      >
                        {message.sender === "other" && (
                          <div className="typing-avatar">
                            {contactInitials(selectedContact)}
                          </div>
                        )}

                        <div className="bubble-stack">
                          <div
                            className={`chat-bubble ${message.sender === "me" ? "me" : "other"}`}
                          >
                            {message.content}
                          </div>
                          {message.sender === "me" && message.read && (
                            <div className="read-mark">읽음</div>
                          )}
                        </div>
                      </div>
                    ))}

                    {selectedContact?.lastPreview === "작성 중…" && (
                      <div className="typing-row">
                        <div className="typing-avatar">
                          {contactInitials(selectedContact)}
                        </div>
                        <div className="typing-bubble">
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                        </div>
                      </div>
                    )}
                    {!selectedConversation.messages.length && (
                      <p className="empty-state">아직 대화 내용이 없습니다.</p>
                    )}
                  </div>

                  <div className="chat-input-box">
                    <input
                      className="chat-input"
                      value="읽기 전용 대화"
                      aria-label="읽기 전용 대화"
                      readOnly
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {(screen === "notes-list" ||
            screen === "notes-detail" ||
            screen === "note-password") && (
            <div className="app-window notes-screen">
              <div className="header-bar">
                <div className="header-left">
                  {(screen === "notes-detail" ||
                    screen === "note-password") && (
                    <button
                      className="back-button"
                      aria-label="목록으로 돌아가기"
                      onClick={() => setScreen("notes-list")}
                      type="button"
                    >
                      ‹
                    </button>
                  )}
                </div>
                <div className="screen-title">메모</div>
                <div className="header-right" />
              </div>

              {screen === "notes-list" && (
                <div className="notes-list">
                  {!notes.length && (
                    <p className="empty-state">저장된 메모가 없습니다.</p>
                  )}
                  {notes.map((note) => (
                    <button
                      key={note.id}
                      className="note-item"
                      type="button"
                      onClick={() => openNote(note.id)}
                    >
                      <div className="note-top">
                        <span className="note-title">{note.title}</span>
                        {note.locked && (
                          <span className="note-lock" aria-label="잠긴 메모">
                            잠김
                          </span>
                        )}
                      </div>
                      <div className="note-preview">{note.preview}</div>
                    </button>
                  ))}
                </div>
              )}

              {screen === "note-password" && selectedNote && (
                <form
                  className="password-box"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handlePasswordSubmit();
                  }}
                >
                  <label htmlFor="note-password">잠금 메모 비밀번호</label>
                  <input
                    id="note-password"
                    type="password"
                    value={notePassword}
                    onChange={(event) => {
                      setNotePassword(event.target.value);
                      setPasswordError(false);
                    }}
                    inputMode="numeric"
                    placeholder="숫자 6자리"
                  />
                  {passwordError && (
                    <div className="error-text">비밀번호가 틀렸습니다.</div>
                  )}
                  <button type="submit">확인</button>
                </form>
              )}

              {screen === "notes-detail" && selectedNote && (
                <div className="note-detail">
                  <h3>{selectedNote.title}</h3>
                  <p>
                    {selectedNote.locked &&
                    !(unlockedNotes[selectedNote.id] ?? false)
                      ? "잠긴 메모입니다."
                      : selectedNote.content}
                  </p>
                </div>
              )}
            </div>
          )}

          {screen === "popup" && popupApp && (
            <div
              className="popup-overlay"
              onClick={closePopup}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === "Escape" ||
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  closePopup();
                }
              }}
            >
              <div
                className="popup-card"
                role="dialog"
                aria-modal="true"
                aria-label={popupApp.name}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="popup-content">
                  <div className="popup-title">{popupApp.name}</div>
                  <div className="popup-message">{popupApp.message}</div>
                </div>
                <div className="popup-actions">
                  <button autoFocus onClick={closePopup} type="button">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            className="home-indicator"
            aria-label={screen === "lockscreen" ? "잠금 해제" : "홈 화면으로"}
            onClick={() => {
              setScreen("home");
              setPopupApp(null);
            }}
          >
            <span />
          </button>
        </div>
        <button
          className="side-button"
          aria-label="화면 잠금"
          onClick={() =>
            setScreen(screen === "lockscreen" ? "home" : "lockscreen")
          }
        />
      </div>
    </div>
  );
}

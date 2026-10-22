"use client";

import { useEffect, useRef, useState } from "react";
import { contacts, getDisplayName, type Contact } from "@/data/contacts";
import { conversations } from "@/data/conversations";
import AppHeader from "@/components/app-header";

type MessagesAppProps = {
  onClose: () => void;
};

export default function MessagesApp({ onClose }: MessagesAppProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeContact = contacts.find((c) => c.id === activeId);

  return (
    <div className="app-window" role="region" aria-label="메시지">
      <AppHeader title="메시지" onBack={onClose} backLabel="홈으로" large />

      <div className="search-field">
        <input type="search" placeholder="검색" aria-label="메시지 검색" />
      </div>

      <ul className="conversation-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              type="button"
              className="conversation-item"
              onClick={() => setActiveId(contact.id)}
            >
              <span className="unread-dot-slot" aria-hidden="true">
                {contact.unreadCount ? <span className="unread-dot" /> : null}
              </span>
              <Avatar contact={contact} />
              <span className="conversation-meta">
                <span className="contact-name">{getDisplayName(contact)}</span>
                <span className="preview-text">{contact.lastPreview}</span>
              </span>
              {contact.unreadCount ? (
                <span className="sr-only">{`읽지 않은 메시지 ${contact.unreadCount}개`}</span>
              ) : null}
              <svg className="chevron" width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m1 1 6 6-6 6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {activeContact ? (
        <ChatView contact={activeContact} onBack={() => setActiveId(null)} />
      ) : null}
    </div>
  );
}

function ChatView({ contact, onBack }: { contact: Contact; onBack: () => void }) {
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const messages = conversations.find((c) => c.contactId === contact.id)?.messages ?? [];
  const displayName = getDisplayName(contact);

  useEffect(() => {
    const el = chatBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [contact.id]);

  return (
    <div className="app-window chat-screen" role="region" aria-label={`${displayName} 대화`}>
      <header className="chat-header">
        <button type="button" className="back-button" onClick={onBack} aria-label="메시지 목록으로">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 2 2 10l8 8" />
          </svg>
        </button>
        <div className="chat-identity">
          <Avatar contact={contact} size="lg" />
          <div className="chat-name">{displayName}</div>
        </div>
        <span className="chat-header-spacer" />
      </header>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((message, index) => {
          const isMe = message.sender === "me";
          const next = messages[index + 1];
          const isTail = !next || next.sender !== message.sender;
          return (
            <div key={message.id} className={`chat-row ${isMe ? "me" : "other"}`}>
              <div className={`chat-bubble${isTail ? " tail" : ""}`}>{message.content}</div>
              {isMe && message.read && isTail ? <div className="read-mark">읽음</div> : null}
            </div>
          );
        })}

        {contact.typing ? (
          <div className="chat-row other">
            <div className="typing-bubble" role="status" aria-label="입력 중">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="chat-input-box">
        <span className="chat-plus" aria-hidden="true">+</span>
        <input className="chat-input" value="" placeholder="메시지를 보낼 수 없습니다" readOnly aria-label="메시지 입력 (사용 불가)" />
      </div>
    </div>
  );
}

function Avatar({ contact, size = "md" }: { contact: Contact; size?: "md" | "lg" }) {
  const hasName = Boolean(contact.name?.trim());
  return (
    <span className={`avatar ${contact.avatarColor ?? "gray"} ${size}`} aria-hidden="true">
      {hasName && contact.avatarText ? (
        contact.avatarText
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="9" r="4" />
          <path d="M4.5 20c.8-3.6 3.8-5.6 7.5-5.6s6.7 2 7.5 5.6z" />
        </svg>
      )}
    </span>
  );
}

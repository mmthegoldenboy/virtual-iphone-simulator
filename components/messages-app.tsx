"use client";

import { useState } from "react";
import { contacts, type Contact } from "@/data/contacts";
import { conversations } from "@/data/conversations";
import { imagePaths } from "@/data/image-paths";
import AppHeader from "@/components/app-header";

const avatarTones = ["", "blue", "green"];

type MessagesAppProps = {
  onClose: () => void;
};

export default function MessagesApp({ onClose }: MessagesAppProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const activeContact = contacts.find((c) => c.id === activeId);
  if (activeContact) {
    return <ChatView contact={activeContact} onBack={() => setActiveId(null)} />;
  }

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="app-window messages-list-screen">
      <AppHeader title="메시지" onBack={onClose} backLabel="홈으로" />
      <div className="messages-header">
        <label htmlFor="message-search" className="sr-only">
          검색
        </label>
        <input
          id="message-search"
          className="search-box"
          placeholder="검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="conversation-list" style={{ flex: 1, height: "auto" }}>
        {filtered.map((contact) => (
          <button
            key={contact.id}
            type="button"
            className="conversation-item"
            onClick={() => setActiveId(contact.id)}
          >
            <Avatar contact={contact} />
            <div className="conversation-meta">
              <div className="contact-name-row">
                <span className="contact-name">{contact.name}</span>
                <span className="last-time">{lastTimeFor(contact.id)}</span>
              </div>
              <div className="preview-row">
                <span className="preview-text">{contact.lastPreview}</span>
                {contact.unreadCount ? (
                  <span className="unread-badge" aria-label={`읽지 않은 메시지 ${contact.unreadCount}개`}>
                    {contact.unreadCount}
                  </span>
                ) : null}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function lastTimeFor(contactId: string) {
  const convo = conversations.find((c) => c.contactId === contactId);
  return convo?.messages[convo.messages.length - 1]?.time ?? "";
}

function Avatar({ contact }: { contact: Contact }) {
  const index = contacts.findIndex((c) => c.id === contact.id);
  const tone = avatarTones[index % avatarTones.length];
  return (
    <span className={`avatar ${tone}`} aria-hidden="true">
      {contact.avatarText}
    </span>
  );
}

function ChatView({ contact, onBack }: { contact: Contact; onBack: () => void }) {
  const convo = conversations.find((c) => c.contactId === contact.id);
  const messages = convo?.messages ?? [];
  const isTyping = contact.lastPreview.startsWith("작성 중");

  return (
    <div className="app-window chat-screen">
      <div className="chat-bg" style={{ backgroundImage: `url(${imagePaths.chatBackground})` }} />
      <div className="chat-header">
        <AppHeader
          onBack={onBack}
          backLabel="메시지 목록으로"
          title={
            <span className="chat-identity">
              <Avatar contact={contact} />
              <span className="chat-name">{contact.name}</span>
            </span>
          }
        />
      </div>

      <div className="chat-body">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={`chat-row ${message.sender}`}>
              <div className="bubble-stack">
                <div className="chat-bubble">{message.content}</div>
              </div>
            </div>
            {message.read ? <div className="read-mark">읽음</div> : null}
          </div>
        ))}

        {isTyping ? (
          <div className="typing-row" aria-label={`${contact.name} 입력 중`}>
            <span className="typing-avatar" aria-hidden="true">
              {contact.avatarText}
            </span>
            <span className="typing-bubble">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          </div>
        ) : null}
      </div>

      <div className="chat-input-box">
        <input className="chat-input" placeholder="iMessage" disabled aria-label="메시지 입력 (비활성화됨)" />
      </div>
    </div>
  );
}

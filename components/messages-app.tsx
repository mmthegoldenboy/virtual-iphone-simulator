import { useMemo, useRef, useEffect } from "react";
import { contacts } from "@/data/contacts";
import { conversations } from "@/data/conversations";

function getDisplayName(contact?: { name?: string; phone?: string }) {
  if (contact?.name && contact.name.trim() !== "") {
    return contact.name;
  }
  return contact?.phone ?? "알 수 없는 번호";
}

type MessagesAppProps = {
  onClose: () => void;
};

export default function MessagesApp({ onClose }: MessagesAppProps) {
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const selectedContact = contacts[0];
  const conversation = conversations[0];

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="app-window">
      <div className="header-bar">
        <div className="header-left">
          <button className="back-button" onClick={onClose}>‹</button>
        </div>
        <div className="screen-title">메시지</div>
        <div className="header-right">
          <button className="circle-button" aria-label="edit">✎</button>
        </div>
      </div>

      <div className="messages-header">
        <input className="search-box" placeholder="검색" aria-label="검색" />
      </div>

      <div className="conversation-list">
        {contacts.map((item) => {
          const lastMessage = conversation.messages.at(-1);
          return (
            <button key={item.id} className="conversation-item" type="button">
              <div className={`avatar ${item.id === "captain-hollander" ? "blue" : "green"}`}>
                {item.avatarText}
              </div>

              <div className="conversation-meta">
                <div className="contact-name-row">
                  <span className="contact-name">{getDisplayName(item)}</span>
                  <span className="last-time">{lastMessage?.time ?? "지금"}</span>
                </div>

                <div className="preview-row">
                  <span className="preview-text">{item.lastPreview}</span>
                  {item.unreadCount ? (
                    <span className="unread-badge">{item.unreadCount}</span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="chat-screen" style={{ position: "absolute", inset: 0, zIndex: 20 }}>
        <div className="header-bar chat-header">
          <div className="header-left">
            <button className="back-button" onClick={onClose}>‹</button>
          </div>

          <div className="chat-identity">
            <div className="avatar blue">{selectedContact.avatarText}</div>
            <div className="chat-name">{getDisplayName(selectedContact)}</div>
          </div>

          <div className="header-right">
            <button className="circle-button" aria-label="info">ℹ</button>
          </div>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {conversation.messages.map((message) => {
            const isMe = message.sender === "me";

            return (
              <div key={message.id} className={`chat-row ${isMe ? "me" : "other"}`}>
                <div className="bubble-stack">
                  {!isMe ? (
                    <div
                      className="avatar blue"
                      style={{ width: 26, height: 26, fontSize: "0.7rem" }}
                    >
                      {selectedContact.avatarText}
                    </div>
                  ) : null}
                  <div className="chat-bubble">{message.content}</div>
                </div>

                {isMe && message.read ? <div className="read-mark">읽음</div> : null}
              </div>
            );
          })}

          <div className="typing-row">
            <div className="typing-avatar">CH</div>
            <div className="typing-bubble" aria-label="입력 중">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        </div>

        <div className="chat-input-box">
          <input className="chat-input" value="메시지를 보낼 수 없습니다" readOnly />
        </div>
      </div>
    </div>
  );
}

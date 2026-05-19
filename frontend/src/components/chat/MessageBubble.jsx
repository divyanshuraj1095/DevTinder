export function getMessageSenderId(message) {
  const from = message?.fromUser;
  if (!from) return '';
  return String(from._id ?? from);
}

export const MessageBubble = ({ message, isOwn }) => {
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isOwn
            ? 'bg-gradient-brand text-white rounded-br-md'
            : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-md'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        {time && (
          <p className={`text-[10px] mt-1 ${isOwn ? 'text-white/70' : 'text-slate-500'}`}>{time}</p>
        )}
      </div>
    </div>
  );
};

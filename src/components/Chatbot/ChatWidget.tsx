import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, ChevronLeft, Lock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { STARTER_PROMPTS } from './flows';

const CHAT_ENDPOINT = '/.netlify/functions/chat';
const ADVICE_ENDPOINT = '/.netlify/functions/submit-advice';

const GREETING =
  "Hey — I'm STUF's money helper. Ask me anything about money: budgeting, payslips, saving, debt… or I can put you through to a real person.";

// Brand display font — matches the site's headings (Veneer Three).
const display = { fontFamily: "'Veneer Three', 'Inter', sans-serif" } as const;

type Screen = 'chat' | 'advice' | 'sent';
type ChatMessage = { role: 'user' | 'assistant'; content: string };
type Result = { reference: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>('chat');

  // Chat
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Advice (human channel)
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState('');
  const renderedAt = useRef<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (screen === 'chat') endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending, screen]);

  const onlyGreeting = messages.length === 1;

  async function send(text: string) {
    const content = text.trim();
    if (!content || sending) return;
    const next: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setChatError(null);
    setSending(true);
    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.reply) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      } else {
        setChatError(data.error || 'Something went wrong. Try again.');
      }
    } catch {
      setChatError('Network problem. Please try again.');
    } finally {
      setSending(false);
    }
  }

  function openAdvice() {
    setSubject('');
    setMessage('');
    setEmail('');
    setConsent(false);
    setHp('');
    setError(null);
    renderedAt.current = Date.now();
    setScreen('advice');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!subject.trim()) {
      setError('Please add a subject.');
      return;
    }
    if (!message.trim()) {
      setError('Please write your question.');
      return;
    }
    if (!email.trim()) {
      setError('Please add your email so the team can reply.');
      return;
    }
    if (!consent) {
      setError('Please tick the consent box so we can reply to you.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(ADVICE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, email, consent, hp, renderedAt: renderedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || 'Something went wrong. Please email hello@stuf.org.uk.');
        return;
      }
      setResult({ reference: data.reference });
      setScreen('sent');
    } catch {
      setError('Network problem. Please email hello@stuf.org.uk.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => {
          setScreen('chat');
          setOpen(true);
        }}
        aria-label="Open the STUF money chat"
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-pink-accent text-black pl-4 pr-5 py-3 font-bold shadow-2xl hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">Money help?</span>
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-label="STUF money chat"
      className="fixed z-[60] bottom-5 right-5 left-5 sm:left-auto sm:w-[380px] flex flex-col rounded-3xl bg-white shadow-2xl border border-gray-200 outline-none overflow-hidden h-[70vh] sm:h-[600px] max-h-[calc(100vh-2.5rem)]"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-2 text-white px-5 py-4"
        style={{
          backgroundImage:
            'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay, normal',
        }}
      >
        <div className="flex items-center gap-2">
          {screen !== 'chat' && (
            <button
              onClick={() => setScreen('chat')}
              aria-label="Back to chat"
              className="p-1 -ml-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <p className="text-lg leading-tight" style={display}>
              STUF Money Help
            </p>
            <p className="text-[11px] text-gray-300 leading-tight">Real skills, no judgement</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {screen === 'chat' && (
            <button
              onClick={openAdvice}
              aria-label="Talk to a real person"
              title="Talk to a real person"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* ---- CHAT ---- */}
        {screen === 'chat' && (
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-pink-accent text-black px-4 py-2.5 text-sm'
                      : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-gray-50 border border-gray-100 text-gray-800 px-4 py-2.5 text-sm whitespace-pre-wrap'
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-gray-50 border border-gray-100 px-4 py-3">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            {onlyGreeting && !sending && (
              <div className="flex flex-wrap gap-2 pt-1">
                {STARTER_PROMPTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-pink-accent hover:bg-pink-accent/5 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {chatError && <p className="text-xs font-medium text-red-600">{chatError}</p>}
            <div ref={endRef} />
          </div>
        )}

        {/* ---- ADVICE FORM ---- */}
        {screen === 'advice' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-700">
              Want to reach a real person on the STUF team? Add a subject, your question, and your
              email so they can reply.
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                maxLength={150}
                placeholder="What's your question about?"
                className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-accent focus:outline-none focus:ring-2 focus:ring-pink-accent/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Your question <span className="text-red-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                maxLength={4000}
                placeholder="Ask the team anything…"
                className="w-full resize-none rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-accent focus:outline-none focus:ring-2 focus:ring-pink-accent/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Your email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                placeholder="so the team can reply"
                className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-accent focus:outline-none focus:ring-2 focus:ring-pink-accent/40"
              />
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
            />

            <label className="flex items-start gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-pink-accent"
              />
              <span>
                I agree that STUF can use my email and question to reply to me. We won't share your
                data. <Lock className="inline w-3 h-3 -mt-0.5" />
              </span>
            </label>

            {error && <p className="text-xs font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-pink-accent text-black px-4 py-3 text-sm font-bold hover:bg-opacity-90 transition-colors disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}

        {/* ---- SENT ---- */}
        {screen === 'sent' && result && (
          <div className="space-y-4 text-center pt-4">
            <CheckCircle2 className="mx-auto w-12 h-12 text-pink-accent" />
            <p className="text-xl text-gray-900" style={display}>
              Message sent
            </p>
            <p className="text-sm text-gray-700">
              Thanks — the STUF team will get back to you by email within{' '}
              <strong>2 working days</strong>.
            </p>
            <p className="text-xs text-gray-400">Reference: {result.reference}</p>
            <button
              onClick={() => setScreen('chat')}
              className="block w-full rounded-full border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to chat
            </button>
          </div>
        )}
      </div>

      {/* Input bar (chat only) */}
      {screen === 'chat' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-gray-100 p-3 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about money…"
            aria-label="Type your message"
            className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm focus:border-pink-accent focus:outline-none focus:ring-2 focus:ring-pink-accent/30"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            aria-label="Send"
            className="flex items-center justify-center h-10 w-10 flex-shrink-0 rounded-full bg-pink-accent text-black hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Footer */}
      <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 px-5 py-2 text-[11px] text-gray-400">
        <Lock className="w-3 h-3" />
        <span>AI helper · private · not regulated financial advice</span>
      </div>
    </div>
  );
}

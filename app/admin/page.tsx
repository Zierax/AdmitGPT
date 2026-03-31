"use client";

import { useState, useEffect } from "react";
import { Mail, Shield, AlertTriangle, AlertCircle, Trash2, ShieldAlert, Archive, Inbox, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  links: string;
  score: number;
  classification: string;
  status: 'unread' | 'read' | 'spam';
  timestamp: string;
}

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<'inbox' | 'spam'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async (code: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-passcode": code },
      });
      if (!res.ok) {
        throw new Error("Invalid passcode");
      }
      const data = await res.json();
      setMessages(data.messages);
      setIsAuthenticated(true);
      setPasscode(code); // save the correct passcode
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMessages(passcode);
  };

  const updateStatus = async (id: number, status: 'unread' | 'read' | 'spam') => {
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({ id, status }),
      });
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
      if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this message?")) return;
    try {
      await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode },
      });
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05050a] flex items-center justify-center p-6 text-white text-sans">
        <div className="glass-card p-8 max-w-sm w-full border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-danger)]" />
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-[var(--color-danger)]/10 rounded-full mb-4">
              <ShieldAlert size={32} className="text-[var(--color-danger)]" />
            </div>
            <h1 className="text-xl font-bold uppercase tracking-widest font-mono text-[var(--color-danger)]">SECURE ACCESS</h1>
            <p className="text-xs text-[var(--color-muted)] mt-2 font-mono">Terminal Authentication Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                className="input-field w-full font-mono text-center tracking-widest bg-black/50"
                placeholder="ENTER PASSCODE"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
            </div>
            {error && <p className="text-[10px] text-[var(--color-danger)] font-mono text-center uppercase">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full !bg-[var(--color-danger)] !border-[var(--color-danger)] !text-black font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all">
              {loading ? "Authenticating..." : "Initialize"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const displayedMessages = messages.filter(m => activeTab === 'spam' ? m.status === 'spam' : m.status !== 'spam');

  return (
    <div className="min-h-screen bg-[#05050a] text-white flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#030307] border-r border-white/5 flex flex-col pt-6 flex-shrink-0">
        <div className="px-6 mb-8 flex items-center gap-3">
            <Shield size={20} className="text-[var(--color-primary)]" />
            <div>
              <h1 className="text-sm font-bold tracking-tight uppercase">Admin Panel</h1>
              <p className="text-[9px] text-[var(--color-muted)] font-mono tracking-widest">PRIVATE REPOSITORY</p>
            </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          <button
            onClick={() => { setActiveTab('inbox'); setSelectedMessage(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${activeTab === 'inbox' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-[var(--color-muted)] hover:bg-white/5 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Inbox size={16} /> Inbox</div>
            {messages.filter(m => m.status === 'unread').length > 0 && (
                <span className="bg-[var(--color-primary)] text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {messages.filter(m => m.status === 'unread').length}
                </span>
            )}
          </button>
          
          <button
            onClick={() => { setActiveTab('spam'); setSelectedMessage(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${activeTab === 'spam' ? 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] font-bold' : 'text-[var(--color-muted)] hover:bg-white/5 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><AlertTriangle size={16} /> Spam</div>
            {messages.filter(m => m.status === 'spam').length > 0 && (
                <span className="text-[10px] opacity-50 font-mono">
                    {messages.filter(m => m.status === 'spam').length}
                </span>
            )}
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
            <button onClick={() => { setIsAuthenticated(false); setPasscode(""); }} className="text-xs text-[var(--color-muted)] hover:text-white uppercase font-bold tracking-widest w-full text-left">
                [ Terminate Session ]
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row min-w-0">
          
        {/* List View */}
        <div className={`${selectedMessage ? 'hidden md:flex' : 'flex'} w-full md:w-2/5 lg:w-1/3 flex-col border-r border-white/5 bg-[#08080c]`}>
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#05050a]">
                <h2 className="text-sm font-bold uppercase tracking-widest">{activeTab}</h2>
                <button onClick={() => fetchMessages(passcode)} className="text-[10px] text-[var(--color-primary)] uppercase font-bold tracking-widest hover:underline">Refresh</button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {displayedMessages.length === 0 ? (
                    <div className="p-8 text-center text-sm text-[var(--color-muted)] italic">No messages found.</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {displayedMessages.map(msg => (
                            <button
                                key={msg.id}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (msg.status === 'unread') updateStatus(msg.id, 'read');
                                }}
                                className={`w-full text-left p-4 transition-all hover:bg-white/5 relative ${selectedMessage?.id === msg.id ? 'bg-white/5 border-l-2 border-[var(--color-primary)]' : 'border-l-2 border-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-sm tracking-tight truncate pr-4 ${msg.status === 'unread' ? 'font-bold text-white' : 'font-medium text-[var(--color-muted)]'} ${msg.status === 'spam' && 'line-through opacity-50'}`}>
                                        {msg.name || "Anonymous"}
                                    </span>
                                    <span className="text-[10px] text-[var(--color-muted)] whitespace-nowrap pt-1">
                                        {new Date(msg.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${msg.score > 10 ? 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]' : msg.score > 6.5 ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'bg-white/10 text-white/50'}`}>
                                        Spike: {msg.score}
                                    </span>
                                </div>
                                <p className={`text-xs truncate ${msg.status === 'unread' ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {msg.message || "No message provided."}
                                </p>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Detail View */}
        <div className={`flex-1 flex col flex-col bg-[#05050a] relative ${!selectedMessage ? 'hidden md:flex' : 'flex'}`}>
            {selectedMessage ? (
                <>
                    <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur sticky top-0 z-10">
                        <div className="flex items-center gap-2 md:hidden">
                            <button onClick={() => setSelectedMessage(null)} className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest hover:text-white px-2 py-1 bg-white/5 rounded">
                                ← Back
                            </button>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--color-muted)] ml-auto">
                           {activeTab !== 'spam' && (
                               <button onClick={() => updateStatus(selectedMessage.id, 'spam')} className="p-2 hover:bg-white/5 rounded-full hover:text-[var(--color-warning)] transition-colors group" title="Mark as Spam">
                                    <AlertCircle size={16} />
                               </button>
                           )}
                           {activeTab === 'spam' && (
                               <button onClick={() => updateStatus(selectedMessage.id, 'read')} className="p-2 hover:bg-white/5 rounded-full hover:text-[var(--color-primary)] transition-colors group" title="Not Spam">
                                    <Inbox size={16} />
                               </button>
                           )}
                           <button onClick={() => deleteMessage(selectedMessage.id)} className="p-2 hover:bg-white/5 rounded-full hover:text-[var(--color-danger)] transition-colors group" title="Permanently Delete">
                                <Trash2 size={16} />
                           </button>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 flex-1 overflow-y-auto">
                        <div className="mb-8">
                           <h2 className="text-2xl font-bold tracking-tight mb-2">{selectedMessage.name}</h2>
                           {selectedMessage.email && selectedMessage.email !== "N/A" && (
                               <a href={`mailto:${selectedMessage.email}`} className="text-sm text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5 font-mono">
                                   <Mail size={12} /> {selectedMessage.email}
                               </a>
                           )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-1 font-bold">Analysis Score</p>
                                <p className="text-xl font-mono font-bold text-white">{selectedMessage.score}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 col-span-2 md:col-span-3">
                                <p className="text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-1 font-bold">Classification</p>
                                <p className="text-sm font-sans font-bold text-white truncate">{selectedMessage.classification.replace(/_/g, ' ')}</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-muted)] mb-3 border-b border-white/5 pb-2">Direct Message</h3>
                            <div className="text-sm leading-relaxed text-gray-300 font-sans whitespace-pre-wrap bg-black/40 p-5 rounded-xl border border-white/5">
                                {selectedMessage.message || <span className="italic opacity-50">No message body provided.</span>}
                            </div>
                        </div>

                        {selectedMessage.links && (
                            <div className="mb-8">
                                <h3 className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-muted)] mb-3 border-b border-white/5 pb-2">Provided Links</h3>
                                <div className="text-sm text-[var(--color-primary)] font-mono leading-relaxed bg-[var(--color-primary)]/5 p-4 rounded-xl border border-[var(--color-primary)]/10">
                                    {selectedMessage.links.split(',').map((link, i) => (
                                        <div key={i} className="mb-1">{link.trim()}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="text-[10px] text-[var(--color-muted)] font-mono opacity-50 mt-12 flex justify-between items-center bg-black p-3 rounded border border-white/5">
                            <span>ID: {selectedMessage.id}</span>
                            <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-muted)] opacity-50 relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                    <Shield size={48} className="mb-4 text-white/10" />
                    <p className="text-xs uppercase tracking-widest font-mono">No Message Selected</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

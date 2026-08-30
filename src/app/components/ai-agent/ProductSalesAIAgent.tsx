import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  Compass,
  Cpu,
  Palette,
  DollarSign,
  ShieldCheck,
  Code2,
  ChevronDown,
  Copy,
  Check,
  Mic,
  MicOff,
  ExternalLink,
  PlusCircle,
  BarChart3,
  Users,
  Sliders,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ChatMessage, ChatAction, QuickPrompt } from './types';
import { matchUserQuery, QUICK_PROMPTS, PLANS_DATA } from './aiKnowledgeBase';
import { ChatLeadForm } from './ChatLeadForm';
import { PlanComparisonCard } from './PlanComparisonCard';
import { LicensePurchaseModal, PlanKey } from '../ui/LicensePurchaseModal';

interface ProductSalesAIAgentProps {
  mode?: 'floating' | 'embedded';
  defaultOpen?: boolean;
  initialQuery?: string;
  className?: string;
}

export function ProductSalesAIAgent({
  mode = 'floating',
  defaultOpen = false,
  initialQuery,
  className = '',
}: ProductSalesAIAgentProps) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(mode === 'embedded' ? true : defaultOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PlanKey>('pro');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'agent',
      text: `👋 **Welcome to DibsMatch AI Sales & Solutions Advisor!**\n\nI'm here to assist you with everything related to our **AI Job Matching & Multi-Tenant ATS SaaS Platform**.\n\nHow can I help you today? You can choose a quick topic below or type your custom query:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '💳 View Pricing & Licensing', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
        { label: '🎯 How AI Matching Works', actionType: 'navigate', payload: '/demo', icon: 'Cpu' },
        { label: '🧭 Explore All Demos', actionType: 'navigate', payload: '/demo', icon: 'Compass' },
        { label: '🚀 Request Custom Quote', actionType: 'lead_form', icon: 'Sparkles' },
      ],
    },
  ]);

  // Handle Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition error:', err);
      }
    }
  };

  // Play subtle UI audio chime
  const playChime = (type: 'send' | 'receive') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'send') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Handle Initial Query if provided
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Send message handler with typing simulation
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    playChime('send');

    // Generate AI response
    setTimeout(() => {
      const matchResult = matchUserQuery(query);

      const agentMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: matchResult.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: matchResult.actions,
        showPlanCards: matchResult.showPlanCards,
        showLeadForm: matchResult.showLeadForm,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, agentMessage]);
      playChime('receive');
    }, 650);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.actionType === 'navigate' && action.payload) {
      if (action.payload.startsWith('/#')) {
        // Anchor link on home page
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const anchor = action.payload?.replace('/#', '');
            document.getElementById(anchor || '')?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          const anchor = action.payload?.replace('/#', '');
          document.getElementById(anchor || '')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(action.payload);
      }
    } else if (action.actionType === 'open_modal') {
      const plan = (action.payload as PlanKey) || 'pro';
      setSelectedPlanForModal(plan);
      setModalOpen(true);
    } else if (action.actionType === 'lead_form') {
      // Append in-chat lead form
      const leadFormMsg: ChatMessage = {
        id: `lead-req-${Date.now()}`,
        sender: 'agent',
        text: `Here is our direct enterprise sales request form. Fill in your details below and our team will get in touch with you immediately:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showLeadForm: true,
      };
      setMessages((prev) => [...prev, leadFormMsg]);
    }
  };

  const handleSelectPlanFromCard = (plan: PlanKey) => {
    setSelectedPlanForModal(plan);
    setModalOpen(true);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'agent',
        text: `Conversation cleared! How can I assist you with DibsMatch SaaS features, licensing, or live demos?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: '💳 View Pricing Plans', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
          { label: '🎯 AI Matching Engine', actionType: 'navigate', payload: '/demo', icon: 'Cpu' },
          { label: '🚀 Request Custom Quote', actionType: 'lead_form', icon: 'Sparkles' },
        ],
      },
    ]);
  };

  const copyMessageText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Helper to render markdown text neatly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          // Headers ### or ####
          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-bold text-sm sm:text-base text-white mt-2 mb-1 flex items-center gap-1.5">
                {line.replace('### ', '')}
              </h3>
            );
          }
          if (line.startsWith('#### ')) {
            return (
              <h4 key={idx} className="font-semibold text-xs sm:text-sm text-blue-300 mt-1 mb-0.5">
                {line.replace('#### ', '')}
              </h4>
            );
          }

          // Bullet points
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const content = line.trim().substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 ml-1 text-slate-200">
                <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineStyles(content) }} />
              </div>
            );
          }

          // Numbered lists
          const numMatch = line.match(/^(\d+)\.\s(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 ml-1 text-slate-200">
                <span className="text-teal-400 font-semibold flex-shrink-0 text-xs">{numMatch[1]}.</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineStyles(numMatch[2]) }} />
              </div>
            );
          }

          return (
            <p key={idx} className="text-slate-200" dangerouslySetInnerHTML={{ __html: formatInlineStyles(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInlineStyles = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300 italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-950 px-1.5 py-0.5 rounded text-[11px] font-mono text-cyan-300 border border-slate-800">$1</code>');
  };

  const getActionIcon = (iconName?: string) => {
    switch (iconName) {
      case 'DollarSign': return <DollarSign className="w-3.5 h-3.5" />;
      case 'Cpu': return <Cpu className="w-3.5 h-3.5" />;
      case 'Palette': return <Palette className="w-3.5 h-3.5" />;
      case 'Compass': return <Compass className="w-3.5 h-3.5" />;
      case 'Code2': return <Code2 className="w-3.5 h-3.5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'Users': return <Users className="w-3.5 h-3.5" />;
      case 'BarChart3': return <BarChart3 className="w-3.5 h-3.5" />;
      case 'Sliders': return <Sliders className="w-3.5 h-3.5" />;
      case 'PlusCircle': return <PlusCircle className="w-3.5 h-3.5" />;
      case 'TrendingUp': return <TrendingUp className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  // Main Chat Card / Window
  const chatWindow = (
    <div
      className={`flex flex-col bg-slate-950/95 backdrop-blur-2xl border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
        mode === 'floating'
          ? isExpanded
            ? 'fixed inset-4 sm:inset-10 z-[9999] max-w-5xl mx-auto shadow-blue-500/10'
            : 'fixed bottom-5 right-4 sm:right-6 z-[9999] w-[92vw] sm:w-[460px] h-[640px] max-h-[85vh] shadow-blue-500/20'
          : `w-full h-full min-h-[550px] ${className}`
      }`}
    >
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 px-4 py-3 border-b border-blue-800/40 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 p-0.5 shadow-md shadow-blue-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-teal-300">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white tracking-tight">DibsMatch AI Advisor</h3>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-[9px] px-1.5 py-0 uppercase tracking-wider font-bold">
                Product & Sales
              </Badge>
            </div>
            <p className="text-[10px] text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span>Online • Instant Intelligent Responses</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 text-slate-300">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${
              soundEnabled ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Disable Audio Chimes' : 'Enable Audio Chimes'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset Conversation"
            aria-label="Clear chat history"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {mode === 'floating' && (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors hidden sm:block"
                title={isExpanded ? 'Restore window size' : 'Expand window'}
                aria-label="Toggle full screen"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 transition-colors"
                title="Close AI Assistant"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quick Prompts Carousel Bar */}
      <div className="bg-slate-900/90 px-3 py-2 border-b border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-400" />
          Topics:
        </span>
        {QUICK_PROMPTS.map((qp) => (
          <button
            key={qp.id}
            onClick={() => handleSendMessage(qp.prompt)}
            className="text-[11px] bg-slate-950 hover:bg-blue-950/70 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-blue-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm"
          >
            {getActionIcon(qp.iconName)}
            <span>{qp.title}</span>
          </button>
        ))}
      </div>

      {/* Message Stream Area */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 font-sans selection:bg-blue-600 selection:text-white">
        {messages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isAgent ? 'justify-start' : 'justify-end'}`}
            >
              {isAgent && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 text-xs shadow-md mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[88%] sm:max-w-[82%] group relative ${isAgent ? 'text-left' : 'text-right'}`}>
                <div
                  className={`p-3.5 rounded-2xl shadow-md ${
                    isAgent
                      ? 'bg-slate-900/90 border border-slate-800/90 text-slate-100 rounded-tl-sm'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm'
                  }`}
                >
                  {isAgent ? renderFormattedText(msg.text) : <p className="text-xs sm:text-sm">{msg.text}</p>}

                  {/* Optional Plan Cards embedded */}
                  {msg.showPlanCards && (
                    <PlanComparisonCard onSelectPlan={handleSelectPlanFromCard} />
                  )}

                  {/* Optional Lead Form embedded */}
                  {msg.showLeadForm && <ChatLeadForm onSuccess={scrollToBottom} />}

                  {/* Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          onClick={() => handleActionClick(act)}
                          className="text-[11px] font-semibold bg-slate-950/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          {getActionIcon(act.icon)}
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3 ml-0.5 opacity-70" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Timestamp & Copy Action */}
                <div
                  className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400 ${
                    isAgent ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isAgent && (
                    <button
                      onClick={() => copyMessageText(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 hover:text-slate-200 transition-opacity flex items-center gap-1"
                      title="Copy response"
                    >
                      {copiedMsgId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[9px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[9px]">Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAgent && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 text-xs shadow-md mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 text-xs shadow-md mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs text-slate-400 ml-2 font-medium">Analyzing DibsMatch knowledge base...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about pricing, AI matching, white-labeling..."
              className="bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500 h-10 pr-10 text-xs sm:text-sm focus:border-blue-500 rounded-xl"
              disabled={isTyping}
            />

            {/* Voice Input Button */}
            {recognitionRef.current && (
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`absolute right-2 top-2 p-1 rounded-md transition-colors ${
                  isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-white'
                }`}
                title={isListening ? 'Stop voice recording' : 'Speak query'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}
          </div>

          <Button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="h-10 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span>Encrypted & Specialized for DibsMatch SaaS</span>
          </span>
          <span className="hidden sm:inline">Press Enter to send</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* If floating mode, render trigger button and modal / chat window */}
      {mode === 'floating' && (
        <>
          {isOpen ? (
            chatWindow
          ) : (
            <div className="fixed bottom-6 right-6 z-[9990] flex items-center gap-3">
              {/* Pulsating Quick Hint Tooltip */}
              <div
                onClick={() => {
                  setIsOpen(true);
                  setHasUnread(false);
                }}
                className="hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-blue-500/40 text-slate-100 px-3.5 py-2 rounded-full shadow-xl shadow-blue-500/10 cursor-pointer hover:border-blue-400 transition-all hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                <span className="text-xs font-semibold">Have questions about DibsMatch? Ask AI Advisor</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </div>

              {/* Floating Action Button */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  setHasUnread(false);
                }}
                className="relative group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white shadow-2xl shadow-blue-600/40 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                aria-label="Open AI Sales Assistant"
              >
                <div className="relative">
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>

                {hasUnread && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-md">
                    1
                  </span>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* If embedded mode, render directly */}
      {mode === 'embedded' && chatWindow}

      {/* License Purchase Modal Integration */}
      <LicensePurchaseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlan={selectedPlanForModal}
      />
    </>
  );
}

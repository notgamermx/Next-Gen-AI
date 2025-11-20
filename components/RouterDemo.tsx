
import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  Image as ImageIcon, 
  Code2, 
  BookOpen, 
  MessageSquare, 
  Sparkles,
  ArrowUp,
  RefreshCw,
  Check,
  ChevronDown,
  Zap,
  Home,
  History,
  Bot,
  Folder,
  Share2,
  Database,
  Headphones,
  Settings,
  User,
  Search,
  Plus,
  Paperclip,
  MoreHorizontal,
  PenTool
} from 'lucide-react';
import { routeUserRequest } from '../services/gemini';
import { ModelName, ChatMessage, RouterResponse } from '../types';

const suggestions = [
  {
    text: "Write a to-do list for a personal project",
    icon: <User className="w-4 h-4" />
  },
  {
    text: "Generate an email to reply to a job offer",
    icon: <MessageSquare className="w-4 h-4" />
  },
  {
    text: "Summarize this article in one paragraph",
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    text: "How does AI work in a technical capacity",
    icon: <Code2 className="w-4 h-4" />
  }
];

const modelsList = [
  "Auto-Orchestrator (Default)",
  ...Object.values(ModelName)
];

const RouterDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeSidebarItem, setActiveSidebarItem] = useState('home');
  const [selectedModel, setSelectedModel] = useState(modelsList[0]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [citationEnabled, setCitationEnabled] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleNewThread = () => {
    setMessages([]);
    setInput('');
    setActiveSidebarItem('home');
  };

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = await routeUserRequest(text);
      
      const routerMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'router',
        content: result.response_content,
        timestamp: new Date(),
        metadata: result
      };

      setMessages(prev => [...prev, routerMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getModelIcon = (modelName: string) => {
    if (modelName.includes("Claude")) return <Sparkles className="w-3 h-3" />;
    if (modelName.includes("GPT")) return <BookOpen className="w-3 h-3" />;
    if (modelName.includes("Thinking")) return <Code2 className="w-3 h-3" />;
    if (modelName.includes("High")) return <ImageIcon className="w-3 h-3" />;
    return <Zap className="w-3 h-3" />;
  };

  return (
    <div className="flex h-screen bg-[#0B0B15] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-16 md:w-20 flex flex-col items-center py-6 border-r border-white/5 bg-[#0B0B15] z-20 flex-shrink-0">
        <div className="mb-8">
          <div className="w-10 h-10 bg-brand-purple/20 rounded-xl flex items-center justify-center text-brand-purple">
            <Brain className="w-6 h-6" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full px-2">
          {[
            { id: 'home', icon: Home },
            { id: 'chat', icon: MessageSquare },
            { id: 'history', icon: History },
            { id: 'bots', icon: Bot },
            { id: 'files', icon: Folder },
            { id: 'share', icon: Share2 },
            { id: 'db', icon: Database },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSidebarItem(item.id)}
              className={`p-3 rounded-xl transition-all flex justify-center ${
                activeSidebarItem === item.id 
                  ? 'bg-brand-purple/20 text-brand-purple shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-6 w-full px-2 mt-auto">
           <button className="p-3 text-gray-500 hover:text-gray-300 flex justify-center">
            <Headphones className="w-5 h-5" />
          </button>
          <button className="p-3 text-gray-500 hover:text-gray-300 flex justify-center">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-1 rounded-full border border-white/10 hover:border-brand-purple/50 transition-colors">
            <img 
              src="https://picsum.photos/seed/user/40/40" 
              alt="User" 
              className="w-8 h-8 rounded-full" 
            />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0B0B15]/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 bg-[#131320] hover:bg-[#1F1F2E] border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <Sparkles className="w-4 h-4 text-brand-purple" />
                {selectedModel}
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>
              
              {showModelDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#1F1F2E] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                  {modelsList.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 flex items-center gap-2"
                    >
                      {model === selectedModel && <Check className="w-3 h-3 text-brand-purple" />}
                      <span className={model === selectedModel ? "text-white" : "text-gray-400"}>
                        {model}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-[#131320] border border-white/10 rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search thread..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 w-full"
              />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Invite
            </button>
            <button 
              onClick={handleNewThread}
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Thread
            </button>
          </div>
        </header>

        {/* Chat Area / Empty State */}
        <div className="flex-1 overflow-y-auto relative">
          
          {/* Background Gradient Effect */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8 min-h-full flex flex-col">
            
            {messages.length === 0 ? (
              // EMPTY STATE DASHBOARD
              <div className="flex-1 flex flex-col items-center justify-center min-h-[600px]">
                {/* Orb */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-purple to-blue-500 shadow-[0_0_60px_rgba(99,102,241,0.4)] mb-8 animate-pulse"></div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                  Good Afternoon, Jason
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  What's on <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-accent">your mind?</span>
                </h2>

                {/* Main Input */}
                <div className="w-full bg-[#131320] border border-white/10 rounded-2xl p-4 shadow-2xl mb-12 relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                  <div className="relative bg-[#131320] rounded-xl">
                    <div className="flex items-center gap-2 mb-2 px-2">
                      <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
                      <span className="text-xs text-gray-500 font-medium">Orchestration Layer Active</span>
                    </div>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask AI a question or make a request..."
                      className="w-full bg-transparent text-white placeholder-gray-500 text-lg resize-none outline-none h-24 p-2"
                    />
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                         <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-xs text-gray-400 font-medium transition-colors">
                            <Paperclip className="w-3.5 h-3.5" /> Attach
                         </button>
                         <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-xs text-gray-400 font-medium transition-colors">
                            <PenTool className="w-3.5 h-3.5" /> Writing Styles
                         </button>
                         <div 
                           className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                           onClick={() => setCitationEnabled(!citationEnabled)}
                         >
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${citationEnabled ? 'bg-brand-purple' : 'bg-gray-700'}`}>
                               <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${citationEnabled ? 'left-4.5' : 'left-0.5'}`}></div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Citation</span>
                         </div>
                      </div>
                      
                      <button 
                        onClick={() => handleSendMessage()}
                        disabled={!input.trim()}
                        className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
                      >
                        <ArrowUp className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Suggestion Cards */}
                <div className="w-full">
                  <p className="text-xs text-gray-500 font-bold tracking-wider mb-4 uppercase">Get started with an example below</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion.text)}
                        className="bg-[#131320] hover:bg-[#1F1F2E] border border-white/5 hover:border-brand-purple/30 p-4 rounded-xl text-left flex flex-col justify-between h-32 transition-all group"
                      >
                        <span className="text-sm text-gray-300 leading-relaxed group-hover:text-white">
                          {suggestion.text}
                        </span>
                        <div className="self-start p-2 rounded-lg bg-white/5 group-hover:bg-brand-purple/20 text-gray-400 group-hover:text-brand-purple transition-colors">
                          {suggestion.icon}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // CHAT INTERFACE
              <div className="flex flex-col gap-6 pb-32">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role !== 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/20 mt-1">
                         <Brain className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                       {/* Metadata Badge for Router Response */}
                       {msg.role === 'router' && msg.metadata && (
                         <div className="flex items-center gap-2 mb-2 px-1 opacity-70 animate-in fade-in duration-500">
                            <span className="text-[10px] font-medium text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
                              {getModelIcon(msg.metadata.model_selected)}
                              Answered by {msg.metadata.model_selected}
                            </span>
                         </div>
                       )}

                       {/* Message Bubble */}
                       <div className={`
                          px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap
                          ${msg.role === 'user' 
                            ? 'bg-[#2D2D3F] text-white rounded-tr-sm border border-white/5' 
                            : 'bg-[#131320] text-gray-100 rounded-tl-sm border border-white/10'
                          }
                       `}>
                          {msg.content}
                       </div>
                    </div>
                    
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 mt-1">
                         <img src="https://picsum.photos/seed/user/40/40" alt="User" />
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-4 animate-pulse">
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
                     </div>
                     <div className="flex flex-col gap-2 pt-2">
                        <div className="h-3 bg-white/5 rounded w-24"></div>
                     </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>
            )}

          </div>
          
          {/* Bottom Input (Only visible in Chat Mode) */}
          {messages.length > 0 && (
             <div className="sticky bottom-0 w-full bg-[#0B0B15]/80 backdrop-blur-md border-t border-white/5 p-4 z-30">
                <div className="max-w-3xl mx-auto bg-[#131320] border border-white/10 rounded-xl flex items-center p-2 shadow-2xl focus-within:border-brand-purple/50 transition-colors">
                   <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Plus className="w-5 h-5" />
                   </button>
                   <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-gray-500"
                      placeholder="Send a follow up..."
                      autoFocus
                   />
                   <button 
                      onClick={() => handleSendMessage()}
                      disabled={!input.trim() || loading}
                      className="p-2 bg-brand-purple hover:bg-brand-accent text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                      <ArrowUp className="w-4 h-4" />
                   </button>
                </div>
                <div className="max-w-3xl mx-auto text-center mt-2">
                   <p className="text-[10px] text-gray-600">AI can make mistakes. Please check important information.</p>
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RouterDemo;

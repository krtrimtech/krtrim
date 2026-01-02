import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: Array<{
    text: string;
    action: string;
    url?: string;
  }>;
}

interface ChatbotProps {
  className?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

// Centralize booking buttons for DRY principle
const bookingButtons = [
    {
        text: "📅 Book Free Consultation",
        action: "book_meeting",
        url: "https://cal.com/krtrim/consultation"
    },
    {
        text: "📅 Book Alpha Team",
        action: "book_meeting",
        url: "https://cal.com/krtrim/alpha-team"
    },
    {
        text: "📅 Book Meta Team",
        action: "book_meeting",
        url: "https://cal.com/krtrim/meta-team"
    },
    {
        text: "📅 Book Sigma Team",
        action: "book_meeting",
        url: "https://cal.com/krtrim/sigma-team"
    }
];

const knowledgeBase: Record<string, {
    keywords: string[];
    response: string;
    buttons?: Array<{
        text: string;
        action: string;
        url?: string;
    }>;
}> = {
    services: {
        keywords: ['services', 'what do you do', 'offerings', 'products', 'solutions'],
        response: "We offer three main services:\n\n🌐 **Web Development** - Custom websites and complex web applications tailored to your brand.\n\n🤖 **AI Solutions (Chat & Voice)** - Intelligent conversational AI for customer support, call handling, and more.\n\n💻 **Full-Stack SaaS Development** - Complete software applications with integrated AI features.\n\nWould you like to know more about any specific service?"
    },
    alphaTeam: {
        keywords: ['alpha team', 'alpha', 'what is alpha team', 'about alpha team', 'web development'],
        response: "🌐 **Alpha Team** - Our Web Development Specialists\n\nThe Alpha Team specializes in crafting beautiful, high-performance websites and web applications:\n\n• **Responsive Design** - Perfect look and feel on all devices.\n• **Content Management Systems** - Easily manage your website content.\n• **E-commerce Solutions** - Robust online stores to drive sales.\n• **SEO Optimization** - Improve your visibility on search engines.\n\nPerfect for businesses needing a strong online presence!",
        buttons: [
            {
                text: "📅 Book Alpha Team Consultation",
                action: "book_alpha_team",
                url: "https://cal.com/krtrim/alpha-team"
            }
        ]
    },
    metaTeam: {
        keywords: ['meta team', 'meta', 'what is meta team', 'about meta team', 'ai solutions', 'chatbot', 'voice'],
        response: "🤖 **Meta Team** - Our AI Solutions Specialists\n\nThe Meta Team creates intelligent conversational AI for all your business needs:\n\n• **AI Chatbots** - Handle customer inquiries 24/7 with instant, accurate responses.\n• **Voice AI Agents** - Automate customer calls, appointments, and support with natural conversations.\n• **Custom Knowledge Base** - Train the AI on your specific business data.\n• **CRM Integration** - Seamlessly connect with your existing customer relationship tools.\n\nIdeal for businesses looking to automate and enhance customer interactions!",
        buttons: [
            {
                text: "📅 Book Meta Team Consultation",
                action: "book_meta_team",
                url: "https://cal.com/krtrim/meta-team"
            }
        ]
    },
    sigmaTeam: {
        keywords: ['sigma team', 'sigma', 'what is sigma team', 'about sigma team'],
        response: "💻 **Sigma Team** - Our Full-Stack SaaS Specialists\n\nThe Sigma Team builds complete SaaS applications with integrated AI features:\n\n• **Full-Stack Development** - Frontend, backend, and database design\n• **AI Integration** - Embed smart features throughout your platform\n• **Scalable Architecture** - Built to grow with your business\n• **Modern Tech Stack** - React, Node.js, PostgreSQL, and more\n• **DevOps & Deployment** - Automated CI/CD and cloud infrastructure\n\nPerfect for startups and enterprises needing complete digital solutions!",
        buttons: [
            {
                text: "📅 Book Sigma Team Consultation",
                action: "book_sigma_team",
                url: "https://cal.com/krtrim/sigma-team"
            }
        ]
    },
    bookAlphaTeam: {
        keywords: ['book alpha team', 'schedule alpha team', 'alpha team consultation', 'alpha team meeting'],
        response: "Great choice! The Alpha Team will help you build a stunning web presence. Let's schedule your consultation:",
        buttons: [
            {
                text: "📅 Book Alpha Team Consultation",
                action: "book_alpha_team",
                url: "https://cal.com/krtrim/alpha-team"
            }
        ]
    },
    bookMetaTeam: {
        keywords: ['book meta team', 'schedule meta team', 'meta team consultation', 'meta team meeting'],
        response: "Excellent! The Meta Team will help you create powerful AI solutions for chat and voice. Let's get your consultation scheduled:",
        buttons: [
            {
                text: "📅 Book Meta Team Consultation",
                action: "book_meta_team",
                url: "https://cal.com/krtrim/meta-team"
            }
        ]
    },
    bookSigmaTeam: {
        keywords: ['book sigma team', 'schedule sigma team', 'sigma team consultation', 'sigma team meeting'],
        response: "Perfect! The Sigma Team will help you build a complete SaaS solution with AI integration. Let's schedule your consultation:",
        buttons: [
            {
                text: "📅 Book Sigma Team Consultation",
                action: "book_sigma_team",
                url: "https://cal.com/krtrim/sigma-team"
            }
        ]
    },
    pricing: {
        keywords: ['price', 'cost', 'pricing', 'how much', 'rates', 'budget'],
        response: "Our pricing is customized based on your specific needs and project scope. We offer:\n\n• **Consultation** - Free initial consultation to understand your requirements\n• **Custom Quotes** - Tailored pricing for your project\n• **Flexible Payment** - Various payment options available\n\nWould you like to book a free consultation to discuss your project and get a custom quote?"
    },
    about: {
        keywords: ['about', 'who are you', 'company', 'team', 'krtrim'],
        response: "KRTRIM is a cutting-edge AI solutions company that helps businesses accelerate growth through automation. We specialize in:\n\n✨ Building intelligent chatbots and voice agents\n🚀 Developing full-stack SaaS applications\n🎯 Delivering measurable ROI for our clients\n\nOur clients have seen up to 300% ROI in the first quarter and 85% increase in customer satisfaction!"
    },
    contact: {
        keywords: ['contact', 'meeting', 'consultation', 'book', 'schedule', 'talk', 'call'],
        response: "I'd be happy to help you schedule a consultation! Choose the team that best fits your needs:",
        buttons: bookingButtons
    },
    process: {
        keywords: ['process', 'how it works', 'workflow', 'steps', 'timeline'],
        response: "Our proven process ensures success:\n\n1️⃣ **Discovery** - Free consultation to understand your needs\n2️⃣ **Planning** - Custom solution design and timeline\n3️⃣ **Development** - Agile development with regular updates\n4️⃣ **Testing** - Thorough testing and quality assurance\n5️⃣ **Launch** - Deployment and ongoing support\n\nTypical timeline is 2-8 weeks depending on project complexity."
    }
};

  const quickActions = [
    { text: "Our Services", action: "services" },
    { text: "Alpha Team", action: "alpha team" },
    { text: "Meta Team", action: "meta team" },
    { text: "Sigma Team", action: "sigma team" },
    { text: "Pricing", action: "pricing" },
    { text: "Book Meeting", action: "contact" }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "👋 Hi! I'm Kram, KRTRIM's AI assistant. I'm here to help you learn about our AI solutions and services.\n\nHow can I help you today?",
        isBot: true,
        timestamp: new Date(),
        buttons: quickActions.map(action => ({
          text: action.text,
          action: action.action
        }))
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findResponse = (userInput: string): { response: string; buttons?: Array<{ text: string; action: string; url?: string }> } => {
    const input = userInput.toLowerCase();
    
    for (const [key, knowledge] of Object.entries(knowledgeBase)) {
      if (knowledge.keywords.some(keyword => input.includes(keyword))) {
        return {
          response: knowledge.response,
          buttons: knowledge.buttons || undefined
        };
      }
    }

    // Default response for unrecognized queries
    return {
      response: "I'd be happy to help! I can provide information about:\n\n• Our AI services and solutions\n• Pricing and consultation booking\n• Our development process\n• Company information\n\nWhat would you like to know more about?",
      buttons: quickActions.map(action => ({
        text: action.text,
        action: action.action
      }))
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get bot response
    const { response, buttons } = findResponse(text);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isBot: true,
      timestamp: new Date(),
      buttons
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleButtonClick = (action: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
    handleSendMessage(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-96 h-[600px] bg-background border border-border shadow-2xl animate-scale-in flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Kram</h3>
                <p className="text-xs opacity-90">AI-powered support</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] ${message.isBot ? 'order-2' : ''}`}>
                  <div
                    className={`rounded-2xl p-3 ${
                      message.isBot
                        ? 'bg-muted text-foreground'
                        : 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{message.text}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  {message.buttons && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.buttons.map((button, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleButtonClick(button.action, button.url)}
                          className="text-xs bg-background hover:bg-orange-50 hover:border-orange-200 border-orange-200 dark:hover:bg-orange-950 dark:hover:text-orange-100 dark:hover:border-orange-800"
                        >
                          {button.text}
                          {button.url && <ExternalLink className="w-3 h-3 ml-1" />}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white order-1 mr-2' 
                    : 'bg-muted text-foreground ml-2'
                }`}>
                  {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

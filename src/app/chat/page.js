'use client'

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import TypingMarkdown from '../components/TypingMarkdown';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. Ask me anything about AWS.',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedMessages = sessionStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages]);

  // Trigger chat on landing if query param exists
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('query');
    if (query) {
      // handleQueryParam(query);
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    addMessage('user', input)
    setInput('')
    setIsLoading(true);
    submitQuery(input);
  };

  const handleQueryParam = async (query) => {
    // Add user message
    addMessage('user', query);
    setIsLoading(true);
    submitQuery(query);
  };

  const submitQuery = async (query) => {
    try {
      // Here you would call your RAG API
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input })
      });

      if (response.status === 429) {
        const reply = "Sorry, you have exceeded the rate limit. Please wait a while before trying again.";
        addMessage('assistant', reply);
      } else {
        const data = await response.json();
        let reply = data.response;
        if (response.status >= 200 && response.status < 300) {
          reply = data.response;
        } else if (response.status === 429) {
          reply = "Sorry, you have exceeded the rate limit. Please try again";
          console.log("Response is", response);
        } else {
          reply = 'Sorry, there was an error processing your request. Please try again later.';
        }
        addMessage('assistant', reply);
      }
    } catch (error) {
      console.log('RAG API error:', error)
      addMessage('assistant', 'Sorry, there was an error processing your request.')
    } finally {
      setIsLoading(false)
    }
  };

  const addMessage = (role, content) => {
    setMessages(prev => {
      let msgs = [...prev, { role, content }];
      sessionStorage.setItem('messages', JSON.stringify(msgs));
      return msgs;
    });
  }

  return (
    <div className="flex flex-col h-screen mx-auto">
      {/* Header */}
      <header className="bg-blue-300 border-b border-primary-light p-4">
        <span className="text-xl font-semibold text-primary-dark">AWS Bot</span>
        <Link href="/" className="text-link hover:underline mr-4 float-right">
          ← Back
        </Link>
      </header>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800 w-full">
        <div className="md:w-3xl w-full mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} my-4`}
            >
              <div
                className={`max-w-3xl rounded-lg px-4 py-2 ${message.role === 'user'
                  ? 'bg-user-message text-user-text'
                  : 'bg-assistant-message text-assistant-text'}`}
              >
                {message.role === 'assistant' && <Image className="rounded-full my-2" src="/bot.webp" width={32} height={32} alt="Thinking" />}
                {/* <TypingMarkdown content={message.content} /> */}
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-center">
              <div className="bg-assistant-message text-assistant-text rounded-lg px-4 py-2 max-w-3xl">
                <div className="flex items-center space-x-2">
                  <Image className="animate-pulse rounded-full" src="/bot.webp" width={24} height={24} alt="Thinking" />
                  <div className="text-muted">...</div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input form */}
      <div className="border-t border-input-border p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 text-input-text bg-input-background border border-input-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-primary text-button-text px-4 py-2 rounded-lg hover:bg-primary-dark disabled:bg-primary-light"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
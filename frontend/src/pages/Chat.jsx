import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const Chat = () => {
  return (
    <PageWrapper className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-purple">
          <MessageSquare size={40} className="text-brand-purple" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Real-time Chat</h1>
        <p className="text-slate-400 text-lg mb-8">
          This feature is currently under construction. Soon you'll be able to chat directly with your connections here!
        </p>
        <Link to="/connections">
          <Button variant="gradient">Back to Connections</Button>
        </Link>
      </div>
    </PageWrapper>
  );
};

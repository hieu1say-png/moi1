export interface MessageSender {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: 'customer' | 'admin' | 'support';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageThread {
  id: string;
  customer: MessageSender;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'open' | 'pending' | 'resolved';
  messages: ChatMessage[];
}

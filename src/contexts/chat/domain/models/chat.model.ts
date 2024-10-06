import { ChatLineModel } from './chat-line.model';
import { ChatProfileModel } from './chat-profile.model';

export interface ChatModel {
  id: string;
  chat_lines: ChatLineModel[];
  chats_profiles: ChatProfileModel[];
  last_message_date: string;
  create_date: string;
  update_date: string;
}

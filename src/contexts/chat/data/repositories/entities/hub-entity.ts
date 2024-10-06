import { ChatLineEntity } from './chat-line.entity';
import { ChatProfileEntity } from './chat-profile.entity';

export interface ChatEntity {
  id: string;
  chat_lines: ChatLineEntity[];
  chats_profiles: ChatProfileEntity[];
  last_message_date: string;
  create_date: string;
  update_date: string;
}

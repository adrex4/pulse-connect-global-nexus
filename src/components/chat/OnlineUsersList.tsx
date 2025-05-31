
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users } from 'lucide-react';

interface OnlineUsersListProps {
  onlineUsers: number;
}

const OnlineUsersList: React.FC<OnlineUsersListProps> = ({ onlineUsers }) => {
  const userNames = ['Sarah Johnson', 'Mike Chen', 'Emma Rodriguez', 'David Kumar', 'Lisa Wong'];

  return (
    <div className="w-80 border-l bg-white shadow-lg">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          Online ({onlineUsers})
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {userNames.slice(0, onlineUsers).map((name, index) => (
            <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default OnlineUsersList;

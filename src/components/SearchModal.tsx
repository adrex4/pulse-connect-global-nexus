
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, MessageCircle, Hash, Calendar } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'messages' | 'members' | 'files'>('all');

  const searchResults = [
    { type: 'message', content: 'Looking for sustainable solutions...', author: 'Mike Chen', time: '2 hours ago' },
    { type: 'member', name: 'Sarah Johnson', role: 'Marketing Director', online: true },
    { type: 'file', name: 'Business_Plan_2024.pdf', size: '2.3 MB', shared: 'Yesterday' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Search in Group
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages, members, files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Search Filters */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All', icon: Search },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'members', label: 'Members', icon: Users },
              { id: 'files', label: 'Files', icon: Hash },
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={searchType === id ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchType(id as any)}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>

          {/* Search Results */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                {result.type === 'message' && (
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-4 w-4 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm">{result.content}</p>
                      <p className="text-xs text-gray-500">{result.author} • {result.time}</p>
                    </div>
                  </div>
                )}
                {result.type === 'member' && (
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">{result.name}</p>
                      <p className="text-xs text-gray-500">{result.role}</p>
                    </div>
                    {result.online && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                )}
                {result.type === 'file' && (
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-purple-500" />
                    <div className="flex-1">
                      <p className="font-medium">{result.name}</p>
                      <p className="text-xs text-gray-500">{result.size} • {result.shared}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;

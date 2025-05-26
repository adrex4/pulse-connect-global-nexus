
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, Shield, Users, Trash2, Edit, Crown } from 'lucide-react';

interface GroupSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
}

const GroupSettingsModal: React.FC<GroupSettingsModalProps> = ({ isOpen, onClose, groupName }) => {
  const [notifications, setNotifications] = useState(true);
  const [privateGroup, setPrivateGroup] = useState(false);
  const [allowFiles, setAllowFiles] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Group Settings - {groupName}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Group Name</Label>
                <Input defaultValue={groupName} />
              </div>
              <div>
                <Label>Description</Label>
                <Input placeholder="Group description..." />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="members" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Group Members (127)
              </h3>
              {['Sarah Johnson', 'Mike Chen', 'Emma Rodriguez', 'David Kumar'].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{member}</p>
                      <p className="text-sm text-gray-500">
                        {index === 0 ? 'Admin' : 'Member'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {index === 0 && <Crown className="h-4 w-4 text-yellow-500" />}
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Private Group</Label>
                  <p className="text-sm text-gray-500">Only invited members can join</p>
                </div>
                <Switch checked={privateGroup} onCheckedChange={setPrivateGroup} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow File Sharing</Label>
                  <p className="text-sm text-gray-500">Members can share files and documents</p>
                </div>
                <Switch checked={allowFiles} onCheckedChange={setAllowFiles} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <h3 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Danger Zone
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  These actions cannot be undone. Please proceed with caution.
                </p>
                <Button variant="destructive" size="sm">
                  Leave Group
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GroupSettingsModal;

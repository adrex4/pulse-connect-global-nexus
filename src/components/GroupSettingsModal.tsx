
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Bell, Shield, Users, Trash2, Edit, Crown, 
  Save, Camera, Globe, Lock, Eye, EyeOff, UserX, 
  MessageCircle, Image, FileText, Mic, Video, Share2
} from 'lucide-react';

interface GroupSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
}

const GroupSettingsModal: React.FC<GroupSettingsModalProps> = ({ isOpen, onClose, groupName }) => {
  const [groupSettings, setGroupSettings] = useState({
    name: groupName,
    description: 'A professional networking group for business collaboration',
    notifications: true,
    privateGroup: false,
    allowFiles: true,
    allowImages: true,
    allowVoiceMessages: true,
    allowVideoMessages: true,
    autoDeleteMessages: false,
    messageRetention: '30',
    showOnlineStatus: true,
    allowInvites: true,
    moderationEnabled: true
  });

  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved!",
      description: "Group settings have been updated successfully.",
    });
    onClose();
  };

  const handleSettingChange = (key: string, value: any) => {
    setGroupSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const mockMembers = [
    { name: 'Sarah Johnson', role: 'Admin', avatar: 'SJ', online: true, joinDate: '2023-01-15' },
    { name: 'Mike Chen', role: 'Moderator', avatar: 'MC', online: true, joinDate: '2023-02-20' },
    { name: 'Emma Rodriguez', role: 'Member', avatar: 'ER', online: false, joinDate: '2023-03-10' },
    { name: 'David Kumar', role: 'Member', avatar: 'DK', online: true, joinDate: '2023-03-25' },
    { name: 'Lisa Wong', role: 'Member', avatar: 'LW', online: false, joinDate: '2023-04-05' }
  ];

  const handleMemberAction = (action: string, memberName: string) => {
    toast({
      title: `${action} member`,
      description: `${memberName} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Group Settings - {groupName}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="space-y-4">
              {/* Group Photo */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {groupName.substring(0, 2).toUpperCase()}
                </div>
                <div className="space-y-2">
                  <Label>Group Photo</Label>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Group Name</Label>
                  <Input 
                    value={groupSettings.name} 
                    onChange={(e) => handleSettingChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Group Type</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Business Network
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea 
                  value={groupSettings.description}
                  onChange={(e) => handleSettingChange('description', e.target.value)}
                  placeholder="Group description..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications for new messages and mentions</p>
                </div>
                <Switch 
                  checked={groupSettings.notifications} 
                  onCheckedChange={(value) => handleSettingChange('notifications', value)} 
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Show Online Status</Label>
                  <p className="text-sm text-gray-500">Let others see when you're online</p>
                </div>
                <Switch 
                  checked={groupSettings.showOnlineStatus} 
                  onCheckedChange={(value) => handleSettingChange('showOnlineStatus', value)} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="members" className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Group Members ({mockMembers.length})
              </h3>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            </div>

            <div className="space-y-3">
              {mockMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {member.avatar}
                      </div>
                      {member.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.role === 'Admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                        {member.role === 'Moderator' && <Shield className="h-4 w-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-500">
                        {member.role} • Joined {new Date(member.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {member.role !== 'Admin' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMemberAction('Promote', member.name)}
                        >
                          <Crown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMemberAction('Remove', member.name)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Private Group
                  </Label>
                  <p className="text-sm text-gray-500">Only invited members can join this group</p>
                </div>
                <Switch 
                  checked={groupSettings.privateGroup} 
                  onCheckedChange={(value) => handleSettingChange('privateGroup', value)} 
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Allow Member Invites</Label>
                  <p className="text-sm text-gray-500">Let members invite others to the group</p>
                </div>
                <Switch 
                  checked={groupSettings.allowInvites} 
                  onCheckedChange={(value) => handleSettingChange('allowInvites', value)} 
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Message Moderation</Label>
                  <p className="text-sm text-gray-500">Enable automatic message filtering</p>
                </div>
                <Switch 
                  checked={groupSettings.moderationEnabled} 
                  onCheckedChange={(value) => handleSettingChange('moderationEnabled', value)} 
                />
              </div>

              <div className="p-4 border rounded-lg">
                <Label className="font-medium">Message Retention</Label>
                <p className="text-sm text-gray-500 mb-3">How long should messages be kept</p>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    value={groupSettings.messageRetention}
                    onChange={(e) => handleSettingChange('messageRetention', e.target.value)}
                    className="w-20"
                  />
                  <span className="text-sm">days</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Allow Images
                  </Label>
                  <p className="text-sm text-gray-500">Members can share images in the chat</p>
                </div>
                <Switch 
                  checked={groupSettings.allowImages} 
                  onCheckedChange={(value) => handleSettingChange('allowImages', value)} 
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Allow File Sharing
                  </Label>
                  <p className="text-sm text-gray-500">Members can share documents and files</p>
                </div>
                <Switch 
                  checked={groupSettings.allowFiles} 
                  onCheckedChange={(value) => handleSettingChange('allowFiles', value)} 
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Allow Voice Messages
                  </Label>
                  <p className="text-sm text-gray-500">Members can send voice recordings</p>
                </div>
                <Switch 
                  checked={groupSettings.allowVoiceMessages} 
                  onCheckedChange={(value) => handleSettingChange('allowVoiceMessages', value)} 
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Allow Video Messages
                  </Label>
                  <p className="text-sm text-gray-500">Members can send video recordings</p>
                </div>
                <Switch 
                  checked={groupSettings.allowVideoMessages} 
                  onCheckedChange={(value) => handleSettingChange('allowVideoMessages', value)} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Auto-delete Messages</Label>
                  <p className="text-sm text-gray-500">Automatically delete old messages</p>
                </div>
                <Switch 
                  checked={groupSettings.autoDeleteMessages} 
                  onCheckedChange={(value) => handleSettingChange('autoDeleteMessages', value)} 
                />
              </div>

              <div className="p-4 border rounded-lg">
                <Label className="font-medium flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Export Data
                </Label>
                <p className="text-sm text-gray-500 mb-3">Download your group data and chat history</p>
                <Button variant="outline" size="sm">
                  Export Group Data
                </Button>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <h3 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Danger Zone
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  These actions cannot be undone. Please proceed with caution.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                    Clear All Messages
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete Group
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupSettingsModal;

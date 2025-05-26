
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Phone, Mic, MicOff, VideoOff, Settings, Share, Users } from 'lucide-react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, groupName }) => {
  const [meetingLink, setMeetingLink] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const generateMeetingLink = () => {
    const roomId = Math.random().toString(36).substring(2, 15);
    setMeetingLink(`https://meet.google.com/${roomId}`);
  };

  const startMeeting = () => {
    if (meetingLink) {
      window.open(meetingLink, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Start Video Call - {groupName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Video Preview */}
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative">
            <div className="text-white text-center">
              <Video className="h-12 w-12 mx-auto mb-2" />
              <p>Camera Preview</p>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                size="sm"
                variant={isMicOn ? "default" : "destructive"}
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant={isVideoOn ? "default" : "destructive"}
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Meeting Link */}
          <div className="space-y-2">
            <Label>Meeting Link</Label>
            <div className="flex gap-2">
              <Input
                value={meetingLink}
                placeholder="Generate or paste meeting link"
                onChange={(e) => setMeetingLink(e.target.value)}
              />
              <Button onClick={generateMeetingLink} variant="outline">
                Generate
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={startMeeting} disabled={!meetingLink} className="flex-1">
              <Video className="h-4 w-4 mr-2" />
              Start Meeting
            </Button>
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(meetingLink)} disabled={!meetingLink}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallModal;

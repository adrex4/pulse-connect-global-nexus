
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, Mic, MicOff, VideoOff, Settings, Share, Users, Clock, Calendar, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, groupName }) => {
  const [meetingLink, setMeetingLink] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const { toast } = useToast();

  const generateMeetingLink = () => {
    setIsCreatingMeeting(true);
    const roomId = Math.random().toString(36).substring(2, 15);
    const platforms = [
      'https://meet.google.com/',
      'https://zoom.us/j/',
      'https://teams.microsoft.com/l/meetup-join/'
    ];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    
    setTimeout(() => {
      setMeetingLink(`${platform}${roomId}`);
      setIsCreatingMeeting(false);
      toast({
        title: "Meeting Created!",
        description: "Your video call link is ready to share.",
      });
    }, 1500);
  };

  const startMeeting = () => {
    if (meetingLink) {
      window.open(meetingLink, '_blank');
      toast({
        title: "Joining Meeting",
        description: "Opening video call in new tab...",
      });
    }
  };

  const copyMeetingLink = async () => {
    if (meetingLink) {
      await navigator.clipboard.writeText(meetingLink);
      toast({
        title: "Link Copied!",
        description: "Meeting link copied to clipboard.",
      });
    }
  };

  const scheduleMeeting = () => {
    if (meetingDate && meetingTime) {
      toast({
        title: "Meeting Scheduled!",
        description: `Meeting scheduled for ${meetingDate} at ${meetingTime}`,
      });
    }
  };

  useEffect(() => {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setMeetingDate(today);
    
    // Set default time to next hour
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const timeString = now.toTimeString().slice(0, 5);
    setMeetingTime(timeString);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Video Call - {groupName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Video Preview */}
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
            <div className="text-white text-center z-10">
              {isVideoOn ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-medium">Camera Ready</p>
                  <p className="text-sm opacity-80">Your video is enabled</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <VideoOff className="h-12 w-12 mx-auto opacity-60" />
                  <p>Camera Off</p>
                </div>
              )}
            </div>
            
            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
              <Button
                size="sm"
                variant={isMicOn ? "default" : "destructive"}
                onClick={() => setIsMicOn(!isMicOn)}
                className="rounded-full w-10 h-10 p-0"
              >
                {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant={isVideoOn ? "default" : "destructive"}
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-full w-10 h-10 p-0"
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full w-10 h-10 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Meeting Link Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Meeting Link</Label>
              <Badge variant="outline" className="text-xs">
                {meetingLink ? 'Ready' : 'Not Created'}
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={meetingLink}
                placeholder="Generate or paste meeting link"
                onChange={(e) => setMeetingLink(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={generateMeetingLink} 
                variant="outline"
                disabled={isCreatingMeeting}
                className="shrink-0"
              >
                {isCreatingMeeting ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Generate'
                )}
              </Button>
            </div>

            {meetingLink && (
              <div className="flex gap-2">
                <Button onClick={copyMeetingLink} variant="outline" size="sm" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button onClick={startMeeting} size="sm" className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Now
                </Button>
              </div>
            )}
          </div>

          {/* Schedule Meeting */}
          <div className="space-y-3 border-t pt-4">
            <Label className="text-base font-medium">Schedule Meeting</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Date</Label>
                <Input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Time</Label>
                <Input
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button 
              onClick={scheduleMeeting} 
              variant="outline" 
              className="w-full"
              disabled={!meetingDate || !meetingTime}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={startMeeting} 
              disabled={!meetingLink} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Video className="h-4 w-4 mr-2" />
              Start Meeting
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigator.share?.({ url: meetingLink, title: `${groupName} Video Call` })} 
              disabled={!meetingLink}
              className="shrink-0"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallModal;

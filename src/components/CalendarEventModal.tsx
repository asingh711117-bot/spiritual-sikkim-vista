import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Bell,
  Share2,
  ExternalLink
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  category: string;
  monastery: string;
  description: string;
  significance: string;
  activities: string[];
  timing: string;
  participants: string;
}

interface CalendarEventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const CalendarEventModal = ({ event, isOpen, onClose }: CalendarEventModalProps) => {
  if (!event) return null;

  const handleAddToGoogleCalendar = () => {
    const startDate = format(event.start, "yyyyMMdd'T'HHmmss");
    const endDate = format(event.end, "yyyyMMdd'T'HHmmss");
    const title = encodeURIComponent(event.title);
    const description = encodeURIComponent(`${event.description}\n\nLocation: ${event.monastery}\n\nSignificance: ${event.significance}`);
    const location = encodeURIComponent(event.monastery);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Join us for ${event.title} at ${event.monastery}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `${event.title} - ${event.monastery}\n${event.description}\n\nDate: ${format(event.start, "EEEE, MMMM dd, yyyy")}\nTime: ${event.timing}`;
      navigator.clipboard.writeText(shareText);
      // You could add a toast notification here
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-heading pr-8">
              {event.title}
            </DialogTitle>
            <Badge variant="secondary" className="capitalize">
              {event.category}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Event Description */}
          <p className="text-body leading-relaxed">
            {event.description}
          </p>
          
          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading font-semibold mb-3">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(event.start, "EEEE, MMMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.monastery}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.timing}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.participants}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold mb-3">Cultural Significance</h3>
              <p className="text-body text-sm leading-relaxed">
                {event.significance}
              </p>
            </div>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-heading font-semibold mb-3">Festival Activities</h3>
            <div className="grid grid-cols-2 gap-2">
              {event.activities.map((activity, index) => (
                <Badge key={index} variant="secondary" className="text-xs justify-center py-2">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button onClick={handleAddToGoogleCalendar} className="flex-1">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Add to Google Calendar
            </Button>
            
            <Button variant="outline" onClick={handleShare} className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share Event
            </Button>
            
            <Button variant="outline" className="flex-1">
              <Bell className="mr-2 h-4 w-4" />
              Set Reminder
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Planning to Attend?</h4>
            <p className="text-sm text-body mb-3">
              Join thousands of devotees and visitors in celebrating this sacred occasion. 
              Experience authentic Sikkimese culture and Buddhist traditions.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Get Directions to {event.monastery}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventModal;
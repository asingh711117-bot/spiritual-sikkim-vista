import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Star,
  Plus,
  Filter,
  Bell
} from "lucide-react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CulturalCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const events = [
    {
      id: 1,
      title: "Losar Festival",
      start: new Date(2025, 1, 27),
      end: new Date(2025, 1, 29),
      category: "major",
      monastery: "All Monasteries",
      description: "Tibetan New Year celebration with traditional ceremonies, prayers, and cultural performances",
      significance: "Most important festival marking the beginning of the Tibetan lunar year",
      activities: ["Traditional Dance", "Prayer Ceremonies", "Butter Lamp Lighting", "Festive Meals"],
      timing: "3 Days",
      participants: "Public Welcome",
    },
    {
      id: 2,
      title: "Saga Dawa Festival",
      start: new Date(2025, 4, 15),
      end: new Date(2025, 4, 15),
      category: "religious",
      monastery: "Tashiding Monastery",
      description: "Celebration of Buddha's birth, enlightenment, and parinirvana",
      significance: "One of the holiest Buddhist festivals",
      activities: ["Circumambulation", "Prayer Flags", "Meditation", "Offerings"],
      timing: "Full Day",
      participants: "Devotees & Visitors",
    },
    {
      id: 3,
      title: "Pang Lhabsol",
      start: new Date(2025, 7, 20),
      end: new Date(2025, 7, 20),
      category: "cultural",
      monastery: "Rumtek Monastery",
      description: "Festival dedicated to Mount Khangchendzonga, the guardian deity of Sikkim",
      significance: "Unique to Sikkim, celebrating the state's guardian deity",
      activities: ["Masked Dances", "Traditional Music", "Mountain Worship", "Folk Performances"],
      timing: "Half Day",
      participants: "Public Event",
    },
    {
      id: 4,
      title: "Drupka Teshi",
      start: new Date(2025, 6, 8),
      end: new Date(2025, 6, 8),
      category: "religious",
      monastery: "Pemayangtse Monastery",
      description: "Celebration of Buddha's first teaching at Deer Park in Sarnath",
      significance: "Commemorates the turning of the wheel of dharma",
      activities: ["Dharma Teaching", "Group Meditation", "Prayer Services", "Blessing Ceremonies"],
      timing: "Morning to Evening",
      participants: "Buddhist Community",
    },
    {
      id: 5,
      title: "Dussehra Festival",
      start: new Date(2025, 9, 10),
      end: new Date(2025, 9, 10),
      category: "cultural",
      monastery: "Multiple Locations",
      description: "Hindu festival celebrating the victory of good over evil",
      significance: "Cultural harmony between Buddhist and Hindu traditions",
      activities: ["Cultural Programs", "Traditional Dance", "Community Feast", "Religious Prayers"],
      timing: "Evening Celebration",
      participants: "Multi-faith Community",
    },
  ];

  const categories = [
    { id: "all", name: "All Events", color: "bg-gray-500" },
    { id: "major", name: "Major Festivals", color: "bg-primary" },
    { id: "religious", name: "Religious Events", color: "bg-accent" },
    { id: "cultural", name: "Cultural Events", color: "bg-secondary" },
  ];

  const eventStyleGetter = (event: any) => {
    let backgroundColor = "#f59e0b"; // default
    
    switch (event.category) {
      case "major":
        backgroundColor = "#ea580c"; // orange
        break;
      case "religious":
        backgroundColor = "#0ea5e9"; // blue  
        break;
      case "cultural":
        backgroundColor = "#10b981"; // green
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="container px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Cultural Calendar
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover and participate in Sikkim's rich tapestry of festivals, ceremonies, and cultural events throughout the year
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Controls */}
        <div className="lg:col-span-1">
          <Card className="card-monastery mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Event Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className={`h-3 w-3 rounded-full ${category.color}`} />
                  <span className="font-medium text-foreground">{category.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-monastery mb-6">
            <h3 className="font-heading font-semibold mb-4">View Options</h3>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={view === "calendar" ? "default" : "outline"}
                onClick={() => setView("calendar")}
                className="flex-1"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button
                size="sm"
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
                className="flex-1"
              >
                <Filter className="mr-2 h-4 w-4" />
                List
              </Button>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="card-monastery">
            <h3 className="font-heading font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-smooth">
                  <h4 className="font-medium text-foreground text-sm mb-1">
                    {event.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{format(event.start, "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{event.monastery}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {view === "calendar" ? (
            <Card className="p-6 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-heading font-semibold">2025 Cultural Calendar</h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              </div>
              
              <div className="h-96">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  onSelectEvent={setSelectedEvent}
                  eventPropGetter={eventStyleGetter}
                  className="bg-background"
                />
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="card-monastery cursor-pointer" onClick={() => setSelectedEvent(event)}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                            {event.title}
                          </h3>
                          <p className="text-body text-sm mb-3 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="ml-4">
                          {event.category}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{format(event.start, "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{event.monastery}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{event.timing}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{event.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Selected Event Details */}
          {selectedEvent && (
            <Card className="card-monastery mt-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  {selectedEvent.title}
                </h2>
                <Badge variant="secondary">{selectedEvent.category}</Badge>
              </div>
              
              <p className="text-body mb-6 leading-relaxed">
                {selectedEvent.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-heading font-semibold mb-3">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{format(selectedEvent.start, "EEEE, MMMM dd, yyyy")}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEvent.monastery}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEvent.timing}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEvent.participants}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold mb-3">Activities & Significance</h3>
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Cultural Significance</h4>
                    <p className="text-body text-sm">{selectedEvent.significance}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.activities.map((activity: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button className="btn-hero">
                  <Bell className="mr-2 h-4 w-4" />
                  Set Reminder
                </Button>
                <Button variant="outline" className="btn-secondary">
                  <Star className="mr-2 h-4 w-4" />
                  Add to Favorites
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CulturalCalendar;
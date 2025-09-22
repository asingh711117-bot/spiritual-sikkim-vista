import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Star,
  Search,
  Route,
  Layers
} from "lucide-react";

interface Monastery {
  id: number;
  name: string;
  location: string;
  coordinates: [number, number];
  description: string;
  rating: number;
  phone: string;
  timings: string;
  features: string[];
  nearby: string[];
}

interface MapboxMapProps {
  monasteries: Monastery[];
  selectedMonastery: Monastery | null;
  onSelectMonastery: (monastery: Monastery | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const MapboxMap = ({ 
  monasteries, 
  selectedMonastery, 
  onSelectMonastery, 
  searchQuery, 
  onSearchChange 
}: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapStyle, setMapStyle] = useState("satellite");
  const [showRoutes, setShowRoutes] = useState(false);

  // Mock map implementation with enhanced visuals
  const MapViewer = () => {
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl overflow-hidden shadow-card">
        {/* Enhanced Map Background */}
        <div className="absolute inset-0">
          {mapStyle === "satellite" ? (
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-300 to-blue-200 opacity-90">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.4),transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.3),transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(168,85,247,0.2),transparent_40%)]" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-90">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.05)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.05)_75%),linear-gradient(45deg,rgba(0,0,0,0.05)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.05)_75%)]" />
            </div>
          )}
        </div>

        {/* Monastery Markers */}
        {monasteries.map((monastery, index) => (
          <div
            key={monastery.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              selectedMonastery?.id === monastery.id ? 'z-20 scale-125' : 'z-10'
            }`}
            style={{
              left: `${25 + index * 18}%`,
              top: `${35 + index * 12}%`,
            }}
            onClick={() => onSelectMonastery(monastery)}
          >
            <div className="relative">
              <div className={`h-10 w-10 rounded-full shadow-lg flex items-center justify-center ring-4 transition-all duration-300 ${
                selectedMonastery?.id === monastery.id 
                  ? 'bg-primary ring-primary/30 animate-pulse' 
                  : 'bg-white ring-white hover:scale-110'
              }`}>
                <MapPin className={`h-5 w-5 ${
                  selectedMonastery?.id === monastery.id ? 'text-primary-foreground' : 'text-primary'
                }`} />
              </div>
              
              {/* Monastery Label */}
              <div className={`absolute -top-14 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap transition-all duration-300 ${
                selectedMonastery?.id === monastery.id ? 'opacity-100 scale-100' : 'opacity-80 scale-90'
              }`}>
                <div className="font-semibold text-foreground">{monastery.name}</div>
                <div className="text-muted-foreground">{monastery.location}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>

              {/* Rating Badge */}
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {monastery.rating}
              </div>
            </div>
          </div>
        ))}

        {/* Route Lines (when enabled) */}
        {showRoutes && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {monasteries.slice(0, -1).map((_, index) => (
              <line
                key={index}
                x1={`${25 + index * 18}%`}
                y1={`${35 + index * 12}%`}
                x2={`${25 + (index + 1) * 18}%`}
                y2={`${35 + (index + 1) * 12}%`}
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="8,4"
                className="animate-pulse"
              />
            ))}
          </svg>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 left-4 space-y-2">
          <Button 
            size="sm" 
            className="bg-white text-foreground shadow-lg hover:bg-gray-50"
            onClick={() => {
              console.log("Navigation mode activated");
            }}
          >
            <Navigation className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            className={`shadow-lg transition-colors ${
              showRoutes 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-white text-foreground hover:bg-gray-50'
            }`}
            onClick={() => setShowRoutes(!showRoutes)}
          >
            <Route className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            className="bg-white text-foreground shadow-lg hover:bg-gray-50"
            onClick={() => setMapStyle(mapStyle === "satellite" ? "street" : "satellite")}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search monasteries..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 bg-white/90 backdrop-blur-sm shadow-lg"
            />
          </div>
        </div>

        {/* Map Style Indicator */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {mapStyle === "satellite" ? "🛰️ Satellite" : "🗺️ Street View"}
          </Badge>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-1">
          <Button size="sm" className="bg-white text-foreground shadow-lg hover:bg-gray-50 h-8 w-8 p-0">
            +
          </Button>
          <Button size="sm" className="bg-white text-foreground shadow-lg hover:bg-gray-50 h-8 w-8 p-0">
            −
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6 shadow-card">
      <MapViewer />
      
      {/* Map Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold">Route Planning</h3>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Navigation className="mr-2 h-4 w-4" />
              Get Directions
            </Button>
            <Button size="sm" variant="outline">
              <Route className="mr-2 h-4 w-4" />
              Plan Route
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="font-semibold text-foreground">{monasteries.length}</div>
            <div className="text-sm text-muted-foreground">Monasteries</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="font-semibold text-foreground">4</div>
            <div className="text-sm text-muted-foreground">Districts</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="font-semibold text-foreground">25+</div>
            <div className="text-sm text-muted-foreground">Attractions</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MapboxMap;
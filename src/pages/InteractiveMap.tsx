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
  Route
} from "lucide-react";

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: "East Sikkim",
      coordinates: [88.5562, 27.3021],
      description: "The largest monastery in Sikkim, seat of the Karmapa",
      rating: 4.8,
      phone: "+91-3592-252023",
      timings: "6:00 AM - 6:00 PM",
      features: ["360° Tour Available", "Guided Tours", "Photography Allowed"],
      nearby: ["Tibetan Institute", "Rumtek Village", "Martam Village"],
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      location: "West Sikkim", 
      coordinates: [88.2468, 27.2044],
      description: "One of the oldest monasteries, perfect sublime lotus",
      rating: 4.7,
      phone: "+91-3595-250263",
      timings: "7:00 AM - 5:00 PM",
      features: ["Ancient Artifacts", "Mountain Views", "Traditional Architecture"],
      nearby: ["Pelling", "Skywalk", "Khecheopalri Lake"],
    },
    {
      id: 3,
      name: "Tashiding Monastery",
      location: "West Sikkim",
      coordinates: [88.2725, 27.2889],
      description: "Sacred monastery on a conical hilltop",
      rating: 4.6,
      phone: "+91-3595-250158",
      timings: "6:30 AM - 5:30 PM",
      features: ["Sacred Chorten", "Valley Views", "Peaceful Environment"],
      nearby: ["Yuksom", "Khecheopalri Lake", "Tashiding Village"],
    },
  ];

  // Simple map placeholder with interactive elements
  const MapViewer = () => {
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl overflow-hidden shadow-card">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,165,0,0.2),transparent_50%)]" />
        </div>

        {/* Monastery Markers */}
        {monasteries.map((monastery, index) => (
          <div
            key={monastery.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
            style={{
              left: `${30 + index * 20}%`,
              top: `${40 + index * 15}%`,
              animationDelay: `${index * 0.2}s`
            }}
            onClick={() => setSelectedMonastery(monastery)}
          >
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-primary shadow-lg flex items-center justify-center ring-4 ring-white hover:scale-110 transition-transform">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md text-xs font-medium shadow-lg whitespace-nowrap">
                {monastery.name}
              </div>
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 left-4 space-y-2">
          <Button size="sm" className="bg-white text-foreground shadow-lg hover:bg-gray-50">
            <Navigation className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-white text-foreground shadow-lg hover:bg-gray-50">
            <Route className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search monasteries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-white/90 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Interactive Monastery Map
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover Sikkim's sacred monasteries, plan your routes, and explore nearby attractions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-card">
            <MapViewer />
            
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
                  <div className="font-semibold text-foreground">12</div>
                  <div className="text-sm text-muted-foreground">Monasteries</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="font-semibold text-foreground">5</div>
                  <div className="text-sm text-muted-foreground">Districts</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="font-semibold text-foreground">25+</div>
                  <div className="text-sm text-muted-foreground">Attractions</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Monastery Details */}
        <div className="space-y-6">
          {/* Selected Monastery */}
          {selectedMonastery ? (
            <Card className="card-monastery">
              <div className="mb-4">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {selectedMonastery.name}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{selectedMonastery.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{selectedMonastery.rating}</span>
                  </div>
                  <Badge variant="secondary">Verified</Badge>
                </div>
              </div>

              <p className="text-body text-sm mb-4">
                {selectedMonastery.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedMonastery.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedMonastery.timings}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMonastery.features.map((feature: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full btn-hero">
                  <Navigation className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full">
                  <Route className="mr-2 h-4 w-4" />
                  Add to Route
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="card-monastery text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Select a Monastery
              </h3>
              <p className="text-body text-sm">
                Click on any monastery marker on the map to view details and plan your visit
              </p>
            </Card>
          )}

          {/* Nearby Attractions */}
          <Card className="card-monastery">
            <h3 className="font-heading font-semibold mb-4">Popular Monasteries</h3>
            <div className="space-y-3">
              {monasteries.slice(0, 3).map((monastery) => (
                <div 
                  key={monastery.id}
                  onClick={() => setSelectedMonastery(monastery)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm">
                      {monastery.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {monastery.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="ml-1 text-xs">{monastery.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
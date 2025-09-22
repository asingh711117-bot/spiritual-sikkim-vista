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
import MapboxMap from "@/components/MapboxMap";

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: "East Sikkim",
      coordinates: [88.5562, 27.3021] as [number, number],
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
      coordinates: [88.2468, 27.2044] as [number, number],
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
      coordinates: [88.2725, 27.2889] as [number, number],
      description: "Sacred monastery on a conical hilltop",
      rating: 4.6,
      phone: "+91-3595-250158",
      timings: "6:30 AM - 5:30 PM",
      features: ["Sacred Chorten", "Valley Views", "Peaceful Environment"],
      nearby: ["Yuksom", "Khecheopalri Lake", "Tashiding Village"],
    },
  ];


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
          <MapboxMap 
            monasteries={monasteries}
            selectedMonastery={selectedMonastery}
            onSelectMonastery={setSelectedMonastery}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
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
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCw, 
  Info,
  Globe,
  MapPin,
  Clock
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import monasteryInterior from "@/assets/monastery-interior.jpg";
import AudioPlayer from "@/components/AudioPlayer";

const VirtualTours = () => {
  const [selectedTour, setSelectedTour] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const tours = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: "East Sikkim",
      description: "The largest monastery in Sikkim, known as the 'Dharmachakra Centre'",
      duration: "15 mins",
      highlights: ["Golden Stupa", "Prayer Hall", "Tibetan Art"],
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      location: "West Sikkim",
      description: "One of the oldest monasteries, meaning 'Perfect Sublime Lotus'",
      duration: "12 mins",
      highlights: ["Ancient Murals", "Wooden Sculptures", "Mountain Views"],
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Tashiding Monastery",
      location: "West Sikkim",
      description: "Sacred monastery on a conical hilltop with panoramic valley views",
      duration: "10 mins",
      highlights: ["Sacred Chorten", "Valley Views", "Ancient Texts"],
      image: "/placeholder.svg",
    },
  ];

  const languages = [
    { code: "english", name: "English", flag: "🇬🇧", audio: "/audio/english-narration.mp3" },
    { code: "hindi", name: "हिन्दी", flag: "🇮🇳", audio: "/audio/hindi-narration.mp3" },
    { code: "nepali", name: "नेपाली", flag: "🇳🇵", audio: "/audio/nepali-narration.mp3" },
    { code: "tibetan", name: "བོད་སྐད།", flag: "🏔️", audio: "/audio/tibetan-narration.mp3" },
  ];

  // Audio narration functionality
  const playAudio = () => {
    const selectedLang = languages.find(l => l.code === selectedLanguage);
    if (selectedLang && !audioElement) {
      const audio = new Audio(selectedLang.audio);
      audio.loop = true;
      setAudioElement(audio);
      audio.play().catch(() => {
        console.log("Audio playback failed - using mock audio");
      });
    } else if (audioElement) {
      audioElement.play().catch(() => {
        console.log("Audio playback failed - using mock audio");
      });
    }
  };

  const stopAudio = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Enhanced 360 viewer with Three.js
  const VirtualTourViewer = () => {
    return (
      <div className={`relative w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden shadow-card transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-96'
      }`}>
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* 360 Sphere with texture */}
          <Sphere args={[10, 60, 40]}>
            <meshBasicMaterial 
              side={THREE.BackSide}
              map={new THREE.TextureLoader().load(monasteryInterior)}
            />
          </Sphere>
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            maxDistance={12}
            minDistance={8}
          />
        </Canvas>

        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading 360° Experience...</p>
            </div>
          </div>
        )}

        {/* Tour Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              className="bg-black/70 text-white hover:bg-black/80"
              onClick={() => {
                setIsAudioOn(!isAudioOn);
                if (!isAudioOn) {
                  playAudio();
                } else {
                  stopAudio();
                }
              }}
            >
              {isAudioOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            
            <Button 
              size="sm" 
              className="bg-black/70 text-white hover:bg-black/80"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1500);
              }}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            
            <Button 
              size="sm" 
              className="bg-black/70 text-white hover:bg-black/80"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-black/70 text-white hover:bg-black/80">
              <Info className="h-4 w-4 mr-1" />
              Info
            </Button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <select 
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              if (isAudioOn) {
                stopAudio();
                setAudioElement(null);
                setTimeout(playAudio, 100);
              }
            }}
            className="bg-black/70 text-white text-sm rounded-lg px-3 py-2 border-0 focus:ring-2 focus:ring-primary"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exit Fullscreen */}
        {isFullscreen && (
          <Button
            onClick={toggleFullscreen}
            className="absolute top-4 left-4 bg-black/70 text-white hover:bg-black/80"
            size="sm"
          >
            Exit Fullscreen
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="container px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          360° Virtual Tours
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience Sikkim's sacred monasteries through immersive virtual reality tours with multilingual narration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tour Selection */}
        <div className="lg:col-span-1">
          <Card className="card-monastery mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Choose Your Journey</h2>
            <div className="space-y-3">
              {tours.map((tour, index) => (
                <div
                  key={tour.id}
                  onClick={() => setSelectedTour(index)}
                  className={`p-4 rounded-lg cursor-pointer transition-smooth border ${
                    selectedTour === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Globe className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground text-sm">
                        {tour.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{tour.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{tour.duration}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tour Details */}
          <Card className="card-monastery">
            <h3 className="text-lg font-heading font-semibold mb-3">
              {tours[selectedTour].name}
            </h3>
            <p className="text-body text-sm mb-4">
              {tours[selectedTour].description}
            </p>
            
            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-2">Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {tours[selectedTour].highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full btn-hero">
              <Play className="mr-2 h-4 w-4" />
              Start Tour
            </Button>
          </Card>
        </div>

        {/* Virtual Tour Viewer */}
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-card">
            <VirtualTourViewer />
            
            {/* Narration Controls */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-heading font-semibold mb-4">Audio Narration</h3>
              
              <AudioPlayer
                src={languages.find(l => l.code === selectedLanguage)?.audio || ""}
                title={`${tours[selectedTour].name} - ${languages.find(l => l.code === selectedLanguage)?.name} Narration`}
                isActive={isAudioOn}
                onToggle={() => setIsAudioOn(!isAudioOn)}
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Language: <span className="font-medium text-foreground">
                    {languages.find(l => l.code === selectedLanguage)?.name}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Duration: {tours[selectedTour].duration}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VirtualTours;
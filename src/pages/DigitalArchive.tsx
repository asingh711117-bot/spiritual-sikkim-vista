import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Heart,
  BookOpen,
  Palette,
  Scroll,
  Camera,
  ZoomIn
} from "lucide-react";
import ancientManuscript from "@/assets/ancient-manuscript.jpg";

const DigitalArchive = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);

  const categories = [
    { id: "all", name: "All Items", icon: BookOpen, count: 245 },
    { id: "manuscripts", name: "Manuscripts", icon: Scroll, count: 89 },
    { id: "thangkas", name: "Thangkas", icon: Palette, count: 67 },
    { id: "sculptures", name: "Sculptures", icon: Camera, count: 43 },
    { id: "artifacts", name: "Artifacts", icon: Heart, count: 46 },
  ];

  const artifacts = [
    {
      id: 1,
      title: "Ancient Buddhist Manuscript",
      category: "manuscripts",
      description: "Handwritten Buddhist scripture in ancient Tibetan script from the 14th century",
      monastery: "Rumtek Monastery",
      date: "14th Century",
      material: "Palm Leaf, Natural Ink",
      significance: "Contains rare teachings on Mahamudra meditation practices",
      image: "/placeholder.svg",
      tags: ["Buddhist", "Tibetan", "Meditation", "Rare"],
    },
    {
      id: 2,
      title: "Mahakala Thangka Painting",
      category: "thangkas",
      description: "Traditional thangka depicting Mahakala, the fierce protector deity",
      monastery: "Pemayangtse Monastery",
      date: "18th Century",
      material: "Cotton Canvas, Natural Pigments, Gold Leaf",
      significance: "Masterpiece of Sikkim's traditional thangka art",
      image: "/placeholder.svg",
      tags: ["Thangka", "Mahakala", "Protection", "Art"],
    },
    {
      id: 3,
      title: "Wooden Buddha Sculpture",
      category: "sculptures",
      description: "Intricately carved wooden Buddha in meditation pose",
      monastery: "Tashiding Monastery",
      date: "16th Century",
      material: "Sacred Juniper Wood, Natural Lacquer",
      significance: "Represents the perfect meditation posture and inner peace",
      image: "/placeholder.svg",
      tags: ["Buddha", "Wood", "Meditation", "Sacred"],
    },
    {
      id: 4,
      title: "Prayer Wheel Collection",
      category: "artifacts",
      description: "Set of traditional prayer wheels with mantras inscribed",
      monastery: "Rumtek Monastery",
      date: "17th Century",
      material: "Copper, Silver, Precious Stones",
      significance: "Used in daily prayer rituals and meditation practices",
      image: "/placeholder.svg",
      tags: ["Prayer", "Copper", "Mantras", "Ritual"],
    },
    {
      id: 5,
      title: "Lotus Sutra Manuscript",
      category: "manuscripts",
      description: "Complete Lotus Sutra written in gold ink on blue paper",
      monastery: "Pemayangtse Monastery",
      date: "15th Century",
      material: "Handmade Paper, Gold Ink",
      significance: "One of the most important Mahayana Buddhist texts",
      image: "/placeholder.svg",
      tags: ["Lotus Sutra", "Gold", "Mahayana", "Sacred"],
    },
    {
      id: 6,
      title: "Green Tara Thangka",
      category: "thangkas",
      description: "Beautiful thangka of Green Tara, the compassionate goddess",
      monastery: "Tashiding Monastery",
      date: "19th Century",
      material: "Silk, Natural Dyes, Silver Thread",
      significance: "Symbolizes active compassion and swift action",
      image: "/placeholder.svg",
      tags: ["Tara", "Compassion", "Goddess", "Silk"],
    },
  ];

  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesCategory = selectedCategory === "all" || artifact.category === selectedCategory;
    const matchesSearch = artifact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artifact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artifact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Digital Heritage Archive
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore Sikkim's rich cultural heritage through our digitally preserved collection of manuscripts, thangkas, and sacred artifacts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="card-monastery mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Search & Filter</h2>
            
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artifacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-smooth ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm opacity-75">{category.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="card-monastery">
            <h3 className="font-heading font-semibold mb-4">Collection Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-body">Total Items</span>
                <span className="font-semibold text-foreground">245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body">Monasteries</span>
                <span className="font-semibold text-foreground">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body">Centuries</span>
                <span className="font-semibold text-foreground">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body">Digitized</span>
                <span className="font-semibold text-foreground">100%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Archive Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              Showing {filteredArtifacts.length} of {artifacts.length} items
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArtifacts.map((artifact) => (
              <Dialog key={artifact.id}>
                <DialogTrigger asChild>
                  <Card className="card-monastery cursor-pointer group">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                        style={{ 
                          backgroundImage: artifact.category === "manuscripts" 
                            ? `url(${ancientManuscript})` 
                            : "linear-gradient(135deg, #f59e0b, #ea580c)" 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-20">
                          {artifact.category === "manuscripts" && "📜"}
                          {artifact.category === "thangkas" && "🎨"}
                          {artifact.category === "sculptures" && "🗿"}
                          {artifact.category === "artifacts" && "⚱️"}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {artifact.title}
                      </h3>
                      <p className="text-body text-sm mb-3 line-clamp-2">
                        {artifact.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{artifact.monastery}</span>
                        <span>{artifact.date}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {artifact.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {artifact.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{artifact.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Button size="sm" variant="ghost" className="text-xs">
                          <Heart className="mr-1 h-3 w-3" />
                          Save
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          <Share2 className="mr-1 h-3 w-3" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-heading">{artifact.title}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
                        style={{ 
                          backgroundImage: artifact.category === "manuscripts" 
                            ? `url(${ancientManuscript})` 
                            : "linear-gradient(135deg, #f59e0b, #ea580c)" 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-orange-100/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl opacity-30">
                          {artifact.category === "manuscripts" && "📜"}
                          {artifact.category === "thangkas" && "🎨"}
                          {artifact.category === "sculptures" && "🗿"}
                          {artifact.category === "artifacts" && "⚱️"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-body leading-relaxed">{artifact.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-foreground">Monastery: </span>
                          <span className="text-body">{artifact.monastery}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Period: </span>
                          <span className="text-body">{artifact.date}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Material: </span>
                          <span className="text-body">{artifact.material}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Significance: </span>
                          <span className="text-body">{artifact.significance}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {artifact.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredArtifacts.length === 0 && (
            <Card className="card-monastery text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                No artifacts found
              </h3>
              <p className="text-body">
                Try adjusting your search terms or selected category to find more items.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalArchive;
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Map, Archive, Calendar, Play, Heart, Users, Award } from "lucide-react";
import monasteryHero from "@/assets/monastery-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Globe,
      title: "360° Virtual Tours",
      description: "Immersive monastery experiences from anywhere in the world",
      href: "/tours",
    },
    {
      icon: Map,
      title: "Interactive Map",
      description: "Discover monasteries and plan your spiritual journey",
      href: "/map",
    },
    {
      icon: Archive,
      title: "Digital Archive",
      description: "Explore ancient manuscripts, thangkas, and cultural artifacts",
      href: "/archive",
    },
    {
      icon: Calendar,
      title: "Cultural Calendar",
      description: "Stay updated with festivals and spiritual events",
      href: "/calendar",
    },
  ];

  const stats = [
    { icon: Heart, number: "12+", label: "Sacred Monasteries" },
    { icon: Users, number: "500+", label: "Virtual Visitors" },
    { icon: Award, number: "800+", label: "Cultural Artifacts" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${monasteryHero})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container px-6 py-24 lg:py-32 z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-heading font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
              Experience Sikkim's
              <span className="block text-accent-foreground">Sacred Heritage</span>
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-8 animate-slide-up">
              Journey through ancient monasteries with immersive 360° virtual tours, 
              interactive maps, and rich cultural archives. Discover the spiritual heart 
              of Sikkim anytime, anywhere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-scale-in">
              <Link to="/tours">
                <Button size="lg" className="btn-hero group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Explore 360° Tours
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <Map className="mr-2 h-5 w-5" />
                  Plan Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
          <div className="h-12 w-12 rounded-full bg-accent/30 backdrop-blur-sm" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground sm:text-4xl">
              Discover Spiritual Heritage
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore Sikkim's monasteries through cutting-edge technology and immersive experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.href}>
                  <Card className="card-monastery group cursor-pointer animate-slide-up" 
                        style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-body text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center animate-scale-in" 
                     style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-heading font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground sm:text-4xl mb-6">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the tranquility and wisdom of Sikkim's ancient monasteries through our immersive platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/tours">
                <Button size="lg" className="btn-hero">
                  Start Virtual Tour
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" size="lg" className="btn-secondary">
                  Plan Physical Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
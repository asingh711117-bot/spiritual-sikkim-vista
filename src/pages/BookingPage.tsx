import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Clock,
  Camera,
  Car,
  Home,
  Utensils,
  CreditCard,
  CheckCircle,
  Star,
  Phone,
  Mail
} from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedMonastery, setSelectedMonastery] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const monasteries = [
    {
      id: "rumtek",
      name: "Rumtek Monastery",
      location: "East Sikkim",
      price: 2500,
      rating: 4.8,
      highlights: ["Largest monastery", "Karmapa seat", "Golden Stupa"],
    },
    {
      id: "pemayangtse",
      name: "Pemayangtse Monastery", 
      location: "West Sikkim",
      price: 2200,
      rating: 4.7,
      highlights: ["Oldest monastery", "Mountain views", "Ancient murals"],
    },
    {
      id: "tashiding",
      name: "Tashiding Monastery",
      location: "West Sikkim", 
      price: 2000,
      rating: 4.6,
      highlights: ["Sacred chorten", "Valley views", "Peaceful setting"],
    },
  ];

  const services = [
    {
      id: "guide",
      name: "Professional Guide",
      description: "Experienced local guide with monastery expertise",
      price: 800,
      icon: Users,
    },
    {
      id: "transport",
      name: "Transportation",
      description: "Comfortable vehicle with driver for the day",
      price: 1500,
      icon: Car,
    },
    {
      id: "accommodation",
      name: "Nearby Accommodation",
      description: "Traditional guesthouse or monastery stay",
      price: 1800,
      icon: Home,
    },
    {
      id: "meals",
      name: "Traditional Meals",
      description: "Authentic Sikkimese cuisine experience",
      price: 600,
      icon: Utensils,
    },
    {
      id: "photography",
      name: "Photography Permit",
      description: "Special permission for monastery photography",
      price: 300,
      icon: Camera,
    },
  ];

  const groupSizes = [
    { value: "1", label: "Solo Traveler", discount: 0 },
    { value: "2-4", label: "2-4 People", discount: 5 },
    { value: "5-8", label: "5-8 People", discount: 10 },
    { value: "9+", label: "9+ People", discount: 15 },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const selectedMonasteryObj = monasteries.find(m => m.id === selectedMonastery);
    const basePrice = selectedMonasteryObj?.price || 0;
    
    const servicesPrice = selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);

    const groupDiscount = groupSizes.find(g => g.value === groupSize)?.discount || 0;
    const subtotal = basePrice + servicesPrice;
    const discount = (subtotal * groupDiscount) / 100;
    
    return {
      basePrice,
      servicesPrice,
      subtotal,
      discount,
      total: subtotal - discount,
    };
  };

  const pricing = calculateTotal();

  const isFormValid = selectedMonastery && selectedDate && groupSize && 
                     contactInfo.name && contactInfo.email && contactInfo.phone;

  const handleProceedToPayment = () => {
    if (isFormValid) {
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setBookingConfirmed(true);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="container px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Plan Your Sacred Journey
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Book your personalized monastery visit with expert guides, comfortable transportation, and authentic cultural experiences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monastery Selection */}
          <Card className="card-monastery">
            <h2 className="text-xl font-heading font-semibold mb-6">Choose Your Monastery</h2>
            <div className="space-y-4">
              {monasteries.map((monastery) => (
                <div
                  key={monastery.id}
                  onClick={() => setSelectedMonastery(monastery.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                    selectedMonastery === monastery.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {monastery.name}
                      </h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{monastery.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{monastery.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {monastery.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{monastery.price}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Date & Group Size */}
          <Card className="card-monastery">
            <h2 className="text-xl font-heading font-semibold mb-6">Select Date & Group Size</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="text-sm font-medium mb-2 block">Visit Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="group-size" className="text-sm font-medium mb-2 block">Group Size</Label>
                <Select value={groupSize} onValueChange={setGroupSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{size.label}</span>
                          {size.discount > 0 && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {size.discount}% off
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Additional Services */}
          <Card className="card-monastery">
            <h2 className="text-xl font-heading font-semibold mb-6">Additional Services</h2>
            <div className="space-y-4">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                
                return (
                  <div
                    key={service.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border cursor-pointer transition-smooth ${
                      isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <Checkbox checked={isSelected} onChange={() => toggleService(service.id)} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-medium text-foreground">{service.name}</h3>
                      </div>
                      <p className="text-sm text-body mb-2">{service.description}</p>
                      <div className="text-lg font-semibold text-primary">₹{service.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="card-monastery">
            <h2 className="text-xl font-heading font-semibold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium mb-2 block">Full Name *</Label>
                <Input
                  id="name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="phone" className="text-sm font-medium mb-2 block">Phone Number *</Label>
              <Input
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="special-requests" className="text-sm font-medium mb-2 block">Special Requests</Label>
              <Textarea
                id="special-requests"
                value={contactInfo.specialRequests}
                onChange={(e) => setContactInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Any special requirements or dietary restrictions..."
                rows={3}
              />
            </div>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="card-monastery sticky top-20">
            <h2 className="text-xl font-heading font-semibold mb-6">Booking Summary</h2>
            
            {selectedMonastery && (
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-body">Base Package</span>
                  <span className="font-medium">₹{pricing.basePrice}</span>
                </div>
                
                {selectedServices.length > 0 && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-body">Additional Services</span>
                      <span className="font-medium">₹{pricing.servicesPrice}</span>
                    </div>
                    {selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return service ? (
                        <div key={serviceId} className="flex justify-between text-sm text-muted-foreground ml-4">
                          <span>• {service.name}</span>
                          <span>₹{service.price}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-body">Subtotal</span>
                  <span className="font-medium">₹{pricing.subtotal}</span>
                </div>
                
                {pricing.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Group Discount</span>
                    <span>-₹{pricing.discount}</span>
                  </div>
                )}
                
                <hr className="border-border" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{pricing.total}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <Button 
                className="w-full btn-hero"
                disabled={!isFormValid}
                onClick={handleProceedToPayment}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Payment
              </Button>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free Cancellation up to 24hrs</span>
                </div>
              </div>
            </div>
            
            <hr className="border-border my-6" />
            
            <div>
              <h3 className="font-heading font-semibold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+91-9876543210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">booking@monastery360.com</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Chat with Support
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bookingData={{
          monasteryName: monasteries.find(m => m.id === selectedMonastery)?.name,
          date: selectedDate,
          groupSize,
          totalAmount: pricing.total,
          selectedServices,
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Booking Confirmation */}
      {bookingConfirmed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-4">
              Your sacred journey has been booked successfully. Check your email for confirmation details.
            </p>
            <Button onClick={() => setBookingConfirmed(false)} className="w-full">
              Continue Exploring
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
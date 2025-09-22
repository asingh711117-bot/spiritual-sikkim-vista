import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Lock, 
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Clock
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    monasteryName?: string;
    date?: Date;
    groupSize?: string;
    totalAmount?: number;
    selectedServices?: string[];
  };
  onPaymentSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, bookingData, onPaymentSuccess }: PaymentModalProps) => {
  const [paymentStep, setPaymentStep] = useState<"details" | "processing" | "success">("details");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handlePayment = async () => {
    setPaymentStep("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep("success");
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
        setPaymentStep("details");
      }, 3000);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  if (paymentStep === "processing") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Payment...</h3>
            <p className="text-muted-foreground">Please wait while we process your payment securely.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (paymentStep === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>
            <Badge variant="secondary" className="mb-4">
              Booking ID: #MO{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-green-500" />
            <span>Secure Payment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Booking Summary</h3>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{bookingData.monasteryName}</span>
              </div>
              
              {bookingData.date && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{bookingData.date.toDateString()}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{bookingData.groupSize} people</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Package</span>
                <span>₹{(bookingData.totalAmount || 0) * 0.7}</span>
              </div>
              <div className="flex justify-between">
                <span>Additional Services</span>
                <span>₹{(bookingData.totalAmount || 0) * 0.3}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span className="text-primary">₹{bookingData.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Payment Details</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardholder-name">Cardholder Name</Label>
                <Input
                  id="cardholder-name"
                  placeholder="John Doe"
                  value={cardData.cardholderName}
                  onChange={(e) => setCardData(prev => ({ ...prev, cardholderName: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      cardNumber: formatCardNumber(e.target.value) 
                    }))}
                    maxLength={19}
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      expiryDate: formatExpiryDate(e.target.value) 
                    }))}
                    maxLength={5}
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      cvv: e.target.value.replace(/\D/g, '').slice(0, 3) 
                    }))}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Your payment information is encrypted and secure
                </span>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              className="w-full"
              size="lg"
              disabled={!cardData.cardholderName || !cardData.cardNumber || !cardData.expiryDate || !cardData.cvv}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ₹{bookingData.totalAmount}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By completing this payment, you agree to our Terms of Service and Privacy Policy.
              Free cancellation up to 24 hours before your visit.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
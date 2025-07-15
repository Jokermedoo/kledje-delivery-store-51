import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem, OrderDetails } from '@/types/product';
import { User } from '@/types/auth';
import { Package, MapPin, Phone, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orderService } from '@/services/orderService';

interface CheckoutFormProps {
  cartItems: CartItem[];
  user: User;
  onOrderSubmit: (orderNumber: string) => void;
  onBack: () => void;
}

export default function CheckoutForm({ cartItems, user, onOrderSubmit, onBack }: CheckoutFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<OrderDetails>({
    customerName: user.name,
    phone: '',
    address: '',
    city: '',
    governorate: '',
    notes: '',
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = totalPrice >= 300 ? 0 : 50;
  const finalTotal = totalPrice + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.customerName || !formData.phone || !formData.address || !formData.city || !formData.governorate) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Create order in local storage
    const order = orderService.createOrder(user.id, formData, cartItems);
    onOrderSubmit(order.id.slice(-6));
  };

  const handleInputChange = (field: keyof OrderDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" onClick={onBack}>
          العودة للسلة
        </Button>
        <h2 className="text-2xl font-bold">إتمام الطلب</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              ملخص الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground"> × {item.quantity}</span>
                </div>
                <span className="font-medium">{item.price * item.quantity} جنيه</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span>المجموع الفرعي:</span>
              <span>{totalPrice} جنيه</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>التوصيل:</span>
              <span className={deliveryFee === 0 ? "text-success" : ""}>
                {deliveryFee === 0 ? "مجاني" : `${deliveryFee} جنيه`}
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>المجموع النهائي:</span>
              <span className="text-primary">{finalTotal} جنيه مصري</span>
            </div>

            <div className="bg-accent/50 p-3 rounded-lg text-center text-sm">
              💳 الدفع عند الاستلام فقط
            </div>
          </CardContent>
        </Card>

        {/* Customer Information Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              بيانات العميل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customerName">الاسم الكامل *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="01xxxxxxxxx"
                  required
                />
              </div>

              <div>
                <Label htmlFor="governorate">المحافظة *</Label>
                <Input
                  id="governorate"
                  value={formData.governorate}
                  onChange={(e) => handleInputChange('governorate', e.target.value)}
                  placeholder="مثال: القاهرة، الجيزة، الإسكندرية"
                  required
                />
              </div>

              <div>
                <Label htmlFor="city">المدينة/المنطقة *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="مثال: مدينة نصر، المعادي، المنصورة"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">العنوان التفصيلي *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="أدخل العنوان بالتفصيل (الشارع، رقم المبنى، الدور، رقم الشقة)"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="أي ملاحظات خاصة بالطلب (اختياري)"
                  rows={2}
                />
              </div>

              <Button type="submit" className="w-full btn-primary py-6 text-lg">
                <MapPin className="h-5 w-5 ml-2" />
                تأكيد الطلب - {finalTotal} جنيه
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
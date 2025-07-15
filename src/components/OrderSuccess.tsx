import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Phone, MapPin, Package } from 'lucide-react';
import { OrderDetails } from '@/types/product';

interface OrderSuccessProps {
  orderDetails: OrderDetails;
  orderNumber: string;
  onContinueShopping: () => void;
}

export default function OrderSuccess({ orderDetails, orderNumber, onContinueShopping }: OrderSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto p-4 text-center space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-success mb-2">تم تأكيد الطلب بنجاح!</h2>
          <p className="text-muted-foreground text-lg">
            شكراً لك، سيتم التواصل معك قريباً
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="bg-accent/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">رقم الطلب</h3>
            <p className="text-2xl font-bold text-primary">#{orderNumber}</p>
          </div>

          <div className="grid gap-4 text-right">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">حالة الطلب</h4>
                <p className="text-muted-foreground">قيد المراجعة - سيتم التواصل معك خلال 24 ساعة</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">رقم الهاتف</h4>
                <p className="text-muted-foreground">{orderDetails.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">عنوان التسليم</h4>
                <p className="text-muted-foreground">
                  {orderDetails.address}, {orderDetails.city}, {orderDetails.governorate}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
            <h4 className="font-semibold text-warning-foreground mb-2">💡 معلومات مهمة</h4>
            <ul className="text-sm text-warning-foreground space-y-1 text-right">
              <li>• سيتم التواصل معك لتأكيد الطلب وموعد التسليم</li>
              <li>• الدفع عند الاستلام فقط</li>
              <li>• التوصيل خلال 2-5 أيام عمل</li>
              <li>• يمكنك إلغاء الطلب قبل الشحن</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button 
          className="w-full btn-primary py-6 text-lg"
          onClick={onContinueShopping}
        >
          متابعة التسوق
        </Button>
        
        <p className="text-sm text-muted-foreground">
          للاستفسارات: <span className="font-medium">01000000000</span>
        </p>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types/supabase';

interface AdminOrdersProps {
  orders: Order[];
  onOrdersChange: () => void;
}

export default function AdminOrders({ orders, onOrdersChange }: AdminOrdersProps) {
  const { toast } = useToast();

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) {
        throw error;
      }

      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة الطلب"
      });
      onOrdersChange();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الطلب",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'confirmed': return 'bg-primary text-primary-foreground';
      case 'shipped': return 'bg-secondary text-secondary-foreground';
      case 'delivered': return 'bg-success text-success-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>الطلبات الحديثة ({orders.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">لا توجد طلبات حتى الآن</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-card-foreground">طلب #{order.id.slice(-6)}</h4>
                    <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.created_at).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                  <div className="text-left">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    <p className="text-lg font-bold mt-1 text-foreground">{order.total_price} جنيه</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">العنوان:</p>
                    <p className="text-sm text-muted-foreground">
                      {order.address}, {order.city}, {order.governorate}
                    </p>
                  </div>
                </div>

                {order.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-card-foreground">ملاحظات:</p>
                    <p className="text-sm text-muted-foreground">{order.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Select
                    value={order.status}
                    onValueChange={(status: Order['status']) => handleUpdateOrderStatus(order.id, status)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">في الانتظار</SelectItem>
                      <SelectItem value="confirmed">مؤكد</SelectItem>
                      <SelectItem value="shipped">تم الشحن</SelectItem>
                      <SelectItem value="delivered">تم التسليم</SelectItem>
                      <SelectItem value="cancelled">ملغي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
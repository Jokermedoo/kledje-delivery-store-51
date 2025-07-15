import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Store, 
  Save,
  Phone,
  Mail,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoreSettings as StoreSettingsType } from '@/types/supabase';

interface StoreSettingsProps {
  storeSettings: StoreSettingsType | null;
  onSettingsChange?: () => void;
}

export default function StoreSettings({ storeSettings, onSettingsChange }: StoreSettingsProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState<StoreSettingsType | null>(storeSettings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSettings(storeSettings);
  }, [storeSettings]);

  const handleSaveSettings = async () => {
    if (!settings) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('store_settings')
        .upsert({
          id: settings.id,
          store_name: settings.store_name,
          store_name_ar: settings.store_name_ar,
          store_description: settings.store_description,
          store_description_ar: settings.store_description_ar,
          contact_phone: settings.contact_phone,
          contact_email: settings.contact_email,
          shipping_cost: settings.shipping_cost,
          currency: settings.currency,
          is_active: settings.is_active
        });

      if (error) {
        throw error;
      }

      onSettingsChange?.();
      
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث إعدادات المتجر بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (field: keyof StoreSettingsType, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [field]: value
    });
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Store className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">إعدادات المتجر</h2>
            <p className="text-muted-foreground">إدارة وتخصيص إعدادات متجرك</p>
          </div>
        </div>
        
        <Button 
          onClick={handleSaveSettings} 
          disabled={loading}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>

      {/* General Settings */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Store className="h-5 w-5" />
            معلومات المتجر الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storeName">اسم المتجر (بالإنجليزية)</Label>
              <Input
                id="storeName"
                value={settings.store_name}
                onChange={(e) => updateSettings('store_name', e.target.value)}
                placeholder="اسم متجرك"
              />
            </div>
            
            <div>
              <Label htmlFor="storeNameAr">اسم المتجر (بالعربية)</Label>
              <Input
                id="storeNameAr"
                value={settings.store_name_ar}
                onChange={(e) => updateSettings('store_name_ar', e.target.value)}
                placeholder="اسم متجرك بالعربية"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storeDescription">وصف المتجر (بالإنجليزية)</Label>
              <Textarea
                id="storeDescription"
                value={settings.store_description || ''}
                onChange={(e) => updateSettings('store_description', e.target.value)}
                placeholder="وصف موجز عن متجرك"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="storeDescriptionAr">وصف المتجر (بالعربية)</Label>
              <Textarea
                id="storeDescriptionAr"
                value={settings.store_description_ar || ''}
                onChange={(e) => updateSettings('store_description_ar', e.target.value)}
                placeholder="وصف موجز عن متجرك بالعربية"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Phone className="h-5 w-5" />
            معلومات الاتصال
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storePhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم الهاتف
              </Label>
              <Input
                id="storePhone"
                value={settings.contact_phone || ''}
                onChange={(e) => updateSettings('contact_phone', e.target.value)}
                placeholder="+20 100 000 0000"
              />
            </div>
            
            <div>
              <Label htmlFor="storeEmail" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                البريد الإلكتروني
              </Label>
              <Input
                id="storeEmail"
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => updateSettings('contact_email', e.target.value)}
                placeholder="info@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <DollarSign className="h-5 w-5" />
            إعدادات التوصيل والأسعار
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryFee">رسوم التوصيل</Label>
              <Input
                id="deliveryFee"
                type="number"
                value={settings.shipping_cost}
                onChange={(e) => updateSettings('shipping_cost', parseFloat(e.target.value) || 0)}
                placeholder="50"
              />
            </div>
            
            <div>
              <Label htmlFor="currency">العملة</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => updateSettings('currency', e.target.value)}
                placeholder="EGP"
              />
            </div>
          </div>
          
          <div className="bg-accent/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              التوصيل: <span className="font-medium">{settings.shipping_cost} {settings.currency}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Palette, 
  Globe, 
  Shield, 
  Settings2,
  Save,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { storeService } from '@/services/storeService';
import { StoreSettings as StoreSettingsType } from '@/types/store';

interface StoreSettingsProps {
  onSettingsChange?: () => void;
}

export default function StoreSettings({ onSettingsChange }: StoreSettingsProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState<StoreSettingsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const currentSettings = storeService.getSettings();
    setSettings(currentSettings);
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    setLoading(true);
    try {
      storeService.updateSettings(settings);
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

  const handleResetSettings = () => {
    const resetSettings = storeService.resetToDefaults();
    setSettings(resetSettings);
    onSettingsChange?.();
    
    toast({
      title: "تم إعادة التعيين",
      description: "تم إعادة تعيين الإعدادات للقيم الافتراضية",
    });
  };

  const updateSettings = (field: string, value: any) => {
    if (!settings) return;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSettings({
        ...settings,
        [parent]: {
          ...(settings as any)[parent],
          [child]: value
        }
      });
    } else {
      setSettings({
        ...settings,
        [field]: value
      });
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Settings2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
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
            <h2 className="text-2xl font-bold">إعدادات المتجر</h2>
            <p className="text-muted-foreground">إدارة وتخصيص إعدادات متجرك</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleResetSettings}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            إعادة تعيين
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            disabled={loading}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="general" className="gap-2">
            <Settings2 className="h-4 w-4" />
            عام
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            المظهر
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Globe className="h-4 w-4" />
            التواصل
          </TabsTrigger>
          <TabsTrigger value="policies" className="gap-2">
            <Shield className="h-4 w-4" />
            السياسات
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                معلومات المتجر الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">اسم المتجر</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => updateSettings('storeName', e.target.value)}
                    placeholder="اسم متجرك"
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

              <div>
                <Label htmlFor="storeDescription">وصف المتجر</Label>
                <Textarea
                  id="storeDescription"
                  value={settings.storeDescription}
                  onChange={(e) => updateSettings('storeDescription', e.target.value)}
                  placeholder="وصف موجز عن متجرك"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
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
                    value={settings.storePhone}
                    onChange={(e) => updateSettings('storePhone', e.target.value)}
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
                    value={settings.storeEmail}
                    onChange={(e) => updateSettings('storeEmail', e.target.value)}
                    placeholder="info@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="storeAddress">العنوان</Label>
                <Input
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => updateSettings('storeAddress', e.target.value)}
                  placeholder="عنوان المتجر"
                />
              </div>

              <div>
                <Label htmlFor="workingHours" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  ساعات العمل
                </Label>
                <Input
                  id="workingHours"
                  value={settings.workingHours}
                  onChange={(e) => updateSettings('workingHours', e.target.value)}
                  placeholder="السبت - الخميس: 9 صباحاً - 10 مساءً"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                إعدادات التوصيل والأسعار
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryFee">رسوم التوصيل (بالجنيه)</Label>
                  <Input
                    id="deliveryFee"
                    type="number"
                    value={settings.deliveryFee}
                    onChange={(e) => updateSettings('deliveryFee', parseInt(e.target.value) || 0)}
                    placeholder="50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="freeDeliveryThreshold">الحد الأدنى للتوصيل المجاني</Label>
                  <Input
                    id="freeDeliveryThreshold"
                    type="number"
                    value={settings.freeDeliveryThreshold}
                    onChange={(e) => updateSettings('freeDeliveryThreshold', parseInt(e.target.value) || 0)}
                    placeholder="300"
                  />
                </div>
              </div>
              
              <div className="bg-accent/50 p-4 rounded-lg">
                <Badge variant="secondary" className="mb-2">معاينة</Badge>
                <p className="text-sm text-muted-foreground">
                  التوصيل: <span className="font-medium">{settings.deliveryFee} {settings.currency}</span> 
                  {settings.freeDeliveryThreshold > 0 && (
                    <span> • مجاني للطلبات أكثر من {settings.freeDeliveryThreshold} {settings.currency}</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                ألوان المتجر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryColor">اللون الأساسي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.colors.primary}
                      onChange={(e) => updateSettings('colors.primary', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.colors.primary}
                      onChange={(e) => updateSettings('colors.primary', e.target.value)}
                      placeholder="#D946EF"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.colors.secondary}
                      onChange={(e) => updateSettings('colors.secondary', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.colors.secondary}
                      onChange={(e) => updateSettings('colors.secondary', e.target.value)}
                      placeholder="#F9FAFB"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="accentColor">لون التمييز</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.colors.accent}
                      onChange={(e) => updateSettings('colors.accent', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.colors.accent}
                      onChange={(e) => updateSettings('colors.accent', e.target.value)}
                      placeholder="#EC4899"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary via-accent to-secondary p-4 rounded-lg text-white text-center">
                <p className="font-semibold">معاينة الألوان</p>
                <p className="text-sm opacity-90">هكذا ستبدو الألوان في متجرك</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social & Contact */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                روابط التواصل الاجتماعي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook">فيسبوك</Label>
                  <Input
                    id="facebook"
                    value={settings.socialLinks.facebook || ''}
                    onChange={(e) => updateSettings('socialLinks.facebook', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram">إنستغرام</Label>
                  <Input
                    id="instagram"
                    value={settings.socialLinks.instagram || ''}
                    onChange={(e) => updateSettings('socialLinks.instagram', e.target.value)}
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
                
                <div>
                  <Label htmlFor="whatsapp">واتساب</Label>
                  <Input
                    id="whatsapp"
                    value={settings.socialLinks.whatsapp || ''}
                    onChange={(e) => updateSettings('socialLinks.whatsapp', e.target.value)}
                    placeholder="+20 100 000 0000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="twitter">تويتر</Label>
                  <Input
                    id="twitter"
                    value={settings.socialLinks.twitter || ''}
                    onChange={(e) => updateSettings('socialLinks.twitter', e.target.value)}
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>عن المتجر</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="aboutUs">نبذة عن المتجر</Label>
                <Textarea
                  id="aboutUs"
                  value={settings.aboutUs}
                  onChange={(e) => updateSettings('aboutUs', e.target.value)}
                  placeholder="اكتب نبذة تعريفية عن متجرك..."
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies */}
        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                سياسات المتجر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="privacy">سياسة الخصوصية</Label>
                <Textarea
                  id="privacy"
                  value={settings.policies.privacy}
                  onChange={(e) => updateSettings('policies.privacy', e.target.value)}
                  placeholder="اكتب سياسة الخصوصية..."
                  rows={4}
                />
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="terms">الشروط والأحكام</Label>
                <Textarea
                  id="terms"
                  value={settings.policies.terms}
                  onChange={(e) => updateSettings('policies.terms', e.target.value)}
                  placeholder="اكتب الشروط والأحكام..."
                  rows={4}
                />
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="return">سياسة الإرجاع والاستبدال</Label>
                <Textarea
                  id="return"
                  value={settings.policies.return}
                  onChange={(e) => updateSettings('policies.return', e.target.value)}
                  placeholder="اكتب سياسة الإرجاع والاستبدال..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
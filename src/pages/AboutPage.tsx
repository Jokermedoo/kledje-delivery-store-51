import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Star, Users, Award, Leaf, Shield } from 'lucide-react';
import InteractiveBackground from '@/components/InteractiveBackground';
import { storeService } from '@/services/storeService';
import { StoreSettings } from '@/types/store';

export default function AboutPage() {
  const navigate = useNavigate();
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null);

  useEffect(() => {
    storeService.init();
    setStoreSettings(storeService.getSettings());
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <InteractiveBackground />
      
      {/* Simple Header */}
      <header className="glass-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="glass-card hover:bg-primary/5 font-tajawal"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للرئيسية
            </Button>
            <h1 className="text-2xl font-bold text-primary font-amiri">من نحن</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text font-amiri">
            {storeSettings?.storeName || 'متجر الجمال الطبيعي'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-cairo">
            {storeSettings?.storeDescription || 'نحن متجر متخصص في المنتجات الطبيعية للعناية بالبشرة والشعر، نؤمن بقوة الطبيعة في توفير الجمال والصحة لكل امرأة'}
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary font-tajawal">رؤيتنا</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-cairo">
              {storeSettings?.aboutUs || 'نسعى لأن نكون الوجهة الأولى للمرأة العربية للحصول على منتجات العناية الطبيعية عالية الجودة. نؤمن بأن كل امرأة تستحق أن تشعر بالجمال والثقة من خلال منتجات آمنة وطبيعية 100%.'}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-cairo">
              نحن نختار بعناية فائقة كل منتج نقدمه، ونتأكد من أنه يلبي أعلى معايير الجودة والأمان.
              هدفنا هو تمكين كل امرأة من العناية بجمالها الطبيعي.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary font-tajawal">مهمتنا</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold font-tajawal">منتجات طبيعية 100%</h3>
                  <p className="text-muted-foreground font-cairo">خالية من المواد الكيميائية الضارة</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold font-tajawal">آمنة ومضمونة</h3>
                  <p className="text-muted-foreground font-cairo">مختبرة ومعتمدة من جهات موثوقة</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold font-tajawal">صنع بحب</h3>
                  <p className="text-muted-foreground font-cairo">نهتم بكل تفصيلة في منتجاتنا</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        {storeSettings && (
          <div className="glass-card p-8 mb-20">
            <h2 className="text-3xl font-bold mb-6 text-primary font-tajawal text-center">
              معلومات التواصل
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="font-bold mb-2 font-tajawal">العنوان</h3>
                <p className="text-muted-foreground font-cairo">{storeSettings.storeAddress}</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 font-tajawal">الهاتف</h3>
                <p className="text-muted-foreground font-cairo">{storeSettings.storePhone}</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 font-tajawal">البريد الإلكتروني</h3>
                <p className="text-muted-foreground font-cairo">{storeSettings.storeEmail}</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 font-tajawal">ساعات العمل</h3>
                <p className="text-muted-foreground font-cairo">{storeSettings.workingHours}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="glass-card p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary font-tajawal">
            إنجازاتنا بالأرقام
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2 font-amiri">10,000+</h3>
              <p className="text-muted-foreground font-cairo">عميلة سعيدة</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2 font-amiri">4.9</h3>
              <p className="text-muted-foreground font-cairo">تقييم العملاء</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2 font-amiri">50+</h3>
              <p className="text-muted-foreground font-cairo">منتج متميز</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-glow to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2 font-amiri">100%</h3>
              <p className="text-muted-foreground font-cairo">طبيعي وآمن</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary font-tajawal">
            قيمنا ومبادئنا
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover-levitate">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary font-tajawal">الطبيعة أولاً</h3>
              <p className="text-muted-foreground font-cairo">
                نختار أجود المكونات الطبيعية من مصادر موثوقة حول العالم
              </p>
            </div>

            <div className="glass-card p-8 text-center hover-levitate">
              <div className="w-24 h-24 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💎</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary font-tajawal">الجودة العالية</h3>
              <p className="text-muted-foreground font-cairo">
                نلتزم بأعلى معايير الجودة في كل مرحلة من مراحل الإنتاج
              </p>
            </div>

            <div className="glass-card p-8 text-center hover-levitate">
              <div className="w-24 h-24 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary font-tajawal">رضا العميل</h3>
              <p className="text-muted-foreground font-cairo">
                سعادة عملائنا هي أولويتنا القصوى ونسعى لتحقيق توقعاتهم
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary font-tajawal">
            انضمي إلى رحلة الجمال الطبيعي
          </h2>
          <p className="text-xl text-muted-foreground mb-8 font-cairo">
            اكتشفي مجموعتنا المتميزة من المنتجات الطبيعية واجعلي جمالك يشع بالطبيعة
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="btn-primary px-12 py-6 text-xl font-semibold"
          >
            تسوقي الآن
          </Button>
        </div>
      </div>
    </div>
  );
}
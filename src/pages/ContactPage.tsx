import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import InteractiveBackground from '@/components/InteractiveBackground';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنتواصل معك في أقرب وقت ممكن",
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

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
            <h1 className="text-2xl font-bold text-primary font-amiri">تواصل معنا</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text font-amiri">
            تواصلي معنا
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-cairo">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في العثور على المنتجات المناسبة لك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary font-tajawal">
                معلومات التواصل
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold font-tajawal">الهاتف</h3>
                    <p className="text-muted-foreground" dir="ltr">+20 100 000 0000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold font-tajawal">واتساب</h3>
                    <p className="text-muted-foreground" dir="ltr">+20 100 000 0000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold font-tajawal">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground">info@naturalbeauty.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold font-tajawal">العنوان</h3>
                    <p className="text-muted-foreground font-cairo">القاهرة، مصر</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold font-tajawal">ساعات العمل</h3>
                    <p className="text-muted-foreground font-cairo">يومياً من 9 صباحاً - 10 مساءً</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-4">
              <a 
                href="tel:+201000000000"
                className="glass-card p-4 flex items-center gap-4 hover:bg-primary/5 transition-colors w-full"
              >
                <Phone className="h-6 w-6 text-primary" />
                <span className="font-bold font-tajawal">اتصل الآن</span>
              </a>

              <a 
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-4 hover:bg-green-50 transition-colors w-full"
              >
                <MessageCircle className="h-6 w-6 text-green-600" />
                <span className="font-bold font-tajawal text-green-600">راسلنا على واتساب</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary font-tajawal">
                أرسلي لنا رسالة
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 font-tajawal">
                      الاسم *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="اكتبي اسمك الكريم"
                      required
                      className="glass-card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 font-tajawal">
                      البريد الإلكتروني *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                      className="glass-card"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 font-tajawal">
                      رقم الهاتف
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01000000000"
                      className="glass-card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 font-tajawal">
                      الموضوع *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="موضوع الرسالة"
                      required
                      className="glass-card"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 font-tajawal">
                    الرسالة *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتبي رسالتك هنا..."
                    required
                    rows={6}
                    className="glass-card resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري الإرسال...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      إرسال الرسالة
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary font-tajawal">
            الأسئلة الشائعة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-3 text-primary font-tajawal">
                كم مدة التوصيل؟
              </h3>
              <p className="text-muted-foreground font-cairo">
                نقوم بالتوصيل خلال 2-3 أيام عمل داخل القاهرة والإسكندرية، 
                و 3-5 أيام عمل لباقي المحافظات.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-3 text-primary font-tajawal">
                هل المنتجات آمنة؟
              </h3>
              <p className="text-muted-foreground font-cairo">
                نعم، جميع منتجاتنا طبيعية 100% ومختبرة ومعتمدة من جهات موثوقة.
                آمنة تماماً للاستخدام اليومي.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-3 text-primary font-tajawal">
                هل يمكن الإرجاع؟
              </h3>
              <p className="text-muted-foreground font-cairo">
                نعم، يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام 
                في حالة عدم الرضا أو وجود عيب.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-3 text-primary font-tajawal">
                ما طرق الدفع المتاحة؟
              </h3>
              <p className="text-muted-foreground font-cairo">
                نقبل الدفع عند الاستلام، التحويل البنكي، فودافون كاش، 
                وجميع البطاقات الائتمانية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
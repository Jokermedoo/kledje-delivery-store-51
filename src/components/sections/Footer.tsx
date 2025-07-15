
import ParallaxSection from '@/components/ParallaxSection';

export default function Footer() {
  const quickLinks = [
    { name: "الرئيسية", href: "#" },
    { name: "العناية بالبشرة", href: "#skincare" },
    { name: "العناية بالشعر", href: "#haircare" },
    { name: "من نحن", href: "#about" }
  ];

  const contactInfo = [
    { icon: "📞", text: "01000000000" },
    { icon: "📧", text: "info@kledje.com" },
    { icon: "📍", text: "القاهرة، مصر" }
  ];

  return (
    <footer className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <ParallaxSection className="container mx-auto px-4 relative z-10">
        <div className="glass-card p-16 backdrop-blur-xl hover:shadow-glow transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Brand Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="glass-card p-4 rounded-3xl hover:scale-110 transition-all duration-300">
                  <img 
                    src="/lovable-uploads/9d8b59e3-ff2b-428f-bea9-4301b56293b4.png" 
                    alt="كليدچ"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold glow-text">كليدچ</h3>
                  <p className="text-muted-foreground font-semibold text-xl">Kledje</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-xl">
                متجرك الأول للعناية بالبشرة والشعر بأفضل المنتجات الطبيعية
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-primary">روابط سريعة</h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-3 inline-block text-lg"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-primary">تواصل معنا</h4>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group">
                    <div className="glass-card p-3 rounded-xl group-hover:scale-110 transition-all duration-300">
                      <span className="text-2xl">{contact.icon}</span>
                    </div>
                    <span className="text-lg">{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-16 pt-12 text-center">
            <p className="text-muted-foreground text-xl">
              &copy; 2024 
              <span className="glow-text font-bold mx-3 text-2xl">Kledje - كليدچ</span>
              جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </ParallaxSection>
    </footer>
  );
}

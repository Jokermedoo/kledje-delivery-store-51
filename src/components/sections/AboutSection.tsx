
import ParallaxSection from '@/components/ParallaxSection';

export default function AboutSection() {
  const features = [
    {
      icon: "🌿",
      title: "مكونات طبيعية",
      description: "جميع منتجاتنا مصنوعة من أجود المكونات الطبيعية"
    },
    {
      icon: "🚚",
      title: "توصيل سريع",
      description: "نوصل طلبك في أسرع وقت ممكن لجميع المحافظات"
    },
    {
      icon: "💳",
      title: "دفع آمن",
      description: "الدفع عند الاستلام لضمان راحتك وأمانك"
    }
  ];

  return (
    <section id="about" className="py-32 section-modern">
      <ParallaxSection className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="glass-card p-20 backdrop-blur-xl hover:shadow-glow transition-all duration-500">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 glow-text font-amiri">عن كليدچ</h2>
            <p className="text-lg md:text-2xl text-foreground leading-relaxed mb-16 md:mb-20 max-w-5xl mx-auto font-cairo">
              كليدچ هو متجرك المتخصص في منتجات العناية بالبشرة والشعر عالية الجودة. 
              نحن نؤمن بأن الجمال الطبيعي يبدأ من العناية الصحيحة، لذلك نقدم لك 
              مجموعة مختارة بعناية من أفضل المنتجات المصنوعة من مكونات طبيعية وآمنة.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="glass-card w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-125 transition-all duration-500 hover:shadow-glow">
                    <span className="text-6xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
}

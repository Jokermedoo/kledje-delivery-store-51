
export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 -m-8">
          <div className="w-32 h-32 border-4 border-primary/20 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 -m-6">
          <div className="w-28 h-28 border-4 border-primary-glow/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Logo and text */}
        <div className="glass-card p-12 rounded-3xl text-center relative z-10">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/9d8b59e3-ff2b-428f-bea9-4301b56293b4.png" 
              alt="كليدچ"
              className="w-20 h-20 mx-auto object-contain animate-pulse"
            />
          </div>
          
          <h1 className="text-3xl font-bold glow-text mb-2">كليدچ</h1>
          <p className="text-lg text-muted-foreground mb-6">Kledje</p>
          
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary-glow rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">جاري التحميل...</p>
        </div>
      </div>
    </div>
  );
}

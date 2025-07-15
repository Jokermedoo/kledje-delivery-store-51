
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { User } from '@/types/auth';

interface AdminHeaderProps {
  user: User;
  onLogout: () => void;
}

export default function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/9d8b59e3-ff2b-428f-bea9-4301b56293b4.png" 
              alt="كليدچ"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">لوحة تحكم كليدچ</h1>
              <p className="text-sm text-muted-foreground">مرحباً {user.name}</p>
            </div>
          </div>
          
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </header>
  );
}

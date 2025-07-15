
import { useState } from 'react';
import { ShoppingCart, Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FloatingActionButtonProps {
  onCartClick: () => void;
  onSearchClick: () => void;
  cartCount?: number;
}

export default function FloatingActionButton({ 
  onCartClick, 
  onSearchClick, 
  cartCount = 0 
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      {/* Main FAB */}
      <Button
        size="icon"
        className="w-14 h-14 rounded-full btn-primary shadow-glow hover:scale-110 transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Expanded Actions */}
      {isExpanded && (
        <div className="flex flex-col gap-3 animate-fade-in">
          <Button
            size="icon"
            variant="outline"
            className="w-12 h-12 rounded-full glass-card hover:scale-110 transition-all duration-300 relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartCount}
              </Badge>
            )}
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="w-12 h-12 rounded-full glass-card hover:scale-110 transition-all duration-300"
            onClick={onSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1
}: PaginationComponentProps) {
  
  const generatePageNumbers = () => {
    const delta = siblingCount;
    const range = [];
    const rangeWithDots = [];

    // Calculate the range of page numbers to show
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    // Add first page
    if (left > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add calculated range
    rangeWithDots.push(...range);

    // Add last page
    if (right < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="glass-card hover:bg-primary hover:text-white"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <div className="flex items-center justify-center w-10 h-10">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 ${
                currentPage === page 
                  ? 'bg-primary text-white hover:bg-primary-deep' 
                  : 'glass-card hover:bg-primary hover:text-white'
              }`}
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      {/* Next button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="glass-card hover:bg-primary hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}
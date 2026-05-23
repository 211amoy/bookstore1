import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { BookResponse } from '@/types/book';
import { Author } from '@/types/author';
import { Category } from '@/types/category';

type Props = {
  book: BookResponse;
  author: Author | null;
  category: Category | null;
  onClose: () => void;
  onDownload?: (book?: BookResponse) => void;
};

export function BookDetailsModal({
  book,
  author,
  category,
  onClose,
  onDownload,
}: Props) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload(book);
      return;
    }

    if (book.bookFileUrl) {
      window.open(book.bookFileUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('No PDF available for this book.');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{book.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Cover + Download */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img
                src={book.coverImageUrl || '/placeholder.svg'}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            <Button onClick={handleDownload} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download / Open PDF
            </Button>
          </div>

          {/* Right: Book Details */}
          <div className="space-y-6">
            {/* Info */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Book Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Author</div>
                  <div>{author ? author.name : 'Unknown Author'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Category</div>
                  <div className="mt-1">
                    {category ? (
                      <Badge variant="secondary">{category.name}</Badge>
                    ) : (
                      <Badge variant="outline">Uncategorized</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Published</div>
                  <div>{book.publicationDate || 'N/A'}</div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {book.description || 'No description provided.'}
              </p>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

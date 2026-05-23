import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import BookForm from './BookForm';
import { BookRequestDTO } from '@/types/book';
import { Category } from '@/types/category';
import { Author } from '@/types/author';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  authors: Author[];
  onSave: (
    payload: BookRequestDTO,
    cover?: File | null,
    pdf?: File | null
  ) => Promise<void>;
  initial?: Partial<BookRequestDTO>;
};

export default function BookDialog({
  open,
  onOpenChange,
  categories,
  authors,
  onSave,
  initial,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initial ? 'Edit Book' : 'Add Book'}</DialogTitle>
        </DialogHeader>
        <BookForm
          initial={initial}
          categories={categories}
          authors={authors}
          onNext={async (payload, cover, pdf) => {
            await onSave(payload, cover ?? undefined, pdf ?? undefined);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

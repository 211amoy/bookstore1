import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AuthorForm } from './AuthorForm';
import { Author } from '@/types/author';

interface AuthorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initialData?: Author | null;
  onSubmit: (data: Omit<Author, 'id'>) => void;
}

export function AuthorDialog({
  open,
  onOpenChange,
  title,
  initialData,
  onSubmit,
}: AuthorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <AuthorForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

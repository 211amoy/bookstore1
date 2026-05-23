import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CategoryForm from './CategoryForm';
import React from 'react';

type CategoryDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  formData: { name: string; description: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ name: string; description: string }>
  >;
  onSubmit: () => void;
  onCancel: () => void;
  triggerLabel?: string;
};

export default function CategoryDialog({
  isOpen,
  onOpenChange,
  isEdit = false,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  triggerLabel,
}: CategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent forceMount>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          isEdit={isEdit}
          formData={formData}
          setFormData={setFormData}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

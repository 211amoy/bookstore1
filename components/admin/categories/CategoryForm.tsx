import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type CategoryFormProps = {
  isEdit?: boolean;
  formData: { name: string; description: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ name: string; description: string }>
  >;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function CategoryForm({
  isEdit = false,
  formData,
  setFormData,
  onCancel,
  onSubmit,
}: CategoryFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter category name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter category description"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {isEdit ? 'Update Category' : 'Add Category'}
        </Button>
      </div>
    </div>
  );
}

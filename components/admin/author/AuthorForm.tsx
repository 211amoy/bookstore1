import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Author } from '@/types/author';
import { useState, useEffect } from 'react';

interface AuthorFormProps {
  initialData?: Author | null;
  onSubmit: (data: Omit<Author, 'id'>) => void;
  onCancel: () => void;
}

export function AuthorForm({
  initialData,
  onSubmit,
  onCancel,
}: AuthorFormProps) {
  const [formData, setFormData] = useState({ name: '', bio: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({ name: initialData.name, bio: initialData.bio });
    }
  }, [initialData]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Author Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter author name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Enter author biography"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSubmit(formData)}>
          {initialData ? 'Update Author' : 'Add Author'}
        </Button>
      </div>
    </div>
  );
}

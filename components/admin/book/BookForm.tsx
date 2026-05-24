import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BookRequestDTO } from '@/types/book';
import { Category } from '@/types/category';
import { Author } from '@/types/author';

type Props = {
  initial?: Partial<BookRequestDTO>;
  categories: Category[];
  authors: Author[];
  onNext: (
    payload: BookRequestDTO,
    coverFile?: File | null,
    pdfFile?: File | null
  ) => void;
  onCancel: () => void;
};

export default function BookForm({
  initial,
  categories,
  authors,
  onNext,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [publisher, setPublisher] = useState(initial?.publisher ?? '');
  const [publicationDate, setPublicationDate] = useState(
    initial?.publicationDate ?? new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState(initial?.description ?? '');
  const [categoryId, setCategoryId] = useState<number>(
    initial?.categoryId ?? 0
  );
  const [authorId, setAuthorId] = useState<number>(initial?.authorId ?? 0);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title ?? '');
      setPublisher(initial.publisher ?? '');
      setPublicationDate(
        initial.publicationDate ?? new Date().toISOString().slice(0, 10)
      );
      setDescription(initial.description ?? '');
      setCategoryId(initial.categoryId ?? 0);
      setAuthorId(initial.authorId ?? 0);
    }
  }, [initial]);

  const submit = () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    if (!publisher.trim()) {
      alert('Publisher is required');
      return;
    }
    if (!publicationDate) {
      alert('Publication date is required');
      return;
    }
    if (categoryId === 0) {
      alert('Select category');
      return;
    }
    if (authorId === 0) {
      alert('Select author');
      return;
    }

    const payload: BookRequestDTO = {
      title: title.trim(),
      publisher: publisher.trim(),
      publicationDate,
      description: description.trim(),
      categoryId,
      authorId,
    };
    onNext(payload, coverFile ?? undefined, pdfFile ?? undefined);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className={'mb-2'}>
            Title
          </Label>
          <Input
            id="title"
            placeholder={'Book title...'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="publicationDate" className={'mb-2'}>
            Publication Date
          </Label>
          <Input
            id="publicationDate"
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className={'mb-2'}>Author</Label>
          <Select
            value={String(authorId ?? 0)}
            onValueChange={(v) => setAuthorId(Number(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">-- Select author --</SelectItem>
              {authors.map((a) => (
                <SelectItem key={a.id} value={String(a.id)}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className={'mb-2'}>Category</Label>
          <Select
            value={String(categoryId ?? 0)}
            onValueChange={(v) => setCategoryId(Number(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">-- Select category --</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="publisher" className={'mb-2'}>
          Publisher
        </Label>
        <Input
          id="publisher"
          placeholder={'Publisher name...'}
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="description" className={'mb-2'}>
          Description
        </Label>
        <Textarea
          id="description"
          placeholder={'Book description...'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="coverFile" className={'mb-2'}>
            Cover Image (optional)
          </Label>
          <Input
            id="coverFile"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <div>
          <Label htmlFor="pdfFile" className={'mb-2'}>
            Book PDF (optional)
          </Label>
          <Input
            id="pdfFile"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={submit}>Save & Upload</Button>
      </div>
    </div>
  );
}

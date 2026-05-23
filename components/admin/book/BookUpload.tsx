import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadCoverImage, uploadBookFile } from '@/services/bookService';

type Props = {
  bookId: number | string;
  onUploaded?: (updated?: any) => void;
};

export default function BookUpload({ bookId, onUploaded }: Props) {
  const [cover, setCover] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCover = async () => {
    if (!cover) return alert('Select cover file');
    try {
      setLoading(true);
      const updated = await uploadCoverImage(bookId, cover);
      alert('Cover uploaded');
      onUploaded?.(updated);
    } catch (err) {
      console.error(err);
      alert('Cover upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePdf = async () => {
    if (!pdf) return alert('Select PDF file');
    try {
      setLoading(true);
      const updated = await uploadBookFile(bookId, pdf);
      alert('Book file uploaded');
      onUploaded?.(updated);
    } catch (err) {
      console.error(err);
      alert('Book file upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files?.[0] ?? null)}
        />
        <div className="flex gap-2 mt-2">
          <Button onClick={handleCover} disabled={loading}>
            Upload Cover
          </Button>
        </div>
      </div>

      <div>
        <Input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
        />
        <div className="flex gap-2 mt-2">
          <Button onClick={handlePdf} disabled={loading}>
            Upload PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

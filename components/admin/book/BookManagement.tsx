'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search, Plus } from 'lucide-react';
import BookTable from './BookTable';
import BookDialog from './BookDialog';
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  uploadCoverImage,
  uploadBookFile,
} from '@/services/bookService';
import { BookResponse, BookRequestDTO } from '@/types/book';
import { Category } from '@/types/category';
import { Author } from '@/types/author';
import { getAllCategories } from '@/services/categoryService';
import { getAllAuthors } from '@/services/authorService';

export default function BookManagement() {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [bList, cats, auths] = await Promise.all([
        getAllBooks(),
        getAllCategories(),
        getAllAuthors(),
      ]);
      setBooks(bList ? bList : []);
      setCategories(cats ? cats : []);
      setAuthors(auths ? auths : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      String(b.authorId).toLowerCase().includes(search.toLowerCase()) ||
      String(b.categoryId).toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (
    payload: BookRequestDTO,
    cover?: File | null,
    pdf?: File | null
  ) => {
    try {
      let saved = null;
      if (editing) {
        saved = await updateBook(editing.id, payload);
      } else {
        saved = await createBook(payload);
      }

      const bookId = saved?.id ?? saved?.id ?? saved;

      if (cover) {
        await uploadCoverImage(bookId, cover);
      }
      if (pdf) {
        await uploadBookFile(bookId, pdf);
      }

      await loadAll();
      setOpen(false);
      setEditing(null);
      alert('Book saved successfully');
    } catch (err) {
      console.error('save failed', err);
      alert('Save failed');
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm('Delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error('delete failed', err);
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Book Management</h2>
          <p className="text-muted-foreground">Manage your book collection</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Book
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Books</CardTitle>
              <CardDescription>All books in your collection</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search books..."
                className="pl-8 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <BookTable
              books={filtered}
              onEdit={(b) => {
                setEditing(b);
                setOpen(true);
              }}
              onDelete={(id) => handleDelete(id)}
              authors={authors}
              categories={categories}
            />
          )}
        </CardContent>
      </Card>

      <BookDialog
        open={open}
        onOpenChange={(o) => {
          if (!o) setEditing(null);
          setOpen(o);
        }}
        categories={categories}
        authors={authors}
        onSave={handleSave}
        initial={
          editing
            ? {
                title: editing.title,
                publisher: editing.publisher,
                publicationDate: editing.publicationDate,
                description: editing.description ?? undefined,
                categoryId: editing.categoryId,
                authorId: editing.authorId,
              }
            : undefined
        }
      />
    </div>
  );
}

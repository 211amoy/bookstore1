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
import { Author } from '@/types/author';
import {
  getAllAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} from '@/services/authorService';
import { AuthorTable } from './AuthorTable';
import { AuthorDialog } from './AuthorDialog';

export default function AuthorManagement() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const response = await getAllAuthors();
      setAuthors(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (data: Omit<Author, 'id'>) => {
    await addAuthor(data);
    await loadAuthors();
    setIsDialogOpen(false);
  };

  const handleUpdate = async (data: Omit<Author, 'id'>) => {
    if (!editingAuthor) return;
    await updateAuthor(editingAuthor.id, data);
    await loadAuthors();
    setEditingAuthor(null);
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this author?')) {
      await deleteAuthor(id);
      await loadAuthors();
    }
  };

  const filteredAuthors = authors.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Author Management
          </h2>
          <p className="text-muted-foreground">Manage book authors</p>
        </div>
        <Button
          onClick={() => {
            setEditingAuthor(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Author
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Authors</CardTitle>
              <CardDescription>Manage your book authors</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AuthorTable
            authors={filteredAuthors}
            onEdit={(author) => {
              setEditingAuthor(author);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <AuthorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingAuthor ? 'Edit Author' : 'Add Author'}
        initialData={editingAuthor}
        onSubmit={editingAuthor ? handleUpdate : handleAdd}
      />
    </div>
  );
}

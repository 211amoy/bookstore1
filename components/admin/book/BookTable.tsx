import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { BookResponse } from '@/types/book';
import { Category } from '@/types/category';
import { Author } from '@/types/author';

type Props = {
  books: BookResponse[];
  categories: Category[];
  authors: Author[];
  onEdit: (b: BookResponse) => void;
  onDelete: (id: number | string) => void;
};

export default function BookTable({
  books,
  onEdit,
  onDelete,
  categories,
  authors,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Cover</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Publisher</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Published</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((b) => (
          <TableRow key={b.id}>
            <TableCell>
              <img
                src={b.coverImageUrl ?? '/placeholder.svg'}
                alt={b.title}
                className="w-10 h-12 object-cover rounded"
              />
            </TableCell>
            <TableCell className="font-medium">{b.title}</TableCell>
            <TableCell>{b.publisher}</TableCell>
            <TableCell>
              {authors.find((aut) => aut.id === b.authorId)?.name ??
                'Unknown Author'}
            </TableCell>

            <TableCell>
              <Badge variant="secondary">
                {categories.find((cat) => cat.id === b.categoryId)?.name ??
                  'Uncategorized'}
              </Badge>
            </TableCell>
            <TableCell>{b.publicationDate}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(b)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(b.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

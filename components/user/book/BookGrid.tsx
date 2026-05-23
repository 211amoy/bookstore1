import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, BookOpen } from 'lucide-react';
import { BookResponse } from '@/types/book';
import { Author } from '@/types/author';
import { Category } from '@/types/category';

interface BookGridProps {
  books: BookResponse[];
  authors: Author[];
  categories: Category[];
  onSelectBook: (book: BookResponse) => void;
  onDownload: (book: BookResponse) => void;
  searchQuery: string;
  selectedCategory: string;
  selectedAuthor: string;
}

export function BookGrid({
  books,
  authors,
  categories,
  onSelectBook,
  onDownload,
  searchQuery,
  selectedCategory,
  selectedAuthor,
}: BookGridProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-2">
        {searchQuery || selectedCategory !== 'All' || selectedAuthor !== 'All'
          ? 'Search Results'
          : 'All Books'}
      </h2>
      <p className="text-muted-foreground mb-6">
        {books.length} book{books.length !== 1 ? 's' : ''} found
      </p>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              className="w-[300px] py-0 group hover:shadow-lg transition-shadow "
            >
              <CardHeader className="p-0">
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                  <img
                    src={book.coverImageUrl || '/placeholder.svg'}
                    alt={book.title}
                    className="w-full h-full object-fit group-hover:scale-105 transition-transform"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div>
                  <CardTitle className="text-lg font-semibold line-clamp-2 mb-1">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    by{' '}
                    {authors.find((aut) => aut.id === book.authorId)?.name ??
                      'Unknown Author'}{' '}
                    • {book.publicationDate}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {categories.find((cat) => cat.id === book.categoryId)?.name ??
                    'Uncategorized'}
                </Badge>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectBook(book)}
                  >
                    <Eye className="w-4 h-4 mr-2" /> Details
                  </Button>
                  <Button size="sm" onClick={() => onDownload(book)}>
                    <Download className="w-4 h-4 mr-2" /> Open PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

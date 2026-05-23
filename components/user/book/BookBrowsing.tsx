'use client';

import { useState, useEffect } from 'react';
import { BookOpen, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllBooks } from '@/services/bookService';
import { getAllCategories } from '@/services/categoryService';
import { getAllAuthors } from '@/services/authorService';
import { BookResponse } from '@/types/book';
import { Category } from '@/types/category';
import { Author } from '@/types/author';
import { BookFilters } from './BookFilters';
import { BookGrid } from './BookGrid';
import { BookDetailsModal } from './BookDetailsModal';

interface BookBrowsingProps {
  user: { id: string; name: string; email: string; role: 'USER' | 'ADMIN' };
  onLogout: () => void;
}

export default function BookBrowsing({ user, onLogout }: BookBrowsingProps) {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [selectedBook, setSelectedBook] = useState<BookResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookData, categoryData, authorData] = await Promise.all([
          getAllBooks(),
          getAllCategories(),
          getAllAuthors(),
        ]);
        setBooks(bookData);
        setFilteredBooks(bookData);
        setCategories(categoryData);
        setAuthors(authorData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const filterBooks = (query: string, category: string, author: string) => {
    let filtered = [...books];

    if (query) {
      filtered = filtered.filter((book) => {
        const authorName =
          authors.find((a) => a.id === book.authorId)?.name.toLowerCase() || '';
        const categoryName =
          categories
            .find((c) => c.id === book.categoryId)
            ?.name.toLowerCase() || '';

        return (
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          authorName.includes(query.toLowerCase()) ||
          (book.description?.toLowerCase() || '').includes(
            query.toLowerCase()
          ) ||
          categoryName.includes(query.toLowerCase())
        );
      });
    }

    if (category !== 'All') {
      filtered = filtered.filter((book) => {
        const categoryName =
          categories.find((c) => c.id === book.categoryId)?.name || '';
        return categoryName === category;
      });
    }

    if (author !== 'All') {
      filtered = filtered.filter((book) => {
        const authorName =
          authors.find((a) => a.id === book.authorId)?.name || '';
        return authorName === author;
      });
    }

    setFilteredBooks(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBooks(query, selectedCategory, selectedAuthor);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterBooks(searchQuery, category, selectedAuthor);
  };

  const handleAuthorFilter = (author: string) => {
    setSelectedAuthor(author);
    filterBooks(searchQuery, selectedCategory, author);
  };

  const handleDownload = (book: BookResponse) => {
    if (book.bookFileUrl) {
      window.open(book.bookFileUrl, '_blank');
    } else {
      console.warn('No file available for this book');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">BookStore</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <LogOut className="w-4 h-4" />
                <span>{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <BookFilters
        searchQuery={searchQuery}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryFilter}
        categories={categories}
        selectedAuthor={selectedAuthor}
        onAuthorChange={handleAuthorFilter}
        authors={authors}
      />

      {/* Books Grid */}
      <BookGrid
        books={filteredBooks}
        authors={authors}
        categories={categories}
        onSelectBook={setSelectedBook}
        onDownload={handleDownload}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedAuthor={selectedAuthor}
      />

      {/* Modal */}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          author={
            authors.find((author) => author.id === selectedBook.authorId) ||
            null
          }
          category={
            categories.find((cat) => cat.id === selectedBook.categoryId) || null
          }
          onClose={() => setSelectedBook(null)}
          onDownload={() => handleDownload(selectedBook)}
        />
      )}
    </div>
  );
}

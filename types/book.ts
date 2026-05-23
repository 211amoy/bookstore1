export type BookResponse = {
  id: number;
  title: string;
  publisher: string;
  publicationDate: string;
  description?: string | null;
  coverImageUrl?: string | null;
  coverImagePublicId?: string | null;
  bookFileUrl?: string | null;
  bookFileUrlPublicId?: string | null;
  categoryId: number;
  authorId: number;
};

export type BookRequestDTO = {
  title: string;
  publisher: string;
  publicationDate: string;
  description?: string;
  categoryId: number;
  authorId: number;
};

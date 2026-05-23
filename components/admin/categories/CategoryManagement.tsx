import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Category } from '@/types/category';
import CategoryTable from './CategoryTable';
import CategoryDialog from './CategoryDialogs';

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/categoryService';

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch {
      setCategories([]);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = async () => {
    const newCategory = await createCategory(formData);
    setCategories((prev) => [newCategory, ...prev]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;
    const updated = await updateCategory(editingCategory.id, {
      ...editingCategory,
      ...formData,
    });
    setCategories((prev) =>
      prev.map((c) => (c.id === editingCategory.id ? updated : c))
    );
    resetForm();
    setIsEditDialogOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => setFormData({ name: '', description: '' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Category Management
          </h2>
          <p className="text-muted-foreground">Manage book categories</p>
        </div>
        <CategoryDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddCategory}
          onCancel={() => {
            setIsAddDialogOpen(false);
            resetForm();
          }}
          triggerLabel="Add Category"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your book categories</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CategoryTable
            categories={filteredCategories}
            onEdit={openEditDialog}
            onDelete={handleDeleteCategory}
          />
        </CardContent>
      </Card>

      <CategoryDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        isEdit
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEditCategory}
        onCancel={() => {
          setIsEditDialogOpen(false);
          setEditingCategory(null);
          resetForm();
        }}
      />
    </div>
  );
}

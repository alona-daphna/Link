import { Category } from '../../../shared/Types/Category';
import { getAnchestorPath } from '../../../shared/treeUtils';

const getCategoriesFromLocalStorage = (): Category[] => {
  return JSON.parse(localStorage.getItem('categories') || '[]');
};

const saveCategoriesToLocalStorage = (categories: Category[]): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

const getNextId = (): number => {
  const categories = getCategoriesFromLocalStorage();
  if (categories.length === 0) {
    return 1;
  }
  const ids = categories.map((category) => category.id);
  return Math.max(...ids) + 1;
};

const fetchCategories = async (categoryId: number): Promise<Category[]> => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    const response = await fetch(
      `http://localhost:3000/categories/in/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } else {
    const categories = getCategoriesFromLocalStorage();
    return categories.filter((x) =>
      categoryId === 0 ? x.parentId === null : x.parentId === categoryId
    );
  }

  return [];
};

const fetchBreadcrumbs = async (categoryId: number): Promise<Category[]> => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    const response = await fetch(
      `http://localhost:3000/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } else {
    const categories = getCategoriesFromLocalStorage();
    return getAnchestorPath(categories, categoryId);
  }

  return [];
};

const createCategory = async (
  parentId: number | null,
  title: string
): Promise<Category | null> => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    const response = await fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        parentId,
      }),
    });

    if (response.ok) {
      return await response.json();
    }
  } else {
    const categories = getCategoriesFromLocalStorage();
    const category = {
      id: getNextId(),
      title,
      parentId,
    };
    categories.push(category);
    saveCategoriesToLocalStorage(categories);
    return category;
  }

  return null;
};

const deleteCategory = async (id: number) => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } else {
    const categories = getCategoriesFromLocalStorage();
    saveCategoriesToLocalStorage(categories.filter((x) => x.id !== id));
  }
};

const updateCategory = async (id: number, title: string) => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
  } else {
    const categories = getCategoriesFromLocalStorage();
    saveCategoriesToLocalStorage(
      categories.map((x) =>
        x.id === id ? { id: x.id, title, parentId: x.parentId } : x
      )
    );
  }
};

export {
  fetchCategories,
  fetchBreadcrumbs,
  createCategory,
  deleteCategory,
  updateCategory,
};

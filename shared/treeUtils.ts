import { Category } from './Types/Category';

interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
}

export const buildCategoryTree = (flatCategories: Category[]): Category[] => {
  const tree: CategoryTreeNode[] = [];
  const categoryMap: { [id: number]: CategoryTreeNode } = {};

  flatCategories.forEach((category) => {
    categoryMap[category.id] = { ...category, children: [] };
  });

  flatCategories.forEach((category) => {
    if (category.parentId == null) {
      tree.push(categoryMap[category.id]);
    } else {
      const parentNode = categoryMap[category.parentId];
      parentNode.children.push(categoryMap[category.id]);
    }
  });

  return tree;
};

export const getAnchestorPath = (
  categories: Category[],
  startCategoryId: number
): Category[] => {
  const categoryMap = new Map(categories.map((x) => [x.id, x]));
  let currentId = startCategoryId || null;
  const anchestors: Category[] = [];

  while (currentId !== null) {
    const currentCategory = categoryMap.get(currentId)!;
    anchestors.push(currentCategory);
    currentId = currentCategory.parentId;
  }

  return anchestors.reverse();
};

import { Category, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
// check delete cascade

export const GetChildCategories = async (req: Request, res: Response) => {
  const parentId = Number(req.params.id);
  res.json(
    await prisma.category.findMany({
      where: {
        parentId: parentId == 0 ? null : parentId,
      },
    })
  );
};

export const GetEntireTree = async (req: Request, res: Response) => {
  res.json({ categories: buildCategoryTree(await prisma.category.findMany()) });
};

export const GetAnchestorPath = async (req: Request, res: Response) => {
  res.json({
    anchestors: await prisma.$queryRaw`
  WITH RECURSIVE cte AS (
    SELECT id, parentId, title
    FROM category
    WHERE id = ${req.params.id}
    UNION ALL
    SELECT parent.id, parent.parentId, parent.title
    FROM category parent
    JOIN cte ON cte.parentId = parent.id
 )
 SELECT title, id, parentId
 FROM cte;`,
  });
};

export const Create = async (req: Request, res: Response) => {
  const { title, parentId } = req.body;
  const newCategory = await prisma.category.create({
    data: {
      title,
      parentId,
    },
  });

  res.json(newCategory);
};

export const Update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, parentId } = req.body;

  res.json(
    await prisma.category.update({
      data: { title, parentId },
      where: { id: Number(id) },
    })
  );
};

export const Delete = async (req: Request, res: Response) => {
  res.json(
    await prisma.category.delete({
      where: { id: Number(req.params.id) },
    })
  );
};

interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
}

const buildCategoryTree = (flatCategories: Category[]): Category[] => {
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

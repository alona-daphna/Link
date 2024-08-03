import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { buildCategoryTree } from '../../shared/treeUtils';

const prisma = new PrismaClient();

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
  res.json(
    await prisma.$queryRaw`
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
 FROM cte
 ORDER BY id ASC;`
  );
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

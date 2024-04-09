import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const GetByID = async (req: Request, res: Response) => {
  res.json(await prisma.link.findUnique({
      where: { id: Number(req.params.id) },
    }),
  );
};

export const GetByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;

  res.json(await prisma.link.findMany({
      where: { categoryId: Number(category) },
    }),
  );
};

export const Create = async (req: Request, res: Response) => {
  const { title, url, category } = req.body;

  const newLink = await prisma.link.create({
    data: {
      title,
      url,
      categoryId: category ? Number(category) : null,
    },
  });

  res.json(newLink);
};

export const Update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, url, category } = req.body;

  res.json(
    await prisma.link.update({
      where: { id: Number(id) },
      data: { title, url, categoryId: category },
    })
  );
};

export const Delete = async (req: Request, res: Response) => {
  res.json(await prisma.link.delete({ where: { id: Number(req.params.id) } }));
};

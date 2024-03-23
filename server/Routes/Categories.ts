import { Router } from 'express';
import {
  GetAnchestorPath,
  GetEntireTree,
  Create,
  Delete,
  Update,
} from '../Controllers/Categories';

const router = Router();

router.get('/', GetEntireTree);
router.get('/:id', GetAnchestorPath);
router.post('/', Create);
router.delete('/:id', Delete);
router.patch('/:id', Update);

export default router;

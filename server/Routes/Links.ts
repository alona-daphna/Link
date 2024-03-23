import { Router } from 'express';
import {
  GetByID,
  GetByCategory,
  Create,
  Delete,
  Update,
} from '../Controllers/Links';

const router = Router();

router.get('/:id', GetByID);
router.get('/category/:category', GetByCategory);
router.post('/', Create);
router.delete('/:id', Delete);
router.patch('/:id', Update);

export default router;

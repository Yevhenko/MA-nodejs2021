import express from 'express';

import { errorHandler } from '../utils';
import teacher from './teacher';

const router = express.Router();

router.use(teacher);
router.use(errorHandler);

export = router;

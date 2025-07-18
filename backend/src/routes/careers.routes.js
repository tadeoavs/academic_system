import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    getAllCareers, 
    createCareer, 
    getCareerById, 
    updateCareer, 
    deleteCareer 
} from "../controllers/careerController.js";

const router = Router();

// GET /api/careers - Obtener todas las carreras
router.get('/careers', authRequired, getAllCareers);

// POST /api/careers/create - Crear una nueva carrera
router.post('/careers/create', authRequired, createCareer);

// GET /api/careers/:id - Obtener carrera por ID
router.get('/careers/:id', authRequired, getCareerById);

// PUT /api/careers/update/:id - Actualizar carrera por ID
router.put('/careers/update/:id', authRequired, updateCareer);

// DELETE /api/careers/delete/:id - Eliminar carrera por ID
router.delete('/careers/delete/:id', authRequired, deleteCareer);

export default router;
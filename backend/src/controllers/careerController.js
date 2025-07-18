import Career from "../models/careers.js";

// Obtener todas las carreras
export const getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ 
            message: "Error al obtener las carreras", 
            error: error.message 
        });
    }
};

// Crear una nueva carrera
export const createCareer = async (req, res) => {
    try {
        const { 
            career_code, 
            career_name, 
            description, 
            four_quarter_duration, 
            modality, 
            creation_date, 
            active, 
            coordinator 
        } = req.body;

        const newCareer = new Career({
            career_code,
            career_name,
            description,
            four_quarter_duration,
            modality,
            creation_date,
            active,
            coordinator
        });

        const savedCareer = await newCareer.save();
        res.status(201).json({
            message: "Carrera creada exitosamente",
            career: savedCareer
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Error al crear la carrera", 
            error: error.message 
        });
    }
};

// Obtener carrera por ID
export const getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await Career.findById(id);
        
        if (!career) {
            return res.status(404).json({ 
                message: "Carrera no encontrada" 
            });
        }
        
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({ 
            message: "Error al obtener la carrera", 
            error: error.message 
        });
    }
};

// Actualizar carrera
export const updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const updatedCareer = await Career.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true, // Retorna el documento actualizado
                runValidators: true // Ejecuta las validaciones del esquema
            }
        );
        
        if (!updatedCareer) {
            return res.status(404).json({ 
                message: "Carrera no encontrada" 
            });
        }
        
        res.status(200).json({
            message: "Carrera actualizada exitosamente",
            career: updatedCareer
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Error al actualizar la carrera", 
            error: error.message 
        });
    }
};

// Eliminar carrera
export const deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCareer = await Career.findByIdAndDelete(id);
        
        if (!deletedCareer) {
            return res.status(404).json({ 
                message: "Carrera no encontrada" 
            });
        }
        
        res.status(200).json({
            message: "Carrera eliminada exitosamente",
            career: deletedCareer
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error al eliminar la carrera", 
            error: error.message 
        });
    }
};
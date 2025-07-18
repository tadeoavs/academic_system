import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import {
    Edit,
    Delete,
    Add
} from '@mui/icons-material';

export default function Career() {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Estados para modales
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);
    
    // Estados para formularios
    const [formData, setFormData] = useState({
        career_code: '',
        career_name: '',
        description: '',
        four_quarter_duration: '',
        modality: '',
        coordinator: {
            name: '',
            email: ''
        }
    });

    // Cargar carreras al montar el componente
    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/careers', {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                setCareers(data);
            } else {
                setError('Error al cargar las carreras');
            }
        } catch (err) {
            console.error('Error al cargar carreras:', err);
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('coordinator.')) {
            const coordinatorField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                coordinator: {
                    ...prev.coordinator,
                    [coordinatorField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const resetForm = () => {
        setFormData({
            career_code: '',
            career_name: '',
            description: '',
            four_quarter_duration: '',
            modality: '',
            coordinator: {
                name: '',
                email: ''
            }
        });
    };

    const handleCreateCareer = async () => {
        try {
            // Agregar creation_date y convertir four_quarter_duration a número
            const careerData = {
                ...formData,
                four_quarter_duration: parseInt(formData.four_quarter_duration),
                creation_date: new Date().toISOString(),
                active: true
            };

            const response = await fetch('http://localhost:3000/api/careers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(careerData)
            });

            if (response.ok) {
                setSuccess('Carrera creada exitosamente');
                setCreateModalOpen(false);
                resetForm();
                fetchCareers();
            } else {
                const data = await response.json();
                setError(data.message || 'Error al crear la carrera');
            }
        } catch (err) {
            console.error('Error al crear carrera:', err);
            setError('Error de conexión al crear la carrera');
        }
    };

    const handleEditCareer = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/careers/update/${selectedCareer._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess('Carrera actualizada exitosamente');
                setEditModalOpen(false);
                resetForm();
                setSelectedCareer(null);
                fetchCareers();
            } else {
                const data = await response.json();
                setError(data.message || 'Error al actualizar la carrera');
            }
        } catch (err) {
            console.error('Error al actualizar carrera:', err);
            setError('Error de conexión al actualizar la carrera');
        }
    };

    const handleDeleteCareer = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/careers/delete/${selectedCareer._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setSuccess('Carrera eliminada exitosamente');
                setDeleteModalOpen(false);
                setSelectedCareer(null);
                fetchCareers();
            } else {
                const data = await response.json();
                setError(data.message || 'Error al eliminar la carrera');
            }
        } catch (err) {
            console.error('Error al eliminar carrera:', err);
            setError('Error de conexión al eliminar la carrera');
        }
    };

    const openEditModal = (career) => {
        setSelectedCareer(career);
        setFormData({
            career_code: career.career_code,
            career_name: career.career_name,
            description: career.description,
            four_quarter_duration: career.four_quarter_duration.toString(),
            modality: career.modality,
            coordinator: {
                name: career.coordinator?.name || '',
                email: career.coordinator?.email || ''
            }
        });
        setEditModalOpen(true);
    };

    const openDeleteModal = (career) => {
        setSelectedCareer(career);
        setDeleteModalOpen(true);
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" color="primary">
                        Gestión de Carreras
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setCreateModalOpen(true)}
                    >
                        Nueva Carrera
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
                        {success}
                    </Alert>
                )}

                <List>
                    {careers.map((career, index) => (
                        <Box key={career._id}>
                            <ListItem 
                                sx={{ 
                                    py: 2, 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'flex-start' 
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" component="div">
                                            {career.career_code} - {career.career_name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {career.description}
                                            </Typography>
                                            <Typography variant="body2" color="primary">
                                                Coordinador: {career.coordinator?.name || 'No asignado'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Email: {career.coordinator?.email || 'No asignado'}
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<Edit />}
                                        onClick={() => openEditModal(career)}
                                        color="primary"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<Delete />}
                                        onClick={() => openDeleteModal(career)}
                                        color="error"
                                    >
                                        Eliminar
                                    </Button>
                                </Box>
                            </ListItem>
                            {index < careers.length - 1 && <Divider />}
                        </Box>
                    ))}
                </List>

                {careers.length === 0 && !loading && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No hay carreras registradas
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Comienza creando tu primera carrera
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setCreateModalOpen(true)}
                        >
                            Crear Primera Carrera
                        </Button>
                    </Box>
                )}
            </Paper>

            {/* Modal de Crear Carrera */}
            <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Crear Nueva Carrera</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="career_code"
                            label="Código de Carrera"
                            value={formData.career_code}
                            onChange={handleInputChange}
                            placeholder="Ej: GA001"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="career_name"
                            label="Nombre de la Carrera"
                            value={formData.career_name}
                            onChange={handleInputChange}
                            placeholder="Ej: Gastronomía"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="description"
                            label="Descripción"
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="four_quarter_duration"
                            label="Duración (cuatrimestres)"
                            type="number"
                            value={formData.four_quarter_duration}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="modality"
                            label="Modalidad"
                            value={formData.modality}
                            onChange={handleInputChange}
                            placeholder="Ej: Presential"
                        />
                        
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Información del Coordinador
                        </Typography>
                        
                        <TextField
                            fullWidth
                            margin="normal"
                            name="coordinator.name"
                            label="Nombre del Coordinador"
                            value={formData.coordinator.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="coordinator.email"
                            label="Email del Coordinador"
                            type="email"
                            value={formData.coordinator.email}
                            onChange={handleInputChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setCreateModalOpen(false); resetForm(); }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleCreateCareer} variant="contained">
                        Crear Carrera
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Editar Carrera */}
            <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Editar Carrera</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="career_code"
                            label="Código de Carrera"
                            value={formData.career_code}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="career_name"
                            label="Nombre de la Carrera"
                            value={formData.career_name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="description"
                            label="Descripción"
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="four_quarter_duration"
                            label="Duración (cuatrimestres)"
                            type="number"
                            value={formData.four_quarter_duration}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="modality"
                            label="Modalidad"
                            value={formData.modality}
                            onChange={handleInputChange}
                        />
                        
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Información del Coordinador
                        </Typography>
                        
                        <TextField
                            fullWidth
                            margin="normal"
                            name="coordinator.name"
                            label="Nombre del Coordinador"
                            value={formData.coordinator.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="coordinator.email"
                            label="Email del Coordinador"
                            type="email"
                            value={formData.coordinator.email}
                            onChange={handleInputChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setEditModalOpen(false); resetForm(); setSelectedCareer(null); }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleEditCareer} variant="contained">
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Confirmar Eliminación */}
            <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas eliminar la carrera "{selectedCareer?.career_name}"?
                        Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDeleteModalOpen(false); setSelectedCareer(null); }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteCareer} variant="contained" color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

import React, { useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Person,
    Email,
    Lock,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Limpiar errores cuando el usuario empiece a escribir
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError('El nombre de usuario es requerido');
            return false;
        }
        if (!formData.email.trim()) {
            setError('El email es requerido');
            return false;
        }
        if (!formData.password) {
            setError('La contraseña es requerida');
            return false;
        }
        if (formData.password.length < 3) {
            setError('La contraseña debe tener al menos 3 caracteres');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('¡Usuario registrado exitosamente! Redirigiendo al login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.message || 'Error al registrar usuario');
            }
        } catch (err) {
            console.error('Error de registro:', err);
            setError('Error de conexión. Verifique que el servidor esté ejecutándose.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom color="primary">
                        Registro
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Crea tu cuenta en el Sistema Académico
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="username"
                            label="Nombre de Usuario"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Registrarse'
                            )}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2">
                                ¿Ya tienes cuenta?{' '}
                                <Button
                                    variant="text"
                                    onClick={() => navigate('/login')}
                                    disabled={loading}
                                >
                                    Iniciar Sesión
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { blue } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include' // Importante para manejar las cookies
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }

            // Guardamos los datos del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(data));
            
            // Redirigimos al home
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Card sx={{ 
                maxWidth: 400,
                width: '100%',
                boxShadow: 3,
                borderRadius: 2
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    bgcolor: blue[500],
                    py: 3
                }}>
                    <Avatar sx={{ 
                        bgcolor: blue[700],
                        width: 56,
                        height: 56
                    }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <CardHeader
                        title="Iniciar Sesión"
                        sx={{ 
                            color: 'white',
                            '& .MuiCardHeader-title': {
                                fontSize: '1.5rem',
                                fontWeight: 500
                            }
                        }}
                    />
                </Box>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: 2
                    }}>
                        <TextField
                            label="Correo electrónico"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                        {error && (
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{ 
                                mt: 2,
                                bgcolor: blue[500],
                                '&:hover': {
                                    bgcolor: blue[700]
                                }
                            }}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
    
}
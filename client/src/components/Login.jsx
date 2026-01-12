import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';

function Login() {
    const navigate = useNavigate();
    const { userLogin, isLoggingIn } = useAuthStore();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setLoginData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!loginData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!loginData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!validate()) return;

        userLogin(loginData);

        setLoginData({ email: "", password: "" });
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-96 lg:w-[30%] md:w-[50%] rounded-2xl shadow-xl p-8 flex flex-col gap-10 border border-blue-100">
                <h2 className="text-2xl font-semibold text-center">
                    Login
                </h2>

                <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                    />

                    <FormControl variant="outlined" fullWidth error={!!errors.password}>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(p => !p)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </span>
                        )}
                    </FormControl>

                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span>Don’t have an account?</span>
                    <span
                        onClick={() => navigate("/signup")}
                        className="ml-1 text-blue-600 cursor-pointer hover:underline"
                    >
                        Create
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;

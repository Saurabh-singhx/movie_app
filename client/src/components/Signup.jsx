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

function Signup() {
    const navigate = useNavigate();
    const { userSignup, isSigningUp } = useAuthStore();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setSignupData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!signupData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!signupData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!signupData.password) {
            newErrors.password = "Password is required";
        } else if (signupData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (!validate()) return;

        userSignup(signupData);

        setSignupData({
            name: "",
            email: "",
            password: "",
        });
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-96 lg:w-[30%] md:w-[50%] rounded-2xl shadow-xl p-8 flex flex-col gap-10 border border-blue-100">
                <h2 className="text-2xl font-semibold text-center">
                    Create Account
                </h2>

                <form className="flex flex-col gap-5" onSubmit={handleSignup}>
                    <TextField
                        label="Full Name"
                        name="name"
                        value={signupData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        name="email"
                        value={signupData.email}
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
                            value={signupData.password}
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(prev => !prev)}>
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
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? "Signing up..." : "Signup"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span>Already have an account?</span>
                    <span
                        onClick={() => navigate("/login")}
                        className="ml-1 text-blue-600 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;

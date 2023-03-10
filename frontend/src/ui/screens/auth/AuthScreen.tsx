import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import Card from "@mui/material/Card";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import {useNavigate} from "react-router-dom";
import {getAuthenticatedUser} from "../../../data/remote/UserDataSource";
import User from "../../../data/models/User";

const AuthScreen = () => {

    const [isRegister, setRegister] = useState(true)

    const toRegister = () => setRegister(true)
    const toLogin = () => setRegister(false)

    const navigate = useNavigate()

    const toNotes = (user: User) => navigate(
        "/notes",
        {state: user}
    )

    useEffect(() => {
        async function getUser() {
            try {
                const user = await getAuthenticatedUser()
                toNotes(user)
            } catch (error) {
                console.log(error)
            }
        }

        getUser()
    }, []);


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Card sx={{
                width: {
                    xs: 0.8,
                    sm: 0.6,
                    md: 0.4
                },
                padding: 3,
                borderRadius: 2
            }}>
                {
                    isRegister
                        ? <RegisterForm
                            onRegisterSuccess={toNotes}
                            onMoveToLogin={toLogin}
                        />
                        : <LoginForm
                            onLoginSuccess={toNotes}
                            onMoveToRegister={toRegister}
                        />

                }

            </Card>
        </Box>
    )
};

export default AuthScreen;

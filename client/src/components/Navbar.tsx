import React from 'react'
import { createStyles } from '@mantine/core'

import { useUser } from '../contexts/user'
import { Container, Logo, Button } from './UI'

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        background: 'white',
        padding: theme.spacing.lg,
    },
}))

const Navbar = () => {
    const { classes } = useStyles()
    const { user, logout } = useUser()

    const handleLogout = async () => {
        await logout()
    }

    const { isAuthenticated } = useUser()

    return (
        <nav className={classes.container}>
            <Container className="flex items-center justify-between">
                <Button href="/">
                    <Logo />
                </Button>
                <div className="hidden lg:flex lg:items-center lg:space-x-2">
                    <Button thin href="/">
                        Home
                    </Button>
                    <Button thin href="/about">
                        About
                    </Button>
                    <Button thin href="/contact">
                        Contact Us
                    </Button>
                    <Button thin href="/dashboard">
                        {user?.Name}
                    </Button>
                </div>
                <div className="lg:grid grid-cols-2 gap-1">
                {isAuthenticated ? ( 
                    <Button
                        variant="primary"
                        className="!bg-red-500 hover:!bg-red-700 active:!bg-red-600"
                        onClick={handleLogout}
                        >
                        Logout
                    </Button>
                ):(<>
                    <Button thin href="/login">
                        Login
                    </Button>
                    <Button variant="primary" href="/register">
                        Register
                    </Button>
                </>)}
                </div>
            </Container>
        </nav>
    )
}
export default Navbar

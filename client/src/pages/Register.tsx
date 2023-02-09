import React from 'react'
import { createStyles, TextInput, Title } from '@mantine/core'
import { useForm, joiResolver } from '@mantine/form'
import { useNavigate, useLocation } from 'react-router-dom'
import Joi from 'joi'

import { useUser, IRegisterArgs } from '../contexts/user'
import { Button, Container } from '../components/UI'

interface ILocationState {
    path: string
}

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '384px',
        marginTop: '256px',
    },
}))

const Register = () => {
    const { classes } = useStyles()
    const { register } = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    //const { path } = location.state as ILocationState;

    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: ['com', 'net', 'org', 'io'] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

        name: Joi.string()
            .required(),

        bio: Joi.string()
            .optional(),
        
        image: Joi.string()
            .optional(),
    })

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            name: '',
            bio: '',
            image: '',
        },

        schema: joiResolver(schema),
    })

    const handleRegister = async (values: IRegisterArgs) => {
        const error = await register(values)

        if (error) {
            form.setErrors({ email: 'Invalid email or password' })
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <div>
            <div className="h-[80vh]">
                <Container className="grid grid-cols-1 lg:grid-cols-3 h-full">
                    <div className="grid justify-items-center lg:justify-items-start content-center lg:max-w-xl">
                        <form onSubmit={form.onSubmit(handleRegister)}>
                            <h1 className="font-semibold text-xl">Register</h1>
                            <TextInput
                                mb="md"
                                label="Name"
                                placeholder="Company"
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                mb="md"
                                label="Email"
                                placeholder="your@email.com"
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                mb="lg"
                                label="Password"
                                type="password"
                                placeholder="********"
                                {...form.getInputProps('password')}
                            />
                            <TextInput
                                mb="md"
                                label="Your Bio"
                                placeholder="We deliver!"
                                {...form.getInputProps('bio')}
                            />
                            <TextInput
                                mb="md"
                                label="Porfile Picture Link"
                                placeholder="http://example.com/logo.jpg"
                                {...form.getInputProps('image')}
                            />
                            <div>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly">
                        <span
                            className={`
        font-semibold relative 
        after:absolute after:border-b after:lg:border-r after:border-gray-400 
        after:w-[70vw] after:h-0 after:lg:w-0 after:lg:h-[40vh] after:-z-20
        after:right-1/2 after:translate-x-1/2 after:top-1/2 after:-translate-y-1/2 
        before:absolute before:w-[200%] before:h-[200%] before:bg-background before:-z-10
        before:right-1/2 before:translate-x-1/2 before:top-1/2 before:-translate-y-1/2
        `}
                        >
                            OR
                        </span>
                        <Button href="/login" className="min-w-[320px] text-sm">
                            Login to an existing account
                        </Button>
                    </div>
                    <div className="hidden lg:grid justify-items-end content-center">
                        <img src="/art/headphones.svg" alt="" />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Register

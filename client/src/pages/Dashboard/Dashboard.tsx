import React from 'react';
import { createStyles } from '@mantine/core';

import Navbar from '../../components/Navbar';

import { useUser } from '../../contexts/user';
import ProfileHeader from '../../components/ProfileHeader';
import { Container } from '../../components/UI';
import ProfileNavigation from '../../components/ProfileNavigation';


const Dashboard = () => {
    const { user } = useUser();
    
    const useStyles = createStyles((theme) => ({
        container: {},
    }));
    const { classes } = useStyles();
    return (
        <div className={classes.container}>
            <Navbar />
            <div className="py-10">
                <Container className="grid grid-cols-2 gap-10">
                    <div className="col-span-4 xl:col-span-3">
                    <ProfileHeader />
                    <ProfileNavigation />
                    <div className="px-2 sm:px-6 py-6">
                        {user && user?.Bio ? user?.Bio : "No bio"}
                    </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;

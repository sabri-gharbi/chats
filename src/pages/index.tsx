import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { User } from "~/Types";
import UserCard from "~/components/users/UserCard";
import UserModal from "~/components/users/UserModal";
import { api } from "~/utils/api";

const Home = () => {
    const router = useRouter();
    const { data: users } = api.users.all.useQuery();

    const [userModalShown, setUserModalShown] = useState<boolean>(false);
    const openUserModal = () => {
        setUserModalShown(true);
    };
    const closeUserModal = () => {
        setUserModalShown(false);
    };

    const handleUserCardClick = (user: User) => {
        void router.push("/cats");
    };

    return (
        <Box display="flex" flexDirection="column" padding={4}>
            <UserModal open={userModalShown} onClose={closeUserModal} />

            <Box
                sx={{
                    border: 1,
                    borderRadius: 8,
                    overflow: "hidden",
                    marginBottom: 2,
                }}
            >
                {users?.map((user) => (
                    <UserCard key={user.id} user={user} handleUserCardClick={handleUserCardClick} />
                ))}
            </Box>

            <Button variant="contained" onClick={openUserModal}>
                Add User
            </Button>
        </Box>
    );
};

export default Home;

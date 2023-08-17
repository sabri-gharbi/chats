import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { type User } from "~/Types";
import { CatsAppContext } from "~/components/layout";
import UserCard from "~/components/users/UserCard";
import UserModal from "~/components/users/UserModal";
import { api } from "~/utils/api";

const Home = () => {
    const router = useRouter();
    const { setUser } = useContext(CatsAppContext);
    const { data: users } = api.users.all.useQuery();

    const [userModalShown, setUserModalShown] = useState<boolean>(false);
    const openUserModal = () => {
        setUserModalShown(true);
    };
    const closeUserModal = () => {
        setUserModalShown(false);
    };

    const handleUserCardClick = (user: User) => {
        setUser?.(user);
        void router.push("/cats");
    };

    return (
        <Box display="flex" flexDirection="column" padding={4}>
            <UserModal open={userModalShown} onClose={closeUserModal} />

            <Box>
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

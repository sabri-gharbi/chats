import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { type User } from "~/Types";

export type UserCardProps = {
    user: User;
    handleUserCardClick: (cat: User) => void;
};

const UserCard = ({ user, handleUserCardClick }: UserCardProps) => {
    return (
        <Card sx={{ display: "flex" }}>
            <CardActionArea onClick={() => handleUserCardClick(user)}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1" component="div">
                            {user.name}
                        </Typography>
                        <Chip label={user.role} color="error" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default UserCard;

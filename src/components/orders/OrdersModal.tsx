import { Done } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { type Cat } from "~/Types";
import { api } from "~/utils/api";

export type OrdersModalProps = {
    open: boolean;
    onClose: () => void;
    catId: Cat["id"];
};

const OrdersModal = ({ open, onClose, catId }: OrdersModalProps) => {
    const utils = api.useContext();

    const { data: orders } = api.orders.all.useQuery({ catId: catId });

    const { mutateAsync: acceptRequestMutation } = api.orders.acceptRequest.useMutation({
        onSuccess: () => {
            utils.cats.all.invalidate();
            utils.users.all.invalidate();
            utils.orders.all.invalidate();
        },
    });

    const acceptRequest = useCallback(async () => {
        await acceptRequestMutation({ catId });
        onClose();
    }, [acceptRequestMutation, catId, onClose]);

    return (
        <Dialog {...{ open, onClose }} maxWidth="md" fullWidth>
            <DialogTitle>Pending requests </DialogTitle>

            <DialogContent>
                {orders?.map((order) => (
                    <Box key={order.id} display="flex" justifyContent="space-between" marginBottom={1}>
                        <Box>
                            <Typography variant="subtitle1">{`${order.user.name}: "${order.user.email}"`}</Typography>
                        </Box>

                        <IconButton color="success" onClick={acceptRequest}>
                            <Done />
                        </IconButton>
                    </Box>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default OrdersModal;

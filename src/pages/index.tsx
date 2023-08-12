import { Box, Typography, Button } from "@mui/material";
import { api } from "~/utils/api";

export default function Home() {
  const { data: hello } = api.example.hello.useQuery({ text: "from Cats" });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {hello && <Typography>{hello}</Typography>}
      <Box>
        <Button variant="contained">Let Dive in !</Button>
      </Box>
    </Box>
  );
}

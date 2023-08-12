import { Box } from "@mui/material";
import CatsList from "~/components/CatsList";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CatsList></CatsList>
    </Box>
  );
}

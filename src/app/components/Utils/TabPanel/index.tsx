import { Stack } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    id: string;
}

export default function TabPanel({ children, value, index, id, ...other }: TabPanelProps) {
    return (
        <div
            role="Painel de Abas"
            hidden={value !== index}
            id={id}
            {...other}
        >
            {value === index && <Stack spacing="20px" sx={{ paddingTop: "40px" }}>{children}</Stack>}
        </div>
    );
}
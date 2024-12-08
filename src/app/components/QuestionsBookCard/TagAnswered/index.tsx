import { Chip, ChipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface TagAnsweredProps extends ChipProps {
    label: string;
    answered?: boolean;
}

const ChipStyled = styled(Chip, {
    shouldForwardProp: (prop) => prop !== "answered",
}
)<TagAnsweredProps>(() => ({
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#E99A00",
    backgroundColor: "#FFF8E4",
    width: "fit-content",
    height: "fit-content",
    padding: "4px 0",
    variants: [
        {
            props: ({ answered }) => answered,
            style: {
                color: "#219653",
                backgroundColor: "#E1F5D5",
            },
        },
    ],
}));

export default function TagAnswered({ label, answered }: TagAnsweredProps) {
    return <ChipStyled label={label} answered={answered} />
}
import { ButtonProps as MuiButtonProps, Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ButtonProps extends MuiButtonProps {
    children: React.ReactNode;
    outlined?: boolean;
}

const ButtonStyled = styled(MuiButton)<MuiButtonProps>(({ theme }) => ({   
    background: theme.palette.gradient.main,
    borderRadius: "100rem",
    width: "100%",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: "bold",

    "&:disabled":{
        color: "white",
        opacity: 0.2,
        cursor: "not-allowed",
    },

    variants: [
        {
            props: ({ variant }) => variant === "outlined",
            style: {
                background: "transparent",
                border: '2px solid',
            },
        },
    ],
}));

export default function Button({ children, outlined, ...rest }: ButtonProps) {
    return (
        <ButtonStyled variant={outlined ? "outlined" : "contained"} {...rest}>
            {children}
        </ButtonStyled>
    )
}

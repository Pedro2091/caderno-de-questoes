import { Box, Badge, TextField, IconButton } from "@mui/material";
import MessageSVG from "@public/icons/message.svg";
import NotificationSVG from "@public/icons/notification.svg";
import SearchSVG from "@public/icons/search.svg";

export default function Header() {
    return (
        <header>
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "28px", px: "1rem" }}>
                <IconButton>
                    <Badge color="secondary" variant="dot" >
                        <NotificationSVG />
                    </Badge>
                </IconButton>


                <IconButton>
                    <MessageSVG/>
                </IconButton>


                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SearchSVG/>
                    <TextField
                        id="input-with-sx"
                        placeholder="Procurar"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            }
                        }}
                    />
                </Box>
            </Box>
        </header>
    )
}
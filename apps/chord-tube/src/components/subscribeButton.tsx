import { useState } from "react";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import { Notifications } from "@mui/icons-material";

export default function SubscribeButton() {
    const [subscribed, setSubscribed] = useState(false);

    return subscribed ? (
        <Button
            variant="outlined"
            color="success"
            startIcon={<CheckIcon />}
            onClick={() => setSubscribed(false)}
            sx={{
                textTransform: "none",
                width: "150px",
                paddingY: 0.5,
                fontWeight: "semibold",
                borderColor: "#16a34a",
                "&:hover": {
                    backgroundColor: "#dcfce7",
                },
            }}
        >
            Subscribed
        </Button>
    ) : (
        <Button
            startIcon={<Notifications />}
            variant="contained"
            onClick={() => setSubscribed(true)}
            sx={{ textTransform: "none", fontWeight: "semibold", paddingY: 0.5, width: "150px" }}
        >
            Subscribe
        </Button>
    );
}

import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";
import { Container, Box } from "@mui/material";


import { yariga } from "../assets";

import { CredentialResponse } from "../interfaces/google";

const GOOGLE_CLIENT_ID =
  "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

export const Login: React.FC = () => {
    const { mutate: login } = useLogin<CredentialResponse>({
        v3LegacyAuthProviderCompatible: true,
    });

    const GoogleButton = (): JSX.Element => {
        const divRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (
                typeof window === "undefined" ||
                !window.google ||
                !divRef.current
            ) {
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    // client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    client_id : GOOGLE_CLIENT_ID,
                    callback: async (res: CredentialResponse) => {
                        if (res.credential) {
                            login(res);
                        }
                    },
                });
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                });
            } catch (error) {
                console.log(error);
            }
        }, []); // you can also add your client id as dependency here

        return <div ref={divRef} />;
    };

    return (
        <Box component="div" sx={{ backgroundColor: "#FCFCFC" }}>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <img src={yariga} alt="Yariga Logo" />
                    </div>
                    <Box mt={4}>
                        <GoogleButton />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
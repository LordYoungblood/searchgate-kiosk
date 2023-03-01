import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VehicleContext } from "./VehicleContext";
import AppBar from "@mui/material/AppBar";
import { Box, Typography } from "@mui/material/";
import Toolbar from "@mui/material/Toolbar";
import logo from "./image/vigil_nobackground.png";

import Button from "@mui/material/Button";
import shark from "./image/shark.png";
import HomeIcon from "@mui/icons-material/Home";

// import shark from './images/shark';

export const Navbar = () => {
  const navigate = useNavigate();
  const { removeCookie, cookies, user } = useContext(VehicleContext);

  const logout = () => {
    // localStorage.removeItem("ver");
    // localStorage.removeItem("au");
    // localStorage.removeItem("base");
    removeCookie("ver");
    removeCookie("au");
    removeCookie("base");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar position="relative" sx={{ backgroundColor: "#051726" }}>
        <Toolbar>
          {/* <Box sx={{ width: "100%" }}> */}
          {user === '2055' && (
            <Box
              sx={{
                justifyContent: "flex-start",
                alignContent: "center",
                width: "100%",
              }}
            >
              <Button>
                <HomeIcon
                  sx={{ fontSize: 30, color: "white", cursor: "pointer" }}
                  onClick={() => navigate("/forms")}
                />
              </Button>

              <Button
                onClick={() => navigate("/history")}
                variant="h6"
                component="div"
              >
                History Log
              </Button>
              <Button
                onClick={() => navigate("/data")}
                variant="h6"
                component="div"
                sx={{}}
              >
                Analytics
              </Button>
              <Button
                onClick={() => navigate("/users")}
                variant="h6"
                component="div"
              >
                Users
              </Button>
            </Box>
          )}

          {user === '7050' && (
            <Box
              sx={{
                justifyContent: "flex-start",
                alignContent: "center",
                width: "100%",
              }}
            >
              <Button>
                <HomeIcon
                  sx={{ fontSize: 30, color: "white", cursor: "pointer" }}
                  onClick={() => navigate("/forms")}
                />
              </Button>

              <Button
                onClick={() => navigate("/history")}
                variant="h6"
                component="div"
              >
                History Log
              </Button>
              <Button
                onClick={() => navigate("/data")}
                variant="h6"
                component="div"
                sx={{}}
              >
                Analytics
              </Button>
              <Button
                onClick={() => navigate("/users")}
                variant="h6"
                component="div"
              >
                Users
              </Button>

              <Button
                onClick={() => navigate("/webmaster")}
                variant="h6"
                component="div"
              >
                Web Master
              </Button>
            </Box>
          )}

          <Box sx={{ justifyContent: "center", width: "100%" }}>
            <img src={logo} alt="shark" style={{ width: 55 }} />
          </Box>

          <Button
            sx={{
              ml: "auto",

              display: "flex",
              justifyContent: "flex-end",
              color: "inherit",
            }}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

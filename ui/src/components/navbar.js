import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VehicleContext } from "./VehicleContext";
import AppBar from "@mui/material/AppBar";
import { Box, Typography } from "@mui/material/";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import shark from "./image/shark.png";
import HomeIcon from "@mui/icons-material/Home";

// import shark from './images/shark';

export const Navbar = () => {
  const navigate = useNavigate();
  const { removeCookie, cookies, user } = useContext(VehicleContext);

  const logout = () => {
    localStorage.removeItem("ver");
    localStorage.removeItem("au");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="relative">
        <Toolbar>
          {/* <Box sx={{ width: "100%" }}> */}
          {user === 2055 ? (
            <>
              <HomeIcon
                sx={{ fontSize: 30, color: "white", cursor: "pointer" }}
                onClick={() => navigate("/forms")}
              />
              {/* <img
              src={shark}
              alt="shark"
              style={{ width: "10%" }}
            /> */}
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
                sx={{}}
              >
                Users
              </Button>
            </>
          ) : null}
          {/* </Box> */}
          {/* <Typography
            onClick={() => navigate("/forms")}
            sx={{  cursor: "pointer", m: 'auto' }}
          >
            <img
              src={shark}
              alt="shark"
              style={{ width: "100px", marginLeft: "65%" }}
            />
            
          </Typography> */}

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

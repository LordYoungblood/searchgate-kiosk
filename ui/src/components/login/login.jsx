import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import flash from "../image/flash.png";
import { VehicleContext } from "../VehicleContext";
import EZ from "../image/EZ.png";
// import EazyPass3 from "../image/EazyPass3.svg";
// import EazyPass3 from "../image/EazyPass3.png";
import Swal from "sweetalert2";
// import { setFlagsFromString } from "v8";

export const Login = () => {
  const {
    API,
    setUser,
    setIsAuthenticated,
    setCookie,
    setToken,
    userDomain,
    setFlag,
  } = useContext(VehicleContext);

  const [login, setLogin] = useState({
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();

  

  const postLogin = () => {
    // console.log("pre fetch");
    fetch(`${API}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
          console.log("login success from login")
          console.log("res from loging", res)
        } else {
          Swal.fire({
            title: "Invalid Credentials",
            text: "If you are experiencing issues, please contact your administrator",
            icon: "error",
            button: "Continue",
            showConfirmButton: false,
            timer: 7000,
          });
        }
      })
      .then((data) => {
        if (data === undefined) return;
        if (data !== undefined) {
          if (data.user.admin == 1) {
            localStorage.setItem("base", JSON.stringify(data.user.user_base))
            localStorage.setItem("user_rights", '7050');
            localStorage.setItem("token", JSON.stringify(data.token));
            navigate("/forms");
          } else if (data.user.admin == 2) {
            console.log("admin 2", data)
          } else if (data.user.admin == 3) {
            console.log("admin 3", data)
          }
          setToken(data.token);
          setUser(data);
          setIsAuthenticated(data.user.admin);
        }
      })
      .catch((err) => console.log(err));
    };
    


  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#051726",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            //backgroundColor: '#212121',
          }}
        >
          <Box
            
          >
            {/* <img src={logo} alt='logo' style={{ width: '20rem' }} /> */}
            <img src={EZ} alt="shark" style={{ width: '10rem' }} />
          </Box>
          {/* {failedLogin && (
            <span>
              <Typography
                component='span'
                variant='h5'
                align='center'
                color='error'
              >
                Failed to login, Retry or Sign up
              </Typography>
            </span>
          )} */}
          <Box
            sx={{ backgroundColor: "#FAFAFF", borderRadius: 3, px: 4, py: 4 }}
          >
            {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <img
                style={{ width: "100px", margin: "10px" }}
                src={logo}
                alt="Security Forces Flash"
              />
            </Box> */}

            <TextField
              // error={failedLogin}
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="User Name"
              name="user_name"
              autoComplete="Username"
              autoFocus
              onChange={(e) => {
                setLogin((prev) => {
                  return { ...prev, user_name: e.target.value };
                });
              }}
            />
            <TextField
              // error={failedLogin}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setLogin((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  postLogin();
                }
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              boxShadow: 2,
              width: 150,
              m: 1,
              backgroundColor: "#61C0A3",
              "&:hover": { backgroundColor: "#61C0A3", color: "black" },
            }}
            onClick={() => postLogin()}
          >
            Login
          </Button>

          {/* <Button
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              borderRadius: "30px",
              width: 200,
              display: "flex",
              justifyContent: "center",
            }}
            // onClick={() => navigate('/signup')}
          >
            Login as Guest 
          </Button> */}

          {/* {!apiRes.ok ? (
            <Box sx={{ m: 2, width: '100%' }}>
              <Typography variant='h5' component='h5' sx={{ color: 'white' }}>
                Connecting to Database
              </Typography>
              <LinearProgress />
            </Box>
          ) : null} */}
        </Box>
      </Container>
    </Box>
  );
};

import { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../VehicleContext";
import {
  Box,
  Container,
  Modal,
  Button,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

export const Users = () => {
  const { API } = useContext(VehicleContext);
  const [pageSize, setPageSize] = useState(10);
  const [userDetails, setUserDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [failedRegister, setFailedRegister] = useState(false);
  const [newUser, setNewUser] = useState({
    user_name: "",
    admin: "",
    password: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(visitorDetails);

  useEffect(() => {
    fetch(`${API}/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserDetails(json);
      })
      .catch((err) => console.log(err));
  }, []);

  const postUser = () => {
    setFailedRegister(false);
    fetch(`${API}/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error: ", err);
      });
    handleClose();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user_name",
      headerName: "User Name",
      width: 150,
      // editable: true,
    },
    {
      field: "admin",
      headerName: "admin",
      width: 150,
      // editable: true,
    },
  ];

  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 }
  const rows = [];
  userDetails.map((user, index) => {
    rows.push({
      id: index + 1,
      user_name: user.user_name,
      admin: user.admin,
    });
  });

  const fillOutFields = () => {
    if (
      newUser.user_name === "" ||
      newUser.admin === "" ||
      newUser.password === ""
    ) {
      setFailedRegister(true);
      // Swal.fire({
      //   title: "All Fields Are Required To Be Completed!",
      //   text: "If you are experiencing locate a Security Forces Member ",
      //   icon: "error",
      //   button: "Continue",
      //   showConfirmButton: false,
      //   timer: 7000,
      // });
      return;
    }
    postUser();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <h1>Users</h1>
      </Box>

      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Button
            sx={{ boxShadow: 2, width: 150, m: 1 }}
            variant="contained"
            onClick={handleOpen}
          >
            Add User
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ width: "40%", m: "auto" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "75%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box>
              <TextField
                error={failedRegister}
                margin="normal"
                required
                fullWidth
                id="user_name"
                label="User Name"
                name="user_name"
                autoComplete="Username"
                autoFocus
                onChange={(e) => {
                  setNewUser((prev) => {
                    return { ...prev, user_name: e.target.value };
                  });
                }}
              />
              <TextField
                error={failedRegister}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setNewUser((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    // postLogin();
                  }
                }}
              />
              <TextField
                error={failedRegister}
                sx={{ boxShadow: 2, m: "auto", width: "50%" }}
                variant="outlined"
                required
                id="admin"
                label="admin"
                name="admin"
                defaultValue=""
                select
                onChange={(e) => {
                  setNewUser((prev) => {
                    return { ...prev, admin: e.target.value };
                  });
                }}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </TextField>
            </Box>

            <Button
              sx={{ boxShadow: 2, width: 150, m: 1 }}
              variant="contained"
              onClick={() => {
                fillOutFields();
              }}
            >
              {" "}
              Add User{" "}
            </Button>
          </Box>
        </Modal>
      </div>

      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(e) => setPageSize(e)}
          rowsPerPageOptions={[10, 20, 50, 100]}
          // checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{
            Toolbar: GridToolbar,
          }}
        ></DataGrid>
      </Box>
    </>
  );
};

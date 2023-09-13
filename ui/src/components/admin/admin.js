import { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../VehicleContext";
import {
  Box,
  Modal,
  Button,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export const Users = () => {
  const { API, base } = useContext(VehicleContext);
  const [pageSize, setPageSize] = useState(10);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newUser, setNewUser] = useState({
    user_name: "",
    admin: false,
    password: "",
  });

  const postUser = async () => {
    try {
      const response = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.replace(/"/g, "")}`,
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (data.success) {
        setUserDetails([...userDetails, newUser]);
        Swal.fire("Success", "User added successfully!", "success");
      } else {
        console.error("Failed to add user:", data.message || "Unknown error");
        Swal.fire("Error", data.message || "Failed to add user", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Failed to add user", "error");
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    console.log("Token from local storage:", userToken);

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${userToken.replace(/"/g, "")}`,
      Base: JSON.stringify(base),
    };

    console.log("Headers for the request:", headers);

    fetch(`${API}/users`, {
      method: "GET",
      credentials: "include",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setUserDetails(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  }, [API, base, userToken]);

  const deleteUser = (id, params) => {
    const userID = params.row.admin.id;
    fetch(`${API}/users`, {
      method: "DELETE",
      body: JSON.stringify({ userID }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userToken.replace(/"/g, "")}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("Error: ", err));
    window.location.reload();
  };

  const handleDeleteUser = (params) => {
    const { id, user_name } = params.row;
    Swal.fire({
      title: `Do you want to delete ${user_name}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id, params);
        Swal.fire(`${user_name} has been deleted`, "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const columns = [
    {
      field: "Delete",
      headerName: "Delete",
      width: 60,
      renderCell: (params) => (
        <DeleteForeverIcon
          sx={{ color: "#ef5350" }}
          onClick={() => handleDeleteUser(params)}
        />
      ),
    },
    {
      field: "user_name",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "admin",
      headerName: "admin",
      width: 150,
      valueGetter: (params) => {
        return params.row.admin ? "Yes" : "No";
      },
    },
  ];

  const rows =
    userDetails?.length > 0
      ? userDetails.map((user, index) => ({
          id: index + 1,
          user_name: user.user_name,
          admin: user.admin,
        }))
      : [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Typography
          style={{
            alightContent: "center",
            fontFamily: "sans",
            fontSize: 30,
            fontWeight: "bold",
          }}
        ></Typography>
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
            sx={{
              boxShadow: 2,
              width: 150,
              mb: 0.5,
              backgroundColor: "#61C0A3",
              "&:hover": { backgroundColor: "#61C0A3", color: "black" },
            }}
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
            <TextField
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
            />
            <TextField
              select
              label="Admin"
              value={newUser.admin}
              onChange={(e) => {
                setNewUser((prev) => {
                  return { ...prev, admin: e.target.value };
                });
              }}
              helperText="Select if the user is an admin"
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" onClick={postUser}>
              Add User
            </Button>
          </Box>
        </Modal>
      </div>

      {loading ? (
        "Loading..."
      ) : userDetails && userDetails.length > 0 ? (
        <Box>
          <div style={{ height: "73vh", width: "100%" }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: "Name", sort: "asc" }],
                },
                pagination: {
                  pageSize: 100,
                },
              }}
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(e) => setPageSize(e)}
              rowsPerPageOptions={[10, 20, 50, 100]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              sx={{
                color: "black",
                "& .MuiButtonBase-root": { color: "black" },
              }}
              components={{
                sx: {
                  "& .MuiButtonBase": {
                    color: "black",
                  },
                  "& .MuiButtonBase-root": {
                    color: "black",
                  },
                  "& .MuiButton-StartIcon": {
                    color: "black",
                  },
                  "& .MuiTouchRipple": {
                    color: "black",
                  },
                },
                Toolbar: GridToolbar,
              }}
              componentsProps={{
                panel: {
                  sx: {
                    "& .MuiButton-StartIcon": {
                      color: "black",
                    },
                    "& .MuiTouchRipple": {
                      color: "black",
                    },
                    "& .MuiButton": {
                      color: "black",
                    },
                    "& .MuiButtonBase-root": {
                      color: "black",
                    },
                    "& .MuiTypography-root": {
                      color: "black",
                      fontSize: 20,
                    },
                  },
                },
              }}
            ></DataGrid>
          </div>
        </Box>
      ) : (
        "No data available."
      )}
    </>
  );
};

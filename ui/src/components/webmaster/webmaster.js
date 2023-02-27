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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Swal from "sweetalert2";
import { makeStyles } from '@material-ui/core/styles';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    color: 'black',
    backgroundColor: 'lightgray',
  },
}));

export const Webmaster = () => {
  const { API, token, base } = useContext(VehicleContext);
  const [pageSize, setPageSize] = useState(10);
  const [userDetails, setUserDetails] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const [failedRegister, setFailedRegister] = useState(false);
  const [newUser, setNewUser] = useState({
    user_name: "",
    admin: "",
    password: "",
    user_base: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen2 = () => setOpen(true);
  const handleClose2 = () => setOpen(false);

  // console.log(visitorDetails);

  useEffect(() => {
    fetch(`${API}/users`, {
      method: "GET",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
        Base: JSON.stringify(base),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserDetails(json);
      })
      .catch((err) => console.log(err));
  }, [toggle]);

  const postUser = () => {
    setFailedRegister(false);
    fetch(`${API}/register`, {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
        Base: JSON.stringify(base),
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        res.json();
        toggle ? setToggle(false) : setToggle(true);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    handleClose();
  };

  const deleteUser = (id) => {
    setFailedRegister(false);
    console.log(id);
    fetch(`${API}/users`, {
      method: "DELETE",
      // credentials: "include",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        res.json();
        toggle ? setToggle(false) : setToggle(true);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "Delete",
      headerName: "Delete",
      width: 60,
      renderCell: (params) => (
        <DeleteForeverIcon
          sx={{ color: "#ef5350" }}
          onClick={() => {
            Swal.fire({
              title: `Do you want to delete ${params.row.user_name}?`,
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Delete",
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                deleteUser(params.row.uuid);
                Swal.fire(
                  `${params.row.user_name} has been deleted`,
                  "",
                  "success"
                );
              } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
            });
          }}
        />
      ),
    },
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
    {
      field: "base",
      headerName: "Base",
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
      uuid: user.id,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Typography
          style={{ alightContent: "center", fontFamily: "sans", fontSize: 30 }}
        >
          {" "}
          Users{" "}
        </Typography>
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
                id="base"
                label="Installation"
                name="base"
                defaultValue=""
                select
                onChange={(e) => {
                  setNewUser((prev) => {
                    return { ...prev, admin: e.target.value };
                  });
                }}
              >
                <MenuItem value={"Patrick"}> Patrick SFB</MenuItem>
                <MenuItem value={"Cape"}> Cape Canveral SFB </MenuItem>
              </TextField>

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

      <Box>
        <div style={{ height: "73vh", width: "100%" }}>
          <DataGrid
            toolBarStyles={classes.toolbar}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(e) => setPageSize(e)}
            rowsPerPageOptions={[10, 20, 50, 100]}
            // checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{ color: 'black', '& .MuiButtonBase-root': {color: 'black'}}}
            components={{
              
                sx: {
                  "& .MuiButtonBase": {
                    color: "black",
                  },
                  "& .MuiButtonBase-root": {
                    color: "black",
                  },
                  "& .MuiTypography-root": {
                    color: "black",
                  },
                  "& .MuiButton-StartIcon": {
                    color: "black",
                  },
                  "& .MuiButtonBase-root": {
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
                  "& .MuiDataGrid-filterForm": {
                    color: "#61C0A3",
                    // bgcolor: "#61C0A3",
                  },
                  "& .MuiDataGrid-filterFormContainer": {
                    color: "black",
                    // bgcolor: "#61C0A3",
                  },
                },
              },
            }}
          ></DataGrid>
        </div>
      </Box>
    </>
  );
};

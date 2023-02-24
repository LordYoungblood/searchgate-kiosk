import React, { useRef, useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material/";
import { useReactToPrint } from "react-to-print";
import { VehicleContext } from "../VehicleContext";
import flash from "../image/flash.png";
import patch from "../image/patch.png";
// import swal from "sweetalert";
import Swal from "sweetalert2";

// const tabStyle = {
//   height: 500,
//   maxHeight: 300,
//   overflow: "scroll",
// };

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "75%",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const printStyle = {
//   position: "absolute",
//   top: "10px",
//   bottom: "10px",
//   left: "10px",
//   right: "10px",
// };

export default function PrintModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { token, API } = React.useContext(VehicleContext);

  const componentRef = useRef();
  const vehicle = props.element.vehicle;
  const setFailedRegister = props.element.setFailedRegister;
  const reload = props.element.reload;

  // ------------------ PRINTING ----------------- //
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => reload(),
  });

  // ------------------ POST USER/VEHICLE INFO INTO DB ----------------- //
  const postUser = () => {
    setFailedRegister(false);
    fetch(API, {
      method: "POST",
      // credentials: "include",
      body: JSON.stringify(vehicle),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error: ", err);
      });
    handleClose();
  };

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{ overflow: "hidden", m: 2, mb: 4, justifyContent: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            style={{ width: "20%", margin: 2 }}
            src={flash}
            alt="Security Forces Logo"
          />
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography>
              <b>45 SFS Vehicle Pass</b>
            </Typography>

            <Typography sx={{ ml: 1.5 }}>
              <b>{vehicle.date}</b>
            </Typography>
          </Typography>

          <img
            style={{ width: "15%", margin: 1 }}
            src={patch}
            alt="Security Forces Logo"
          />
        </Box>
        <Box
          className="printElement1"
          sx={{ display: "flex", flexDirection: "column", rowGap: 1.5, mt: 4 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1.5 }}>
            <Typography>
              {" "}
              <b>First Name:</b> {vehicle.first_name}
            </Typography>
            <Typography>
              {/* {" "} */}
              <b>Last Name:</b> {vehicle.last_name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>
              {" "}
              <b>Drivers License:</b> {vehicle.state} {vehicle.drivers_license}
            </Typography>
          </Box>
          <Box
            className="printElement1"
            sx={{ display: "flex", flexDirection: "column", rowGap: 1.5 }}
          >
            <Typography>
              {" "}
              <b>Vehicle Plate:</b> {vehicle.plate}
            </Typography>
            <Typography>
              {" "}
              <b>Make:</b> {vehicle.make}
            </Typography>
            <Typography>
              {" "}
              <b>Model:</b> {vehicle.model}
            </Typography>
          </Box>

          <Typography
            sx={{
              mt: 25,
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexWrap: true,
            }}
          >
            {" "}
            Ensure Pass Is Kept In Vehicle At All Times{" "}
          </Typography>
        </Box>
      </Box>
    );
  });

  const printAndClose = async () => {
    postUser();
    handleClose();
    handlePrint();
  };

  const fillOutFields = () => {
    if (
      vehicle.first_name === "" ||
      vehicle.last_name === "" ||
      vehicle.plate === "" ||
      vehicle.drivers_license === "" ||
      vehicle.state === "" ||
      vehicle.make === "" ||
      vehicle.model === ""
    ) {
      setFailedRegister(true);
      // This is SweetAlert2 Code Easter Egg
      // Swal.fire({
      //   title: 'Custom width, padding, color, background.',
      //   width: 600,
      //   padding: '3em',
      //   color: '#6EF57B',
      //   background: '#fff url("https://img.freepik.com/free-vector/green-cannabis-leaves-hand-drawn-cartoon-illustration_56104-1867.jpg?w=360")',
      //   backdrop: `
      //   rgba(0,0,123,0.4)
      //     url("https://i.gifer.com/X11G.gif")
      //     left top
      //     no-repeat
      //   `
      // })
      // swal({
      //   title: "All Fields are required to be filled!",
      //   text: "If you are experiencing please locate a Security Forces Member ",
      //   icon: "error",
      //   button: "Continue",
      //   timer: 5000,
      // });
      Swal.fire({
        title: "All Fields Are Required To Be Completed!",
        text: "If you are experiencing issues please locate a Security Forces Member ",
        icon: "error",
        button: "Continue",
        showConfirmButton: false,
        timer: 7000,
      });
      return;
    }
    handleOpen();
  };

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          sx={{ boxShadow: 2, width: 150, m: 1, backgroundColor: '#61C0A3', '&:hover': { backgroundColor: '#61C0A3', color: 'black'} }}
          variant="contained"
          onClick={() => {
            fillOutFields();
          }}
        >
          Verify & Print
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Verify All Information Is Correct
            </Typography>
          </Box>

          <ComponentToPrint ref={componentRef} />
          {/* <Button onClick={handlePrint}>Print this out!</Button> */}
          <Button
            sx={{ boxShadow: 2, width: 150, m: 1 }}
            variant="contained"
            onClick={() => {
              // postUser();
              // handlePrint();
              // reload();
              printAndClose();
            }}
          >
            {" "}
            Print Pass{" "}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

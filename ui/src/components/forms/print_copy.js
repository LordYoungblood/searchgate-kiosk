import React, { useRef, useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material/";
import { useReactToPrint } from "react-to-print";
import { VehicleContext } from "../VehicleContext";
import flash from "../image/flash.png";
import patch from "../image/patch.png";
import Swal from "sweetalert2";

export default function PrintModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { token, API, base } = React.useContext(VehicleContext);
  const userToken = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  const componentRef = useRef();
  const vehicle = props.element.vehicle;
  const setFailedRegister = props.element.setFailedRegister;
  const reload = props.element.reload;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => reload(),
  });

  const postVehicle = () => {
    setFailedRegister(false);

    if (!vehicle.make) vehicle.make = "N/A";
    if (!vehicle.model) vehicle.model = "N/A";
    if (!vehicle.drivers_license) vehicle.drivers_license = "N/A";

    fetch(API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userToken}`,
        Base: JSON.stringify(base),
      },
      body: JSON.stringify(vehicle),
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
          <Box
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
          </Box>
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
              <b>First Name:</b> {vehicle.first_name}
            </Typography>
            <Typography>
              <b>Last Name:</b> {vehicle.last_name}
            </Typography>
          </Box>
          <Box
            className="printElement1"
            sx={{ display: "flex", flexDirection: "column", rowGap: 1.5 }}
          >
            <Typography>
              <b>Vehicle Plate:</b> {vehicle.plate}
            </Typography>
            {/* <Typography>
              <b>Delivery Location:</b> {vehicle.delivery_location}
            </Typography> */}
          </Box>
          {/* <Box sx={{ mt: 6 }}>
            <hr />
            <Typography sx={{ textAlign: "center", mt: 1 }}>
              Security Forces Member Signature
            </Typography>
          </Box> */}
          <Typography
            sx={{
              mt: 25,
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexWrap: true,
            }}
          >
            Ensure Pass Is Kept In Vehicle At All Times
          </Typography>
        </Box>
      </Box>
    );
  });

  const printAndClose = async () => {
    postVehicle();
    handleClose();
    handlePrint();
  };

  const fillOutFields = () => {
    if (
      vehicle.first_name === "" ||
      vehicle.last_name === "" ||
      vehicle.plate === "" ||
      vehicle.state === ""
      // vehicle.delivery_location === ""
    ) {
      setFailedRegister(true);
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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 50,
        }}
      >
        <Button
          sx={{
            boxShadow: 2,
            width: 150,
            m: 1,
            backgroundColor: "#61C0A3",
            "&:hover": { backgroundColor: "#61C0A3", color: "black" },
          }}
          variant="contained"
          onClick={() => {
            fillOutFields();
          }}
        >
          Verify & Print / Verificar y Imprimir
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
          <Button
            sx={{ boxShadow: 2, width: 150, m: 1 }}
            variant="contained"
            onClick={() => {
              printAndClose();
            }}
          >
            Print Pass / Imprimir Pass
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

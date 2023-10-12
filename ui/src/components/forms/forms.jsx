import React, { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../VehicleContext";
import {
  Autocomplete,
  Box,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import PrintModal from "./print_copy";
import translate from "translate-google-api";

export const Forms = () => {
  const date = new Date();
  const today =
    date.toISOString().slice(0, 10) + " " + date.toTimeString().slice(0, 5);

  const [failedRegister, setFailedRegister] = useState(false);
  const { cookies, base, token } = useContext(VehicleContext);
  const [baseName, setBaseName] = useState("");
  const [language, setLanguage] = useState("en"); // 'en' for English, 'es' for Spanish
  const [personalInfoTitle, setPersonalInfoTitle] = useState(
    "Personal Information"
  );

  useEffect(() => {
    const storedValue = localStorage.getItem("base");
    const containsPatrick = storedValue.includes("patrick_sfb");
    setBaseName(containsPatrick ? "Patrick SFB" : "NOTHING");
  }, []);

  useEffect(() => {
    const translateText = async (text) => {
      try {
        const translatedText = await translate(text, { to: language });
        return translatedText;
      } catch (error) {
        console.error("Error translating text:", error);
        return text; // Return original text if translation fails
      }
    };

    const fetchTranslation = async () => {
      const translatedTitle = await translateText("Personal Information");
      setPersonalInfoTitle(translatedTitle);
    };

    fetchTranslation();
  }, [language]);

  const [vehicle, setVehicle] = useState({
    first_name: "",
    last_name: "",
    plate: "",
    drivers_license: "",
    state: "",
    make: "",
    model: "",
    date: today,
    delivery_location: "",
  });

  const reload = () => {
    window.location.reload();
  };

  const deliveryLocations = [{ title: "Space X" }, { title: "Blue Origin" }];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Typography
          style={{
            alightContent: "center",
            fontFamily: "sans",
            fontSize: 20,
            mt: 1,
          }}
        >
          {baseName} Search Gate
        </Typography>
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <button onClick={() => setLanguage("en")}>English</button>
        <button onClick={() => setLanguage("es")}>Spanish</button>
      </Box> */}
      <Box
        sx={{
          display: "grid",
          boxShadow: 3,
          gap: 1,
          height: "70vh",
        }}
      >
        <Container className="Pass">
          <form
            noValidate
            autoComplete="off"
            sx={{
              display: "grid",
              boxShadow: 3,
              gap: 1,
              m: 1,
            }}
          >
            {/* <div>
              <button onClick={() => setLanguage("en")}>English</button>
              <button onClick={() => setLanguage("es")}>Spanish</button>
            </div> */}
            <Typography
              sx={{ fontFamily: "sans", fontSize: 25, fontWeight: "bold" }}
            >
              Personal Information / Informacion Personal
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                required
                onChange={(e) =>
                  setVehicle((prev) => {
                    return { ...prev, first_name: e.target.value };
                  })
                }
                fullWidth
                id="firstName"
                label="First Name / Primer Nombre"
                name="firstName"
                autoComplete="firstName"
                error={failedRegister}
                sx={{ boxShadow: 2, m: 1 }}
              />
              <TextField
                onChange={(e) =>
                  setVehicle((prev) => {
                    return { ...prev, last_name: e.target.value };
                  })
                }
                fullWidth
                required
                id="lastName"
                label="Last Name / Apellido"
                name="lastName"
                autoComplete="lastName"
                error={failedRegister}
                sx={{ boxShadow: 2, m: 1 }}
              />
            </Box>

            <Typography
              sx={{ fontFamily: "sans", fontSize: 25, fontWeight: "bold" }}
            >
              Vehicle Information / Informacion del vehiculo
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                error={failedRegister}
                onChange={(e) =>
                  setVehicle((prev) => {
                    return { ...prev, plate: e.target.value };
                  })
                }
                required
                id="plate"
                label="Plate Number / Numero de placa"
                name="Plate Number"
                sx={{ boxShadow: 2, m: 1, width: "100%" }}
              />
            </Box>
            <Box sx={{ displayFlex: "flex", flexDirection: "row" }}>
              <TextField
                error={failedRegister}
                sx={{ boxShadow: 2, m: 1, width: "17%" }}
                variant="outlined"
                required
                id="state"
                label="State / Estado"
                name="state"
                defaultValue=""
                select
                onChange={(e) => {
                  setVehicle((prev) => {
                    return { ...prev, state: e.target.value };
                  });
                }}
              >
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
                <MenuItem value="AR">Arkansas</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="CO">Colorado</MenuItem>
                <MenuItem value="CT">Connecticut</MenuItem>
                <MenuItem value="DE">Delaware</MenuItem>
                <MenuItem value="DC">District of Columbia</MenuItem>
                <MenuItem value="FL">Florida</MenuItem>
                <MenuItem value="GA">Georgia</MenuItem>
                <MenuItem value="GU">Guam</MenuItem>
                <MenuItem value="HI">Hawaii</MenuItem>
                <MenuItem value="ID">Idaho</MenuItem>
                <MenuItem value="IL">Illinois</MenuItem>
                <MenuItem value="IN">Indiana</MenuItem>
                <MenuItem value="IA">Iowa</MenuItem>
                <MenuItem value="KS">Kansas</MenuItem>
                <MenuItem value="KY">Kentucky</MenuItem>
                <MenuItem value="LA">Louisiana</MenuItem>
                <MenuItem value="ME">Maine</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
                <MenuItem value="MI">Michigan</MenuItem>
                <MenuItem value="MN">Minnesota</MenuItem>
                <MenuItem value="MS">Mississippi</MenuItem>
                <MenuItem value="MO">Missouri</MenuItem>
                <MenuItem value="MT">Montana</MenuItem>
                <MenuItem value="NE">Nebraska</MenuItem>
                <MenuItem value="NV">Nevada</MenuItem>
                <MenuItem value="NH">New Hampshire</MenuItem>
                <MenuItem value="NJ">New Jersey</MenuItem>
                <MenuItem value="NM">New Mexico</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="NC">North Carolina</MenuItem>
                <MenuItem value="ND">North Dakota</MenuItem>
                <MenuItem value="OH">Ohio</MenuItem>
                <MenuItem value="OK">Oklahoma</MenuItem>
                <MenuItem value="OR">Oregon</MenuItem>
                <MenuItem value="PA">Pennsylvania</MenuItem>
                <MenuItem value="PR">Puerto Rico</MenuItem>
                <MenuItem value="RI">Rhode Island</MenuItem>
                <MenuItem value="SC">South Carolina</MenuItem>
                <MenuItem value="SD">South Dakota</MenuItem>
                <MenuItem value="TN">Tennessee</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
                <MenuItem value="UT">Utah</MenuItem>
                <MenuItem value="VT">Vermont</MenuItem>
                <MenuItem value="VA">Virginia</MenuItem>
                <MenuItem value="WA">Washington</MenuItem>
                <MenuItem value="WV">West Virginia</MenuItem>
                <MenuItem value="WI">Wisconsin</MenuItem>
                <MenuItem value="WY">Wyoming</MenuItem>
                <MenuItem value="AA">Armed Forces Americas</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Box>
            {/* <Autocomplete
              id="delivery-location-combo-box"
              options={deliveryLocations}
              getOptionLabel={(option) => option.title}
              fullWidth
              sx={{ boxShadow: 2, m: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={failedRegister}
                  label="Delivery Location"
                  required
                  onChange={(e) =>
                    setVehicle((prev) => {
                      return { ...prev, delivery_location: e.target.value };
                    })
                  }
                />
              )}
              onInputChange={(event, newValue) => {
                setVehicle((prev) => {
                  return { ...prev, delivery_location: newValue };
                });
              }}
            /> */}
          </form>
        </Container>
        <PrintModal element={{ vehicle, setFailedRegister, reload }} />
      </Box>
    </div>
  );
};

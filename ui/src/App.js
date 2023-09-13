import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/login";
import { Forms } from "./components/forms/forms";
import { Navbar } from "./components/navbar";
import { Data } from "./components/data/data";
import { History } from "./components/history/history";
import { Webmaster } from "./components/webmaster/webmaster";
import { VehicleContext } from "./components/VehicleContext";
import { useCookies } from "react-cookie";
import { Users } from "./components/admin/admin";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LoadingProvider } from "./components/contexts/LoadingContext";

export const App = () => {
  const [base, setBase] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["au", "base", "ver"]);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [flag, setFlag] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [visitorDetails, setVisitorDetails] = useState([]);

  const userDomain =
    "http://kioskapp-env.eba-umdxbzym.us-gov-west-1.elasticbeanstalk.com";
  // const API = "http://localhost:8080/api";

  const API =
    "http://kioskapi3-env.eba-mxp73pfs.us-gov-west-1.elasticbeanstalk.com/api";

  const userRights = localStorage.getItem("user_rights");
  const userToken = localStorage.getItem("token");
  const userTokenn = localStorage.getItem("token")
    ? localStorage.getItem("token").replace(/^"(.*)"$/, "$1")
    : null;

  const getBaseName = () => {
    const baseSetter = { name: "patrick_sfb" };
    return baseSetter.name;
  };

  const baseName = getBaseName();

  useMemo(() => {
    setBase(baseName);
    setUser(userRights);
    setToken(userToken);
  }, [baseName, userRights, userToken]);

  useEffect(() => {
    fetch(API, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userTokenn}`,
        Base: JSON.stringify(base),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setVisitorDetails(json);
        setFlag(false);
      })
      .catch((err) => console.log(err));
  }, [token, flag, base, userTokenn]);

  const obj = {
    visitorDetails,
    setVisitorDetails,
    API,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    setToken,
    setBase,
    base,
    token,
    cookies,
    setCookie,
    removeCookie,
    userDomain,
    setFlag,
    userRights,
  };

  if (!user) {
    return (
      <VehicleContext.Provider value={obj}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </VehicleContext.Provider>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VehicleContext.Provider value={obj}>
        <LoadingProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/forms" element={<Forms />} />
              <Route path="/data" element={<Data />} />
              <Route path="/History" element={<History />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<Login />} />
              <Route path="/webmaster" element={<Webmaster />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </VehicleContext.Provider>
    </LocalizationProvider>
  );
};

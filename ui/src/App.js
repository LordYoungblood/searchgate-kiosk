import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Login } from "./components/login/login";
import { Forms } from "./components/forms/forms";
import { Navbar } from "./components/navbar";
import { Data } from "./components/data/data";
import { History } from "./components/history/history";
import { Webmaster } from "./components/webmaster/webmaster";
import { VehicleContext } from "./components/VehicleContext";
import { useCookies } from "react-cookie";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Users } from "./components/admin/admin";
import DateFnsUtils from "@date-io/date-fns";
import { af } from "date-fns/esm/locale";

export const App = () => {
  const [visitorDetails, setVisitorDetails] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["au", "base", "ver"]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [flag, setFlag] = useState(false);
  const [token, setToken] = useState(null);
  const [base, setBase] = useState(null);

  const userDomain = "localhost";
  // const userDomain =
  // "vehiclegatekioskui2-env.eba-vgfrxrgp.us-gov-west-1.elasticbeanstalk.com";
  // "http://vehiclegatekioskui2-env.eba-vgfrxrgp.us-gov-west-1.elasticbeanstalk.com";

  const API = "http://localhost:8080/api";
  // const API =
    // "http://vehiclegatekioskserver576-env.eba-rejckfyi.us-gov-west-1.elasticbeanstalk.com/api";

  useMemo(() => {
    if (cookies.au && cookies.ver && cookies.base) {
      setBase(cookies.base);
      setUser(cookies.au);
      setToken(cookies.ver);
    }
    
  }, [flag]);

  // ----------------- fetch for all Vehicle information -------------------------//

  useEffect(() => {
    fetch(API, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
        Base: JSON.stringify(base),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setVisitorDetails(json);
        setFlag(false);
      })
      .catch((err) => console.log(err));
  }, [token, flag]);

  // ----------- Context object to be passed to all components ------------------//
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
  };

  // ----------------- verification routes for login ----------------------------//
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
    <VehicleContext.Provider value={obj}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Navbar />
          {user === "2055" && (
            <Routes>
              <Route path="/forms" element={<Forms />} />
              <Route path="/" element={<Login />} />
              <Route path="/data" element={<Data />} />
              <Route path="/History" element={<History />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<Forms />} />
              <Route path="/webmaster" element={<Webmaster />} />
            </Routes>
          )}
          {user === "7050" && (
            <Routes>
              <Route path="/forms" element={<Forms />} />
              <Route path="/" element={<Login />} />
              <Route path="/data" element={<Data />} />
              <Route path="/History" element={<History />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<Forms />} />
              <Route path="/webmaster" element={<Webmaster />} />
            </Routes>
          )}
          {user === "5050" && (
            <Routes>
              <Route path="/forms" element={<Forms />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Forms />} />
            </Routes>
          )}
        </Router>
      </MuiPickersUtilsProvider>
    </VehicleContext.Provider>
  );
};

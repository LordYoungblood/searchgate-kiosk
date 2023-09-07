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

export const App = () => {
  const [base, setBase] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["au", "base", "ver"]);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [flag, setFlag] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ visitorDetails, setVisitorDetails] = useState([]);
  
  // const userDomain = "localhost";
  const userDomain =
  "http://kioskapp-env.eba-umdxbzym.us-gov-west-1.elasticbeanstalk.com"
  
 
  const API = "http://localhost:8080/api";
  // const API =
  //   "http://kioskapi3-env.eba-mxp73pfs.us-gov-west-1.elasticbeanstalk.com/api";

    // const [baseName, setBaseName] = useState('');

    // useEffect(() => {
    //   const storedValue = localStorage.getItem('base')
    //     const containsPatrick = storedValue.includes('patrick_sfb');
    //     setBaseName (containsPatrick ? 'Patrick SFB' : 'NOTHING')
    // }, [])

    const userRights = localStorage.getItem('user_rights');//sets variable for admin level 
    const userToken = localStorage.getItem('token');//sets variable for token




//write me a function that sets usertokenn if localStorage.getItem('token') is not null
const userTokenn = localStorage.getItem('token') ? localStorage.getItem('token').replace(/^"(.*)"$/, '$1') : null

    // const userTokenn = localStorage.getItem('token').replace(/^"(.*)"$/, '$1') 
    

    


    //function that maps localStorage.getItem('base') to the name in the object
    const baseSetter = localStorage.getItem('base')
    
    //set base to the name in the baseSetter object
  
    const getBaseName = () => {
      const baseSetter = {"name": "patrick_sfb"};
      return baseSetter.name;
    };
    
    const baseName = getBaseName();
    
  
  useMemo(() => {
      setBase(baseName);
      setUser(userRights);
      setToken(userToken);
  }, [flag]);






  // useMemo(() => {
  //   if (localStorage) {
  //     const user = JSON.parse(`${localStorage.au}`);
  //     const token = JSON.parse(`${localStorage.ver}`);
  //     setUser(user);
  //     setToken(token);
  //   }
  // }, [flag]);

  // console.log("flag from app.js", flag)
  // console.log("cookies from app.js", cookies)
  // console.log("token from login", token)

  // ----------------- fetch for all Vehicle information -------------------------//

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
    userRights
  };

  // console.log('token from app.js', token)
  // console.log('obj from app.js', obj)

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VehicleContext.Provider value={obj}>
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
      </VehicleContext.Provider>
    </LocalizationProvider>
  );
};

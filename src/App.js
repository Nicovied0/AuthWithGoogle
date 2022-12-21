import "./App.css";
import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

// let secretoDelCliente = "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 "
function App() {
  const [profile, setProfile] = useState();

  const clientId =
    "76949937496-7dsm07t23ccn8bpba5udrmii6oc8f8mt.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log(res);
    console.log(res.profileObj);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };
  const logOut = () => {
    setProfile(null);
  };

  return (
    <div className="App">
      <h2 className="h2">Login With Google & React</h2>
      {console.log(profile?.name, "soy progile")}
      {profile && profile !== null && profile !== [] ? (
        <div>
          <img src={profile?.imageUrl} alt="user" className="imgLogin" />
          <div className="div_p">
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
          </div>
          <GoogleLogout
            clientId={clientId}
            buttonText="Cerrar sesión"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Iniciar sesión con Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
}

export default App;

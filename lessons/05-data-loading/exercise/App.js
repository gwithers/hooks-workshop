import React, { useState, useEffect } from 'react'

import { onAuthStateChanged } from 'app/utils'
import LoggedIn from 'app/LoggedIn'
import LoggedOut from 'app/LoggedOut'

export default function App() {
  const [auth, setAuth] = useState(null);
  const [authAttempted, setAuthAttempted] = useState(false);

  useEffect(() => {
    console.log('checking authentication');
    let cleanup = onAuthStateChanged(auth => {
      setAuthAttempted(true);
      setAuth(auth);
    });
    return cleanup;
  }, []);

  if (!authAttempted) {
    return <p><b>Authenticating</b> (after a <i>fashion</i>)...</p>
  }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}

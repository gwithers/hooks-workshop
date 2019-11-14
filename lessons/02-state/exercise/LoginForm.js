import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function login(event) {
    event.preventDefault();
    console.log("Login in progress..");

    let [emailNode, passwordNode] = event.target.elements;
    let email = emailNode.value;
    let password = passwordNode.value;

    setLoading(true);
    login(email, password).then(
      () => {
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        setError(err.message);
      })
  }

  // Was:
  // function handleShowPassword() {
  //   const newState = !showPassword;
  //   console.log('changing show password from ' + showPassword + ' to ' + newState);
  //   setShowPassword(newState);
  //   return newState;
  // }
  // Now much shorter so define constant function
  const handleShowPassword = () => setShowPassword(!showPassword)

  // submit handler
  const handleSubmit = event => {
    console.log(event);
    //event.preventDefault()
    setLoading(true)
    const [emailNode, passwordNode] = event.target.elements;
    login(emailNode.value, passwordNode.value).catch(error => {
      console.log(error.message)
      setLoading(false)
      setError(error)
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={showPassword}
            onClick={handleShowPassword}
            onChange={ evt => { console.log(evt); }}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>Login</span>
      </TabsButton>
    </form>
  )
}

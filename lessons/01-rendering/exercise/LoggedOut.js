import React from "react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"
// import LoggedOut from "./LoggedOut.final"
// export default LoggedOut

export default function LoggedOut() {
  return (
      <div className="LoggedOut">
        <About/>
        <Tabs>
          <TabList>
            <Tab>Sign up now, my friend!</Tab>
            <Tab>Log in now, you bastard!</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><SignupForm/></TabPanel>
            <TabPanel><LoginForm/></TabPanel>
          </TabPanels>
        </Tabs>
      </div>
  );
}

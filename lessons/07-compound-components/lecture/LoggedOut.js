import React, { useState, useContext, createContext, Children } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

function Tabs({ data, disabled }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div data-reach-tabs>
      <div data-reach-tab-list>
        {data.map((tab, index) => {
          const isActive = index === activeIndex
          const isDisabled = disabled.includes(index)
          return (
            <div
              data-reach-tab
              key={index}
              className={isDisabled ? "disabled": isActive ? "active" : ""}
              onClick={() => {
                if (!isDisabled) {
                  setActiveIndex(index)
                }
              }}
            >
              {tab.label}
            </div>
          )
        })}
      </div>
      <div data-reach-tab-panels>{data[activeIndex].content}</div>
    </div>
  )
}

export default function LoggedOut() {
  const tabData = [
    {
      label: "Login",
      content: <LoginForm />
    },
    {
      label: "Signup",
      content: <SignupForm />
    }
  ]

  return (
    <div className="LoggedOut">
      <About />
      <Tabs data={tabData} disabled={[]}/>
    </div>
  )
}

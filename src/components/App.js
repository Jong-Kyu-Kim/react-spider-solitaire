import React from 'react'
import {HeaderContainer, StockContainer, SetsContainer, FieldContainer, FooterContainer} from 'containers'
import 'styles/App.sass'

const App = () => {
  return (
    <div className="app">
      <HeaderContainer />
      <div id="container">
        <div className="cards">
          <StockContainer />
          <SetsContainer />
        </div>
        <FieldContainer />
      </div>
      <FooterContainer />
    </div>
  )
}

export default App

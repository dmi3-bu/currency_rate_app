import React from 'react'

const Layout = ({ children }) => (
  <div className="container">
    <div className="row">
      <div className='col-sm'>
       { children }
      </div>
    </div>
  </div>
)

export default Layout

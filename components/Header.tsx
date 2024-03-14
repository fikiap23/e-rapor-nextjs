import React from 'react'

const Header = () => {
  return (
    <header className="main-header">
      <a href="#" className="logo">
        <span className="logo-mini">
          <b>E</b>-R
        </span>
        <span className="logo-lg">
          <b>E</b>-Rapor
        </span>
      </a>
      <nav className="navbar navbar-static-top">
        <a
          href="#"
          className="sidebar-toggle"
          data-toggle="push-menu"
          role="button"
        >
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img
                  src="https://picsum.photos/200"
                  className="user-image"
                  alt="User Image"
                />
                <span className="hidden-xs">User Role</span>
              </a>
              <ul className="dropdown-menu">
                <li className="user-header">
                  <img
                    src="https://picsum.photos/200/300"
                    className="img-circle"
                    alt="User Image"
                  />
                  <p>Username: User Name</p>
                </li>
                <li className="user-footer">
                  <div className="pull-right">
                    <a href="/logout" className="btn btn-default btn-flat">
                      Sign Out
                    </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header

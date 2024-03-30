'use client'
import useAuth from '@/hooks/useAuth'
import React, { useState } from 'react'

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { removeToken } = useAuth()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    removeToken()
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.reload()
  }

  return (
    <header className="main-header">
      <a href="/" className="logo">
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
          onClick={toggleSidebar}
          data-toggle="push-menu"
          role="button"
        >
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li
              className={`dropdown user user-menu ${
                isDropdownOpen ? 'open' : ''
              }`}
            >
              <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
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
                    <button
                      className="btn btn-default btn-flat"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
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

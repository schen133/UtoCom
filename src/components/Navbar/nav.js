// import { DeferredData } from '@remix-run/router/dist/utils';
import React from 'react';
import { useState } from 'react';
import './static/navStyle.css';

export default function Navbar({signedIn, fixed }) {
  
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              Welcome to RocCommunity
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div id = "buttonContainer">
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/"
                >
                  <i className="fa-solid fa-house text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/events"
                >
                  <i className="fa-solid fa-calendar text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Events</span>
                </a>
              </li>
              {signedIn ? (
                <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/profile"
                >
                  <i className="fa-solid fa-user text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Profile</span>
                </a>
              </li>

              ) : (
                <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/signin"
                >
                  <i className="fa-solid fa-right-to-bracket text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Login</span>
                </a>
              </li>

              )}
              
            </ul>
          </div>
          </div>
        </div>
      </nav>
    </>
  );

 
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export const Layout = (props) => {
  return (
    <div>
        <Sidebar/>
        {props.children}
        <div>
          <Outlet/>
        </div>
    </div>
  )
}

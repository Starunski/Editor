import React from 'react';
//@ts-ignore
import logo from '../assets/logo.png'

interface Props {
  icon?: any;
  title?: string;
  subtitle?: string;
}

const IconComponent = ({icon, title = "title", subtitle = "subtitle"}: Props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', border: '1px solid black', width: '100px', height: '100px'}}>
      <img src={logo} alt="Logo"/>
      <div>{title}</div>
      <div>{subtitle}</div>

    </div>
  );
};

export default IconComponent;

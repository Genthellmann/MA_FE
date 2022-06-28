import {fontsize} from "jodit/types/styles/icons";

export const ToolbarItem = {
  width: '28px',
  height: '27px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '5px',
  boxShadow: '0px 1px 11px 1px rgba(15, 15, 15, 0.2)',
  backgroundColor: '#34495e',
  color: '#fff',
  fontSize: '16px',
  fontFamily: 'Oxygen, sans-serif',
  transition: 'all 250ms ease-in-out',
  cursor: 'pointer',
  // ${props =>
  //   props.isActive &&
  //   `    transform: translateY(1px);
  //   color: #34495e;
  //   background-color: transparent;
  //   box-shadow: none;
  //   border: 1px solid #34495e;`}
  "&:hover":{
    transform: 'translateY(1px)',
    color: '#34495e',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: '1px solid #34495e',
  },
}

export const Container = {
  display: 'flex',
  marginRight: '7px',
}
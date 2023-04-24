import React from 'react';
import '../css/components/loadIcon.css';

export function LoadIcon() {

  return <button className='logingButtom' onClick={() => {setSendingLog(true)}}>
    <div className='iconCont'>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </button>
}
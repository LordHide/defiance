import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import {Text} from 'react-konva';

export function StatText({stat, positions}){
  return <Text 
  text={stat.max}
  x= {stat.max.toString().length === 1 ? positions.componentX - (positions.contentWidth)/3.7 : positions.componentX - (positions.contentWidth)/1.7 }
  y= {(positions.componentY + (window.innerWidth*0.00396))}
  fontSize={positions.contentWidth}
  fill={'#fff'}
/>;
}
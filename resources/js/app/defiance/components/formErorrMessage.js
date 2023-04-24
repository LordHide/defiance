import React from 'react';

export function FormErorrMessage({error}) {
  let id = 0;
  return <>
  { error.map(
    (message) => {
      id++;
      return <span title={`${message}`} key={`Message${id}`}>{message}</span>
    }
  ) }
  </>;
}
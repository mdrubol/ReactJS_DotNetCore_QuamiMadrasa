import React from 'react';

export default function Icon(props:{name:string}) {
    let iconClasssName = `bi ${props.name}`;
    return (
        <>
          <i className={iconClasssName}></i>  
        </>
    );
}
import React from 'react';

function Cities(props) {

    // const cities = ['Canberra', 'Dublin', 'Jakarta', 'Kyiv', 'Monaco', 'Moscow', 'Paris', 'Riga', 'Tallinn', 'Tokyo', 'Warsaw', 'Washington', 'Zagreb'];

    return (
        <ul>
            {props.cities.map(item => (
                <button 
                    key={item} 
                    onClick={() => props.onClick(item)}>
                    {item}
                </button>)
            )}
        </ul>
    )
}

export default Cities;
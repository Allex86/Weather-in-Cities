import React from 'react';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

function Cities(props) {

    // const cities = ['Canberra', 'Dublin', 'Jakarta', 'Kyiv', 'Monaco', 'Moscow', 'Paris', 'Riga', 'Tallinn', 'Tokyo', 'Warsaw', 'Washington', 'Zagreb'];

    return (
        <ButtonToolbar className="justify-content-center" aria-label="Toolbar with button">
            {props.cities.map((item, idx) => (
                <Button 
                    className="m-1"
                    variant="secondary"
                    key={idx}
                    onClick={() => props.onClick(item)}
                >{item}</Button>
            ))}
        </ButtonToolbar>
    )
}

export default Cities;
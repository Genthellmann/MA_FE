import React, {useState} from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';


import 'react-bootstrap-typeahead/css/Typeahead.css';

const Autocomplete = () => {
    const [selected, setSelected] = useState([]);
    const options = ["Alabama", "Mississippi", "Chicago", "Bronx"]

    return (
        <Typeahead
            id="basic-example"
            onChange={setSelected}
            options={options}
            placeholder="Choose a state..."
            selected={selected}
        />
    );
};

export default Autocomplete;
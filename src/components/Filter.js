import React, {useState} from 'react';
import {DropdownButton, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Filter({filter, setFilter}) {
    const category = ["user","technology","menv"];
    const initCategories = {user:"", technology:"", menv:""};
    const [categories, setCategories] = useState(initCategories);

    const handleCategoryChange = event => {
        const {name, value} = event.target;
        if(categories[name] === initCategories[name]){
            setCategories({...categories, [name]:value});
        } else (categories[name] = "")
        console.log(categories)
    }

    const handleSubmit = event => {
        console.log("submit")
        console.log(categories)
    }

    return (
        <div>
        <DropdownButton id="dropdown-basic-button" title="Filter">
            <Form>

                {category.map((category) =>(
                    <div key={`category-${category}`} className="mb-3">
                        <Form.Check className="messageCheckbox"
                            type='checkbox'
                            id={`category-${category}`}
                            name={category}
                            label={category}
                            value={category}

                            onChange={handleCategoryChange}
                            />
                    </div>
                    ))}
            </Form>
            <Button onClick={handleSubmit}>Submit</Button>
        </DropdownButton>
        </div>
    );
}

export default Filter;
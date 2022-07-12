import React, {useState} from 'react';
import {DropdownButton, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Filter({filterMask, setFilterMask}) {

    // const initFilterMask = {
    //     category: ["user", "technology", "menv"],
    //     maturity: ["low", "medium", "high"],
    //     probability: ["low", "medium", "high"],
    //     impact: ["low", "medium", "high"],
    // }
    // const [filterMask, setFilterMask] = useState(initFilterMask);

    const category = ["user", "technology", "menv"];
    const maturity = ["low", "medium", "high"];
    const probability = ["low", "medium", "high"];
    const impact = ["low", "medium", "high"];

    const handleFilterChange = event => {
        const {name, value} = event.target;
        console.log("name: " + name + ", value: " + value)
        setFilterMask(prevState => {
            return (prevState[name].includes(value)) ? {
                ...prevState,
                [name]: prevState[name].filter(e => e !== value)
            } : {...prevState, [name]: [...prevState[name], value]}
        })
        // const index = filterMask[name].indexOf(value);
        // if (index > -1) {
        //     setFilterMask({...filterMask, [name]: filterMask[`${name}`].splice(index, 1)})
        // } else {
        //     setFilterMask({...filterMask, [name]: filterMask[`${name}`].push(value)})
        // }
        // console.log(filterMask)
    }

    React.useEffect(() => {
        console.log(filterMask)
    }, [filterMask])


    const handleSubmit = event => {
        console.log(filterMask)
    }


    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Filter">
                <Form style={{paddingLeft: '8px'}}>
                    <label>Category</label>
                    <br/>
                    {category.map((category) => (
                        <Form.Check inline type='checkbox' key={`category-${category}`}
                                    name="category" label={category} value={category}
                                    onChange={handleFilterChange} checked={filterMask["category"].includes(category)}
                        />
                    ))}
                    <br/>
                    <label>Probability</label>
                    <br/>
                    {probability.map((probability) => (
                        <Form.Check inline type='checkbox' key={`probability-${probability}`}
                                    name="probability" label={probability} value={probability}
                                    onChange={handleFilterChange}
                                    checked={filterMask["probability"].includes(probability)}
                        />
                    ))}
                    <br/>
                    <label>Maturity</label>
                    <br/>
                    {maturity.map((maturity) => (
                        <Form.Check inline type='checkbox' key={`maturity-${maturity}`}
                                    name="maturity" label={maturity} value={maturity}
                                    onChange={handleFilterChange} checked={filterMask["maturity"].includes(maturity)}
                        />
                    ))}
                    <br/>
                    <label>Impact</label>
                    <br/>
                    {impact.map((impact) => (
                        <Form.Check inline type='checkbox' key={`impact-${impact}`}
                                    name="impact" label={impact} value={impact}
                                    onChange={handleFilterChange} checked={filterMask["impact"].includes(impact)}
                        />
                    ))}
                    <br/>
                    {/*<Button onClick={handleSubmit}>Update</Button>*/}
                </Form>
            </DropdownButton>
        </div>
    );
}

export default Filter;
//===========================
//Render Benchmark Table
//===========================

import {BsFillCaretDownFill, BsFillCaretUpFill, BsThreeDotsVertical} from "react-icons/bs";
import {Dropdown} from "react-bootstrap";
import React from "react";
import Form from "react-bootstrap/Form";

const RenderBmTable = ({benchmarks, references, handleselect, handledeletebm}) => {
    return (benchmarks && benchmarks.map((benchmark, index) => {
            return (
                <tr>
                    <td>
                        {` ${benchmark.ux}`}
                    </td>
                    <td><Form.Group style={{flexGrow: 3}}>
                        <Form.Select onChange={event => handleselect(event, benchmark.id)}
                                     style={{borderRadius: '1.078rem', minWidth: "12rem"}}
                        >
                            {references && references.map((reference, index) => (
                                <option selected={benchmark.rse === reference.rproduct}
                                        value={reference.rproduct}
                                        key={reference.id}
                                >{reference.rproduct}</option>
                            ))}
                        </Form.Select>
                    </Form.Group></td>
                    <td>
                        {benchmark.note}
                    </td>
                    <td class="text-end">
                        <button className="btn btn-danger btn-sm pt-0 pb-0"
                                id={benchmark.id}
                                eventkey={`${benchmark.id}`}
                                onClick={handledeletebm}
                                style={{height: "1.2rem"}}
                        >delete
                        </button>
                    </td>
                </tr>
            )
        })
    );
}

export default RenderBmTable;
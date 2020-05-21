import React from 'react';
const CreateDivWrap = ({ stat_arr, stat, handleChange }) => {
    let temp = [];
    let ret = [];
    for (let i = 0; i < stat.length; i++) {
        temp.push(
            <div className="div_wrap" key={i}>
                <div className="form_label" key={i}>{stat[i]}</div>
                <input value={stat_arr[i]} onChange={handleChange} name={i} />
            </div>
        )
    }
    for (let i = 0; i < stat.length; i++)ret.push(temp[i]);
    return (
        <>
            {ret}
        </>
    )
}

export default CreateDivWrap;
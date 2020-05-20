import React from 'react';
class CreateDiv extends React.Component {
    render() {
        let tmp_arr = [];
        for (let i = 7; i; i--)tmp_arr.push(<div className="const_op" key={i}>{i}추옵</div>)
        return (
            <>
                {tmp_arr}
            </>
        );
    }
}

export default CreateDiv;
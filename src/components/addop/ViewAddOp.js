import React from 'react';
class ViewAddOp extends React.Component {
    static defaultProps = {
        data: [],
    }

    render() {

        let { data } = this.props;
        let view_arr = [];
        for (let i = 0; i < data.length; i++) {
            let arr = [];
            let tparr = data[i].split(',');
            for (let j = 0; j < tparr.length; j++) {
                arr.push(<div className="view_value" key={j}>{tparr[j]}</div>);
            }
            view_arr.push(<div className="view_div" key={i}>{arr}</div>);
        }


        return (
            <>
                {view_arr}
            </>
        )
    }



}

export default ViewAddOp;
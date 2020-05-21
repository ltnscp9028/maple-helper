import React from 'react';
class ViewAddOp extends React.Component {
    static defaultProps = {
        data: [],
    }

    render() {
        let { data, gm_addop } = this.props;
        let view_arr = [];
        for (let i = 0; i < data.length; i++) {
            let arr = [];
            let tparr = data[i].split(',');
            for (let j = 0; j < tparr.length; j++) {
                arr.push(<div className="view_value" key={j}>{tparr[j]}</div>);
            }
            view_arr.push(<div className="view_div" key={i}>{arr}</div>);
        }
        let arr = [];
        let gm_tmp = JSON.parse(JSON.stringify(gm_addop));
        for (let i = 0; i < gm_addop.length; i++) {
            arr.push(<div className="view_value" key={i}>{gm_tmp[i]}</div>)
        }
        if (gm_tmp.length > 0) view_arr.push(<div className="view_div">{arr}</div>)

        return (
            <>
                {view_arr}
            </>
        )
    }



}

export default ViewAddOp;
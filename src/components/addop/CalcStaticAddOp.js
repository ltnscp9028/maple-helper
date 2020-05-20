import React from 'react';
class CalStaticAddOp extends React.Component {
    render() {
        let { lv, sorm } = this.props;
        let tmp_arr = [];
        // console.log(props.lv,props.sorm);
        for (let i = 1; i < 8; i++) {
            tmp_arr.push(<div className="const_op_stat">{parseInt(lv / sorm + 1) * i}</div>)
        }
        return (
            <>
                {tmp_arr}
            </>
        )
    }
}

export default CalStaticAddOp;
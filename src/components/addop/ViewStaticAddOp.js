import React from 'react';
class CalStaticAddOp extends React.Component {
    render() {
        const fafnir = [12, 18, 24, 32, 41];
        const absol = [15, 22, 30, 40, 51];
        const arcanesh = [18, 26, 36, 48, 62];
        let { lv, sorm, check } = this.props;
        let tmp_arr = [];
        // console.log(props.lv,props.sorm);
        if (check === 1) {
            for (let i = 1; i < 8; i++) {
                tmp_arr.push(<div className="const_op_stat">{parseInt(lv / sorm + 1) * i}</div>)
            }
        }
        if (check === 2) {
            for (let i = 1; i < 8; i++) {
                if (i < 3) tmp_arr.push(<div className="const_op_stat">X</div>)
                else tmp_arr.push(<div className="const_op_stat">{lv === 150 ? fafnir[i - 3] : lv === 160 ? absol[i - 3] : arcanesh[i - 3]}%</div>)
            }
        }
        return (
            <>
                {tmp_arr}
            </>
        )
    }
}

export default CalStaticAddOp;
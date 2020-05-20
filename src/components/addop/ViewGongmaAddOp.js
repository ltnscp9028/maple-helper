import React from 'react';
import CreateDiv from './CreateDiv';
import CalStaticAddOp from './ViewStaticAddOp';
const ViewGongmaAddOp = ({ lv }) => {
    return (
        <div className="const_op_form">
            <div className="const_op">{lv}</div>
            <CreateDiv />
            <div className="const_op">파프니르</div>
            <CalStaticAddOp lv={150} check={2} />
            <div className="const_op">앱솔랩스</div>
            <CalStaticAddOp lv={160} check={2} />
            <div className="const_op">아케인셰이드</div>
            <CalStaticAddOp lv={200} check={2} />
        </div>
    )
}

export default ViewGongmaAddOp;
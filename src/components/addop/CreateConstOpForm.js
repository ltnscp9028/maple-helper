import React from 'react';
import CreateDiv from './CreateDiv';
import CalStaticAddOp from './CalcStaticAddOp';
const CreateConstOpForm = ({ lv, llv }) => {
    return (
        <div className="const_op_form">
            <div className="const_op">{lv}</div>
            <CreateDiv />
            <div className="const_op">단일추옵</div>
            <CalStaticAddOp lv={llv} sorm={20} />
            <div className="const_op">이중추옵</div>
            <CalStaticAddOp lv={llv} sorm={40} />
        </div>
    )
}

export default CreateConstOpForm;
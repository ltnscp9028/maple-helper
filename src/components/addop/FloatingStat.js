import React from 'react';
import CreateConstOpForm from './CreateConstOpForm';
import ViewGongmaAddOp from './ViewGongmaAddOp';
const FloatingStat = () => {
    return (
        <div className="view_const_stat">
            <CreateConstOpForm lv="140~150제" llv="140" />
            <CreateConstOpForm lv="160제" llv="160" />
            <CreateConstOpForm lv="200제" llv="200" />
            <ViewGongmaAddOp lv="무기" />
        </div>
    )
}

export default FloatingStat;
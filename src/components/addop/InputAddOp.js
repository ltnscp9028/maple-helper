import React from 'react';
const InputAddOp = ({ lv, handleChangeSingle, handleSubmit }) => {

    return (
        <div className="div_form_op">
            <div className="div_wrap_def">
                <div className="form_label">아이템 레벨</div>
                <input value={this.state.lv} onChange={this.handleChangeSingle} name='lv' />
            </div>
            <div className="div_wrap_def">
                <select value={this.state.check_fire} onChange={this.handleChangeSingle} name='check_fire' className='def_set_op'>
                    <option value='0'>강환,영환 미사용</option>
                    <option value='1'>강환 사용</option>
                    <option value='2'>영환 사용</option>
                </select>
            </div>
            <form className="div_test_op">
                <this.createDivWrap />
                <button onClick={this.handleSubmit} className='submit_bt2'>등록</button>
            </form>
        </div>
    )
}
export default InputAddOp
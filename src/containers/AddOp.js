import React,{Component} from 'react';
import './AddOp.css';

class AddOp extends Component{
    arr2 = ["STR","DEX","LUK","INT","STR+DEX","STR+INT","STR+LUK","DEX+INT","DEX+LUK","INT+LUK"];
    stat= ["str","dex","int","luk",
    "최대 HP", "최대 MP",
    "공격력", "마력",
    "방어력","이동속도", "점프력","올스탯","착용레벨 감소"];
 
    state = {
        stat_arr: new Array(10),
        lv:'',
        check_fire:'',
    }

    handleChange = (e) => {
        const {stat_arr} = this.state;
        const index = e.target.name;
        const next_stat = [...stat_arr];
        next_stat[index] = e.target.value;
        this.setState({
            stat_arr: next_stat
        });
    }
    handleChangeSingle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    inputAddOp = () => {
        return(
            <div className="div_form_op">
                    <div className="div_wrap_def">                    
                        <div className="form_label">아이템 레벨</div>
                        <input value={this.state.lv} onChange={this.handleChangeSingle} name='lv'/>
                    </div>
                    <div className="div_wrap_def">
                        <select value={this.state.check_fire} onChange={this.handleChangeSingle} name='check_fire' className='def_set_op'>
                            <option value='0'>강환,영환 미사용</option>
                            <option value='1'>강환 사용</option>
                            <option value='2'>영환 사용</option>
                        </select>
                    </div>
                <form className="div_test_op">
                    <div className="div_wrap">                    
                        <div className="form_label">STR</div>
                        <input value={this.state.stat_arr[0]} onChange={this.handleChange} name='0'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">DEX</div>
                        <input value={this.state.stat_arr[1]} onChange={this.handleChange} name='1'/>                    
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">INK</div>
                        <input value={this.state.stat_arr[2]} onChange={this.handleChange} name='2'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">LUK</div>
                        <input value={this.state.stat_arr[3]} onChange={this.handleChange} name='3'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">최대 HP</div>
                        <input value={this.state.stat_arr[4]} onChange={this.handleChange} name='4'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">최대 MP </div>
                    <input value={this.state.stat_arr[5]} onChange={this.handleChange} name='5'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">공격력</div>
                        <input value={this.state.stat_arr[6]} onChange={this.handleChange} name='6'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">마력</div>
                        <input value={this.state.stat_arr[7]} onChange={this.handleChange} name='7'/>
                    </div>

                    <div className="div_wrap">
                        <div className="form_label">방어력</div>
                        <input value={this.state.stat_arr[8]} onChange={this.handleChange} name='8'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">이동속도</div>
                        <input value={this.state.stat_arr[9]} onChange={this.handleChange} name='9'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">점프력</div>
                        <input value={this.state.stat_arr[10]} onChange={this.handleChange} name='10'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">올스탯</div>
                        <input value={this.state.stat_arr[11]} onChange={this.handleChange} name='11'/>
                    </div>
                    <div className="div_wrap">
                        <div className="form_label">착용레벨 감소</div>
                        <input value={this.state.stat_arr[12]} onChange={this.handleChange} name='12'/>
                    </div>
                    <button onClick={this.handleSubmit} className='submit_bt2'>등록</button>                    
                </form>
            </div>
        )
    }
    

    render(){
        
        return(
            <>
                <this.inputAddOp/>
                <div>{this.state.stat_arr[0]}</div>
                <div>{this.state.stat_arr[1]}</div>
                <div>{this.state.stat_arr[2]}</div>
                <div>{this.state.stat_arr[3]}</div>
                <div>{this.state.stat_arr[4]}</div>
                <div>{this.state.stat_arr[5]}</div>
                <div>{this.state.stat_arr[6]}</div>
                <div>{this.state.stat_arr[7]}</div>
                <div>{this.state.stat_arr[8]}</div>
                <div>{this.state.stat_arr[9]}</div>
                <div>{this.state.stat_arr[10]}</div>
                <div>{this.state.stat_arr[11]}</div>
                <div>{this.state.stat_arr[12]}</div>
            </>
        );
    }
}
export default AddOp;
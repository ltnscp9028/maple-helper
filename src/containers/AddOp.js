/*eslint-disable */

import React,{Component} from 'react';
import './AddOp.css';

class AddOp extends Component{
    arr = Array(10).fill(null).map(() => Array(8));
    tempVector = [];
    v = [];
    check_st = [];
    lv=150;
    j=0; chk=0; fire_yn=0; stat_gaesu=0;
    mmap = new Set();
    arr2 = ["STR","DEX","LUK","INT","STR+DEX","STR+INT","STR+LUK","DEX+INT","DEX+LUK","INT+LUK"];
    stat= ["str","dex","int","luk",
    "최대 HP", "최대 MP",
    "공격력", "마력",
    "방어력","이동속도", "점프력","올스탯","착용레벨 감소"];
 
    state = {
        stat_arr: [0,0,0,0,0,0,0,0,0,0,0,0,0],
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

    set_addop = () => {
        const {lv} = this.state;
        let {arr} = this;
        for (let i = 0; i < 8; i++)arr[0][i] = arr[1][i] = arr[2][i] = arr[3][i] = arr[4][i] = (parseInt(lv / 20) + 1) * i;
        for (let i = 0; i < 8; i++)arr[5][i] = arr[6][i] = arr[7][i] = arr[8][i] = arr[9][i] = (parseInt(lv / 40) + 1) * i;
    
        //	for(i=0;i<10;i++,puts(""))
        //		for(j=0;j<8;j++)printf("%d ",arr[i][j]);
    }

    make_pick = () => {
        const nn = 10;
        const scn = 4 - this.stat_gaesu;
        let {v,tempVector} = this;
        // printf("%d %d\n",nn,scn);
        console.log(`${nn} ${scn}`);
        for (let i = 0; i < nn; i++)v.push(i);
        for (let i = 0; i < scn; i++)tempVector.push(1);
        for (let i = 0; i < nn - scn; i++)tempVector.push(0);
        // sort(tempVector.begin(), tempVector.end());
        tempVector.sort();
    }

    handleSubmit = (e) => {
        let {stat_arr} = this.state;
        e.preventDefault();
        for (var i = 4; i < 13; i++)if(stat_arr[i]!=0)this.stat_gaesu++;
        this.set_addop();
        this.make_pick();
        console.log(stat_arr);
        if(this.stat_gaesu==0)this.cal_stat1();
        if(this.stat_gaesu==1)this.cal_stat2();
        if(this.stat_gaesu==2)this.cal_stat3();
        if(this.stat_gaesu==3)this.cal_stat4();
        console.log(this.mmap);
    }
    
    

    cal_stat1 = () => {
        let {tempVector ,check_st,v,arr2,s_case,arr,mmap} = this;
        let {lv,check_fire,stat_arr} = this.state;
        do {
            for (var i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            // console.log(check_st);
            for (let q = 0; q < 8; q++) {
                for (let w = 0; w < 8; w++) {
                    for (let e = 0; e < 8; e++) {
                        for (let r = 0; r < 8; r++) {
                            //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                            var restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                            s_case(restat, 0, q);
                            s_case(restat, 1, w);
                            s_case(restat, 2, e);
                            s_case(restat, 3, r);
                            if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                                if ((q<3 ||w<3 ||e<3 || r< 3) && (lv >=150)) continue;
                                if (check_fire==1 && (q==7 ||w==7 ||e==7||r==7 || q<3 ||w<3 ||e<3 || r< 3)) continue;
                                if (check_fire==2 && (q<4||w<4||e<4||r<4)) continue;
                                var p='';
                                if (arr[check_st[0]][q]) p = `${arr2[check_st[0]]} ${8 - q}추옵(${arr[check_st[0]][q]}) `;
                                if (arr[check_st[1]][w]) p += `${arr2[check_st[1]]} ${8 - w}추옵(${arr[check_st[1]][w]}) `;
                                if (arr[check_st[2]][e]) p += `${arr2[check_st[2]]} ${8 - e}추옵(${arr[check_st[2]][e]}) `;
                                if (arr[check_st[3]][r]) p += `${arr2[check_st[3]]} ${8 - r}추옵(${arr[check_st[3]][r]}) `;
                                mmap.add(p);
                            }
                        }
    
                        //						cout<<arr2[check_st[0]] + ' '<<arr2[check_st[1]] + ' ' << arr2[check_st[2]] + ' '<<arr2[check_st[3]]<<'\n';
                        // chk++;
                    }
                    //					puts("---------------------------------------");
                }
            }
            check_st.length = 0;
            //    puts("test");
        } while (this.next_permutation());
    }

    cal_stat2 = () => {
        let {tempVector ,check_st,v,arr2,s_case,arr,mmap} = this;
        let {lv,check_fire,stat_arr} = this.state;
        do {
            for (var i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            // console.log(check_st);
            for (let q = 0; q < 8; q++) {
                for (let w = 0; w < 8; w++) {
                    for (let e = 0; e < 8; e++) {
                            //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                            var restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                            s_case(restat, 0, q);
                            s_case(restat, 1, w);
                            s_case(restat, 2, e);
                            if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                                if ((q<3 ||w<3 ||e<3) && (lv >=150)) continue;
                                if (check_fire==1 && (q==7 ||w==7 ||e==7|| q<3 ||w<3 ||e<3)) continue;
                                if (check_fire==2 && (q<4||w<4||e<4)) continue;
                                var p='';
                                if (arr[check_st[0]][q]) p = `${arr2[check_st[0]]} ${8 - q}추옵(${arr[check_st[0]][q]}) `;
                                if (arr[check_st[1]][w]) p += `${arr2[check_st[1]]} ${8 - w}추옵(${arr[check_st[1]][w]}) `;
                                if (arr[check_st[2]][e]) p += `${arr2[check_st[2]]} ${8 - e}추옵(${arr[check_st[2]][e]}) `;
                                mmap.add(p);
                            }
                        }
    
                        //						cout<<arr2[check_st[0]] + ' '<<arr2[check_st[1]] + ' ' << arr2[check_st[2]] + ' '<<arr2[check_st[3]]<<'\n';
                        // chk++;
                    }
                    //					puts("---------------------------------------");
                }
            check_st.length = 0;
            //    puts("test");
        } while (this.next_permutation());
    }


    cal_stat3 = () => {
        let {tempVector ,check_st,v,arr2,s_case,arr,mmap} = this;
        let {lv,check_fire,stat_arr} = this.state;
        do {
            for (var i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            // console.log(check_st);
            for (let q = 0; q < 8; q++) {
                for (let w = 0; w < 8; w++) {
                            //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                            var restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                            s_case(restat, 0, q);
                            s_case(restat, 1, w);
                            if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                                if ((q<3 ||w<3) && (lv >=150)) continue;
                                if (check_fire==1 && (q==7 ||w==7|| q<3 ||w<3)) continue;
                                if (check_fire==2 && (q<4||w<4)) continue;
                                var p='';
                                if (arr[check_st[0]][q]) p = `${arr2[check_st[0]]} ${8 - q}추옵(${arr[check_st[0]][q]}) `;
                                if (arr[check_st[1]][w]) p += `${arr2[check_st[1]]} ${8 - w}추옵(${arr[check_st[1]][w]}) `;
                                mmap.add(p);
                            }
                        }
    
                        //						cout<<arr2[check_st[0]] + ' '<<arr2[check_st[1]] + ' ' << arr2[check_st[2]] + ' '<<arr2[check_st[3]]<<'\n';
                        // chk++;
                    }
                    //					puts("---------------------------------------");
            check_st.length = 0;
            //    puts("test");
        } while (this.next_permutation());
    }

    cal_stat4 = () => {
        let {tempVector ,check_st,v,arr2,s_case,arr,mmap} = this;
        let {lv,check_fire,stat_arr} = this.state;
        do {
            for (var i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            // console.log(check_st);
            for (let q = 0; q < 8; q++) {
                            //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                            var restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                            s_case(restat, 0, q);
                            if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                                if ((q<3) && (lv >=150)) continue;
                                if (check_fire==1 && (q==7 || q<3)) continue;
                                if (check_fire==2 && (q<4)) continue;
                                var p='';
                                if (arr[check_st[0]][q]) p = `${arr2[check_st[0]]} ${8 - q}추옵(${arr[check_st[0]][q]}) `;
                                mmap.add(p);
                            }

                        //						cout<<arr2[check_st[0]] + ' '<<arr2[check_st[1]] + ' ' << arr2[check_st[2]] + ' '<<arr2[check_st[3]]<<'\n';
                        // chk++;
                    }
                    //					puts("---------------------------------------");
            check_st.length = 0;
            //    puts("test");
        } while (this.next_permutation());
    }

    next_permutation = () => {
        let {tempVector} = this;
        var idx = -1;
        for(var i=0;i<9;i++)
            if(tempVector[i]<tempVector[i+1])idx=i;
        if(idx<0)return 0;
        for(i=9;i>idx;i--){
            if(tempVector[idx] <tempVector[i]){
                var tmp = tempVector[idx];
                tempVector[idx] = tempVector[i];
                tempVector[i] = tmp;
                break;
            }
        }
        for(i=idx+1;i<(11+idx)/2 ; i++){
            tmp = tempVector[i];
            tempVector[i] = tempVector[10 - (i-idx)];
            tempVector[10 - (i-idx)] = tmp;
        }
        return 1;
    }

    s_case = (restat, n, ww) => {
        const {check_st,arr} = this;
        //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
        switch (check_st[n]) {
            case 0:
                restat.restr += arr[check_st[n]][ww];
                break;
            case 1:
                restat.redex += arr[check_st[n]][ww];
                break;
            case 2:
                restat.reluk += arr[check_st[n]][ww];
                break;
            case 3:
                restat.reint += arr[check_st[n]][ww];
                break;
            case 4:
                restat.restr += arr[check_st[n]][ww];
                restat.redex += arr[check_st[n]][ww];
                break;
            case 5:
                restat.restr += arr[check_st[n]][ww];
                restat.reint += arr[check_st[n]][ww];
                break;
            case 6:
                restat.restr += arr[check_st[n]][ww];
                restat.reluk += arr[check_st[n]][ww];
                break;
            case 7:
                restat.redex += arr[check_st[n]][ww];
                restat.reint += arr[check_st[n]][ww];
                break;
            case 8:
                restat.redex += arr[check_st[n]][ww];
                restat.reluk += arr[check_st[n]][ww];
                break;
            case 9:
                restat.reint += arr[check_st[n]][ww];
                restat.reluk += arr[check_st[n]][ww];
                break;
        }
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
                {/* <div>{this.state.stat_arr[0]}</div>
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
                <div>{this.state.stat_arr[12]}</div> */}
            </>
        );
    }
}
export default AddOp;
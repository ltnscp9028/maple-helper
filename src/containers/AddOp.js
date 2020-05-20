/*eslint-disable */
import React from 'react';
import './AddOp.css';
import ViewAddOp from '../components/addop/ViewAddOp';
import CreateConstOpForm from '../components/addop/CreateConstOpForm';
import CalcGongmaAddOp from '../components/addop/CalcGongmaAddOp';
const nq = require('combination-js');
class AddOp extends React.Component {
    arr = Array(10).fill(null).map(() => Array(8));
    tempVector = [];
    v = [];
    check_st = [];
    j = 0; chk = 0; fire_yn = 0; stat_gaesu = 0; id = 0;
    mmap = new Set();
    arr2 = ['STR', 'DEX', 'LUK', 'INT', 'STR+DEX', 'STR+INT', 'STR+LUK', 'DEX+INT', 'DEX+LUK', 'INT+LUK'];
    stat = [
        'STR', 'DEX', 'INT', 'LUK',
        '최대 HP', '최대 MP',
        '공격력', '마력', '보공', '데미지',
        '방어력', '이동속도', '점프력', '올스탯', '착용레벨 감소',
    ];
    constructor(props) {
        super(props);
        this.inputAddOp = this.inputAddOp.bind(this);
        this.createDivWrap = this.createDivWrap.bind(this);
        this.floatingStat = this.floatingStat.bind(this);
    }

    state = {
        stat_arr: Array(15).fill(0),
        lv: '',
        check_fire: '',
        addop_arr: [],
        addop_sol: '',
    }

    handleChange = (e) => {
        const { stat_arr } = this.state;
        const index = e.target.name;
        const next_stat = [...stat_arr];
        next_stat[index] = e.target.value;
        this.setState({
            stat_arr: next_stat,
        });
    }
    handleChangeSingle = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        let { stat_arr, addop_arr } = this.state;
        let { mmap, id } = this;
        let temp_arr = [];
        e.preventDefault();
        for (let i = 4; i < 13; i++)if (stat_arr[i] != 0) this.stat_gaesu++;
        this.set_addop();
        this.make_pick();
        // console.log(stat_arr);
        this[`cal_stat${this.stat_gaesu + 1}`]();
        mmap.forEach(value => temp_arr.push(value));
        this.setState({
            addop_arr: addop_arr.concat({
                id: id++,
                ad_opop: temp_arr,
            }),

            stat_arr: Array(13).fill(0),
            lv: '',
            check_fire: '',
            addop_sol: temp_arr,
        })
        // console.log(mmap);
        mmap.clear();
        this.stat_gaesu = 0;
        this.tempVector = [];
        this.check_st = [];
        this.v = [];
    }

    set_addop = () => {
        const { lv } = this.state;
        let { arr } = this;
        for (let i = 0; i < 8; i++) {
            arr[0][i] = arr[1][i] = arr[2][i] = arr[3][i] = arr[4][i] = (parseInt(lv / 20) + 1) * i;
            arr[5][i] = arr[6][i] = arr[7][i] = arr[8][i] = arr[9][i] = (parseInt(lv / 40) + 1) * i;
        }
    }

    make_pick = () => {
        const nn = 10;
        const scn = 4 - this.stat_gaesu;
        let { v, tempVector } = this;
        // console.log(`${nn} ${scn}`);
        for (let i = 0; i < nn; i++)v.push(i);
        for (let i = 0; i < scn; i++)tempVector.push(1);
        for (let i = 0; i < nn - scn; i++)tempVector.push(0);
        tempVector.sort();
    }

    s_case = (restat, n, ww) => {
        const { check_st, arr } = this;
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

    cal_stat1 = () => {
        let { tempVector, check_st, v, arr2, s_case, arr, mmap } = this;
        let { lv, check_fire, stat_arr } = this.state;
        do {
            for (let i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            for (let q = 0; q < 8; q++) {
                for (let w = 0; w < 8; w++) {
                    for (let e = 0; e < 8; e++) {
                        for (let r = 0; r < 8; r++) {
                            let qwer = [q, w, e, r];
                            //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                            let restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                            for (let ii = 0; ii < qwer.length; ii++)s_case(restat, ii, qwer[ii]);
                            if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                                if ((q < 3 || w < 3 || e < 3 || r < 3) && (lv >= 150)) continue;
                                if (check_fire == 1 && (q == 7 || w == 7 || e == 7 || r == 7 || q < 3 || w < 3 || e < 3 || r < 3)) continue;
                                if (check_fire == 2 && (q < 4 || w < 4 || e < 4 || r < 4)) continue;
                                let p = '';
                                for (let ii = 0; ii < qwer.length; ii++) {
                                    if (arr[check_st[ii]][qwer[ii]]) p += `${arr2[check_st[ii]]} ${8 - qwer[ii]}추옵(${arr[check_st[ii]][qwer[ii]]}),`
                                }
                                mmap.add(p);
                            }
                        }
                    }
                }
            }
            check_st.length = 0;
        } while (nq.next_permutation(tempVector));
    }

    cal_stat2 = () => {
        let { tempVector, check_st, v, arr2, s_case, arr, mmap } = this;
        let { lv, check_fire, stat_arr } = this.state;
        do {
            for (let i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            // console.log(check_st);
            for (let q = 0; q < 8; q++) {
                for (let w = 0; w < 8; w++) {
                    for (let e = 0; e < 8; e++) {
                        let qwer = [q, w, e];
                        //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                        let restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                        for (let ii = 0; ii < qwer.length; ii++)s_case(restat, ii, qwer[ii]);
                        if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                            if ((q < 3 || w < 3 || e < 3) && (lv >= 150)) continue;
                            if (check_fire == 1 && (q == 7 || w == 7 || e == 7 || q < 3 || w < 3 || e < 3)) continue;
                            if (check_fire == 2 && (q < 4 || w < 4 || e < 4)) continue;
                            let p = '';
                            for (let ii = 0; ii < qwer.length; ii++)
                                if (arr[check_st[ii]][qwer[ii]]) p += `${arr2[check_st[ii]]} ${8 - qwer[ii]}추옵(${arr[check_st[ii][qwer[ii]]]}) `
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
        } while (nq.next_permutation(tempVector));
    }


    cal_stat3 = () => {
        let { tempVector, check_st, v, arr2, s_case, arr, mmap } = this;
        let { lv, check_fire, stat_arr } = this.state;
        do {
            for (let i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            // console.log(check_st);
            for (let q = 0; q < 8; q++) {
                for (let w = 0; w < 8; w++) {
                    //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                    let qwer = [q, w];
                    let restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                    for (let ii = 0; ii < qwer.length; ii++)s_case(restat, ii, qwer[ii]);
                    if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                        if ((q < 3 || w < 3) && (lv >= 150)) continue;
                        if (check_fire == 1 && (q == 7 || w == 7 || q < 3 || w < 3)) continue;
                        if (check_fire == 2 && (q < 4 || w < 4)) continue;
                        let p = '';
                        for (let ii = 0; ii < qwer.length; ii++)
                            if (arr[check_st[ii]][qwer[ii]]) p += `${arr2[check_st[ii]]} ${8 - qwer[ii]}추옵(${arr[check_st[ii][qwer[ii]]]}) `
                        mmap.add(p);
                    }
                }
            }
            check_st.length = 0;
        } while (nq.next_permutation(tempVector));
    }

    cal_stat4 = () => {
        let { tempVector, check_st, v, arr2, s_case, arr, mmap } = this;
        let { lv, check_fire, stat_arr } = this.state;
        do {
            for (let i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            // console.log(check_st);
            for (let q = 0; q < 8; q++) {
                //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
                let restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
                s_case(restat, 0, q);
                if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
                    if ((q < 3) && (lv >= 150)) continue;
                    if (check_fire == 1 && (q == 7 || q < 3)) continue;
                    if (check_fire == 2 && (q < 4)) continue;
                    let p = '';
                    if (arr[check_st[0]][q]) p = `${arr2[check_st[0]]} ${8 - q}추옵(${arr[check_st[0]][q]}) `;
                    mmap.add(p);
                }
            }
            check_st.length = 0;
        } while (nq.next_permutation(tempVector));
    }

    createDivWrap() {
        let temp = [];
        let ret = [];
        const stat = this.stat;
        for (let i = 0; i < stat.length; i++) {
            temp.push(
                <div className="div_wrap">
                    <div className="form_label">{stat[i]}</div>
                    <input value={this.state.stat_arr[i]} onChange={this.handleChange} name={i} />
                </div>
            )
        }
        for (let i = 0; i < stat.length; i++)ret.push(temp[i]);
        return (
            <>
                {ret}
            </>
        )
    }

    inputAddOp() {
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

    floatingStat() {
        return (
            <div className="view_const_stat">
                <CreateConstOpForm lv="140~150제" llv="140" />
                <CreateConstOpForm lv="160제" llv="160" />
                <CreateConstOpForm lv="200제" llv="200" />
                <CalcGongmaAddOp lv="무기" />
            </div>
        )
    }

    render() {
        return (
            <>
                <this.inputAddOp />
                <div className="view_stat">
                    <ViewAddOp data={this.state.addop_sol} />
                </div>
                <this.floatingStat />
            </>
        );
    }
}
export default AddOp;

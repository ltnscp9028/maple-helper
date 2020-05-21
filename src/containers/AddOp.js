/*eslint-disable */
import React from 'react';
import './AddOp.css';
import ViewAddOp from '../components/addop/ViewAddOp';
import InputAddOp from '../components/addop/InputAddOp';
import FloatingStat from '../components/addop/FloatingStat';
const nq = require('combination-js');
class AddOp extends React.Component {
    arr = Array(10).fill(null).map(() => Array(8));
    tempVector = [];
    v = [];
    check_st = [];
    gm_addop = [];
    j = 0; chk = 0; fire_yn = 0; stat_gaesu = 0; id = 0;
    mmap = new Set();
    arr2 = ['STR', 'DEX', 'LUK', 'INT', 'STR+DEX', 'STR+INT', 'STR+LUK', 'DEX+INT', 'DEX+LUK', 'INT+LUK'];
    stat = [
        'STR', 'DEX', 'INT', 'LUK',
        '최대 HP', '최대 MP',
        '공/마 (기본)',
        '공격력(추옵)', '마력(추옵)',
        '보공', '데미지',
        '방어력', '이동속도', '점프력', '올스탯', '착용레벨 감소',
    ];

    constructor(props) {
        super(props);
        // this.floatingStat = this.floatingStat.bind(this);
        // this.calcGM = this.calcGM.bind(this);
    }

    state = {
        stat_arr: Array(16).fill(0),
        lv: '',
        check_fire: 0,
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
        for (let i = 4; i < this.stat.length; i++)if (stat_arr[i] != 0 && i != 6) this.stat_gaesu++;
        this.set_addop();
        this.make_pick();
        if (this.stat_gaesu != 4) this.cal_stat(4 - this.stat_gaesu);
        // this.calcGM();
        // let tmp_gm = JSON.parse(JSON.stringify(this.gm_addop));
        this.calc_gm();
        mmap.forEach(value => temp_arr.push(value));
        this.setState({
            addop_arr: addop_arr.concat({
                id: id++,
                ad_opop: temp_arr,
            }),
            stat_arr: Array(16).fill(0),
            lv: '',
            check_fire: '',
            addop_sol: temp_arr,
        })
        console.log('test');
        // console.log(mmap);
        mmap.clear();
        this.stat_gaesu = 0;
        this.tempVector = [];
        this.check_st = [];
        this.v = [];
        // this.gm_addop = [];
    }

    set_addop = () => {
        const { lv } = this.state;
        let { arr } = this;
        for (let i = 0; i < 8; i++) {
            // 7,8,12,13,14
            arr[0][i] = arr[1][i] = arr[2][i] = arr[3][i] = arr[4][i] = (parseInt(lv / 20) + 1) * i;
            arr[5][i] = arr[6][i] = arr[7][i] = arr[8][i] = arr[9][i] = (parseInt(lv / 40) + 1) * i;
        }
        // console.log(arr);
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

    cal_stat_func = (qwer) => {
        const { arr2, s_case, arr, mmap, check_st } = this;
        const { lv, check_fire, stat_arr } = this.state;
        //str = 0,  dex = 1, luk = 2, int = 3 , str+dex = 4 , str+int = 5, str+luk = 6 ,  dex + int = 7 ,  dex _ luk = 8, int + luk = 9
        let restat = { restr: 0, redex: 0, reluk: 0, reint: 0 };
        for (let ii = 0; ii < qwer.length; ii++)s_case(restat, ii, qwer[ii]);
        if (restat.restr == stat_arr[0] && restat.redex == stat_arr[1] && restat.reint == stat_arr[2] && restat.reluk == stat_arr[3]) {
            for (let jj = 0; jj < qwer.length; jj++)if (qwer[jj] < 3 && lv >= 150) return 0;
            if (check_fire == 1) {
                for (let jj = 0; jj < qwer.length; jj++)if (qwer[jj] == 7 || qwer[jj] < 3) return 0;
            }
            if (check_fire == 2) {
                for (let jj = 0; jj < qwer.length; jj++)if (qwer[jj] < 4) return 0;
            }
            let p = '';
            for (let ii = 0; ii < qwer.length; ii++) {
                if (arr[check_st[ii]][qwer[ii]]) p += `${arr2[check_st[ii]]} ${8 - qwer[ii]}추옵(${arr[check_st[ii]][qwer[ii]]}),`;
            }
            // console.log("test");
            mmap.add(p);
        }
        // return true;
    }

    cal_stat = (len) => {
        const { tempVector, check_st, v } = this;
        // console.log(`len : ${len}, stat_gaesu : ${this.stat_gaesu}`);
        do {
            for (let i = 0; i < tempVector.length; i++) {
                if (tempVector[i] == 1) check_st.push(v[i]);
            }
            for (let q = 0; q < 8; q++) {
                if (len > 1) {
                    for (let w = 0; w < 8; w++) {
                        if (len > 2) {
                            for (let e = 0; e < 8; e++) {
                                if (len > 3) {
                                    for (let r = 0; r < 8; r++) {
                                        // console.log([q, w, e, r]);
                                        if (this.cal_stat_func([q, w, e, r]) == 0) {
                                            // console.log(qwer);
                                            continue;
                                        }
                                    }
                                }
                                else {
                                    if (this.cal_stat_func([q, w, e]) == 0) continue;
                                }
                            }
                        }
                        else {
                            if (!this.cal_stat_func([q, w]) == 0) continue;
                        }
                    }
                }
                else {
                    if (!this.cal_stat_func([q]) == 0) continue;
                }
            }
            // console.log(this.mmap);
            check_st.length = 0;
        } while (nq.next_permutation(tempVector));
    }

    cal_stat5 = () => {
        console.log('hello,world!');
    }

    //14,9,10
    calc_gm = () => {
        this.gm_addop.length = 0;
        const { lv, stat_arr } = this.state;
        const fafnir = [12, 18, 24, 32, 41];
        const absol = [15, 22, 30, 40, 51];
        const arcanesh = [18, 26, 36, 48, 62];
        const tmp = lv == 150 ? fafnir : lv == 160 ? absol : arcanesh;
        let tmp_gong = Math.floor(stat_arr[7] / stat_arr[6] * 100);
        let tmp_ma = Math.floor(stat_arr[8] / stat_arr[6] * 100);
        for (let i = 0; i < 5; i++) {
            if (tmp_gong == tmp[i]) {
                this.gm_addop.push(`공격력 ${i}추옵(${stat_arr[7]})`);
            }
            if (tmp_ma == tmp[i]) {
                this.gm_addop.push(`마력  ${i}추옵(${stat_arr[8]})`);
            }
        }
        if (stat_arr[9]) this.gm_addop.push(`보공 ${8 - stat_arr[9] / 2}추옵(${stat_arr[9]}%)`);
        if (stat_arr[10]) this.gm_addop.push(`데미지 ${8 - stat_arr[10]}추옵(${stat_arr[10]}%)`);
        if (stat_arr[14]) this.gm_addop.push(`올스탯 ${8 - stat_arr[14]}추옵(${stat_arr[14]}%)`);
    }

    render() {
        return (
            <>
                {/* <this.inputAddOp /> */}
                <InputAddOp
                    handleChangeSingle={this.handleChangeSingle} handleSubmit={this.handleSubmit}
                    lv={this.state.lv} check_fire={this.state.check_fire}
                    stat_arr={this.state.stat_arr} stat={this.stat} handleChange={this.handleChange} />
                <div className="view_stat">
                    <ViewAddOp data={this.state.addop_sol} lv={this.state.lv} stat_arr={this.state.stat_arr} gm_addop={this.gm_addop} />
                    {/* <this.calcGM /> */}
                </div>
                <FloatingStat />
            </>
        );
    }
}
export default AddOp;

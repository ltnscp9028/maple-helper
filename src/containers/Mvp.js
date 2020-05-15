/*eslint-disable */
import React from 'react';
import './Mvp.css';
import AddInfoList from '../components/mvp/AddInfoList';

class Mvp extends React.Component{
    id = 0
    state = {
        itemLists: [
        ],

        cashPrice: '',
        mesoPrice: '',
        itemsName: '',
        mesoDiscountPercent: '',
        cashDiscountPercent: '',
        mileageCheck: '',
        mesoQuote: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
       const { itemLists } = this.state;
        var discountCashPrice= this.state.cashPrice * (100-this.state.cashDiscountPercent)/100 * (100-this.state.mileageCheck)/100;
        var mesoPrice = this.state.mesoPrice * ((100-this.state.mesoDiscountPercent)/100) /100000000;
        var cashVSmeso = (10000/discountCashPrice) * mesoPrice * this.state.mesoQuote - 10000;

        this.setState({
            itemLists: itemLists.concat({
            
                id: this.id++, 
                itemsName : this.state.itemsName, 
                mileageCheck : this.state.mileageCheck,
                discountPrice : discountCashPrice, 
                getPrice : 10000/discountCashPrice * mesoPrice * this.state.mesoQuote,
                benefitPerMan: cashVSmeso
            }),
            cashPrice: '',
           mesoPrice: '',
           itemsName: '',
           mileageCheck: ''
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRemove = (id) => {
        const {  itemLists } = this.state;
        this.setState({
            itemLists:  itemLists.filter( itemLists =>  itemLists.id !== id)
        })
      }

    inputPrice = () => {
        return(
            <div className="div-form">
                <div className="title">물품 정보</div>
                <form className="form-item-setting">
                    <ul className="formStyle">                   
                            <li><input placeholder='아이템명' value={this.state.itemsName} onChange={this.handleChange} 
                        name="itemsName" className="def-set"/></li>
                            <li><input placeholder='캐시 가격' value={this.state.cashPrice} onChange={this.handleChange} 
                        name="cashPrice" className="def-set"/></li>
                            <li><input placeholder='거래 가격' value={this.state.mesoPrice} onChange={this.handleChange} 
                             name="mesoPrice" className="def-set"/></li>
                            <li><select value={this.state.mileageCheck} onChange={this.handleChange}
                            name="mileageCheck" className="def-set">
                                <option value=''>마일리지 사용여부</option>
                                <option value='0'>미사용</option>
                                <option value='30'>사용</option>
                    </select></li>
                            <li><button onClick={this.handleSubmit} className='submit_bt'>등록</button></li>
                    </ul>
                </form>
            </div>
        )
    }

    defaultSetting = () => {
        return(
        <div className="div-form">
            <div className="title">기본 정보</div>
            <form className="test2">
                <ul className="formStyle">
                    <li>
                        <select 
                            value={this.state.discountPercent} onChange={this.handleChange}
                            name="mesoDiscountPercent"
                            className="def-set"
                        >
                            <option value="5">경매장 수수료</option>
                            <option value="5">5%</option>
                            <option value="3">3%</option>
                        </select>
                    </li>
                    <li>
                        <input  placeholder='캐시할인율 (%빼고입력)' 
                            value={this.state.cashDiscountPercent} onChange={this.handleChange} 
                            name="cashDiscountPercent" className="def-set"/>
                    </li>
                    <li>
                        <input placeholder='메소시세 (1억당)' value={this.state.mesoQuote} onChange={this.handleChange} 
                            name="mesoQuote" className="def-set"/>
                    </li>
                </ul>
            </form>
        </div>
        )

    }

    // discountPrice = (props) => {
    //         var discountCashPrice= this.state.cashPrice * (100-this.state.cashDiscountPercent)/100 * (100-this.state.mileageCheck)/100;
    //         var mesoPrice = this.state.mesoPrice * ((100-this.state.mesoDiscountPercent)/100) /100000000;
    //         var cashVSmeso = (10000/discountCashPrice) * mesoPrice * this.state.mesoQuote - 10000;
    //     return(
    //         <> 
    //             <div>캐시 할인가 : {Math.round(discountCashPrice).toLocaleString()}원</div>
    //             <div>수령 현금 : {Math.round(10000/discountCashPrice * mesoPrice * this.state.mesoQuote).toLocaleString()}원</div>
    //             <div>만원당 이득 : {Math.round(cashVSmeso).toLocaleString()}원</div>
    //         </>
    //     ); test Script
    // }

    render(){
        const { itemLists } = this.state;
        return(
            <>

            <div className='render-div'>
                <this.defaultSetting/>
                <this.inputPrice/>       
            </div>

            <div className='divtest'>
                    <AddInfoList data={this.state.itemLists} onRemove={this.handleRemove}/>
            </div>

            </>
        );
    }
}

export default Mvp;
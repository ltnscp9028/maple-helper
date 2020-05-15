/*eslint-disable */
import React,{Component} from 'react';
import './Form.css';
class Form extends Component{
    static defaultProps = {
        addItemList: {
            itemsName: '',
            mileageCheck: '',
            getPrice: '',
            benefitPerMan: ''
        }
    }

    handleRemove = () => {
        const { addItemList, onRemove } = this.props;
        onRemove(addItemList.id);
    }

    render(){

        const { itemsName, discountPrice, mileageCheck, getPrice, benefitPerMan} = this.props.addItemList;
        
        return(
            <li className='div-form2'>
                <div className='title'>{itemsName}</div> 
                <div className='view-div'>
                <ul className="view-form-style">
                <li className="item">캐시할인가 {Math.round(discountPrice).toLocaleString()}원</li>
                <li className="item">마일리지 {mileageCheck==0 ? '미사용' : '사용'}</li>
                <li className="item">10,000원당 {Math.round(getPrice).toLocaleString()}원 회수</li>
                <li className="item">10,000원당 {benefitPerMan > 0 ? `${Math.round(benefitPerMan).toLocaleString()}원 이득` : 
                        `${Math.round(-benefitPerMan).toLocaleString()}원 손해`}</li>
                <button onClick={this.handleRemove} className='submit_bt'>삭제</button>
                </ul></div>
            </li>
        );
    }
}

export default Form;
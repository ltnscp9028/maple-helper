import React, { Component } from "react";
import Form from "./Form";
class AddInfoList extends Component {
    static defaultProps = {
        data: [],
    }
    render(){
        const {data, onRemove}  = this.props;
        const list = data.map(
            addItemList => (<Form key={data.id} addItemList={addItemList} onRemove={onRemove}/>)
        );
        return(
            <ul className='data-batch'>{list}</ul>
        )
    }
}

export default AddInfoList;

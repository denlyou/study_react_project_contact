import React from 'react';

export default class ContactDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handeKeypress = this.handeKeypress.bind(this);
    }

    handeKeypress(e) {
        if(e.charCode === 13) {
            this.handleToggle();
        }
    }
    handleEdit(){
        this.props.onEdit(this.state.name, this.state.phone);
    }
    handleToggle(){
        if(!this.state.isEdit){
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        }else{
            this.handleEdit();
        }
        this.setState({ // async method
            isEdit: !this.state.isEdit
        });
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    render(){
        const detail = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const edit = (
            <div>
                <p><input type="text" name="name" placeholder="이름" value={this.state.name} onChange={this.handleChange} /></p>
                <p><input type="text" name="phone" placeholder="전화번호" value={this.state.phone} onChange={this.handleChange} 
                    onKeyPress={this.handeKeypress}/></p>
            </div>
        );
        const view = this.state.isEdit ? edit : detail;
        const blank = (<div>(select item)</div>);
        return (
            <div>
                <h2>Details</h2>
                { this.props.isSelected ? view : blank }
                <button onClick={this.handleToggle}>{ this.state.isEdit ? '완료':'수정' }</button>
                <button onClick={this.props.onRemove}>삭제</button>
            </div>
        )
    }
}

// ContactDetail.propTypes = {
//     onEdit: React.propTypes.func
// }
ContactDetail.defaultProps = {
    onEdit: () => { console.error('onEdit 전달안함') },
    onRemove: () => { console.error('onRemove 전달안함') },
    contact: {
        name: '' , 
        props: ''
    }
}
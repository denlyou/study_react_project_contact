import React from 'react';

export default class ContactCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handelClick = this.handelClick.bind(this);
        this.handeKeypress = this.handeKeypress.bind(this);
    }

    handeKeypress(e) {
        if(e.charCode === 13) {
            this.handelClick();
        }
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }
    handelClick(){
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        }
        this.props.onCreate(contact);
        this.setState({
            name: '',
            phone: ''
        });

        this.nameInput.focus();
    }
    render(){
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    {/* ref는 가급적 사용하지 말것 */}
                    <input ref={ ref=>{this.nameInput = ref} } type="text" name="name" placeholder="이름" value={this.state.name} onChange={this.handleChange} />
                    <input type="text" name="phone" placeholder="전화번호"  value={this.state.phone} onChange={this.handleChange}
                        onKeyPress={this.handeKeypress} />
                    <button onClick={this.handelClick}>생성</button>
                </p>
            </div>
        )
    }
}

// ContactCreate.propTypes = {
//     onCreate: React.propTypes.func
// }

ContactCreate.defaultProps = {
    onCreate: () => { console.error('onCreate 전달안함') }
}
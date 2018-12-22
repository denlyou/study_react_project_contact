import React from 'react';
import update from 'react-addons-update'; // https://www.npmjs.com/package/react-addons-update (immutable helper)
import ContactInfo from './ContactInfo';
import ContactDetail from './ContactDetail';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectdKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        const contactData = localStorage.contactData;
        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        const nowData = JSON.stringify(this.state.contactData);
        if( nowData !== JSON.stringify(prevState.contactData) ){
            localStorage.contactData = nowData;
        }
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }
    handleRemove() {
        if( this.state.selectdKey < 0 ) return;
        this.setState({
            contactData: update(this.state.contactData, 
                { $splice: [[this.state.selectdKey, 1]] }
            ) ,
            selectdKey: -1
        });
    }
    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectdKey] : {
                    name: { $set: name },
                    phone: { $set: phone }
                }
            })
        });
    }

    handleChange(e){        
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key){
        console.log(key, 'is selected');
        this.setState({
            selectdKey: key
        });
    }
    
    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter( (contact)=>{ 
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1
            } );
            return data.map((contact, i) => {
                return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={ ()=> this.handleClick(i) } />
                );
            });
        };
        
        return (
            <div>
                <h1>Contacts</h1>
                <input 
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>

                <ContactDetail
                    isSelected={ this.state.selectdKey !== -1 }
                    contact={this.state.contactData[this.state.selectdKey]}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                    />

                <ContactCreate 
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

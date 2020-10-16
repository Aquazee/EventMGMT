import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from "../../actions/dashboard";
import "./Index.css";
import { IsLetters, IsNumber } from "../../utils/validators";

const labels = ['Name', 'Description', 'Venue', 'Price', 'Discount'];
const vals = { 'Name': '', 'Description': '', 'Venue': '', 'Price': '', 'Discount': '' }

String.prototype.toTitleCase = function () {
    return this.split(' ')
        .map(w => (!IsNumber.test(w[0]) ? w[0].toUpperCase() : w[0]) + w.substr(1).toLowerCase())
        .join(' ')
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [...vals],
            error: {},
            tform: false,
            selected: 'All'
        };
    }

    componentDidMount() {

    }

    toggleForm = () => {
        this.setState({ tform: !this.state.tform })
    }

    setData(e) {
        //event.preventDefault();
        let key = e.target.labels[0].innerText.split(' *')[0];
        let data = this.state.data;
        let error = this.state.error;
        // data[key] = e.target.value
        error[key] = this.checkError(key, e.target.value)
        this.setState({ [key]: e.target.value, error })
    }

    checkError(key, value) {
        if (value == '') {
            return (key + ' should not be blank')
        }
        switch (key) {
            case 'Name':
                if (value.split(' ').map(i => IsLetters.test(i) || IsNumber.test(i)).indexOf(false) != -1) {
                    return 'Name should only contain spaces, letters or Numbers.'
                }
                break;
            case 'Description':
                //
                break;
            case 'Venue':
                //
                break;
            case 'Price':
                if (!IsNumber.test(value.trim())) {
                    return 'Price should only contain numbers.'
                }
                break;
            case 'Discount':
                if (!IsNumber.test(value.trim())) {
                    return 'Discount should only contain numbers.'
                }else if(parseInt(this.state.Price) === 0 && parseInt(value.trim()) > parseInt(this.state.Price)){
                    return 'Discount cannot be more then price.'
                }
                break;
            default:
            // code block
        }

    }

    submitEvent(event) {
        event.preventDefault();
        let errors = [];
        let data = {}
        labels.map(key => {
            data[key] = this.state[key];
            if (this.checkError(key, this.state[key])) {
                errors.push(key);
            }
        })

        if (errors.length === 0) {
            this.props.createEvent(data)
            this.setState({ tform: !this.state.tform, })
            this.clearForm();

        } else {
            alert('Please resolve errors.')
        }
    }

    clearForm() {
        this.setState({ 'Name': '', 'Description': '', 'Venue': '', 'Price': '', 'Discount': '' },()=>{
            console.log(this.state)
        })
    }

    setSelected(e) {
        console.log('selected ' + e.target.value)
        this.setState({ selected: e.target.value })
    }

    render() {
        const { eventlist } = this.props;
        let options = ['All', 'Free', 'Discount', 'No Discount']
        return (
            <div className="row cont">
                <div className={("col-0 col-lg-4 col-md-4 col-sm-0 col-xs-0")}></div>
                <div className={("col-12 col-lg-4 col-md-4 col-sm-12 col-xs-12")}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <h5>{this.state.tform ? 'Add Event' : 'All Events'}</h5>
                        <div className="pull-left sideOptions">
                            {!this.state.tform ? <select
                                onChange={(e) => this.setSelected(e)}
                                value={this.state.selected}
                                className={"form-control seloption"}
                                id="exampleFormControlSelect1">
                                <option value={'All'}>All</option>
                                <option value={'Free'} >Free</option>
                                <option value={'Discount'} >Discount</option>
                                <option value={'No Discount'} >No Discount</option>
                            </select> : null}
                            <button onClick={this.toggleForm.bind(this)} type="submit" className="btn btn-primary pull-right">{this.state.tform ? 'cancel' : 'Add'}</button>
                        </div>

                    </div>
                    <div id="AddEvent" className={this.state.tform ? 'd-block' : 'd-none'}>
                        <form id={'myForm'} autoComplete="off" onSubmit={this.submitEvent.bind(this)}>
                            <InputItem
                                key={'labels' + 1}
                                onChange={this.setData.bind(this)}
                                value={this.state['Name']}
                                type={'text'}
                                label={'Name'}
                                error={this.state.error['Name']}
                                index={1} />
                            <InputItem
                                key={'labels' + 2}
                                onChange={(key, val) => this.setData(key, val)}
                                value={this.state['Description']}
                                type={'textarea'}
                                label={'Description'}
                                error={this.state.error['Description']}
                                index={2} />
                            <InputItem
                                key={'labels' + 3}
                                onChange={(key, val) => this.setData(key, val)}
                                value={this.state['Venue']}
                                type={'text'}
                                label={'Venue'}
                                error={this.state.error['Venue']}
                                index={3} />
                            <InputItem
                                key={'labels' + 4}
                                onChange={(key, val) => this.setData(key, val)}
                                value={this.state['Price']}
                                type={'text'}
                                label={'Price'}
                                error={this.state.error['Price']}
                                index={4} />
                            <InputItem
                                key={'labels' + 5}
                                onChange={this.setData.bind(this)}
                                value={this.state['Discount']}
                                type={'text'}
                                label={'Discount'}
                                error={this.state.error['Discount']}
                                index={5} />

                            {/* <div className="form-group">
                                <label htmlFor="eventVenue">Venue</label>
                                <input type="text" className="form-control" id="eventVenue" placeholder="" />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label htmlFor="eventPrice">Price</label>
                                    <input type="text" className="form-control" id="eventVenue" placeholder="" />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="eventDiscount">Discount</label>
                                    <input type="text" className="form-control" id="eventDiscount" placeholder="" />
                                </div>
                            </div> */}
                            <div>
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button type="reset" className="btn btn-primary" onClick={() => this.clearForm()}>Clear</button>
                            </div>
                        </form>
                    </div>
                    <div id="AllEvents" className={this.state.tform ? 'd-none' : 'd-block'}>
                        {
                            // eventlist.length > 0 ? eventlist.map((i, index) => {
                            //     return <EventItem {...i} key={'list' + index} />
                            // }) : <span className="notfound">No Events Found</span>
                            eventlist.length > 0 ? eventlist.map((i, index) => {
                                if (this.state.selected === 'All') {
                                    return <EventItem {...i} key={'list' + index} />
                                } else if (this.state.selected === 'Discount' && parseInt(i.Discount) > parseInt(0)) {
                                    return <EventItem {...i} key={'list' + index} />
                                } else if (this.state.selected === 'No Discount' && parseInt(i.Discount) === 0) {
                                    return <EventItem {...i} key={'list' + index} />
                                } else if (this.state.selected === 'Free' && parseInt(i.Price) === 0) {
                                    return <EventItem {...i} key={'list' + index} />
                                }
                            }) : <span className="notfound">No Events Found</span>
                        }
                    </div>
                </div>
                <div className={("col-0 col-lg-4 col-md-4 col-sm-0 col-xs-0")}></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    eventlist: state.dashboard.data,
});

const mapDispatchToProps = dispatch => ({
    createEvent: (data) => dispatch(createEvent(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

const InputItem = ({ label, value, error, type, index, onChange }) => {
    let lbl = 'event' + label;
    return <div className="form-group">
        <label htmlFor={lbl}>{label} <span className="red">*</span></label>
        <input type={type} name={label} className="form-control" id={lbl} value={value} tabIndex={index} onChange={onChange} />
        {error && <span className="error">{error}</span>}
    </div>
}

const EventItem = ({ Name, Description, Venue, Price, Discount }) => {
    return <div className="card event">
        <div className="event-name">{Name.toTitleCase()}</div>
        <div className="event-desc">{Description.toTitleCase()}</div>
        <div className="ct-items">
            <span className="event-item"><i className="fas fa-map-marker"></i>{Venue}</span>
            <span className="event-item"><i className="fas fa-currency"></i>{Price}</span>
            <span className="event-item"><i className="fas fa-location"></i>{Discount}</span>
        </div>
    </div>
}


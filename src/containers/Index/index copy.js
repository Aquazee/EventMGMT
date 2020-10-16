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
        data[key] = e.target.value
        error[key] = this.checkError(key, data[key])
        this.setState({ data, error })
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
                }
                break;
            default:
            // code block
        }

    }

    submitEvent(event) {
        event.preventDefault();
        let errors = [];
        for (var key in this.state.data) {
            if (this.checkError(key, this.state.data[key])) {
                errors.push(key);
            }
        }

        if (errors.length === 0) {
            this.props.createEvent(this.state.data)
            this.setState({ tform: !this.state.tform, data: [...vals] })

        } else {
            alert('Please resolve errors.')
        }
    }

    clearForm() {
        this.setState({ data: [...vals] })
    }

    setSelected(e) {
        console.log('selected ' + e.target.value)
        this.setState({ selected: e.target.value })
    }

    render() {
        const { eventlist } = this.props;
        let options = ['All', 'Free', 'Discount', 'No Discount'];
        return (
            <div className="row cont">
                <div className={("col-4 col-md-4 col-sm-0 col-xs-0")}></div>
                <div className={("col-4 col-md-4 col-sm-12 col-xs-12")}>

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
                        <form id={'myForm'} onSubmit={this.submitEvent.bind(this)}>
                            {
                                labels.map((i, index) => {
                                    return <InputItem
                                        key={'labels' + index}
                                        onChange={this.setData.bind(this)}
                                        value={this.state.data[i]}
                                        type={i == 'Description' ? 'textarea' : 'text'}
                                        label={i}
                                        error={this.state.error[i]}
                                        index={index} />
                                })
                            }


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
                                } else if (this.state.selected === 'Discount' || parseInt(i.Discount) > parseInt(0)) {
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
                <div className={("col-4 col-md-4 col-sm-0 col-xs-0")}></div>
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


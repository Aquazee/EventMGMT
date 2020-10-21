import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from "../../actions/dashboard";
import "./Index.css";
import { IsLetters, IsNumber } from "../../utils/validators";
import InputItem from "../../components/InputItem/InputItem";
import EventItem from "../../components/EventItem/EventItem";

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
            selected: 'All',
            selectedsort : 'Price'
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
                } else if (parseInt(this.state.Price) === 0 && parseInt(value.trim()) > parseInt(this.state.Price)) {
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
        this.setState({ 'Name': '', 'Description': '', 'Venue': '', 'Price': '', 'Discount': '' }, () => {
            console.log(this.state)
        })
    }

    setSelected(e) {
        console.log('selected ' + e.target.value)
        this.setState({ selected: e.target.value })
    }

    setSortOrder(e) {
        console.log('selected ' + e.target.value)
        this.setState({ selectedsort: e.target.value })
    }

    changeEventList() {
        const { selected, selectedsort } = this.state;
        const { eventlist } = this.props;
        return eventlist.filter((i, index) => {
            if (selected === 'All') {
                return i
            } else if (selected === 'Discount' && parseInt(i.Discount) > parseInt(0)) {
                return i
            } else if (selected === 'No Discount' && parseInt(i.Discount) === 0) {
                return i
            } else if (selected === 'Free' && parseInt(i.Price) === 0) {
                return i
            }
        }).sort((a, b) => a[selectedsort] - b[selectedsort])
    }

    render() {
        let eventlist = this.changeEventList()
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
                            {!this.state.tform ? <select
                                onChange={(e) => this.setSortOrder(e)}
                                value={this.state.selectedsort}
                                className={"form-control seloption"}
                                id="exampleFormControlSelect1">
                                <option value={'Price'}>Price</option>
                                <option value={'Discount'} >Discount</option>
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
                                return <EventItem {...i} key={'list' + index} />

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
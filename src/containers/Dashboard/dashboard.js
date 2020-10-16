import React, { Component, lazy, Suspense } from 'react';
import './index.css';


class ListItem extends React.PureComponent {
  render() {
    const { selectedElement, item, index, onPress } = this.props;
    let selectedTab = selectedElement == index;
    return <div key={index} className="col-12 shd-effect cus-card">
      
    </div>
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElement : ''
    }
    this.selectedElement = -1
  }

  toggleShow(index) {
    this.setState({ selectedElement  : index}) 
  }

  render() {
    const { isESidebar, selectedTab } = this.props;
    //const { sidebar } = this.state;
    let sidebar = isESidebar;
    let x = result.result.funds.slice(0, 15);
    return <div className="row">
      <div className="main col-12">
        <div className="col-12 input-group shd-effect mb-10">
          <input className="form-control border-0 w-80" placeholder="&#xF002; Search Users by ID, Address, Name . . " style={{ width: "87%", padding: "20px 15px" }} />
          <div className="input-group-prepend blue-color">
            <span><i className="fas fa-search"></i></span>
          </div>
        </div>
        
      </div>
    </div>
  }
}

export default Dashboard;
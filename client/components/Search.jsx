import React from 'react';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate : moment(),
      category: '',
      radius: '',
      time: '',
      categoryId:'',
      categoryMenuItem: 1,
      radiusItem: 1
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.search = this.search.bind(this);
    this.radiusInMiles = ['2', '5', '10', '25'];
  }

  componentDidMount() {
    this.setState({
      radius: this.radiusInMiles[0],
      time: this.state.startDate.valueOf()
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      this.setState({
        category: nextProps.categories[0].name,
        categoryId: nextProps.categories[0].id
      });
    }
  }

  handleDateChange(event, date) {
    this.setState({
      startDate: date
    });
    this.setState(
      {
        startDate: date,
        time: date.getTime()
    });
  }

  handleCategoryChange(event, key, payload) {
    this.props.categories.forEach((category, index) => {
      if (index + 1 === key) {
        this.setState({
          category: category.name,
          categoryId: category.id,
          categoryMenuItem: payload
        });
      }
    });
  }

  handleRadiusChange(event, key, payload) {
    this.radiusInMiles.forEach((distance, index) => {
      if (key === index + 1) {
        this.setState({
          radius: distance,
          radiusItem: payload
        });
      }
    });
  }

  search() {
    var searchOptions = {
      radius: this.state.radius,
      startDate: this.state.time,
      category: this.state.category,
      categoryId: this.state.categoryId
    };
    this.props.handleSearch(searchOptions);
  }

  render() {
    let categories = this.props.categories;
    return(
      <div classname="secondBar">
        <span className="category">
        <DropDownMenu
          value={this.state.categoryMenuItem}
          onChange={this.handleCategoryChange}
          // style={styles.customWidth}
          autoWidth={true}
        >
        <MenuItem value={1} primaryText="Pick Topic"/>
        {categories.map((category, index) => {
          return <MenuItem primaryText={category.name} value={index + 2} key={category.id}/>
        })}
        </DropDownMenu>
        </span>
        <span className="radius">
          <DropDownMenu
            value={this.state.radiusItem}
            onChange={this.handleRadiusChange}
            autoWidth={true}
          >
            <MenuItem primaryText="Distance" value={1} key={-1}/>
            <MenuItem primaryText="2 miles" value={2} key={0}/>
            <MenuItem primaryText="5 miles" value={3} key={1}/>
            <MenuItem primaryText="10 miles" value={4} key={2}/>
            <MenuItem primaryText="25 miles" value={5} key={3}/>
          </DropDownMenu>
        </span>
        <span className="calendar">
          <DatePicker
            onChange={this.handleDateChange}
            value={this.state.startDate}
            hintText="Look By Date"
          />
        </span>
        <span>
          <RaisedButton className="searchButton" label="Search" onClick={this.search}/>
        </span>
      </div>
    );
  }
}

export default Search;

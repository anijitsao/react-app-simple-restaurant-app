import React, { Component } from 'react';

// components 
import Header from './components/layout/Header';
import Content from './components/Content';
import Hero from './components/layout/Hero'


// css
import './css/style.css'


class App extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.state = {
      showContent: false,
      searchText: ''
    }
    this.searchByValue = this.searchByValue.bind(this)
  }

  searchByValue(searchText) {
    console.log('Search text is now', searchText)
    this.setState({ showContent: true, searchText })
  }


  render() {
    let { showContent, userInfo, searchByValue, searchText } = this.state
    return (
      <div className="container">
      { /* including the Title and other components */ }
        <Header/>
      { (showContent == false) 
        ? <Hero searchByValue={this.searchByValue}/>
        : <Content searchText={searchText} userInfo={userInfo}/> }
      
    </div>
    );
  }
}

export default App;
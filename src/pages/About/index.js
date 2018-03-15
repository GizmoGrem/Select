import React from 'react';
import CustomSelect from 'components/CustomSelect';
import axios from 'axios'
import './style.styl';

class About extends React.Component {
  state = {
    value: '',
    items: []
  };
  componentDidMount(){
    axios({
      method:'get',
      url:'https://restcountries.eu/rest/v2/all',
    }).then((response)=>{
      this.setState({items:response.data})
    });
  };

  onSelectHandler = (value) => {
    this.setState({ value });
  };

  render() {

    const { value, items } = this.state;

    return (
      <div className='About'>
        { items.length > 0 &&
          <CustomSelect
            itemHeight={50}
            itemsCount={7}
            value={value}
            onSelect={this.onSelectHandler}
            placeholder={'Select country'}
            items={items}
          />
        }
      </div>
    )
  }
}

export default About;
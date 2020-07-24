import React from 'react';
import config from '../../config'

export default class SuccessStories extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      adopted: []
    }
  }

  async componentDidMount() {
    const res = await fetch(`${config.API_ENDPOINT}/api/adopted`)
    const json = await res.json();

    this.setState({
      adopted: json
    })
  }

  render() {

    const adopted = this.state.adopted.map((a, b) => {
      return (
        <li key={b}>
          <img src={a.imageURL} className='adopted-image' />
          <p>{a.name}, adopted by {a.newOwner}</p>
        </li>
      );
    });
    return <>
      <ul className='adopted-animal'>
        {this.state.adopted.length > 0 ? adopted : <h3 className='no-adoption-message'>No pets have been adopted yet. Adopt one today!</h3>}
      </ul>
    </>;
  }
}

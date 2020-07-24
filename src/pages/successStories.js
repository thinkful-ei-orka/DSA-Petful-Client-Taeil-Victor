import React from 'react';
import apiConfig from '../api-config'

export default class SuccessStories extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      adopted: []
    }
  }

  async componentDidMount() {
    fetch(`${apiConfig.API_ENDPOINT}/api/adopted`)
    .then(res => res.json())
    .then(json => {
      this.setState({adopted: json})
    })
    .catch(e => console.log(e))
    // console.log(res)
    // const json = await res.json();
    // console.log(json)

    // this.setState({
    //   adopted: json
    // })
  }

  render() {

    // const adopted = this.state.adopted.map(a => {
    //   return (
    //     <li key={a}>
    //       <img src={a.imageURL} alt='Adopted pet' className='adopted-image' />
    //       <p>{a.name}, adopted by {a.newOwner}</p>
    //     </li>
    //   );
    // });

    let adopted = this.state.adopted
    console.log(adopted)
    while (adopted.first !== null) {
      return (
        <li key={adopted}>
          <img src={adopted.imageURL} alt='Adopted pet' className='adopted-image' />
          <p>{adopted.name}, adopted by {adopted.newOwner}</p>
        </li>
      )
    }

    return <>
      <ul className='adopted-animal'>
        {this.state.adopted.length > 0 ? adopted : <h3 className='no-adoption-message'>No pets have been adopted yet. Adopt one today!</h3>}
      </ul>
    </>;
  }
}

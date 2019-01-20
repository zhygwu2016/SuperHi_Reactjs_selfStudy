import React, { Component } from 'react';

class Gif extends Component {
  // when our video has loaded we added a loaded className
  // otherwise the video stays hidden

  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  render(){
    const {loaded} = this.state
    const {images} = this.props
    return(
      <video
        className = {`grid-item video ${loaded ? 'loaded' : ''}`}
        autoPlay
        loop
        src={images.original.mp4}        
        onLoadedData = {() => this.setState({loaded: true})}
      />
      // 以上：
      // when we have the loaded state as true, we add a loaded class
      // when the video loads we set the loaded state to be true
      // 另一种写法：className = {`grid-item video ${loaded && 'loaded'}`}
    )
  }
}

export default Gif;

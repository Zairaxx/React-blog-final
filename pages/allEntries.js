
import React, { Component } from 'react'
import NewPost from '../components/NewPost'
import Navigation from '../components/Navigation';
import styled from 'styled-components'
import moment from 'moment'
import App from '../components/App'

export default class allEntries extends Component {

  render() {
    return (
      <div>
        <Navigation/>
        <App/>
      </div>
    )
  }
}

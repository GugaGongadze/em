import React from 'react'
import { connect } from 'react-redux'
import { store } from '../store.js'

// constants
import {
  EM_TOKEN,
} from '../constants.js'

// util
import {
  meta,
  restoreCursorBeforeSearch,
} from '../util.js'

// components
import { Modal } from './Modal.js'

// action-creators
import home from '../action-creators/home.js'

/** A link to the home screen */
export const HomeLink = connect(state => ({
  dark: !meta([EM_TOKEN, 'Settings', 'Theme']).Light,
  focus: state.present.focus,
  showModal: state.present.showModal,
}))(({ dark, focus, showModal, inline, dispatch }) =>
  <span className='home'>
    <a tabIndex='-1'/* TODO: Add setting to enable tabIndex for accessibility */ href='/' onClick={e => {
      e.preventDefault()
      if (store.getState().present.search != null) {
        dispatch({ type: 'search', value: null })
        restoreCursorBeforeSearch()
      }
      else {
        home()
      }
    }}>
      <span role='img' arial-label='home'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          className='logo'
          fill={dark ? '#FFF' : '#000'}
          alt='em'>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </span>
    </a>
    {showModal === 'home'
      ? <Modal id='home' title='Tap the "em" icon to return to the home context' arrow='arrow arrow-top arrow-topleft' />
      : null
    }
  </span>
)

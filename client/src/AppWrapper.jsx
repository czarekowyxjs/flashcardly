import React, { Component } from 'react';
import axios from 'axios';
import App from './App.jsx';
import SetLanguage from './helpers/SetLanguage.jsx';

import "./Layout.css";

class AppWrapper extends Component {
  state = {
    fetchedLang: false,
    setLang: false,
    lang: {}
  }

  componentDidMount() {
    this.fetchLang();
  }

  fetchLang = async () => {
    const langID = localStorage.getItem("lang") === null ? 2 : localStorage.getItem("lang");
    try {
      const response = await axios.get(`/api/v1/service/language?lid=${langID}`);

      if(response.status === 200) {
        this.setState({
          fetchedLang: true,
          lang: response.data.lang
        });
      }

    } catch(e) {
      console.log(e.response);
    }   
  }

  setLangDone = () => {
    this.setState({
      setLang: true
    });
  }

  render() {
    const methods = {
      setLangDone: this.setLangDone
    };

    if(!this.state.fetchedLang) return null;
    if(this.state.fetchedLang && !this.state.setLang) return <SetLanguage methods={methods} lang={this.state.lang}/>;
    return <App/>;
  }
}

export default AppWrapper;
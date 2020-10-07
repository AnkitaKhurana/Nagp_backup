import React, { Component } from "react";
const styles = {
  footer : {
    marginTop :'calc(5% + 60px)',
    bottom: 0,
    position: 'fixed',
    backgroundColor : 'black',
    width: '100%',
    color:'white',
    textAlign: 'center'
  }
};

class Footer extends Component {
  render() {
    return <React.Fragment ><span style={styles.footer}>Ankita Khurana</span></React.Fragment>;
  }
}

export default Footer;

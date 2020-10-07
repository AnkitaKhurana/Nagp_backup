import React from 'react';

let navStyle = {
    backgroundColor: 'rgb(19, 151, 247)',
    color : 'white',
    textAlign: 'center',
    margin:'auto',
    padding:'3%'
};

let navTitleStyle = {
    fontSize: '25px',
    margin:'2%'
};

let navImageStyle = {
    maxWidth: '100px',
    maxHeight: '100px',
    marginBottom: '-15px'
};

export default class NavBar extends React.Component{


    render()
    {
        return(
                <nav className="navbar navbar-light" style={navStyle}>
                    <span className="navbar-text" style={navTitleStyle}>
                         'We Hate Nihal Chauhan' Club &nbsp;
                         &nbsp;
                         &nbsp;

                         <img style={navImageStyle} src="/images/glag.jpg" alt="Club Image"></img>
                    </span>
                </nav>
        )
    }

}
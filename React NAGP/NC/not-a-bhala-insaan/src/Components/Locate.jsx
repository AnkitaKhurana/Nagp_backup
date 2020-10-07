import React from 'react';

// export default class Locate extends React.Component{

//     render(){
//         return (<iframe
//             width="600"
//             height="450"
//             frameborder="0" style="border:0"
//             src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2yd2LhGCjaD8tEff8LlDh3s8DTxSph9k
//               &q=Space+Needle,Seattle+WA" allowfullscreen>
//           </iframe>);
//     }

// };

// // var Iframe = React.createClass({     
// //     render: function() {
// //       return(         
// //         <div>          
// // <iframe
// //   width="600"
// //   height="450"
// //   frameborder="0" style="border:0"
// //   src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2yd2LhGCjaD8tEff8LlDh3s8DTxSph9k
// //     &q=Space+Needle,Seattle+WA" allowfullscreen>
// // </iframe>        </div>
// //       )
// //     }
// //   });


// //   export default Iframe;
import ReactDOM from "react-dom";

var createReactClass = require('create-react-class');


var Frame =createReactClass({
    // render: function() {
    //     return <iframe 
    //     width="600" 
    //     height="450" 
    //     frameBorder="0" 
    //     style={{"border":"0"}} 
    //     src="https://www.google.com/maps/embed/v1/place?zoom=17&center=28.5701%2C77.3891&key=AIzaSyB2yd2LhGCjaD8tEff8LlDh3s8DTxSph9k&q=Eiffel+Tower,Paris+France" allowFullScreen>
    //     </iframe>
    //     ;
    //   },
    render : function(){
        return <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1751.9979277367522!2d77.38813407260355!3d28.569887169391905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef5d5b9b3753%3A0x5ce3dc9d61d5e0a6!2sPrateek%20Wisteria%2C%20Sector%2077%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1588923422642!5m2!1sen!2sin" width="auto" height="450" frameBorder="0"  style={{"border":"0"}}  allowFullScreen="" aria-hidden="false" tabindex="0"></iframe>;
    },
      componentDidMount: function() {
        this.renderFrameContents.call(this);
      },
      renderFrameContents: function() {
        var doc = ReactDOM.findDOMNode(this).contentDocument
        if(doc.readyState === 'complete') {
            ReactDOM.render(this.props.children, doc.body);
        } else {
           setTimeout(this.renderFrameContents, 0);
        }
      },
      componentDidUpdate: function() {
        this.renderFrameContents.call(this);
      },
      componentWillUnmount: function() {
          console.log(ReactDOM.findDOMNode(this))
        // React.unmountComponentAtNode(ReactDOM.findDOMNode(this).contentDocument);
      }
    });


    export default Frame;
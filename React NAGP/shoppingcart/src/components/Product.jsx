import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchOneProductAction } from '../actions/actions';
import { connect } from 'react-redux';
import { addToCartAction, showToastFunction } from '../actions/actions';
import { Link } from 'react-router-dom';

const styles = {
    mainArea: {
        width: '80%',
        margin: 'auto'
    },
    card: {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        width: '100%',
        height: 'auto',
        display: 'inline-flex',
        marginLeft: '0%',
        marginBottom: '10%'
    },
    container: {
        padding: '2px 16px',
        position: 'relative',
        backgroundColor: '#efefef'

    },
    image: {
        minHeight: '140px',
        minWidth: '140px',
        width: '100%',
        textAlign: 'center'
    },
    price: {
        display: 'inline-block'
    },
    priceWithDiscount: {
        display: 'inline-block',
        textDecoration: 'line-through'
    },
    discount: {
        display: 'inline-block',
        color: 'red',
        paddingLeft: '20px'
    },
    discountTag: {
        padding: '2px',
        backgroundColor: '#70c35d',
        color: 'white',
        fontSize: 20.5
    },
    cardButton: {
        marginTop: '17px',
        backgroundColor: 'white',
        color: '#0099ff',
        display: 'inline-block',
        borderColor: '#0099ff',
        ":hover": {
            backgroundColor: '#0099ff',
            color: '#white',
            borderColor: 'white',
        },
        marginBottom: '1%'
    }

};
export class Product extends Component {

    constructor(props) {
        super(props);
        this.handleCartAdd = this.handleCartAdd.bind(this);

    }
    handleCartAdd() {
        this.props.addToCartAction({
            product: this.props.product
        });
        this.props.showToastFunction();

    }
    componentDidMount() {
        this.props.fetchOneProductAction(this.props.match.params.id);
    }

    render() {
        return (
            <React.Fragment>
                <div style={styles.mainArea}>

                    <Link to="/"> <span>Back</span></Link>
                    <hr></hr>
                    <div style={styles.card}>
                        <img src={this.props.product.img_url} alt="Item" style={styles.image} />
                        <div style={styles.container}>
                            <h2><b>{this.props.product.name}</b></h2>

                            {(this.props.product.discount) > 0 &&
                                (<React.Fragment>
                                    <div style={styles.discountTag}>{this.props.product.discount}% OFF</div>
                                    <p style={styles.priceWithDiscount}>${this.props.product.price}</p>
                                    <p style={styles.discount}><b>Price:</b> ${this.props.product.price - this.props.product.discount * this.props.product.price / 100}</p></React.Fragment>)
                            }
                            {(this.props.product.discount) <= 0 &&
                                (<React.Fragment><p style={styles.price}>${this.props.product.price}</p></React.Fragment>)
                            }
                            <p><b>Model Number : </b>{this.props.product.model_no}</p>
                            <p><b>Colors Available : </b>{this.props.product.color}</p>
                            <p><b>Screen Size: </b>{this.props.product.screen_size}</p>
                            <p><b>Operating System: </b>{this.props.product.os}</p>
                            <p><b>RAM : </b>{this.props.product.ram}</p>
                            <p><b>Storage: </b>{this.props.product.storage}</p>

                            <div style={{ 'textAlign': 'center' }}>
                                <button style={styles.cardButton} onClick={this.handleCartAdd}><span>Add to Cart</span></button>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}


Product.propTypes = {
    product: PropTypes.object,
    fetchOneProductAction: PropTypes.func.isRequired,
    addToCartAction: PropTypes.func.isRequired,
    showToastFunction: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        product: state.product.currentProduct
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCartAction: details => dispatch(addToCartAction(details)),
        showToastFunction: () => dispatch(showToastFunction()),
        fetchOneProductAction: (id) => dispatch(fetchOneProductAction(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
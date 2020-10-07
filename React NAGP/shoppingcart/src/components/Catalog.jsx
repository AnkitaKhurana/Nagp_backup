import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProductsAction, fetchProductsReal } from '../actions/actions';
import Card from './common/Card';
import SearchBox from './SearchBox';

const styles = {
    catalog: {
        width: '80%',
        margin: 'auto',
        paddingTop: '5%'
    },
    head: {
        fontSize: 'larger',
        fontFamily: 'initial',
        color: '#4c4848',
        display: 'inline-block'
    }
}

class Catalog extends Component {

    componentDidMount() {
        this.props.fetchProductsAction();
        this.props.fetchProductsReal();
    }

    render() {


        return (
            <div style={styles.catalog}>
                <div style={styles.head}>All Items</div>&nbsp;	&nbsp;	

                <SearchBox />
                <hr></hr>
                {this.props.res ?
                    Object.keys(this.props.res).map((item, i) => <Card product={this.props.res[item]} key={i}></Card>)
                    : (
                        <p>Fetching Products...........</p>
                    )}
            </div>
        );
    }
}

Catalog.propTypes = {
    fetchProductsAction: PropTypes.func.isRequired,
    fetchProductsReal: PropTypes.func.isRequired,
    res: PropTypes.array,
    cartCost: PropTypes.number.isRequired,
    enabled: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    return {
        res: state.product.displayProducts,
        enabled: (Object.entries(state.cart.cartItems).length > 0 ? 1 : 0),
        cartCost: state.cart.cartCost
    }
}

export default connect(mapStateToProps, { fetchProductsAction, fetchProductsReal })(Catalog);
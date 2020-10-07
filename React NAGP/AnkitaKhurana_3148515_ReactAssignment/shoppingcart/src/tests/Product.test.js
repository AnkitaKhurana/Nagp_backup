import React from 'react';
import { Product } from '../components/Product';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'


describe('Product Component Testing', () => {
    let props = {};

    beforeEach(() => {
        jest.mock('react-redux', () => {
            return {
                connect: (mapStateToProps, mapDispatchToProps) => (ReactComponent) => ({
                    mapStateToProps,
                    mapDispatchToProps,
                    ReactComponent
                }),
                Provider: ({ children }) => children
            }
        });
        props = {
            product: { model_no: 0, color: 'someCOLOR', screen_size: 2, os: 'someOS', ram: 2, storage: 2, img_url: 'someIMG' },
            match: { params: { id: 1 } },
            fetchOneProductAction: () => { },
            addToCartAction: () => { },
            showToastFunction: () => { }

        }
    });

    it('renders without Crashing', () => {
        const product = shallow(<Product  {...props} />);
    });

    it('renders the correct Model Number', () => {
        const product = mount(<MemoryRouter><Product  {...props} /></MemoryRouter>);
        expect(product.find('p').at(0).text()).toEqual('Model Number : ' + props.product.model_no);
    });

    it('renders the correct Image ', () => {
        const product = mount(<MemoryRouter><Product  {...props} /></MemoryRouter>);
        expect(product.find("img").prop("src")).toEqual(props.product.img_url);
    });

    it('renders the correct Colors', () => {
        const product = mount(<MemoryRouter><Product  {...props} /></MemoryRouter>);
        expect(product.find('p').at(1).text()).toEqual('Colors Available : ' + props.product.color);
    });

    it('renders the correct Screen Size', () => {
        const product = mount(<MemoryRouter><Product  {...props} /></MemoryRouter>);
        expect(product.find('p').at(2).text()).toEqual('Screen Size: ' + props.product.screen_size);
    });

    it('renders the correct Operating System', () => {
        const product = mount(<MemoryRouter><Product  {...props} /></MemoryRouter>);
        expect(product.find('p').at(3).text()).toEqual('Operating System: ' + props.product.os);
    });

    it('renders the correct RAM ', () => {
        const product = mount(<MemoryRouter><Product  {...props} /></MemoryRouter>);
        expect(product.find('p').at(4).text()).toEqual('RAM : ' + props.product.ram);
    });

    it('renders the correct Storage', () => {
        const product = mount(<MemoryRouter><Product  {...props} /></MemoryRouter>);
        expect(product.find('p').at(5).text()).toEqual('Storage: ' + props.product.storage);
    });


});




import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import PaginationBox from '../components/PaginationBox';

describe('Pagination Box Component Testing', () => {

    it('renders without crashing', () => {
        shallow(<PaginationBox />);
    });

    it('renders correct number of pages', () => {
        const props = {
            totalProducts: 10,
            limit: 4
        }
        const page = mount(<PaginationBox {...props} />);
        expect(page.find('input').length).toEqual(Math.ceil(props.totalProducts / props.limit));
    });

});


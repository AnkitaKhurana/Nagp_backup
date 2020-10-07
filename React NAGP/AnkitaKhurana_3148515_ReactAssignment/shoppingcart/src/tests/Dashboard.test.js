import React from 'react';
import { Dashboard } from '../components/Dashboard';
import Header from '../components/common/Header';
import { shallow, mount } from 'enzyme';
import Footer from '../components/common/Footer';


describe('Dashboard Component Testing', () => {
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
        })
    });
    it('renders without Crashing', () => {
        const dashboardProps = {
            cartCost: 0,
            enabled: 0
        }
        const context = { user: { loggedIn: false } };
        const dashboard = shallow(<Dashboard  {...dashboardProps} />, { context });      
    });

    it('contains HEADER Component', () => {
        const dashboardProps = {
            cartCost: 0,
            enabled: 0
        }
        const context = { user: { loggedIn: false } };
        const dashboard = shallow(<Dashboard  {...dashboardProps} />, { context });
        expect(dashboard.containsMatchingElement(<Header />)).toBe(true);
    });
    it('contains FOOTER Component', () => {
        const dashboardProps = {
            cartCost: 0,
            enabled: 0
        }
        const context = { user: { loggedIn: false } };
        const dashboard = shallow(<Dashboard  {...dashboardProps} />, { context });
        expect(dashboard.containsMatchingElement(<Footer />)).toBe(true);
    });
});



    
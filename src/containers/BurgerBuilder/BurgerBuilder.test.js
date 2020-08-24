import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder ingredients={{lettuce: 0, bacon: 0, cheese: 0, beef: 0}}/>);
    });

    it('should render BuildControls', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

});
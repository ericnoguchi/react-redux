import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { UserForm } from "../_client/components/UserForm";
const { shallow, mount, render } = enzyme;


enzyme.configure({ adapter: new Adapter() });

describe('<UserForm />', () => {
    let testUser,
        mockSubmitCallback,
        props;

    beforeEach(function() {
        testUser = { fullName: 'Test Full Name' };
        mockSubmitCallback = jest.fn();
        props = { onSubmit: mockSubmitCallback };

    });

    it('submits form with correct data', function() {

        const wrapper = shallow(<UserForm />);

        wrapper
            .setProps(props)
            .find('form')
            .simulate('submit', { preventDefault: () => { } });

        expect(mockSubmitCallback.mock.calls[0][0]).toEqual({ fullName: '' })

    });

    it('should submit correct modified data', function () {

        const wrapper = shallow(<UserForm user={testUser} />);
        wrapper
            .setProps(props)
            .find('form')
            .simulate('submit', { preventDefault: () => { } });

        expect(mockSubmitCallback.mock.calls[0][0]).toEqual(testUser)
    })

});
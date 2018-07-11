import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { LOGIN, LOGOUT } from '../../actions/types';
import {
    loginSuccess,
    loginFailure
} from '../../actions/login';
import { sendingRequest } from '../../actions';
import auth from '../../api/auth';
import { authorize } from '../../sagas/login';


import sinon from 'sinon';


describe('Login with fake credentials', () =>
{

    beforeAll(() => {
        sinon.stub(auth, 'login').callsFake(() => {
            return Promise.reject();
        })
    });

    const action = {
        email: "test@gmail.com",
        password: "passtest123",
        isRegistering: false
    };
    const generator = authorize(action);
    it('Should return a SENDING REQUEST action', () => {
        const expectedResult = put(sendingRequest(true));
        expect(generator.next().value).toEqual(expectedResult);
    });
    it('Should return a CALL REQUEST', () => {
        const expectedResult = call(auth.login, action.email, action.password);
        expect(generator.next().value).toEqual(expectedResult);
    });
    it('Should return a LOGIN FAILURE', () => {
        const expectedResult = put(loginFailure(undefined));
        expect(generator.next().value).toEqual(expectedResult);
    });
    it('Should return a SENDING REQUEST action', () => {
        expect(generator.next().value).toEqual(put(sendingRequest(false)));
    })
    it('Should be done', () => {
        expect(generator.next().done).toEqual(true);
    })
});






describe('Successful login', () => {

    // TODO:

});

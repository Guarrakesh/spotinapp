import {call} from 'redux-saga/effects';

export function* wait(ms, result=true) {
    return new Promise(resolve => setTimeout(() => resolve(result), ms));
}
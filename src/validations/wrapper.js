import validation from './index';
import validatejs from 'validate.js';


export default function validate(fieldName, value, validationName) {
    let formValues = {};
    formValues[fieldName] = value;


    var formFields = {};
    if (! validation[validationName][fieldName])
        return;


    formFields[fieldName] = validation[validationName][fieldName];
    const result = validatejs(formValues, formFields)

    if (result) {
        return result[fieldName][0];
    }

    return null;

}
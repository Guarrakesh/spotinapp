import React from 'react';
import PropTypes from 'prop-types';
import ReferenceController from '../../controllers/ReferenceController';


export const ReferenceFieldView = ({
    allowEmpty,
    children,
    reference,
    referenceRecord,
    isLoading,

    ...rest
}) => {
    if (isLoading) return null;


    if (typeof children === "function") {
      return children({
        record: referenceRecord,
        resource: reference,
        allowEmpty,
      });

    }

    return React.cloneElement(children, {
        record: referenceRecord,
        resource: reference,
        allowEmpty,
    });
};

ReferenceFieldView.propTypes = {
    allowEmpty: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    reference: PropTypes.string,
    referenceRecord: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
};

const ReferenceField = ({ children, isLoading, ...props }) => {
    if (typeof children !== 'function' && React.Children.count(children) !== 1) {
        throw new Error('<ReferenceField> only accepts a single child');
    }

    return (
        <ReferenceController {...props}>
            {controllerProps => (
                <ReferenceFieldView
                    {...props}
                    {...{ children, ...controllerProps }}
                />
            )}
        </ReferenceController>
    );
};

ReferenceField.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string,
    source: PropTypes.string.isRequired,

};

ReferenceField.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    record: {},
};




export default ReferenceField;

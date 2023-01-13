import React, { useState } from 'react';
import './UserProfile.css';
import { ChangeUserPassword } from '../../Auth/Actions/userActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StepOne, StepTwo } from './Steps';

const ChangePassword = ({ ChangeUserPassword }) => {
    const history = useHistory();
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({
        previousPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const makeRequest = async (formData) => {
        await ChangeUserPassword(formData, history);
    };

    const handleNextStep = async (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));
        if (final) {
            await makeRequest(newData);
        }
        setCurrentStep((prev) => prev + 1);
    };

    const steps = [
        <StepOne next={handleNextStep} key={1} data={data} />,
        <StepTwo next={handleNextStep} key={2} data={data} />,
    ];

    return <div className="change_password">{steps[currentStep]}</div>;
};

export default connect(null, { ChangeUserPassword })(ChangePassword);

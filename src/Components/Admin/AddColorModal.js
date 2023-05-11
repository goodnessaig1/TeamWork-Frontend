import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import { colors } from '../../Utils/Colors';
import { AddColor } from '../../Auth/Actions/adminActions';
import { toast } from 'react-toastify';

const AddColorModal = ({
    requesting,
    setAddColorModal,
    AddColor,
    setReplaceColor,
    setNewColor,
}) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [colorCode, setColorCode] = useState(null);
    const [nullColor, setNullColor] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    const [selectedColorSize, setSelectedColorSize] = useState({
        height: '17px',
        width: '17px',
    });

    const handleNullColor = () => {
        setSelectedColor(null);
        setSelectedColorSize({ height: '17px', width: ' 17px' });
    };

    const handleColorClick = (name, code, index) => {
        setSelectedColor(name);
        setColorCode(code);
        setNewColor({ name, code });
        setSelectedColorIndex(index);
        setSelectedColorSize({ height: '21px', width: ' 21px' });
    };

    const handleReplaceColor = (colorName, color) => {
        if (color != null) {
            setNewColor({ colorName, color });
            setAddColorModal(false);
            setReplaceColor(true);
        }
        setNullColor(true);
        setTimeout(() => {
            setNullColor(false);
        }, 2000);
    };
    return (
        <div>
            <div className="overlay">
                <div className="admin_modal_holder">
                    <div className="upload_profile_right">
                        <div className="modal_top">
                            <span></span>
                            <span
                                className="close_upload"
                                onClick={() => setAddColorModal(false)}
                            >
                                <Close className="close_upload_icon" />
                            </span>
                        </div>
                        <hr className="upload_hr" />
                    </div>
                    <div className="add_container">
                        <Formik
                            initialValues={{
                                colorName: '',
                                color: '',
                            }}
                            onSubmit={(values) => {
                                AddColor(values).then((response) => {
                                    const { data } = response;
                                    if (data.status === 'success') {
                                        toast.success('Successful', {
                                            position: toast.POSITION.TOP_RIGHT,
                                        });
                                        setAddColorModal(false);
                                    }
                                });
                            }}
                        >
                            {({ setFieldValue, handleSubmit, values }) => {
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="color___container">
                                                <div className="color_container colors">
                                                    +
                                                    <div
                                                        onClick={
                                                            handleNullColor
                                                        }
                                                        className="color-block"
                                                    ></div>
                                                    {colors &&
                                                        colors.map(
                                                            (color, index) => (
                                                                <div
                                                                    key={
                                                                        color.name
                                                                    }
                                                                    className="color-block"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color.code,
                                                                        height:
                                                                            selectedColorIndex ===
                                                                            index
                                                                                ? selectedColorSize.height
                                                                                : '17px',
                                                                        width:
                                                                            selectedColorIndex ===
                                                                            index
                                                                                ? selectedColorSize.width
                                                                                : '17px',
                                                                    }}
                                                                    onClick={() =>
                                                                        handleColorClick(
                                                                            color.name,
                                                                            color.code,
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                            <div className="preview_container">
                                                <div
                                                    style={{
                                                        background: colorCode,
                                                    }}
                                                    className="preview_color"
                                                ></div>
                                                <span
                                                    className="remove_color"
                                                    onClick={() =>
                                                        handleReplaceColor(
                                                            selectedColor,
                                                            colorCode
                                                        )
                                                    }
                                                >
                                                    Tap to replace color
                                                </span>
                                                {nullColor && (
                                                    <span className="null_color_message">
                                                        Select new color first
                                                    </span>
                                                )}
                                                {!requesting && (
                                                    <>
                                                        {selectedColor ? (
                                                            <button
                                                                type="submit"
                                                                className="color_button"
                                                                onClick={() => {
                                                                    setFieldValue(
                                                                        'colorName',
                                                                        selectedColor
                                                                    );
                                                                    setFieldValue(
                                                                        'color',
                                                                        colorCode
                                                                    );
                                                                }}
                                                            >
                                                                Add color
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="disable"
                                                                disabled={
                                                                    !values.colorName
                                                                }
                                                            >
                                                                Add color
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {requesting && (
                                                <div className="audio_btn">
                                                    <ProgressBar
                                                        height="55"
                                                        width="60"
                                                        ariaLabel="progress-bar-loading"
                                                        wrapperClass="progress-bar-wrapper"
                                                        borderColor="blue"
                                                        barColor="rgba(121, 144, 225, 1)"
                                                    />
                                                </div>
                                            )}
                                        </Form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.userData,
        requesting: state.admin?.AddColor?.requesting,
    };
};

export default connect(mapStateToProps, { AddColor })(AddColorModal);

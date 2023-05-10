import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Close } from '@material-ui/icons';
import { connect, useDispatch } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
// import { colors } from '../../Utils/Colors';
import { UpdateColor } from '../../Auth/Actions/adminActions';
import { toast } from 'react-toastify';
import { getColors } from '../../Auth/Actions/articleActions';

const ReplaceColorModal = ({
    requesting,
    setAddColorModal,
    UpdateColor,
    colors,
    setReplaceColor,
    newColor,
}) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [colorCode, setColorCode] = useState(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [colorId, setcolorId] = useState(null);
    const [selectedColorSize, setSelectedColorSize] = useState({
        height: '17px',
        width: '17px',
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
    }, []);

    const handleNullColor = () => {
        setSelectedColor(null);
        setSelectedColorSize({ height: '17px', width: ' 17px' });
    };
    const handleColorClick = (color, index) => {
        setSelectedColor(color.color_name);
        setColorCode(color.color);
        setcolorId(color.id);
        setSelectedColorIndex(index);
        setSelectedColorSize({ height: '21px', width: ' 21px' });
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
                                onClick={() => setReplaceColor(false)}
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
                                UpdateColor(colorId, values).then(
                                    (response) => {
                                        const { data } = response;
                                        if (data.status === 'success') {
                                            toast.success('Successful', {
                                                position:
                                                    toast.POSITION.TOP_RIGHT,
                                            });
                                            setReplaceColor(false);
                                        }
                                    }
                                );
                            }}
                        >
                            {({ setFieldValue, handleSubmit, values }) => {
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="color___container">
                                                <div className="color_container colors">
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
                                                                        color.id
                                                                    }
                                                                    className="color-block"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color.color,
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
                                                                            color,
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                            <div className="replace_preview">
                                                <div className="preview__container">
                                                    <div className="preview___container">
                                                        <span>New</span>
                                                        <div
                                                            style={{
                                                                background:
                                                                    newColor?.color,
                                                            }}
                                                            className="preview__color"
                                                        ></div>
                                                    </div>
                                                    <div className="preview___container">
                                                        <span>Previous</span>
                                                        <div
                                                            style={{
                                                                background:
                                                                    colorCode
                                                                        ? colorCode
                                                                        : 'white',
                                                            }}
                                                            className="preview__color"
                                                        ></div>
                                                    </div>
                                                </div>
                                                {!requesting && (
                                                    <div className="color_btn_container">
                                                        {selectedColor ? (
                                                            <button
                                                                type="submit"
                                                                className="color_button"
                                                                onClick={() => {
                                                                    setFieldValue(
                                                                        'color',
                                                                        newColor.color
                                                                    );
                                                                    setFieldValue(
                                                                        'colorName',
                                                                        newColor.colorName
                                                                    );
                                                                }}
                                                            >
                                                                Replace color
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="disable"
                                                                disabled={
                                                                    !values.colorName
                                                                }
                                                            >
                                                                Click color
                                                            </button>
                                                        )}
                                                    </div>
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
        colors: state.articles.colors,
    };
};

export default connect(mapStateToProps, { UpdateColor })(ReplaceColorModal);

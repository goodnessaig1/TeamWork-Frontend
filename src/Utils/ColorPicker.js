import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getColors } from '../Auth/Actions/articleActions';
import './ColorPicker.css';

const Colors = ({ colors, setSelectedColor }) => {
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
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
        setSelectedColorIndex(index);
        setSelectedColor(color);
        setSelectedColorSize({ height: '21px', width: ' 21px' });
    };
    return (
        <>
            <div className="color_picker_container">
                <div>Add a color</div>
                <div>
                    <div
                        onClick={handleNullColor}
                        className="color-block"
                    ></div>
                    {colors &&
                        colors.map((color, index) => (
                            <div
                                key={color.color}
                                className="color-block"
                                style={{
                                    backgroundColor: color.color,
                                    height:
                                        selectedColorIndex === index
                                            ? selectedColorSize.height
                                            : '17px',
                                    width:
                                        selectedColorIndex === index
                                            ? selectedColorSize.width
                                            : '17px',
                                }}
                                onClick={() => handleColorClick(color, index)}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        colors: state.articles.colors,
    };
};

export default connect(mapStateToProps)(Colors);

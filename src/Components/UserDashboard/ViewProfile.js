import { Close } from '@material-ui/icons';
import logo from '../Assets/logo.png';

const ViewProfile = ({ clickedImage, setClickedImage }) => {
    const handleClick = () => {
        setClickedImage(null);
    };

    return (
        <div className="view_container">
            <img src={logo} alt="" className="author_profile" />
            <img src={clickedImage} className="bigger_img" alt="bigger_img" />
            <div className="close_img" onClick={() => handleClick()}>
                <Close className="close_img_icon" />
            </div>
        </div>
    );
};

export default ViewProfile;

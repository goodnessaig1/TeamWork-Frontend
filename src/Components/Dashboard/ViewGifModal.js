import { Close } from '@material-ui/icons';

const ViewGifModal = ({
    clickedImage,
    setClickedImage,
    setOpen,
    user,
    setUser,
}) => {
    const handleClick = () => {
        setOpen(false);
        setClickedImage(null);
        setUser(null);
    };

    return (
        <div className="view_container">
            <img src={user} alt="" className="author_profile" />
            <img src={clickedImage} className="bigger_img" alt="bigger_img" />
            <div className="close_img" onClick={() => handleClick()}>
                <Close className="close_img_icon" />
            </div>
        </div>
    );
};

export default ViewGifModal;

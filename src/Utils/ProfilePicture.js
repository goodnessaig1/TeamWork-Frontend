import Unavailiabe from '../Utils/unavailiable1.png';

export const ProfilePicture = ({ image, className }) => {
    return (
        <>
            {image ? (
                <img src={image} className={className} alt="" />
            ) : (
                <img src={Unavailiabe} className={className} alt="" />
            )}
        </>
    );
};

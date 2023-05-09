import { Formik, Form } from 'formik';
import { Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import * as Yup from 'yup';
import { TextInput } from '../../Utils/FormLib';
import { toast } from 'react-toastify';
import { AddCategory } from '../../Auth/Actions/adminActions';

const AdminModal = ({ requesting, AddCategory, setAdminModal }) => {
    return (
        <div>
            <div className="overlay">
                <div className="admin_modal_holder">
                    <div className="upload_profile_right">
                        <div className="modal_top">
                            <span></span>
                            <span
                                className="close_upload"
                                onClick={() => setAdminModal(false)}
                            >
                                <Close className="close_upload_icon" />
                            </span>
                        </div>
                        <hr className="upload_hr" />
                    </div>
                    <div className="add_container">
                        <Formik
                            initialValues={{
                                categoryName: '',
                            }}
                            validationSchema={Yup.object({
                                categoryName: Yup.string()
                                    .required('Required')
                                    .max(35, 'Please, make the title brief')
                                    .min(2, 'Name too brief'),
                            })}
                            onSubmit={(values) => {
                                AddCategory(values).then((response) => {
                                    const { data } = response;
                                    if (data.status === 'success') {
                                        toast.success('Successful', {
                                            position: toast.POSITION.TOP_RIGHT,
                                        });
                                        setAdminModal(false);
                                    }
                                });
                            }}
                        >
                            {({ handleSubmit }) => {
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="category_container">
                                                <label className="category_label">
                                                    Category Name
                                                </label>
                                                <div className="category_input_container">
                                                    <TextInput
                                                        className="category_input"
                                                        name="categoryName"
                                                        type="text"
                                                        placeholder="Add Category Name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="add_category_name">
                                                {!requesting && (
                                                    <button
                                                        type="submit"
                                                        className="add_button"
                                                    >
                                                        Add
                                                    </button>
                                                )}
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
                                            </div>
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
        requesting: state.admin.AddCategory.requesting,
    };
};

export default connect(mapStateToProps, { AddCategory })(AdminModal);

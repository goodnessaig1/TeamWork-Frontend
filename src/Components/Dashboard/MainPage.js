/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import PageLayout from "../Pages/PageLayout"
import { useDispatch } from "react-redux";
import { connect } from 'react-redux'
import { getFeedDetails } from '../../Auth/Actions/feedActions';
import "./DashBoard.css"
import Unavailiabe from "../../Utils/unavailiable1.png"
import Like from '../Assets/like.png'
import Liked from '../Assets/liked.png'
import { SmsOutlined } from '@material-ui/icons';


const MainPage = ({feeds,user}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFeedDetails())
    },[])
  return (
    <PageLayout>
      <div className='dashboard_container'>
        <div className='dash_board_top'>
            <div className='dashboard_top'>
              {
                user && user.profile !== null ?(
                   <img src={user.profile} alt='' className='profile__image' />
                ):
                   <img src={Unavailiabe} className='profile__image' alt='' />
              }
                <input type='text' placeholder='Share your thoughts...' className='share_input'/>
            </div>
        </div>
        <div className='dash_board_container'>
            <div className='dashboard'>
                <div className='feeds_container'>
                    {
                      feeds && feeds.map((item, index) =>
                        <div key={item.post_date}>
                        <div className='feed_content' >
                          {
                            item.post.includes("https://") ?(
                              <div className='feed_content'>
                                <div  className='feed_top'>
                                  {
                                    item.profile_pix !== null ? (
                                      <img src={item.profile_pix} className='profile__pix' alt='' />
                                    ):
                                      <img src={Unavailiabe} className='profile__pix' alt='' />
                                  }
                                <div>
                                    <h4 className='post_author'>{item.post_author}</h4>
                                    <span className='author_job_role'>{item.author_jobrole}</span>
                                    <span className='time'> 5mins</span>
                                </div>
                            </div>
                                <div className='post_container'>
                                    <div className='post_title'>{item.title}</div>
                                    <img src={item.post}  className='post' alt='' />
                                </div>
                                <div className='like_comment_container'>
                                  <div className='like'>
                                    {
                                      item.isliked === false ? (
                                        <img className='like_img' src={Like} alt=''/>
                                        ):
                                        <img className='like_img' src={Liked} alt=''/>
                                    }
                                    <span>Like</span>
                                  </div>
                                  <div className='comment'>
                                    Comment
                                  </div>
                                </div>
                                <hr className='feeds_hr'/>
                                <div className='number_of_likes_comment'>
                                    <div className='number_of_likes'>
                                      <span>{item.number_of_likes}</span>
                                      <img className='like_icon' src={Liked} alt=''/>
                                    </div>
                                    <div className='number_of_comments'>
                                      <span>{item.number_of_commennt}</span>
                                      <SmsOutlined/>
                                    </div>
                                </div>
                                {
                                  item.comment !== null ? (
                                    <div className='post_comment_container'>
                                        <div className='post_comment'>
                                          {
                                            item.comment_author_profile !== null ? (
                                              <img src={item.comment_author_profile} className='profile__pix' alt='' />
                                            ):
                                            <img src={Unavailiabe} className='profile__pix' alt='' />
                                          }
                                        </div>
                                        <div className='comment_section'>
                                          <div className='comment__section'>
                                            <span>{`${item.comment_author}  ${item.comment_author_last_name.substring(0,8)}`}</span>
                                            <div>
                                              {item.comment}
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                    ):null
                                }
                            </div>
                        ):
                        <div className='feed_content'>
                            <div  className='feed_top'>
                              {
                                item.profile_pix !== null ? (

                                   <img src={item.profile_pix} className='profile__pix' alt='' />
                                   ):
                                   <img src={Unavailiabe} className='profile__pix' alt='' />
                              }
                                <div>
                                    <h4 className='post_author'>{item.post_author}</h4>
                                    <span className='author_job_role'>{item.author_jobrole}</span>
                                    <span className='time'> 5mins</span>
                                </div>
                            </div>
                            <div className='post_container'>
                                <h3 className='post_title'>{item.title}</h3>
                                { 
                                    item.post.length > 170 ?(
                                <div>
                                    <span  className='large_length_post'>{item.post}</span>
                                </div>
                                ):
                                <div>
                                    <span className='small_length_post'>{item.post}</span>
                                </div>
                                }
                                <div className='like_comment_container'>
                                  <div className='like'>
                                    {
                                      item.isliked === false ? (
                                        <img className='like_img' src={Like} alt=''/>
                                        ):
                                        <img className='like_img' src={Liked} alt=''/>
                                    }
                                    <span>Like</span>
                                  </div>
                                  <div className='comment'>
                                    Comment
                                  </div>
                                </div>
                                <hr className='feeds_hr'/>
                                <div className='number_of_likes_comment'>
                                    <div className='number_of_likes'>
                                      <span>{item.number_of_likes}</span>
                                      <img className='like_icon' src={Liked} alt=''/>
                                      
                                    </div>
                                    <div className='number_of_comments'>
                                      <span>{item.number_of_commennt}</span>
                                      <SmsOutlined/>
                                    </div>
                                </div>
                                 {
                                  item.comment !== null ? (
                                    <div className='post_comment_container'>
                                        <div className='post_comment'>
                                          {
                                            item.comment_author_profile !== null ? (
                                              <img src={item.comment_author_profile} className='profile__pix' alt='' />
                                            ):
                                            <img src={Unavailiabe} className='profile__pix' alt='' />
                                          }
                                        </div>
                                        <div className='comment_section'>
                                          <div className='comment__section'>
                                            <span>{`${item.comment_author}  ${item.comment_author_last_name.substring(0,8)}`}</span>
                                            <div>
                                              {item.comment}
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                    ):null
                                }
                            </div>

                        </div>
                    }
                    
               </div>
               <div 
                  className='close'>
               </div>
               </div>
                  )
                }
                </div>
            </div>
        </div>
      </div>
    </PageLayout>
  )
}



const mapStateToProps = (state) => {
    return {
        feeds: state.feeds.allFeeds,
        user: state.user.userData,
    }
}


export default connect(mapStateToProps)(MainPage)
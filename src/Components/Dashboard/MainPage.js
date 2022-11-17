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
import moment from 'moment';
import commentIcon from '../Assets/comment.png'



const MainPage = ({feeds,user}) => {
    const dispatch = useDispatch()
    const getBackgroundColor = (value) => {
      let color;
      if (value === 0) {
          color = '';
      } else if (value >= 1 && value < 10) {
          color = 'red';
      } else if (value >= 10 && value < 20) {
          color = 'orange';
      } else if (value >= 20 && value < 30) {
          color = '#df6868';
      } else if (value >= 30 && value < 40) {
          color = ' #492222';
      } else if (value >= 40 && value < 70) {
          color = '#c96a0a';
      } else if (value >= 80 && value < 100) {
          color = ' #c90a8c';
      } else if (value >= 100 && value < 120) {
          color = ' #c9960a';
      } else if (value >= 120 && value < 130) {
          color = ' #c9960a';
      } else if (value >= 130 && value < 140) {
          color = ' #0a79c9';
      } else if (value >= 140 && value < 150) {
          color = ' #c90a56';
      } else if (value >= 150 && value < 159) {
          color = ' #e0c375';
      } else if (value >= 160 && value < 170) {
          color = ' #d83030';
      }
      return color;
  };
    useEffect(() => {
        dispatch(getFeedDetails())
    },[])
    console.log(feeds)
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
        {/*========    MAIN FEEDS ===========*/}
        <div className='dash_board_container'>
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
                                <div className='time_container'>
                                  <span className='time'>{moment(item.post_date).fromNow()}</span>
                                  <div className='dot'>.</div>
                                </div>
                            </div>
                        </div>
                            <div className='post_container'>
                                <div className='gif_post_title'>{item.title}</div>
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
                                    <span>{item.number_of_likes}</span>
                              </div>
                              <div className='comment'>
                                <img src={commentIcon}  className='comment_Icon' alt=''/>
                                <span>{item.number_of_commennt}</span>
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
                                        <span>{`${item.comment_author}  ${item.comment_author_last_name.substring(0,10)}`}</span>
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
                                <div className='time_container'>
                                  <span className='time'>{moment(item.post_date).fromNow()}</span>
                                  <div className='dot'>.</div>
                                </div>
                            </div>
                        </div>
                        <div className='post_container'>
                            { 
                                item.post.length > 170 ?(
                                  <div>
                              <h3 className='post_title'>{item.title}</h3>
                                <span  className='large_length_post'>{item.post}</span>
                            </div>
                            ):
                            <div >
                                <span className='small_length_post' style={{background: `${getBackgroundColor(item.post.length)}`, color:"white",}}>{item.post}</span>
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
                                <span>{item.number_of_likes}</span>
                              </div>
                              <div className='comment'>
                                <img src={commentIcon} className='comment_Icon' alt=''/>
                                <span>{item.number_of_commennt}</span>
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
            </div>
              )
            }
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
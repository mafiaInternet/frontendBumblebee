import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewByUser } from '../../../state/review/Action';
import Inexistent from '../../../layout/Inexistent';
import ReviewCard from '../../review/components/ReviewCard';

const Review = () => {
    const {review, auth} = useSelector(store => store)
    const dispath = useDispatch()

    useEffect(() => {
        dispath(getReviewByUser(auth.user))
    }, [])
    return (review.reviews && review.reviews ? 
        <div className='review--user'>
            <div className='container'>
                <div className='review--user--content'>
                {review.reviews.map((item) => (
                    <div className='review--user--content--card'>
                    <ReviewCard review={item} star={item.star}></ReviewCard>
                    {item.imageUrl &&  <div>
                        <div className='review--user--content--img'>
                            <img loading="lazy" className='img-fluid'></img>
                        </div>
                        {/* <p>{item.product ? item.product.title : item.order.orderItems[0].title}</p> */}
                    </div>}
      
                    </div>
                ))}

                </div>
            </div>
        </div>
        : <Inexistent></Inexistent>
    );
}

export default Review;

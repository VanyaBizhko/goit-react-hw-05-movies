import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";




const Reviews = () => {
    const [reviews, setReviews] = useState([])
        const { movieId } = useParams();
      useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
                    {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY0Y2NjZDY0MzFjYzU0ZGNkMGNkODY3OGFlNDcyYiIsInN1YiI6IjY0ZWNkZjIxNTI1OGFlMDE0ZGYzYjlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj6V8kGVcNSLQ9lVcLDEXkbsr-LYuyCeuhMjBSEqkLs',
                        },
                    }
                );
                const data = await response.json();
                setReviews(data.results);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchReviews();
    }, [movieId]);
    // console.log(reviews)
    return(
        <div>
            <h2>Reviews</h2>
            <ul>
                   {reviews.length > 0 ? (
          reviews.map(review => (
              <li key={review.id}><h2> {review.author}</h2> <p>"{review.content}"</p></li>
              
          ))
        ) : (
          <p>No reviews information available.</p>
        )} 
            </ul>
        </div>
        )
};
export default Reviews;

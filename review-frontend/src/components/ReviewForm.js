// import { useContext } from "react";
// import { ReviewContext } from "../contexts/ReviewContext";

// // rendering controlled form to take user's input for the new review
// function ReviewForm() {

//     const { formData, handleChange, handleSubmit } = useContext(ReviewContext);

//     return (
//         <div className="custombox clearfix">
//             <h4 className="small-title">Leave a Review</h4>
//             <div className="row">
//                 <div className="col-lg-12">
//                     <form className="form-wrapper" onSubmit={handleSubmit} novalidate>
//                         {<input name='name' type='text' className='form-control' value={formData.name} onChange={handleChange} placeholder='Your name' required />}
//                         {<textarea name='review' className='form-control' value={formData.review} onChange={handleChange} maxLength='2000' placeholder='Enter your review...' required />}
//                         {<div className="rating">
//                             <input type="radio" name="rate" value="5" id="5" onChange={handleChange} /><label htmlFor="5">☆</label>
//                             <input type="radio" name="rate" value="4" id="4" onChange={handleChange} /><label htmlFor="4">☆</label>
//                             <input type="radio" name="rate" value="3" id="3" onChange={handleChange} /><label htmlFor="3">☆</label>
//                             <input type="radio" name="rate" value="2" id="2" onChange={handleChange} /><label htmlFor="2">☆</label>
//                             <input type="radio" name="rate" value="1" id="1" onChange={handleChange} /><label htmlFor="1">☆</label>
//                         </div>}
//                         {<button type='submit' className='btn btn-outline-primary'>Submit Review</button>}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ReviewForm;

import { useContext, useState } from "react";
import { ReviewContext } from "../contexts/ReviewContext";

function ReviewForm() {
    const { formData, handleChange, handleSubmit, setBookISBN } = useContext(ReviewContext);
    const [rating, setRating] = useState(formData.rate || ""); // Handle rating state separately
    const [error, setError] = useState(""); // For error messages
    const [success, setSuccess] = useState(""); // For success messages

    const handleRatingChange = (event) => {
        setRating(event.target.value);
        handleChange(event); // Call handleChange to update formData
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (rating === "") {
            setError("Please select a rating.");
            return;
        }
        setError("");
        handleSubmit(event); // Call handleSubmit from context
        setSuccess("Review submitted successfully!");
    };

    return (
        <div className="custombox clearfix">
            <h4 className="small-title">Leave a Review</h4>
            <div className="row">
                <div className="col-lg-12">
                    <form className="form-wrapper" onSubmit={handleFormSubmit} noValidate>
                        <input
                            name='name'
                            type='text'
                            className='form-control'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Your name'
                            required
                        />
                        <textarea
                            name='review'
                            className='form-control'
                            value={formData.review}
                            onChange={handleChange}
                            maxLength='2000'
                            placeholder='Enter your review...'
                            required
                        />
                        <input
                            name='isbn'
                            type='text'
                            className='form-control'
                            value={formData.isbn}
                            onChange={handleChange}
                            placeholder='Book ISBN'
                            required
                        />
                        <div className="rating">
                            <input
                                type="radio"
                                name="rate"
                                value="5"
                                id="5"
                                checked={rating === "5"}
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="5">☆</label>
                            <input
                                type="radio"
                                name="rate"
                                value="4"
                                id="4"
                                checked={rating === "4"}
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="4">☆</label>
                            <input
                                type="radio"
                                name="rate"
                                value="3"
                                id="3"
                                checked={rating === "3"}
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="3">☆</label>
                            <input
                                type="radio"
                                name="rate"
                                value="2"
                                id="2"
                                checked={rating === "2"}
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="2">☆</label>
                            <input
                                type="radio"
                                name="rate"
                                value="1"
                                id="1"
                                checked={rating === "1"}
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="1">☆</label>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <button type='submit' className='btn btn-outline-primary'>Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;

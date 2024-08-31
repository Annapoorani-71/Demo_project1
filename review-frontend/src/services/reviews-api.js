import axios from 'axios';

// Base URL for the API, adjust to point to port 5000
const baseURL = 'http://localhost:5000/api/reviews'; // Ensure this matches your backend's base URL

// Helper functions for making HTTP requests
function getAxios(endPoint) {
    return axios.get(`${baseURL}${endPoint}`)
        .then(response => response.data)
        .catch(error => {
            console.error("API request failed:", error);
            throw error; // Optionally handle errors more gracefully
        });
}

function postAxios(endPoint, body) {
    return axios.post(`${baseURL}${endPoint}`, body)
        .then(response => response.data)
        .catch(error => {
            console.error("API request failed:", error);
            throw error; // Optionally handle errors more gracefully
        });
}

function putAxios(endPoint, body) {
    return axios.put(`${baseURL}${endPoint}`, body)
        .then(response => response.data)
        .catch(error => {
            console.error("API request failed:", error);
            throw error; // Optionally handle errors more gracefully
        });
}

function deleteAxios(endPoint) {
    return axios.delete(`${baseURL}${endPoint}`)
        .then(response => response.data)
        .catch(error => {
            console.error("API request failed:", error);
            throw error; // Optionally handle errors more gracefully
        });
}

// API methods
// Get all reviews list
function getAllReviews() {
    return getAxios('/'); // Assuming the endpoint for all reviews is '/'
}

// Get reviews by ISBN
function getReviewsByISBN(isbn) {
    return getAxios(`/${isbn}`); // Assuming the endpoint includes ISBN in the URL
}

// Create new review
function createNewReview(review) {
    return postAxios('/', review); // Endpoint to create a review is '/'
}

// Update review
function updateReview(review) {
    return putAxios(`/${review.id}`, review); // Assuming the endpoint includes review ID in the URL
}

// Delete review
function deleteReview(review) {
    return deleteAxios(`/${review.id}`); // Assuming the endpoint includes review ID in the URL
}

export { getAllReviews, getReviewsByISBN, createNewReview, updateReview, deleteReview };

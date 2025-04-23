"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AddReview } from "../_lib/actions";
import PropTypes from "prop-types";

function StarRating({ rating, setRating }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center space-x-1" aria-label="Rating selection">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            className={`focus:outline-none ${
              starValue <= (hoverRating || rating)
                ? "text-yellow-400"
                : "text-gray-400"
            } transition-colors duration-200`}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(starValue)}
            aria-label={`Rate ${starValue} stars`}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.73 9.397c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          </button>
        );
      })}
      <span className="ml-2 text-sm text-primary-400">({rating}/5)</span>
    </div>
  );
}

function ReviewForm({ cabinId }) {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  
  // Set username from session once it's loaded
  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }
  }, [session]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await AddReview({ cabinId, userName, rating, comment });

      setUserName(session?.user?.name || "");
      setRating(5);
      setComment("");

      router.refresh();
    } catch (err) {
      setError(err.message || "An error occurred while submitting the review.");
    } finally {
      setIsSubmitting(false);
    }
  }

 
    return (
      session?.user ? (
        <form
          onSubmit={handleSubmit}
          className="mt-10 p-6 bg-primary-900 rounded-xl shadow-lg max-w-2xl mx-auto space-y-6 animate-fade-in"
        >
          <h4 className="text-2xl font-bold text-accent-200">Leave a Review</h4>
    
          <div>
            <label htmlFor="userName" className="block text-primary-200 mb-1">
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-primary-800 text-primary-100 border border-primary-700 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50 transition-colors"
              required
            />
          </div>
    
          <div>
            <label htmlFor="comment" className="block text-primary-200 mb-1">
              Your Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-3 rounded-lg bg-primary-800 text-primary-100 border border-primary-700 focus:border-accent-500 focus:ring focus:ring-accent-500 focus:ring-opacity-50 transition-colors resize-y min-h-[120px]"
              required
            />
          </div>
    
          <div>
            <label className="block text-primary-200 mb-1">Rating</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
    
          {error && (
            <p className="text-red-400 text-sm animate-pulse bg-red-900/20 p-2 rounded">
              {error}
            </p>
          )}
    
          <button
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              isSubmitting
                ? "bg-accent-600 cursor-not-allowed"
                : "bg-accent-500 hover:bg-accent-600"
            } text-primary-900`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="text-center mt-10 text-primary-300">
          <p>You must be logged in to leave a review.</p>
        </div>
      )
    );
    
}

ReviewForm.propTypes = {
  cabinId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// Fade-in animation
const style = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  .animate-pulse {
    animation: pulse 1.5s infinite;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);
}

export default ReviewForm;

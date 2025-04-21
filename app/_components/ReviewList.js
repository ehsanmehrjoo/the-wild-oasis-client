"use client";

import React, { useOptimistic } from "react";
import PropTypes from "prop-types";

function ReviewList({ reviews }) {
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviews,
    (currentReviews, newReview) => [...currentReviews, newReview]
  );

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="text-center mt-8 animate-fade-in">
        <p className="text-primary-300 italic text-lg">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8 max-w-3xl mx-auto">
      {optimisticReviews.map(
        ({
          id,
          userName = "Anonymous",
          comment = "",
          rating = 0,
          created_at: createdAt,
        }) => {
          const date = new Date(createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const fullDate = date.toLocaleString("en-US");

          return (
            <div
              key={id}
              className="p-6 rounded-xl bg-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <p className="text-accent-300 font-bold text-lg">{userName}</p>
                <div
                  className="flex items-center space-x-1"
                  aria-label={`Rating ${rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating ? "text-yellow-400" : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.73 9.397c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-primary-400">
                    ({rating}/5)
                  </span>
                </div>
              </div>

              <p className="text-primary-200 mt-3 leading-relaxed">{comment}</p>

              <p className="text-xs text-primary-500 mt-3" title={fullDate}>
                {formattedDate}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      userName: PropTypes.string,
      comment: PropTypes.string,
      rating: PropTypes.number,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Tailwind animation
const style = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);
}

export default React.memo(ReviewList);

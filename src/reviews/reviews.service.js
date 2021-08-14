const { select } = require("../db/connection");
const db = require("../db/connection");

const ReviewsService = {
  async getReviewById(id) {
    return db("reviews").select("*").where("reviews.review_id", id);
  },

  updateReviews(id, body) {
    return (
      db("reviews")
        .update(body)
        .where("reviews.review_id", id)
        // .then((updatedReview) => updatedReview[0])
        .then((review) => {
          return db("reviews")
            .select("*")
            .join("critics", "critics.critic_id", "reviews.critic_id")
            .where("reviews.review_id", id)
            .first();
        })
        .then((item) => {
          item.critic = {
            critic_id: item.critic_id,
            preferred_name: item.preferred_name,
            surname: item.surname,
            organization_name: item.organization_name,
          };
          return item;
        })
    );
  },
  async deleteReviews(id) {
    return db("reviews").where("reviews.review_id", id).del();
  },
};

module.exports = ReviewsService;

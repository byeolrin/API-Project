const express = require('express');

const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const reviewImage = await ReviewImage.findByPk(imageId)

    if (!reviewImage) {
        return res.status(404).json({
            message: "Review Image couldn't be found"
        })
    }

    const review = await Review.findByPk(reviewImage.reviewId)

    if (!review || req.user.id !== review.userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await reviewImage.destroy();

    res.json({
        message: "Successfully deleted"
    })

})

module.exports = router;
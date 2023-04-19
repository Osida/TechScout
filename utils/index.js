// This utility function determines if a URL is an image URL by validating its file extension, returning true for image URLs and false otherwise.

/**
 checkImageURL is a utility function that validates an image URL.
 @param {string} url - The URL of the image to be validated.
 @returns {boolean} - A boolean indicating whether the URL is valid or not.
 */

export const checkImageURL = (url) => {
    if (!url) return false;

    const pattern = /^https?:\/\/.*\.(png|jpe?g|bmp|gif|webp)$/i;
    return pattern.test(url);
};

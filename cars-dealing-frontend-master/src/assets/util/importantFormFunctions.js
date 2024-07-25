const importantFormFunctions = {

    checkRequired: (value)=>{
        if(value=='' || value.length== 0 || value){
            return false
        }
        return true;
    },
    checkEmail: (value)=>{
        const re = /^(([^<>()[\\]\\\\.,;:\s@"]+(\.[^<>()[\\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    checkReviewLength: (review)=>{
                    // Trim any leading/trailing whitespace
            const trimmedReview = review.trim();
          
            // Split the review into an array of words
            const wordCount = trimmedReview.split(/\s+/).length;
          
            // Check if word count is greater than or equal to 500
            return wordCount <= 500;
          
    }


}

export default importantFormFunctions;
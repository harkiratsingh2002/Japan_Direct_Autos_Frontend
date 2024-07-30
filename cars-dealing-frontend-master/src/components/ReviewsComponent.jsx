import { Button, Grid, Pagination, Rating, Typography } from "@mui/material";
import myColors from "../assets/util/myColors";
import { useEffect, useState } from "react";
import RatingBarComponent from "./RatingBarComponent";
import BasicModal from "./BasicModal";
import links from "../assets/util/links";
import ReviewsCard from "./ReviewsCard";
import { useParams } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";


const ReviewsComponent = () => {
  const [value, setValue] = useState(4);

  const [ratingPercentages, setRatingPercentages] = useState({});

  const [theVoteData, setTheVoteData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [totalVotes, setTotalVotes] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [topReviewExist,setTopReviewExist] = useState(false);
  const [topReview,setTopReview] = useState(null);



  const [filterOptions, setFilterOptions] = useState([
    {
      name: "1 star",
      fn: () => {
        // filter to show only 1 star reviews
      },
    },
    {
      name: "2 star",
      fn: () => {},
    },
    {
      name: "3 star",
      fn: () => {},
    },
    {
      name: "4 star",
      fn: () => {},
    },
    {
      name: "5 star",
      fn: () => {},
    },
  ]);
  const params = useParams();
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false);
  let userToken = null
  if(localStorage.getItem('userData')){

     userToken = (JSON.parse(localStorage.getItem('userData'))).userToken ;
    console.log('userToken',userToken);
  }
  const handleOpenPostReview = ()=>{
    if(!userToken){
      // alert('You need to login before posting a review.')
      Swal.fire({
        title: 'error',
        text: 'You need to login before posting a review.' ,
        icon: 'error',
        // confirmButtonText: 'Cool'
      })

    }
    else{
      dispatch(startLoader());
      fetch(links.backendUrl + '/check-topReview',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          carId: params.carId,
        })
      })
      .then(res=>{
        dispatch(endLoader())
        return res.json()
      })
      .then(checkResult=>{
        dispatch(endLoader())
        if(checkResult.topReviewExist){
          // alert('You have already posted a review.')
          
          Swal.fire({
            title: 'error',
            text: 'You have already posted a review.' ,
            icon: 'error',
            // confirmButtonText: 'Cool'
          })
          
        }
        else{
  
          setOpenModal(true)
        }
      })
      .catch(err=>{
        dispatch(endLoader());
        console.log('err in top review',err)
      })
     
      console.log('top review exist in open:-',topReviewExist)
      
    }
  }
  // const handleOpenModal = () => ;
  const handleCloseModal = () => setOpenModal(false);

  // let totalRating

  const calculatePercentages = (data) => {
    const totalVotes = Object.values(data).reduce(
      (sum, count) => sum + count,
      0
    );
    let powerMap = Object.keys(data).map((key) => {
      return data[key] * key;
    });
    let totalPower = powerMap.reduce((acc, currentElement) => {
      return acc + currentElement;
    }, 0);
    if(totalVotes !=0 ){

      let totalRatingPower = (totalPower / totalVotes).toFixed(1);
      setTotalRating(totalRatingPower);
    }
    else{
      setTotalRating(0);
    }

    setTotalVotes(totalVotes);

    const percentages = {};
    if(totalVotes !=0){

      for (const rating in data) {
        percentages[rating] = (data[rating] / totalVotes) * 100;
      }
    }
    else{
      for (const rating in data) {
        percentages[rating] = 0
      }
    }
    return percentages;
  };
  useEffect(() => {
    // const voteData = {
    //   1: 3000, // 1 star votes
    //   2: 6000, // 2 star votes
    //   3: 6000, // 3 star votes
    //   4: 11000, // 4 star votes
    //   5: 8000, // 5 star votes
    // };
    dispatch(startLoader())
    fetch(links.backendUrl + "/get-reviewBarData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: params.carId,
      }),
    })
      .then((resultStatus) => {
        dispatch(endLoader())
        if (resultStatus.status < 200 || resultStatus.status > 299) {
          resultStatus.json().then((err) => {
            console.log("err rating bar data:-", err);
            // alert(err.message);
            Swal.fire({
              title: 'error',
              text: err.message ,
              icon: 'error',
              // confirmButtonText: 'Cool'
            })
          });
        }
        return resultStatus.json();
      })
      .then((result) => {
        // setReviewsResult(result.allReviews);
        dispatch(endLoader())

        const percentages = calculatePercentages(result.allReviews);
        setRatingPercentages(percentages);
        let myVoteData = Object.values(result.allReviews);
        setTheVoteData(myVoteData);
      })
      .catch((err) =>{
        dispatch(endLoader());
        console.log('err in reviewbar',err)
      })
      // if(userToken){

      //   fetch(links.backendUrl + '/get-top-review',{
          
      //       method: 'POST',
      //       headers: {
      //         'authorization': `Bearer ${userToken}`,
      //         "Content-Type": "application/json"
      //         // Add other headers if needed (e.g., Content-Type)
      //       },
      //       // Optional: body containing the data to send
      //       body: JSON.stringify({
      //         carId: params.carId
      //       }) // Assuming data is a JavaScript object
          
      //   })
      //   .then((statusResult)=>{
      //     if(statusResult.status<200 || statusResult.status>299){
      //       console.log('some error while getting top review');
      //     }
      //   return statusResult.json()
      //   })
      //   .then((topReviewResult)=>{
      //     console.log('top Review result',topReviewResult)
      //     if(topReviewResult.topReviewExist){
      //       setTopReviewExist(true);
      //       topReview = topReviewResult.reviews
      //     }
      //     else{
      //       setTopReviewExist(false);
      //     }
      //   })
      // }
    dispatch(startLoader())
    fetch(links.backendUrl + "/get-reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        carId: params.carId,
        page,
      }),
    })
      .then((result) => {
        dispatch(endLoader())
        if (result.status < 200 || result.status > 299) {
          result.json().then((err) => {
            console.log("err:- ", err);
            alert(err.messaage);
            Swal.fire({
              title: 'error',
              text: err.messaage ,
              icon: 'error',
              // confirmButtonText: 'Cool'
            })
          });
        }
        return result.json();
      })
      .then((reviewsResult) => {
        dispatch(endLoader())

        console.log("reviews result:-", reviewsResult);
        console.log('topReviewExist:-', reviewsResult.topReviewExist)
        setTopReview(reviewsResult.topReviewExist);
        setReviews(reviewsResult.reviews);
        setCount(reviewsResult.count);
      })
      .catch((err) => {
        dispatch(endLoader())

        console.log("last error:- ", err);
      });
  }, []);

  // console.log('ratingPercentages:- ',ratingPercentages);
  // useEffect(()=>{

  // },[])

  // useEffect(()=>{

  // },[])

  const handleChange = (event, value) => {
    // make request to fetch data
    dispatch(startLoader())
    setPage(value);
    fetch(links.backendUrl + "/get-reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: params.carId,
        page: value,
      }),
    })
      .then((result) => {
        if (result.status < 200 || result.status > 299) {
          result.json().then((err) => {
            console.log("err:- ", err);
            // alert(err.messaage);
            dispatch(endLoader())
            Swal.fire({
              title: 'error',
              text: err.messaage ,
              icon: 'error',
              // confirmButtonText: 'Cool'
            })
            
          });
        }
        return result.json();
      })
      .then((reviewsResult) => {
        console.log("reviews result:-", reviewsResult);
        setReviews(reviewsResult.reviews);
        // setCount(count)
      })
      .catch((err) => {
        dispatch(endLoader())
        console.log("last error:- ", err);
      });

    //
  };

  return (
    <>
      {/* <div className={styles.scrollContainer}>
        <div className={styles.reviewCardWrapper}>
          {images.map((image, i) => (
            <img
              onClick={() => {
                handleImageChange(image);
              }}
              className={styles.image}
              key={i}
              src={links.backendUrl + "/" + image}
            />
          ))}
        </div>
      </div> */}

      <Grid
        container
        sx={{
          backgroundColor: myColors.myGrey,
          borderRadius: "25px",
        }}
        p={3}
        ml={"auto"}
        mr={"auto"}
        mb={"3.2em"}
        justifyContent={"center"}
        xs={11}
        md={10}
      >
        <Grid item xs={12}>
          <Typography variant={"h6"}>Reviews</Typography>
          <hr />
        </Grid>
        <Grid mt={2} container justifyContent={'center'}>
          <Grid item textAlign={"center"} xs={10} md={2}>
            <Typography variant="h2" color={"primary"}>
              {totalRating}
            </Typography>
            <Rating name="read-only" size="small" value={totalRating} precision={0.5} readOnly />
            <Typography variant="body2" textAlign={"center"}>
              {totalVotes} Reviews
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{
            display: {
              xs: 'none',
              md: 'block'
            }
          }}>
            {Object.keys(ratingPercentages).map((feild, i) => {
              return (
                <RatingBarComponent
                  key={feild}
                  feild={feild}
                  numberOfVotes={theVoteData[i]}
                  percent={ratingPercentages[feild]}
                />
              );
            })}
          </Grid>
          <Grid container>
            <Grid item pl={2} mt={3}>
              <Button
                color="primary"
                onClick={handleOpenPostReview}
                variant="contained"
                // disabled = {topReviewExist}
              >
                Post Review
              </Button>
              
            </Grid>
            {/* <Grid item pl={2} mt={3}>
              <DropdownMenu title={"Filters"} options={filterOptions} />
            </Grid> */}
          </Grid>
        </Grid>
        {/* {topReviewExist && topReview.map((review)=>{
          return <ReviewsCard review={review} />
        })} */}
        {reviews.length > 0 &&
          reviews.map((review) => {
            return <ReviewsCard review={review} />;
          })}

        <Grid container mt={3} justifyContent={"center"} xs={11} md={10}>
          <Pagination
            count={Math.ceil((count/5))}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <BasicModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                setReviews = {setReviews}
              />
    </>
  );
};

export default ReviewsComponent;


import ourStory from "../assets/images/our-story.jpg"
import styles from "./OurStory.module.css"

const OurStory = () => {


  return (
    <>
      <h1 className={styles.heading}>Our Story</h1>
      <section className={styles.storyContent}>
        <img className={styles.imag} src={ourStory} alt="Our Story Image" />
        <p className={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor quis odio consectetur
          varius. Pellentesque lorem quam, feugiat at bibendum sit amet, euismod
          in eros. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo,
          tortor mauris condimentum nibh, ut fermentum massa justo sit amet
          magna. Pellentesque lorem quam, feugiat at bibendum sit amet, euismod
          in eros.
        </p>
        <p className={styles.para}>
          Mauris blandit aliquam elit, eget tincidunt nibh pulvinar a. Sed
          porttitor lectus nibh. Donec rutrum congue leo eget malesuada. Nulla
          justo libero, sagittis in libero sit amet, adipiscing egestas lorem.
          Vestibulum id ligula porta felis euismod semper. Morbi leo risus,
          porta ac consectetur ac, vestibulum at eros.
        </p>
      </section>
    </>
  );
};

export default OurStory;

import links from "../assets/util/links";
import styles from "./ScrollingImageComponent.module.css"
const ScrollingImageComponent = ({ images, handleImageChange })=>{
    return (
        <div className={styles.scrollContainer}>
          <div className={styles.imageWrapper}>
            {images.map((image,i) => (
              <img onClick={()=>{
                handleImageChange(image)
              }} className={styles.image} key={i} src={links.backendUrl + '/' +  image}  />
            ))}
          </div>
        </div>
      );
}

export default ScrollingImageComponent;
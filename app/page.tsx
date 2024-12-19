import Image from "next/image";
import styles from "./page.module.css";
import img1 from "./images/image_1.png";
import img2 from "./images/image_2.png";
import img3 from "./images/image_3.png";
import img4 from "./images/image_4.png";
import img5 from "./images/image_5.png";
import FormSection from "./Components/FormSection";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <div className={styles.wrap}>
      <div className={styles.page}>
        <Image src={img1} alt="img1" />
        <Image src={img2} alt="img2" />
        <Image src={img3} alt="img3" />
        <Image src={img4} alt="img4" />
        <Image src={img5} alt="img5" />
        <FormSection />
        <Footer />
      </div>
    </div>
  );
}

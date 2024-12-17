import styles from "../page.module.css";
import Image from "next/image";
import logo from "../images/clover_logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContents}>
        <div className={styles.logoWrap}>
          <Image src={logo} alt="logo" />
        </div>
        <ul className={styles.footerInfo}>
          <li>
            <em>(주)플라이웨이브코리아</em> | 대표:윤영수
          </li>
          <li>사업자번호: 781-87-01453</li>
          <li className={styles.light}>
            경기도 안성시 대덕면 능말길 105, 가동
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

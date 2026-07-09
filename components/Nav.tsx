import styles from "./Nav.module.css";
import NavAnimations from "./NavAnimations";
import SiteLogo from "./SiteLogo";

export default function Nav() {
  return (
    <div className={styles.nav} data-nav>
      <NavAnimations />
      <div className={styles.brand} data-nav-brand>
        <SiteLogo className={styles.logo} />
        <div className={styles.identity}>
          <div className={styles.name}>Dan Davidson</div>
          <div className={`${styles.role} mono`}>CUSTOMER-FACING ENGINEER</div>
        </div>
      </div>
      <div className={styles.links}>
        <a href="#work" data-nav-link>
          Work
        </a>
        <a href="#proof" data-nav-link>
          Proof
        </a>
        <a href="#contact" data-nav-link>
          Contact
        </a>
      </div>
    </div>
  );
}

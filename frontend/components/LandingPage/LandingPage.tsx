import styles from "./LandingPage.module.css"
import logo from "../Assets/MicrosoftTeams-image.png"
import LandingPageLeftPanel from "./LandingPageLeftPanel/LandingPageLeftPanel";
import LandingPageRightPanel from "./LandingPageRightPanel/LandingPageRightPanel";

const LandingPage = () => {
    return (
        <div className={styles.overAllContainer}>
            <div>
                <div className={styles.logo}>
                    <img src={logo} alt="" height="40px" width="180px" />
                </div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.leftSidePanel}>
                        <LandingPageLeftPanel />
                    </div>
                    <div className={styles.rightSidePanel}>
                        <LandingPageRightPanel />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LandingPage;
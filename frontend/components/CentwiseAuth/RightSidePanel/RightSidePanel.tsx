import React from "react";
import { TypeAnimation } from 'react-type-animation';
import styles from "./RightSidePanel.module.css";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';


interface Props {
    type: string;
}

const RightSidePanel = (params: Props) => {

    const props = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
    });

    let primaryHeading = "";
    let secondaryHeading = "";
    let buttonText = "";
    let routePath = "";

    const navigate = useNavigate();


    if (params.type === "signin") {
        primaryHeading = "New Here!";
        secondaryHeading = "Start Journey with us...";
        buttonText = "Sign Up";
        routePath = "/api/user/signup"
    } else {
        primaryHeading = "Loyal Navigators!";
        secondaryHeading = "Embark on Your Journey..."
        buttonText = "Sign In";
        routePath = "/api/user/signin";
    }

    const handleClick = () => {
        navigate(routePath);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <animated.div style={props}>
                    <div className={styles.primaryHeading}>
                        {primaryHeading}
                    </div>
                    </animated.div>
                    <div className={styles.secondaryHeading}>
                        <TypeAnimation
                            sequence={[
                                `${secondaryHeading}`
                            ]}
                            speed={200} // Typing speed in ms
                            style={{ fontSize: '1.5em', color: '#353434' }}
                            repeat={1}
                        />
                    </div>
                    <div className={styles.button}>
                        <button onClick={handleClick}>{buttonText}</button>
                    </div>
            </div>
        </div>
    );
}

export default RightSidePanel;
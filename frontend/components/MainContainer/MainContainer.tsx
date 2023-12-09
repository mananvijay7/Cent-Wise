import styles from "./MainContainer.module.css";
import DashboardCmp from "../Dashboard/DashboardCmp";
import GroupCmp from "../Groups/GroupCmp";
import AllExpensesCmp from "../AllExpenses/AllExpensesCmp";
import { useSelector } from "react-redux";


interface ComponentMap {
    [key: string]: React.ComponentType<any>;
};

interface DynamicComponentProps {
    componentName: string;
};

type Props = {
    title: string
};

const componentMap: ComponentMap = {
    Dashboard: DashboardCmp,
    Groups: GroupCmp,
    AllExpenses: AllExpensesCmp
};

const assignComponent: React.FC<DynamicComponentProps> = ({ componentName }) => {
    const Component = componentMap[componentName];
    
    if (!Component) {
        // Handle unknown component name
        return <div>Unknown component</div>;
    }
  
    return <Component />;
};

const MainContainer = (props: Props) => {

    let title: string = props.title;
    const user = useSelector((state: any) => state.auth.user);
    console.log("username: " +user?.username);
    
    alert(user?.username);
    return (
        <div id="main-container">
            <h1 className={styles.mainContainerHeading}>
                { title }
            </h1>
            <div className={styles.mainCard}>
                {
                    assignComponent({ componentName: title })
                }
            </div>
        </div>
    );
}

export default MainContainer;

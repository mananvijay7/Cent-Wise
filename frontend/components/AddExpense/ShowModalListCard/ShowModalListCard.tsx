import styles from "./ShowModalListCard.module.css";

interface type {
    item: string;
}
const ShowModalListCard: React.FC<type> = (props) => {
    return (
        <div>
            <div className={styles.row}>
                <div>
                    <label className={styles.label}>
                        <input type="radio" name="product" className={styles.card_input_element} />
                            <div className={styles.panel_body}>
                                {props.item}
                            </div>
                    </label>

                </div>
            </div>
        </div>
    );
}

export default ShowModalListCard;
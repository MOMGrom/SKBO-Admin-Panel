import style from "./Notification.module.css";
function Notification(props) {

    const { title, type, text, ttl } = props;

    function disappear() {

    }

    function Badge() {
        if (type === 0) return (<span className={style.loader}></span>);
        if (type === 1) return (<span className={style.success}></span>);
        if (type === -1) return (<span className={style.fail}></span>);
    }

    return (
        <div className={style.mainPlane}>
            <div className={style.badgeContainer}>
                <Badge/>            
            </div>
            <div>
            </div>
        </div>
    )
}

export default Notification;
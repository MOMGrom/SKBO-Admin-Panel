import style from "./Project.module.css";
function Project(props) {

    const {data} = props;

    return (
        <div>
            <div>
                {data.title}
            </div>
            <div>
                {data.description}
            </div>
            <div>
                {data.img1}
            </div>
            <div>
                {data.img2}
            </div>
            <div>
                {data.img3}
            </div>
        </div>
    )
}

export default Project;
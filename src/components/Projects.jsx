import style from "./Projects.module.css";

function Projects() {

    let projects = []

    return (
        <div>

            <div>
                {projects.map((p, index) => {
                    return (
                        <>
                            
                        </>
                    )
                })}
            </div>


            <div className={style.inputTitle}>
                <label>Название</label>
                <input></input>
            </div>
            <div className={style.inputDescription}>
                <label>Описание</label>
                <textarea></textarea>                
            </div>
            <div>
                <input type="file"></input>
            </div>
            <div>
                <input type="file"></input>
            </div>
            <div>
                <input type="file"></input>
            </div>
        </div>
    )
}

export default Projects;
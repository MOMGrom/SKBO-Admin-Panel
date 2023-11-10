import { useCallback, useEffect, useState } from "react";
import style from "./Projects.module.css";
import {RiEdit2Fill} from "react-icons/ri"
import {RiDeleteBin5Fill} from "react-icons/ri"
import NavBar from "./NavBar";
import image1 from "../data/ska3.jpg"

function Projects(props) {
    const [projects, setProjects] = useState([]);

    const [titleObject, setTitleObject] = useState('')
    const [descriptionObject, setDescriptionObject] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')

    const [editIndex, setEditIndex] = useState(null);
    const [mode, setMode] = useState("create");

    function imgName(img) {
        let res = [];
        for (let char of img) {
            if (char !== "\\") {
                res.push(char)
            } else {
                res.length = 0;
            }
            img = res.join('')
        }
        return img
    }

    function Buttons() {

        if (mode === "create") {
            return (
                <button className={style.addBt} type="submit">Сохранить</button>
            )
        } else {
            return (
                <>
                    <button className={style.addBt} onClick={approveChange}>Изменить</button>
                    <button className={style.delBt} onClick={abortChange}>Отменить</button>
                </>
            )
        }
            
    }

    function CreateProject(event) {
        event.preventDefault()

        if ((titleObject !== "") && (descriptionObject !== "") && (img1 !== "") && (img2 !== "") && (img3 !== ""))
        {
            props.API.AddProject(titleObject, descriptionObject);
            projects.push(
                {
                    "id": projects.length,
                    "title": titleObject,
                    "description": descriptionObject
                }
            );

            setTitleObject("");
            setDescriptionObject("");
            setImg1("");
            setImg2("");
            setImg3("");

        } else
        {
            alert("Все поля должны быть заполнены!");
        }
    }

    function Edit_Click(index) {

        setTitleObject(projects[index].title);
        setDescriptionObject(projects[index].description);

        setMode("edit");
        setEditIndex(index);
    }

    function approveChange() {
        projects[editIndex].title = titleObject;
        projects[editIndex].description = descriptionObject;

        setTitleObject("");
        setDescriptionObject("")

        setMode("create");
        setEditIndex(null);
    }

    function abortChange() {
        setTitleObject("");
        setDescriptionObject("")

        setEditIndex(null);
        setMode("create");
    }

    function RemoveProject(index) {
        setMode("create");
        setEditIndex(null);

        setTitleObject("");
        setDescriptionObject("")

        props.API.RemoveProject(projects[index].id);
        projects.splice(index, 1);
        let new_state = [...projects]
        setProjects(new_state);
    }

    useEffect(() => {
        async function get() {
            console.log(props)

            let projects = await props.API.GetProjects();
            setProjects(projects);
        }
        get();
    }, [])

    return (
        <div className={style.main}>
            <NavBar/>
            <div className={style.rightContainer}> 
                {projects.map((p, index) => {
                    return ( 
                        <div className={style.objectList} key={index}>
                        <div className={style.textObjectСontainer}>
                            <div className={style.titleObjectText}>{p.title}</div>
                            <div className={style.descriptionObjectText}>{p.description}</div>
                        </div>
                        <div className={style.imgObjectContainer}>
                            <div className={style.img1Object}><img src={image1} alt="img1" width={200} height={100} /></div>
                            <div className={style.img2Object}><img src={image1} alt="img2" width={200} height={100}/></div>
                            <div className={style.img3Object}><img src={image1} alt="img3" width={200} height={100}/></div>
                        </div>
                            <div className={style.btnContainer}>
                                <button className={style.editBtn} onClick={() => { Edit_Click(index) }}><RiEdit2Fill /></button>
                                <button className={style.deleteBtn} onClick={() => { RemoveProject(index) }}><RiDeleteBin5Fill /></button></div>
                        </div>
                    )
                })}
            </div>
            <div className={style.mainFormContainer}>
                <form onSubmit={CreateProject}>
            
                    <div className={style.inputTitleContainer}>
                        <label>Название объекта:</label>
                        <input 
                        type="text"
                        value={titleObject}
                        onChange={(event) => setTitleObject(event.target.value)}
                        />
                    </div>

                    <div className={style.inputDescriptionContainer}>
                        <label>Описание объекта:</label>
                        <textarea name="" id="" cols="30" rows="10"
                        value={descriptionObject}
                        onChange={(event) => setDescriptionObject(event.target.value)}></textarea>               
                    </div>
                    <h3 className={style.titleImgInputs}>Выберите 3 фотографии:</h3>
                    <div className={style.imgInputs}>
                        <div className={style.img1Input}>
                            <label className={style.label}>
                            <span className={style.title}>Добавить фото</span>
                            <input 
                                type="file"
                                value={img1}
                                onChange={(event) => {setImg1((event.target.value))}}/>
                            </label>
                            <div className={style.imgTitle}>{imgName(img1)}</div>
                        </div>
                        <div className={style.img2Input}>
                            <label className={style.label}>
                            <span className={style.title}>Добавить фото</span>
                            <input 
                                type="file"
                                value={img2}
                                onChange={(event) => {setImg2((event.target.value))}}/>
                            </label>
                            <div className={style.imgTitle}>{imgName(img2)}</div>
                        </div>
                        <div className={style.img3Input}>
                            <label className={style.label}>
                            <span className={style.title}>Добавить фото</span>
                            <input 
                                type="file"
                                value={img3}
                                onChange={(event) => {setImg3((event.target.value))}}/>
                            </label>
                            <div className={style.imgTitle}>{imgName(img3)}</div>
                        </div>
                    </div>
                    <Buttons></Buttons>
                </form>
            </div>  
        </div>
    )
}

export default Projects;
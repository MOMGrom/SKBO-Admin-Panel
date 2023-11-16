import {useEffect, useState } from "react";
import style from "./Projects.module.css";
import {RiEdit2Fill} from "react-icons/ri"
import {RiDeleteBin5Fill} from "react-icons/ri"
import NavBar from "./NavBar";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Store } from 'react-notifications-component';

function Projects(props) {
    const [projects, setProjects] = useState([]);



    
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjects(items);
  }

    const [titleObject, setTitleObject] = useState('')
    const [descriptionObject, setDescriptionObject] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')


    const [base64Image1, setBase64Image1] = useState("");
    const [base64Image2, setBase64Image2] = useState("");
    const [base64Image3, setBase64Image3] = useState("");

    const [editIndex, setEditIndex] = useState(null);
    const [mode, setMode] = useState("create");

    function handleInputChange(event, setFunc) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            let base64String = reader.result;
            setFunc(base64String);
        };
            
        reader.readAsDataURL(file);
    }

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
    async function CreateProject(event) {
        event.preventDefault()

        if ((titleObject !== "") && (descriptionObject !== "") && (img1 !== "") && (img2 !== "") && (img3 !== ""))
        {
            let result = await props.API.AddProject(titleObject, descriptionObject, base64Image1, base64Image2, base64Image3);

            if (result) {

                Store.addNotification({
                    title: "Объект добавлен ",
                    message: "Объект " + titleObject + " успешно добавлен",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });

                projects.push(
                    {
                        "id": result.id,
                        "title": titleObject,
                        "description": descriptionObject,
                        "image_1": base64Image1,
                        "image_2": base64Image2,
                        "image_3": base64Image3
                    }
                );

            } else {
                Store.addNotification({
                    title: "Ошибка",
                    message: "Не удалось добавить новый объект",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }  

            setTitleObject("");
            setDescriptionObject("");
            setImg1("");
            setImg2("");
            setImg3("");
            setBase64Image1("")
            setBase64Image2("")
            setBase64Image3("")

        } else
        {
            alert("Все поля должны быть заполнены!");
        }
    }

    function Edit_Click(index) {

        setTitleObject(projects[index].title);
        setDescriptionObject(projects[index].description);
        setBase64Image1(projects[index].image_1);
        setBase64Image2(projects[index].image_2);
        setBase64Image3(projects[index].image_3);

        setMode("edit");
        setEditIndex(index);
    }

    async function approveChange() {

        projects[editIndex].title = titleObject;
        projects[editIndex].description = descriptionObject;
        projects[editIndex].image_1 = base64Image1;
        projects[editIndex].image_2 = base64Image2;
        projects[editIndex].image_3 = base64Image3;

        let result = await props.API.UpdateProject(projects[editIndex]);

        if (result) {
            Store.addNotification({
                title: "Изменеия сохранены",
                message: "Объект " + titleObject + " успешно изменен",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        } else {
            Store.addNotification({
                title: "Ошибка",
                message: "Не удалось изменить " + titleObject,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }

        setTitleObject("");
        setDescriptionObject("")
        setImg1("");
        setImg2("");
        setImg3("");
        setBase64Image1("")
        setBase64Image2("")
        setBase64Image3("")
        setMode("create");
        setEditIndex(null);
    }

    function abortChange() {
        setTitleObject("");
        setDescriptionObject("")
        setImg1("");
        setImg2("");
        setImg3("");
        setBase64Image1("")
        setBase64Image2("")
        setBase64Image3("")

        setEditIndex(null);
        setMode("create");
    }

    async function RemoveProject(index) {
        setMode("create");
        setEditIndex(null);

        let result = await props.API.RemoveProject(projects[index].id);
        
        if (result) {
            Store.addNotification({
                title: "Объект удален",
                message: "Объект " + projects[index].title + " успешно удален",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });

            projects.splice(index, 1);
            let new_state = [...projects]
            setProjects(new_state);

        } else {
            Store.addNotification({
                title: "Ошибка",
                message: "Не удалось удалить объект " + projects[index].title,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }

        setTitleObject("");
        setDescriptionObject("")
        setImg1("");
        setImg2("");
        setImg3("");
        setBase64Image1("")
        setBase64Image2("")
        setBase64Image3("")
    }

    useEffect(() => {
        async function get() {
            let projects = await props.API.GetProjects();
            setProjects(projects);
        }
        get();
    }, [])

    return (
        <div className={style.main}>
            <NavBar/>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="rightContainer">
                    {(provided) => (
            <div className={style.rightContainer} {...provided.droppableProps} ref={provided.innerRef}> 
                    {projects.map((p, index) => { 
                            return ( 
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided) => (
                                        <div className={style.objectList} key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div className={style.textObjectСontainer}>
                                                <div className={style.titleObjectText}>{p.title}</div>
                                                <div className={style.descriptionObjectText}>{p.description}</div>
                                            </div>
                                            <div className={style.imgObjectContainer}>
                                                <div className={style.img1Object}><img src={p.image_1} alt="img1" width={200} height={100} /></div>
                                                <div className={style.img2Object}><img src={p.image_2} alt="img2" width={200} height={100}/></div>
                                                <div className={style.img3Object}><img src={p.image_3} alt="img3" width={200} height={100}/></div>
                                            </div>
                                            <div className={style.btnContainer}>
                                                <button className={style.editBtn} onClick={() => { Edit_Click(index) }}><RiEdit2Fill /></button>
                                                <button className={style.deleteBtn} onClick={() => { RemoveProject(index) }}><RiDeleteBin5Fill /></button>
                                            </div>
                                            {provided.placeholder}
                                            </div>
                                                )}
                                                </Draggable>
                                                );
                                                })}
                                            </div>
                                                )}
                                        </Droppable>
                                            </DragDropContext>
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
                            {base64Image1 ? (
                            <span className={style.title}>Изменить фото</span>
                            ) : <span className={style.title}>Добавить фото</span>}
                            <input 
                                    type="file"
                                    value={img1}
                                    onChange={(event) => { handleInputChange(event, setBase64Image1); setImg1(event.target.value) }} />
                            </label>
                            {base64Image1 && <img className={style.imgView1} src={base64Image1} alt="" />}
                            <div className={style.imgTitle}>{imgName(img1)}</div>
                        </div>
                        <div className={style.img2Input}>
                            <label className={style.label}>
                            {base64Image2 ? (
                            <span className={style.title}>Изменить фото</span>
                            ) : <span className={style.title}>Добавить фото</span>}
                            <input 
                                    type="file"
                                    value={img2}
                                    onChange={(event) => { handleInputChange(event, setBase64Image2); setImg2(event.target.value) }} />
                            </label>
                            {base64Image2 && <img className={style.imgView1} src={base64Image2} alt="" />}
                            <div className={style.imgTitle}>{imgName(img2)}</div>
                        </div>
                        <div className={style.img3Input}>
                            <label className={style.label}>
                            {base64Image3 ? (
                            <span className={style.title}>Изменить фото</span>
                            ) : <span className={style.title}>Добавить фото</span>}
                            <input 
                                    type="file"
                                    value={img3}
                                    onChange={(event) => { handleInputChange(event, setBase64Image3); setImg3(event.target.value) }}/>
                            </label>
                            {base64Image3 && <img className={style.imgView1} src={base64Image3} alt="" />}
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
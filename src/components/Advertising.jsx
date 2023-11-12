import { useState } from "react";
import style from "./Advertising.module.css"
import NavBar from "./NavBar";
import {RiDeleteBin5Fill} from "react-icons/ri"

function Advertising() {

    const [loadImg, setLoadImg] = useState([])

    function handleChangeFile(event) {
        const newLoadImg = [...loadImg]
        newLoadImg.push(URL.createObjectURL(event.target.files[0]))
        setLoadImg(newLoadImg)
    }
    function deleteImg(index) {
        loadImg.splice(index, 1)
        let new_state = [...loadImg]
        setLoadImg(new_state)
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

    return(
        <div className={style.mainContainer}>
            <NavBar/>
            <div className={style.main}>
            <div className={style.leftContainer}>
            <div className={style.inputContainer}>
                <div className={style.imgInput}></div>
                    <label className={style.label}>
                        <span className={style.title}>Добавить баннер</span>
                        <input 
                        type="file"
                        onChange={handleChangeFile} />
                    </label>
                {loadImg.map((img, index) => (
                    <div className={style.imgsContainer}>
                        <div className={style.number}>{index + 1}</div>
                        <img src={img} alt="img"/>
                        <button onClick={() => deleteImg(index)} className={style.deleteBtn}><RiDeleteBin5Fill /></button>
                    </div>
                ))}
            </div>
            </div>
            <div className={style.rightContainer}>
                <div className={style.webCotainer}><iframe src="https://skbo-group.ru" width="100%" height="730"></iframe></div>
            </div>
        </div>
    </div>
)
}

export default Advertising;
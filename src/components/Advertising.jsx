import { useState } from "react";
import style from "./Advertising.module.css"
import NavBar from "./NavBar";

function Advertising() {
    

    const [numFiles, setNumFiles] = useState(0)
    const [img, setImg] = useState("")
    const [title, setTitle] = useState("")

function numPlus() {
    if (numFiles <= 2) {
    setNumFiles(numFiles + 1)
    } else { alert("Максимум 3 значения")}
} 

function numMinus() {
    if (numFiles > 0) {
        setNumFiles(numFiles - 1)
        } 
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

    const handleNumberChange = (event) => {
        const valueNum = parseInt(event.target.value)
            setNumFiles(valueNum)
        
    }

    function handleFormSubmit(event) {
        event.preventDefault()
    }
return(
    <div className={style.mainContainer}>
        <NavBar/>
        <div className={style.main}>
            <div className={style.leftContainer}>
                
                <div className={style.editSettingsContainer}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={style.inputTitleContainer}>
                            <p>Название рекламы:</p>
                            <input 
                                type="text"
                                placeholder="Название, дата проведения"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <p>Количество рекламных блоков:</p>
                        <div className={style.inputNumberContainer}>
                        <button className={style.minusBtn} onClick={numMinus}>-</button>
                        <input type="number" 
                                min={0} max={3} 
                                value={numFiles} 
                                onChange={handleNumberChange} /> <br />
                        <button className={style.plusBtn} onClick={numPlus}>+</button>
                        </div>
                        {[...Array(numFiles)].map((_, index) => (
                        <div className={style.imgInputs}>
                            <div className={style.img1Input}>
                                <label className={style.label}>
                                    <span className={style.title}>Добавить фото</span>
                                    <input 
                                    type="file"
                                    value={img}
                                    onChange={(event) => setImg(event.target.value)}
                                    />
                                    </label>
                        </div>
                        
                        <div className={style.imgTitle}>{imgName(img)}</div>
                        </div>
                        ))}
                        <button className={style.addBt}>Сохранить</button>
                        </form>
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
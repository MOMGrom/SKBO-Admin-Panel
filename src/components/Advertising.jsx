import { useState } from "react";
import style from "./Advertising.module.css"
import NavBar from "./NavBar";
import {RiDeleteBin5Fill} from "react-icons/ri"
import { useEffect } from "react";

function Advertising(props) {

    const [advertList, setAdvertList] = useState([])

    function handleChangeFile(event) {
        const reader = new FileReader();

        reader.onload = async () => {
            let base64string = reader.result;

            let result = await props.API.AddAdvert(base64string);

            if (result) {
                const newAdvertList = [...advertList];
                newAdvertList.push(result);
                setAdvertList(newAdvertList);
            } else {
                console.log("Failed to add advert");
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    function removeAdvert(index) {
        props.API.RemoveAdvert(advertList[index].id);

        advertList.splice(index, 1);
        let new_state = [...advertList]
        setAdvertList(new_state);
    }

    useEffect(() => {
        async function get() {
            let adverts = await props.API.GetAdverts();
            setAdvertList(adverts);
        }
        get();
    }, []);

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
                        {advertList.map((advert, index) => (
                            <div className={style.imgsContainer} key={index}>
                        <div className={style.number}>{index + 1}</div>
                                <img src={advert.image} alt="img" />
                                <button onClick={() => removeAdvert(index)} className={style.deleteBtn}><RiDeleteBin5Fill /></button>
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
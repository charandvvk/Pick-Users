import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import img1 from "./assets/1.jpeg";
import img2 from "./assets/2.jpeg";
import img3 from "./assets/3.jpeg";
import img4 from "./assets/4.jpeg";
import img5 from "./assets/5.jpeg";

const users = [
    {
        name: "Guinevere Faulkner",
        email: "erat.neque@outlook.couk",
        img: img1,
    },
    {
        name: "Leo Hoffman",
        email: "sapien.aenean@google.net",
        img: img2,
    },
    {
        name: "Briar Johns",
        email: "vel.est@outlook.ca",
        img: img3,
    },
    {
        name: "Isaiah Bass",
        email: "libero.donec@aol.ca",
        img: img4,
    },
    {
        name: "Fuller Garza",
        email: "nec.mauris@aol.couk",
        img: img5,
    },
];

function App() {
    const [pickedUsers, setPickedUsers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isListVisible, setIsListVisible] = useState(false);
    const [isChipHighlighted, setIsChipHighlighted] = useState(false);

    const inputRef = useRef(null);

    const restUsers = users.filter(
        (user) =>
            !pickedUsers.some((pickedUser) => pickedUser.name === user.name)
    );
    const filteredUsers = restUsers.filter((user) =>
        user.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    function inputChangeHandler(event) {
        setInputValue(event.target.value);
    }
    function inputFocusHandler() {
        setIsListVisible(true);
    }
    function inputKeyDownHandler(event) {
        event.stopPropagation();
        if (event.key === "Backspace" && event.target.value === "") {
            setIsListVisible(false);
            inputRef.current.blur();
            setIsChipHighlighted(true);
        }
    }
    function pickClickHandler(user) {
        setPickedUsers((prevState) => [...prevState, user]);
        setInputValue("");
        inputRef.current.focus();
    }
    function removeClickHandler(userName) {
        setPickedUsers((prevState) =>
            prevState.filter((user) => user.name !== userName)
        );
        inputRef.current.focus();
    }

    useEffect(() => {
        const globalKeyDownHandler = (event) => {
            if (event.key === "Backspace" && isChipHighlighted) {
                setPickedUsers((prevState) => {
                    const newState = [...prevState];
                    newState.pop();
                    return newState;
                });
                inputRef.current.focus();
                setIsChipHighlighted(false);
            }
        };
        window.addEventListener("keydown", globalKeyDownHandler);
        return () => {
            window.removeEventListener("keydown", globalKeyDownHandler);
        };
    }, [isChipHighlighted]);

    return (
        <div className="app">
            <h1>Pick Users</h1>
            <div className="container">
                <ul className="chips">
                    {pickedUsers.map((user, index) => (
                        <li
                            key={index}
                            className={
                                isChipHighlighted &&
                                index === pickedUsers.length - 1
                                    ? "highlighted"
                                    : undefined
                            }
                        >
                            <img src={user.img} />
                            <span>{user.name}</span>
                            <RxCross1
                                onClick={() => removeClickHandler(user.name)}
                            />
                        </li>
                    ))}
                </ul>
                <div className="picker">
                    <input
                        placeholder="Add new user..."
                        value={inputValue}
                        onChange={inputChangeHandler}
                        onFocus={inputFocusHandler}
                        onKeyDown={inputKeyDownHandler}
                        ref={inputRef}
                    />
                    {isListVisible && (
                        <ul className="list">
                            {filteredUsers.map((user, index) => (
                                <li
                                    onClick={() => pickClickHandler(user)}
                                    key={index}
                                >
                                    <img src={user.img} />
                                    <div>{user.name}</div>
                                    <div className="email">{user.email}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;

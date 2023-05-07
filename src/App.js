import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [invites, setInvites] = React.useState([]);
  const [isSuccess, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    /*При клике мы передаем id того на чью кнопку кликнули и проверяем в массиве есть ли тот id 
    на кого кликнули.И фильтруем массив так,что если в этом массиве уже есть пользователь, то мы его
    оттуда удаляем ,если нету, то добавляем */
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((prevId) => prevId !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {isSuccess ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  let [shows, setShows] = useState([]);
  let [newShow, setNewShow] = useState('');
  useEffect(async () => {
    let showData = await fetcher('/api/getShows');
    setShows(showData.data);
  }, []);
  function handleNewShow(e) {
    setNewShow(e.target.value.trim());
  }
  async function handleAddShow() {
    const res = await fetch('/api/addShows', {
      method: 'POST',
      body: JSON.stringify({
        title: newShow,
      }),
    });
    const body = await res.json();
    // add the new show to the existing list
    let newShows = shows.slice();
    newShows.push(body.data);
    setShows(newShows);
    setNewShow('');
  }
  async function handleUpdateShow(e) {
    const res = await fetch('/api/updateShow', {
      method: 'POST',
      body: JSON.stringify({
        title: e.target.value,
        watched: e.target.checked,
      }),
    });
    let newShows = shows.slice();
    newShows = newShows.map((show) => {
      if (show.data.title == e.target.value) {
        return Object.assign({}, show, {
          data: { title: e.target.value, watched: e.target.checked },
        });
      }
      return show;
    });
    setShows(newShows);
  }
  return (
    <form>
      <fieldset className="todo-list">
        <legend className="todo-list__title">Shows I want to watch</legend>
        <input
          name="newShow"
          type="text"
          value={newShow}
          onChange={handleNewShow}
        />
        <input type="button" value="Add" onClick={handleAddShow} />
        {shows.map((show, index) => (
          <label className="todo-list__label" key={index}>
            <input
              type="checkbox"
              name="showWatched"
              value={show.data.title}
              onClick={handleUpdateShow}
              defaultChecked={show.data.watched}
            />
            <i className="check"></i>
            <span>{show.data.title}</span>
          </label>
        ))}
      </fieldset>
    </form>
  );
}

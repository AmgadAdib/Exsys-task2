import React, { useState, useEffect} from "react";
import './App.css';


function App() {

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [filterValue, setFilterValue] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = () => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(result => result.json())
    .then(json => (setData(json),setLoading(false),setSearchData(json)))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (e) => {
    if(e.target.value === '') {
      setData(searchData)
    } else {
     const filterResult = searchData.filter(item => 
        
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.body.toLowerCase().includes(e.target.value.toLowerCase()))
        if(filterResult.length > 0 ) {
        {setData(filterResult)}
        } else {
          setData([{"id" : "No Posts"}]);
        }
    }
    setFilterValue(e.target.value)
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "");

  const actionForm = () => (
    <div className="action-group">
      <button>Add post</button>
      <input type="search" 
      value={filterValue}
      placeholder="Search posts (search by word in post title or body)"
      onChange={handleFilter}/>
    </div>
  );

  const displayPosts = () => ( 
   <div >
      {data.map((item) => (
      <>
      <div className="form-data">
        <h4>Post id:{item.id}</h4>
        <hr />
        <h2>{item.title}</h2>
        <p>{item.body}</p>
      </div>
      </>
      ))}
  </div>
  );

  return (
    <div className="App">
      {showLoading()}
      {actionForm()}
      {displayPosts()}
    </div>
  );
}

export default App;

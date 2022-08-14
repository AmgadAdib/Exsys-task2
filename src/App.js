import {useState, useEffect, useCallback} from "react";
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [filterValue, setFilterValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState({
    title: "",
    body: "",
    id:"101"
});

  const fetchData = useCallback(async() => {
    setLoading(true)
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await resp.json();
    setData(data);
    setSearchData(data);
    setLoading(false); 
   })
  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = useCallback((e) => {
    if(e.target.value === '') {
      setData(searchData)
    } else {
     const filterResult = searchData.filter(item => 
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.body.toLowerCase().includes(e.target.value.toLowerCase()))
        if(filterResult.length > 0 ) {
         setData(filterResult)
        } else {
         setData([{"id" : " No Posts"}]);
        }
    }
    setFilterValue(e.target.value)
  });

const postData = useCallback(async() => {
  const newPost = {title: newData.title, body: newData.body, userId: 1}

  await fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body: JSON.stringify([newPost]),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    
  })
  .then((response) => response.json())
  .then(() => {
    setData((newPost) => ([newData, ...newPost]))
  })
},[newData]) 

const memoizedTitle = useCallback((e) => {
  setNewData({...newData, title: e.target.value})
},[newData])

const memoizedBody = useCallback((e) => {
  setNewData({...newData, body: e.target.value})
},[newData])

  return(
    <div className="App">
      <div className="action-group">
        <button onClick={postData}>Add post</button>
        <input type="search" 
        value={filterValue}
        placeholder="Search posts (search by word in post title or body)"
        onChange={handleFilter}/>
      </div>
      <div className="input-form" >
        <input onChange={memoizedTitle} 
          value={newData.title} 
          type='text' 
          name='title' 
          required
          placeholder='Write your title'/>
        <input onChange={memoizedBody}
          value={newData.body} 
          type='text'
          name='body' 
          required
          placeholder='Write your post'/>
      </div>
      <div >
        {loading ? <h2>Loading...</h2> : ""}
        {data.map((item) => (
          <div className="form-data" key={item.id}>
            <h4>Post id: {item.id}</h4>
            <hr />
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
       </div> 
    </div>
  );
}
export default App;

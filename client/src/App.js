import "./App.css";
import { useEffect } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Filter from './components/Filter'
import logo from './favicon-tcit.png';



export default function App(){
  useEffect(() => {
    document.title = 'Post Challenge';
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = logo;
    }
  }, []);

  return(
      <div className='App'>
        <h1 style={{display: "flex", justifyContent: "center"}}>Post App Challenge</h1>
        <Filter/>
        <PostList/>
        <PostForm/>
      </div>
  )
}
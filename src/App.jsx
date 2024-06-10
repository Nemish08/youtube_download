import { useState,useEffect } from 'react'

import './App.css'
import { FaTelegramPlane } from "react-icons/fa";
import { jsx } from 'react/jsx-runtime';

function App() {
  

  const [inputValue, setInputValue] = useState('');
  const [id,setId] = useState("");
  const [title,setTitle] = useState("");
  const [count,setcount] = useState(false);
  const [download_url,setdownlaod] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  




  const handleDownload = () => {
    const videoUrl = download_url; // Replace with your video URL

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = videoUrl;

    // Set the download attribute with a desired filename
    link.download = videoUrl; // You can set the name of the file here

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
    
  };






  
  function set_data(){

    let url_data = inputValue.split("/");
    let url_id = url_data[url_data.length-1].split("?")[0];
   
    setId(url_id);
    console.log(id);
    
    get_url();
  }

   async function get_url(){
   
    

   
      try {
      
        const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;
        console.log(url);
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '137c4c4794msh068d55bc7d3a0b9p19af27jsnb239dfca3248',
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
          }
        };
          const response =await  fetch(url, options);
          const result = await response.text();
          const data = JSON.parse(result);
          console.log(typeof(result));
          console.log(data)
          setTitle(data["title"]);
          setdownlaod(data['link']);
          setcount(true);
      } catch (error) {
          console.error(error);
      }
    
   

  
     
  }
  



  return (
    <>
      <div>

        <h1>youtube to MP3</h1>
          <div className='url_input'>
              <input value={inputValue} placeholder='Enter url' type="text" required onChange={handleInputChange}></input>
              <button onClick={set_data}><FaTelegramPlane /></button>
          </div>

          <div className='after_search'>
              {count?
                <div>
                  <iframe
                    id="existing-iframe-example"
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameborder="0"></iframe>
                  
                  <h3 >{title}</h3>

                  <button onClick={handleDownload}>Download</button>

                </div>
                :<p/>
              }
          </div>

      </div>
        
  
    </>
  )
}

export default App

import React, {Fragment, useState, useEffect} from 'react';
import Modal from 'react-modal'

function App() {

  const [file, setFile] = useState(null)
  const [imageList, setImageList] = useState([])
  const [ListUpdated, setListUpdated] = useState(false)

  const [currentImage, setCurrentImage] = useState(null)


  const [modalLisOpen, setModaLisOpen] = useState(false)




  useState(() => {


  }
  
  )
   

   useEffect(() => {

     
    Modal.setAppElement('body')

     fetch('http://localhost:9000/images/get')
    .then(res => res.json())
    .then(res => setImageList(res))
    .catch(err => {
      console.error(err)
    })
    setListUpdated(false)
   }, [ListUpdated])


  const selectedHander = e => {
    setFile(e.target.files[0])
   }
 
   const sendHandler = () => {
    if(!file){
      alert('debes subir algun archivo')
      return
    }

    const formdata = new FormData()
    formdata.append('image', file)

    fetch('http://localhost:9000/images/post',{
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => {
      console.log(res)
      setListUpdated(true)
    })
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)

   }

   const modalHandler = (isOpen, image) => {

       setModaLisOpen(isOpen)
       setCurrentImage(image)


   }

   const deleteHandler = () => {

     let   imageID = currentImage.split('-')
     imageID = parseInt(imageID[0])

     fetch('http://localhost:9000/images/delete/' + imageID,{
      method: 'DELETE'
   })
         .then(res => res.text())
         .then(res => console.log(res))


         setModaLisOpen(false)
         setListUpdated(true)



  }
  return (
 <Fragment>
 <nav className="navbar navbar-dark bg-dark">  
   <div className="container"> 
      <a href="#!" className="navbar-brand">Cultupaz</a>
   </div>
 </nav>
 <br>

 </br>
 <div className="container mt-5">
  <div className="card p-3">
    <div className="row">
      <div className="col-10">
      <input id="fileinput" onChange={selectedHander} className="form-control" type="file"/>
      </div>
      <div className="col-2">
      <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Subir</button>
      </div>
    </div>
  </div>
 </div>

 <div className="container mt-3" style={{display: "flex", flexWrap: "wrap"}}>
     {imageList.map(image => (
      <div key={image}  className="card m-2">
      <img src={'http://localhost:9000/' + image} alt="..." className="card-img-top" style={{height: "200px", width: "261px"}}/>
      <div className='card-body'>
        <button onClick={() => modalHandler (true, image)} className='btn btn-dark'>Ver mas</button>

        </div>
    </div>
     ))}

 </div>

 <Modal  style={{content: {right: "5%", left: "5%"}}}  isOpen={modalLisOpen} onRequestClose={() => modalHandler(false, null)}>

  <div className='card'>
     <img src={'http://localhost:9000/' + currentImage} alt='...'/>
     <div className='card-body'>
        <button onClick={() => deleteHandler()} className='btn btn-warning'>Eliminar</button>
    
        </div>
  </div>

 </Modal>

 </Fragment>




  );
}

export default App;


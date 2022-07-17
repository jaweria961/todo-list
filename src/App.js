import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
   return (list =JSON.parse(localStorage.getItem('list')))
  }
  else
  {
    return [];
  }
};

function App() {
  
  const [list,setList] = useState(getLocalStorage());
  const [name, setName] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editListID,setEditListID] = useState(null);


  const handleSubmit = (e) =>{
    e.preventDefault(e);
    if(!name)
    return (alert('Please Enter some data'));
    else if (name && isEdit) {
      setList(
        list.map((item) => {
          if (item.id === editListID) {
            return { ...item, title: name };
          }
          return item;
        })

      );
      setName('');
      setEditListID(null);
      setIsEdit(false);
      
    }
    else{
    const newItem = {id:new Date().getTime().toString(), title:name};
    setList([...list, newItem])
      setName('');
    }
  }
  const removeItem = ((id) =>{
    const removeItem = list.filter((item=>item.id !== id));
    setList(removeItem);
    return(alert('item has been deleted'))
  })

  const isEditing = ((id) =>{
  
    const editItem = list.find((item) => item.id === id);
    setIsEdit(true);
    setEditListID(id);
    setName(editItem.title);
  })

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))

  },[list])

  const clearAll = (() => {
    setList([]);

  })

  return (
    <>
      <section className='section-center'>
      <form className='grocery-form' onSubmit= {handleSubmit}>
        {/* {<Alert {...alert} removeAlert={showAlert} list={list} />} */}

        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            
          />
          <button type='submit' className='submit-btn'>
          {isEdit ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
     
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem= {removeItem} editItem={isEditing} />
          <button className='clear-btn' onClick={clearAll}>
            clear items
          </button>
        </div>
      )}
     
    </section>
    
    
    
    </>

  )
}

export default App

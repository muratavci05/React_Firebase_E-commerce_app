import React from 'react'

const AddProducts = () => {
  return (
    <div className='container'>
      <br></br>
      <br></br>
      <h1>Add Products</h1>
      <hr/>
      <form autoComplete='off' className='form-group col-sm-4'>
        <label>Product Title</label>
        <input type="text" className='form-control' required/>
        <br/>
        <label>Product Description</label>
        <input type="text" className='form-control' required/>
        <br/>
        <label>Product Price</label>
        <input type="number" className='form-control' required/>
        <br/>
        <label>Upload Product Image</label>
        <input type="file" id='file' className='form-control' required/>
        <br/>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <button type='submit' className='btn btn-success btn-md'>SUBMIT</button>
        </div>

      </form>

      </div>
  )
}

export default AddProducts
import {useState} from 'react'
import {Data} from './Components/Data'
import * as XLSX from 'xlsx'
import { db } from './firebase';
import { setDoc, doc, getDocs, collection, addDoc } from "firebase/firestore";

function App() {
  
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);
  const [ck,setCk]=useState(false); 
  
 
  
  const [excelData, setExcelData]=useState(null);

  const saveChange=async()=>{
    let len = excelData.length;
    for (let i = 0; i < len; i++) {
      try {
        await addDoc(collection(db,"File-upload"), {
        RollNo:excelData[i].RollNo,
        FirstName: excelData[i].FirstName,
        LastName: excelData[i].LastName,
        Gender:excelData[i].Gender,
        Country:excelData[i].Country,
        Age:excelData[i].Age,
        Mode:excelData[i].Mode
        });
        if(i===len-1){
        alert('updated successfully');
        }
      }
      catch {
        alert('Error Occurred');
      }
  }
}
  
  const fileType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
        // console.log(selectedFile.type);
      if(selectedFile &&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  function SortJson(data) {
    const dataThreads = data.map((data) => {
      // console.log(data.FirstName)
      
      
      return {
        RollNo:data.RollNo,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Gender:data.Gender,
        Country:data.Country,
        Age:data.Age,
        Mode:data.Mode
      
      };
    })
    // console.log(dataThreads[1])
    setExcelData(dataThreads)
}
  

  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      SortJson(data);
      setCk(true)
     
    }
    else{
      setExcelData(null);
    }
  }
  

  
  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button  type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>ReadFile</button>
           <button onClick={() => saveChange()} className='btn btn-success'
          style={{marginTop:5+'px'}} disabled={ck===false}>Submit</button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      view file section
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>First Name</th>
                  <th scope='col'>Last Name</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Country</th>
                  <th scope='col'>Age</th>
                  <th scope='col'>Mode</th>                  
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>

    </div>
  );
}

export default App;
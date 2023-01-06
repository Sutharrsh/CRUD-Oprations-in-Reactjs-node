import * as React from 'react';
import './App.css';
import {useState} from "react";
import axios from 'axios';
import NavScrollExample from './nav';
export default function App() {
  const [name,setName]=useState("");
  const [age,setAge]=useState(0);
  const [country,setCont]=useState("");
  const [Position,setPosition]=useState("");
  const [wage,setWage]=useState(0);
  const [newwage,setNewWage]=useState(0);
  const [EmpList,setEmpList]=useState([]);
  const addEmp=()=>{
    axios.post('http://localhost:7240/create',
    {name:name,
      age:age,
      country:country,
      Position:Position,
      wage:wage}).then(()=>{
        alert("Success..");
        setEmpList([...EmpList,
          {name:name,
            age:age,
            country:country,
            Position:Position,
            wage:wage}]);});
  };
  const showData=()=>{
    axios.get('http://localhost:7240/employee').then((response)=>{
      alert(response.json);
      setEmpList(response.data);
    });
  };
  const delData=(name)=>{
    axios.delete('http://localhost:7240/delete',{name:name,
    }).then(()=>{
      alert("Employee Data delete Success..");
    });
  }
  const upDate=(name)=>{
    axios.put('http://localhost:7240/update',{name:name,
    wage : newwage
    }).then(()=>{
      alert("Employee Data Update Success..");
      setEmpList(
        EmpList.map((val)=>{
          return val.name === name
          ?{
            name : val.name,
            age : val.age,
            country : val.country,
            Position : val.Position,
            wage :newwage
          }
          :val;
        })
      );
    });
  }
  const displayInfo=()=>{
    alert(name + " " + age + " "+ country + " "+ Position+" "+ wage);
  };

  return (<>    <NavScrollExample/>
    <div className='App'>
      <form>
        <h3>Add Employee App</h3>
        <input type="text" placeholder='Name' onChange={(e)=>{setName(e.target.value);}}/>
        <input type="number" placeholder='Age' onChange={(e)=>{setAge(e.target.value);}}/>
        <input type="text" placeholder='Country' onChange={(e)=>{setCont(e.target.value);}}/>
        <input type="text" placeholder='Position' onChange={(e)=>{setPosition(e.target.value);}}/>
        <input type="text" placeholder='wage(year)' onChange={(e)=>{setWage(e.target.value);}}/>
        <button onClick={addEmp}>Add Employee</button>
  
        <button onClick={showData}>Show All Employee</button>
        <button onClick={()=>{upDate(name);}}>Update</button>
        <button onClick={delData}>Delete</button>
        {
          EmpList.map((val,key)=>{
            return <div className="empshow">{val.name}</div>;
            
          })
        }
      </form>
    </div>
        </>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import CountryDetail from './CountryDetail';
import './ListFrame.css'

/*
ListFrame Contains most of the functionality.
It calls names json file to retrieve the names of the continents.
it also contains the logic to display the countries based on the continent selected

*/


const ListFrame = () => {
  const [ data , setData ] = useState();
  const [ contValue, setContValue ] = useState(""); //filter
  const [ select, setSelect] = useState("");
  const [ picked, setPicked] = useState("");
  const [flag, setFlag]= useState(false);

	useEffect(() => {
    const getList = async () => {
        try {
            let mounted = true;
          
            const res = await axios.get('http://localhost:3000/api/names/');

            if(mounted){
              let filteredObject;
              let options =[];
              let results =[];
              if (contValue !== "") {
                //  filter
                const res2 = await axios.get('http://localhost:3000/api/continent');
                const acceptedValue =[contValue];
                filteredObject = Object.keys(res2.data).reduce(function(r, e) {
                  if (acceptedValue.includes(res2.data[e])) r[e] = res2.data[e]
                  return r;
                }, {})
              }
              if(filteredObject){
                let namedData = Object.keys(filteredObject); 
                for(let item of namedData){
                  results.push({name: res.data[item],code: item});
                  options.push({name: res.data[item], code: item});
                }
                setFlag(true);
                setData(results);
                setSelect(options);
              } else  {
                setData(res.data);
              }
              
            }
        } catch (err) {
        
        }
    }
    getList();
	},[contValue]);

 

  let inputs ="";
  if(select !== "") {
    inputs = select.map((item,i)=> {
      return <option key={i} value={item.code}>{item.name}</option>
    })
  }

  let toggle = "hidden";
  let frame = "show";
  let detailtog = "hidden";
  if(contValue !== "") {
    toggle = "show";
    if(picked !== ""){
      frame ="hidden";
      detailtog="show";
    }
  }

  let list;
  if(data !== undefined) {
    list = <List items={data} flag={flag}/>
  }

  const changeSelectOptionHandler = (event) => { 
    setContValue(event.target.value); 
    
  }; 

  const changeSelectCountryHandler = (event) => {
    setPicked(event.target.value);
  }

  return (
    <div className="app-frame">
      <div className="country-list">
			<div className="App">
        <form>
          <div className="form-group">
            <div className="title"><h5>Select a Continent</h5></div>
            <select className="form-control" id="continent" onChange={changeSelectOptionHandler}>
                <option value="">Continent</option>
                <option value="AF">Africa</option>
                <option value="AS">Asia</option>
                <option value="EU">Europe</option>
                <option value="NA">North America</option>
                <option value="OC">Oceania</option>
                <option value="SA">South America</option>
            </select>
          </div>
          <div className="form-group">
            <select  className={"form-control "+ toggle } id="countries" onChange={changeSelectCountryHandler}>
              <option value="">Country</option>
              {inputs}
            </select>
          </div>
        </form>
			</div>
      
      <div className={frame}>
        {list}
      </div>
      
      {/* add detail here */}
      <div id="detail" className={detailtog} >
        <CountryDetail country={picked} continent={contValue}/>
      </div>
		</div>
    </div>
  )
}

export default ListFrame;

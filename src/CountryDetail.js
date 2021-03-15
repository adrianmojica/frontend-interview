import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

/*
ContryDetail
Displays the data of each country in a detail page
*/


const CountryDetail = ({country,continent}) => {

  const [ data , setData ] = useState();
  const [ cont , setCont ] = useState();
  const [capital, setCapital]= useState();
  const [phone, setPhone] =useState();
  const [currency,setCurrency]=useState();

  const { code } = useParams();

  if(!country){
    makeCalls(code);
  }


    useEffect(() => {
    const getDetails = async () => {
        try {
            let mounted = true;
            if(mounted){
              makeCalls(country);
            } else  {
              
            }
        } catch (err) {
        
        }
    }
    
    getDetails();
    },[country]);
  

  async function makeCalls(country){

    const resCont = await axios.get('http://localhost:3000/api/continent/');
    setCont(resCont.data[country]);

    const res = await axios.get('http://localhost:3000/api/names/');
    setData(res.data[country]);

    const resCapital = await axios.get('http://localhost:3000/api/capital/')
    setCapital(resCapital.data[country]);

    const resPhone = await axios.get('http://localhost:3000/api/phone');
    setPhone(resPhone.data[country]);

    const resCurrency = await axios.get('http://localhost:3000/api/currency');
    setCurrency(resCurrency.data[country]);
  }

  let imagesrc ="";
  let wikiUrl="";
  if(country){
   imagesrc= "https://www.countryflags.io/"+country+"/flat/64.png";
   wikiUrl = "https://en.wikipedia.org/wiki/"+country;
  } else {
    imagesrc= "https://www.countryflags.io/"+code+"/flat/64.png";
    wikiUrl = "https://en.wikipedia.org/wiki/"+code;
  }


  return (
    <>
    <div className="card">
      <div className="card-body">
        <img className="flag" src={imagesrc} alt="flag"/>
        <h5 className="card-title">{data}</h5>
        <p className="card-text">Continent: {continent || cont} </p>
        <p className="card-text">ISO Code: {country || code}</p>
        <p className="card-text">Capital: {capital}</p>
        <p className="card-text">Phone:  {phone}</p>
        <p className="card-text">Currency: {currency}</p> 
      </div>
      <div className="card-body">
        <a href={wikiUrl} className="card-link"><i className="bi bi-book"></i> Wiki</a>
        <a href="/" className="card-link"><i className="bi bi-house-door-fill"></i> Back Home</a>
      </div>
    </div>
      
     
    </>
  )
}

export default CountryDetail;

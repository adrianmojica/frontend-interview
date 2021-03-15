import React from 'react';

/*
List
Creates the list items to be displayed.
*/

const List = ({items,flag}) => {
  let itemList;
  if(flag){
    itemList= items.map(d => <li className="list-group-item" key={d.code}><a href={'/country/'+d.code}>{d.name}</a></li>);
  } else {
    if(items){
      itemList= Object.keys(items).map((key, i) => (
        <li className="list-group-item" key={i}>
          <a href={'/country/'+key}>{items[key]}</a>
        </li>
      ))
    }
  }
  
  return (
    <>
      <div className="list">
        <ul className="list-group">
          {itemList}
        </ul>
      </div>
    </>
  )
}

export default List;

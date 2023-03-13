import {useEffect, useState} from 'react';
import axios from 'axios';
import { TreeItem, TreeView } from '@mui/lab'; 
import useLocalStorage from 'use-local-storage';


let ids = 0 ;
let child = undefined ; 
let datas =  [];
  

const Test = (id)=>{
  return id
}





const Children =(filles , n)=>{
 

  return filles.map(childs => (
    <TreeView >
      <TreeItem 
      key={childs.id }
      nodeId={childs.id}
      label={childs.libelle}
      onClick={(e)=>n(childs.id , e)}
      style={{ textDecoration : "none"  }}
      />
    </TreeView>
    ))

  }








  const getTreeItemsFromData =( datas  , n  ,filles ) => {

    return datas.map((treeItemData) => {
      ids =    Test(treeItemData.id)
      return (
           
            <TreeItem
              key={treeItemData.id}
              nodeId={treeItemData.idsommaire}
              label={treeItemData.libelle}
              onClick={(e)=>n(ids , e)}
              children={filles}
            />
      
      );
    });
  };
  



const DataTreeView = ({ treeItems , n ,filles }) => {
  return (
    <div className='container col-4' id='por'>
      <TreeView id='btn'>
        {getTreeItemsFromData(treeItems  , n  , filles)}
      </TreeView>
    </div>

  );
};




// {data: []}
const AfficherCollapse = () => {
  const [filles, setFilles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [treeview, setTreeview] = useLocalStorage("treeview" , []);
  let NewFile = filles
  const fetchData = () => {
    axios.put('http://5.196.78.152:2099/api/sommairesracine')
      .then(res => {
        setData(res.data);
      }
      ).catch(err => console.log(err))
  }

useEffect(() => {
  fetchData()
}, [])








const onClickHandler =(id , e) =>{
  e.preventDefault();

 
  setIsLoading(true)

  const fetchData2 = async () => {
    try {
      // axios.get(), axios.post(),axios.put(), axios.delete()
      const response = await axios("http://5.196.78.152:2099/api/sommairesfilles" ,  {
      method: "PUT", 
        headers: {
          "content-type": 'application/json'
         },
        data : {
         "idsommaire" : id
        },
      });
   
      NewFile= response.data
   
        
          setFilles( NewFile) 
           console.log(i)
          //  setTreeview(response.data) ; 
        
    } catch (error) {
      console.log(error.response);
    }finally{
      setIsLoading(false)
    }
};

    fetchData2()

}

return (


<div className='container col-12 float-start mt-5 ml-5' style={{ position :"relative" , right : "190px" }}>
{/* <button onClick={onClickHandler} >Click</button> */}
<br/>
<br/>
<br/>
{/* Children(filles , onClickHandler) */}
<DataTreeView  treeItems={data}  n={onClickHandler} filles={Children(NewFile , onClickHandler) }   />

</div>
)


};

export default AfficherCollapse;
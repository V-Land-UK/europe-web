import {useState, useEffect, useCallback} from "react";
import { API } from "../config/api.js";
import { PAGINATION_LIMIT } from "../config/meta.js";
const qs = require("qs");

const useFetch = (page)=>{
    const [loading,setLoading] = useState(true);
    const [Articles,setArticles] = useState([]);
    const [error,setError] = useState(false);
    const [queriesSent,setQueriesSent] = useState(0);
    const [hasMore, setHasMore] = useState(true);
     
   
    const filters  = qs.stringify({
        populate:"*",
        pagination:{
            pageSize: PAGINATION_LIMIT,
            page: page,
        },
        sort:["PublishDate:desc"]
    }, {encodeValuesOnly:true});
    const sendQuery = useCallback(async ()=>{
       
    
        setLoading(true);
        
        
        const promise = new Promise((resolve,reject)=>{
            
            
            fetch(`${API}/articles?${filters}`, {
                method: 'GET',
                mode:'cors',
                credentials:'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect:'follow',
                referrerPolicy: 'no-referrer'

            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                resolve(data);
            })
            .catch((err) =>{
                setError(err);
                reject(err)
            });    
        });     
        
        const data = await promise;
        
        setHasMore(data.meta.pagination.pageCount > page - 1);
        
        setArticles(()=>{
           return [...data.data]
        });
        
        setLoading(false);
        
        
        setQueriesSent(prev => prev + 1);
            
       
       



        
    }
    , [page]);
    useEffect(()=>{
        sendQuery(page);
    }, [sendQuery, page]);

  


    return {loading,Articles, error,hasMore, queriesSent};


}

export default useFetch;
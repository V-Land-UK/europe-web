import { API,BASE_URL } from "../config/api.js";

const fetchAPI = async function(query, {variables}={})
{
    
    const res = await fetch(`${BASE_URL}/graphql`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables,
        })

    });
    

   
    
   

    const json = res.json();
    
    if(json.errors){
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }
    
    return json;

}


const getPreviewArticleBySlug = async function(slugVal){
    
    const data = await fetchAPI(
        `
        query ArticleBySlug($filtervar: ArticleFiltersInput) {
          articles(filters: $filtervar, publicationState: PREVIEW) {
                data{
                    attributes{
                        slug
                    }
                    
                    
                }
           
          }
        }
        `
        ,
        {
            variables: {
              filtervar: {
                slug:{
                    eq: slugVal
                }
              },
            },
        }

    );
    
    
    return data?.data?.articles?.data[0]?.attributes;
}




export {fetchAPI, getPreviewArticleBySlug};
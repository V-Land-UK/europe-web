import { getPreviewArticleBySlug } from "../../lib/api.js";




export default async function preview(req, res){

    
    if(req.query.secret !== process.env.STRAPI_PREVIEW_SECRET || !req.query.slug){
        
        return res.status('401').json({message:`Invalid token`});
    }

    const article = await getPreviewArticleBySlug(req.query.slug);
   
    if(!article){
        return res.status('401').json({message: `Invalid slug`});
    }
    res.setPreviewData({});

    res.writeHead(307, {Location:`/article/${article.slug}`});
    res.end();
}
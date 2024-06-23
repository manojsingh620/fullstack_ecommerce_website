import SummaryApi from "../common"

const fetchCategoryWiseProduct =async(category)=>{

    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body :  JSON.stringify({
            Category : category
        })
    })

    const dataResponse = await response.json()


    return dataResponse
}

export default fetchCategoryWiseProduct
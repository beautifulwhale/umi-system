import { useState, useEffect } from "react";
import { InsureCategoryItem } from "@/services/insureCategories/type";
// import { getInsuranceCategories } from "@/services";

export default function InsureList() {
    const [insureList, setInsureList] = useState<InsureCategoryItem[]>([])
    let params = new FormData();
    params.append('online', 'T');
    useEffect(() => {
        // getInsuranceCategories(params).then(({ code, data }) => {
        //     if (code === 200) {
        //         setInsureList(data!);
        //     }
        // });
    }, [])
    return { insureList, setInsureList }
}
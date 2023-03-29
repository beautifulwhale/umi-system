// import { useRequest } from '@umijs/max';
import { useEffect } from 'react';
import { getInsuranceCategories } from '@/services/insureCategories/index';

export default function Subject() {
  useEffect(() => {    
    let params = new FormData()
    params.append('online', 'T');
    getInsuranceCategories(params);
  }, []);
  return <div>index</div>;
}

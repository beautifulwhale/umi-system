// import { useRequest } from '@umijs/max';
// import { useEffect, useState } from 'react';
// import { getInsuranceCategories } from '@/services/insureCategories/index';
// import { InsureCategoryItem } from '@/services/insureCategories/type';
import { useModel } from '@umijs/max';

export default function Subject() {
  const { insureList } = useModel('InsureList', (model) => ({
    insureList: model.insureList,
    setInsureList: model.setInsureList,
  }));
  // useEffect(() => {
  //   let params = new FormData();
  //   params.append('online', 'T');
  //   getInsuranceCategories(params).then(({ code, data }) => {
  //     if (code === 200) {
  //       setInsureList(data!);
  //       console.log('data-->', data);
  //     }
  //   });
  // (async function () {
  //   const { data, code } = await getInsuranceCategories(params);
  //   if (code === 200) {
  //     console.log('data-->', data);
  //   }
  // })();
  // }, []);
  return (
    <>
      {insureList.map((item) => {
        return <h1 key={item.id}>{item.label}</h1>;
      })}
    </>
  );
}

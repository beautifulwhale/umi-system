import { useState } from 'react';
import ProductPage from './productPage';

/**
 * 使用场景: 1.function作为prop传递到子组件 2.大量昂贵的数据计算并且只依赖部分data  
 * 配合使用: memo() prop变化才re-render子组件
 */
export default function UseCallbackTest() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}

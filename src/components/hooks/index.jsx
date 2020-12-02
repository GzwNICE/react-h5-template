import React, { useState, useEffect } from 'react'

export default function index() {
  // react hooks useState
  const [count, setCount] = useState(0);
  // [ 变量名，改变变量的方法] = useState(变量初始值)

  // react hooks useEffect
  useEffect(() => {
    // 需要处理的事件操作
    document.title = `You clicked ${count} times`;
    return () => {
      //通过返回一个方法，清除不需要的事件，类似class中的componentWillUnmount生命周期
      // 你可以尝试在首页点击click后，看到页面title发生了变化，在离开页面时title会改变为curry
      document.title = `curry`;
    }
  });

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState
`useState()` 會回傳一個有狀態的值 `state` 和更新這個值的 function `setState`，`state` 一旦改變就會觸發 re-render。也可以為這個值設定初始值。

### useEffect
第一個參數是在 render 完要執行的 effect，會是一個 function，第二個參數則是它的依賴陣列，effect function 會在 dependencies 改變時觸發，若為空則每次 render 完都會觸發。effect function 可以再回傳一個 clean-up function，會在 component 被移除前執行。

### useLayoutEffect
和 `useEffect` 類似，只是觸發時間不同，`useLayoutEffect()` 的 effect 會在 DOM 建立完，實際 paint 之前執行，可以用來改善使用者體驗，但要注意阻塞的效能影響。

### useContext
可以用 `React.createContext` 在 Component 內建立 Context 物件，相當於一個能往下穿透的 props，在下層 Components 中使用 `useContext(Context)` 會回傳 Context 當前的值，此值是由 Component Tree 往上距離最近的 `<Context.Provider>` 所決定。

### useReducer
某些功能到需要操作多種的狀態改變時，使用 `useState` 會讓狀態四散而不好維護，這時可以考慮使用 `userReducer`，使用方法：`const [state, dispatch] = useReducer(reducer, initState);`。

- `state` ：當前 `state` 的值
- `initState` 設定 `state` 的初始值
- `dispatch` 會觸發 `reducer`， 會接收一個 `action` 傳給 reducer 的第二個參數 
- `reducer` ： function，會接收兩個參數，第一個是之後要來更新的 `state`，第二個是從 `dispatch` 傳來的 `action`，可以根據 `action` 來決定改怎麼改變 state。

參考資料：[这一次彻底搞定useReducer-使用篇](https://juejin.cn/post/6844903869604986888)

### useCallback
`useCallback()` 第一個參數是 function，第二個參數是它的依賴陣列，在 re-render 時，不會直接建立這個 function instance，而是在 dependencies 改變時才重新建立，以避免建立不必要的 function instance，減少效能負荷。

### useMemo
`useMemo()` 第一個參數是 function，第二個參數是它的依賴陣列，在 re-render 時，不會直接執行這個 function instance ，而是在 dependencies 改變時才執行並回傳結果，進行較複雜的運算時可以使用它來改善效能。

### useRef
`useRef(initialValue)`會回傳一個可改變（mutable）的物件，並可使用 .current 來拿到初始值 `initialValue`，被改變時不會觸發 re-render，使用 `useRef()` 和手動建立物件 `{current: ...}` 的差別在於每次 render 時，`{current: ...}` 都會被重新建立，而 `useRef` 回傳的物件始終都是同一個。

### useImperativeHandle
可以在父 component 調用子 component 中 ref 的方法，`useImperativeHandle()` 第一個參數接收 ref，第二個參數是要暴露給 父 component 的方法。

### useDebugValue
在 custom hooks 中可以用在來 React DevTool 建立 label 來顯示訊息。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點



## 請問 class component 與 function component 的差別是什麼？



## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

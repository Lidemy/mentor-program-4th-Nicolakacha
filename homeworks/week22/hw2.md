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

### 常用 Method
- `constructor()`：component 被建立時會觸發。
- `render()`：state 改變時就會在 DOM 上 render 內容，
- `componentDidMount()`：component 被掛在 DOM Tree（mount）後觸發。
- `componentDidUpdate()`：state 改變後會觸發。
- `componentWillUnmount()`：component 從 DOM Tree 上移除（unmount）前觸發。
- `shouldComponentUpdate()`：回傳的布林值可以決定在 state 改變後是否觸發 `render()` 及 `componentDidUpdate()`。 

### 不那麼常用的 Method
- `static getDerivedStateFromProps()`：在 `render()` 被觸發之前觸發。
- `getSnapshotBeforeUpdate()`：在 React 實際去比對完並準備去修改 DOM 之前，可以先拿到 DOM 上面的一些資訊，回傳值會成為 `componentDidUpdate()` 的參數。 
- `static getDerivedStateFromError()`：在 render phase 時被呼叫，所以不允許 side effect，當 component 捕捉到任何在它底下（不包含自己）的錯誤時，可以把錯誤記錄起來。
- `componentDidCatch()`：在 commit phase 時被呼叫，所以允許 side effect，當 component 捕捉到任何在它底下（不包含自己）的錯誤時，可以把錯誤記錄起來。

### 已經不建議使用的 Method
- `UNSAFE_componentWillMount()`：在 `render()`之前被觸發，移除或新建 component 都不會在觸發，官方建議改用 `constructor()` 替代 
- `UNSAFE_componentWillReceiveProps()`：在一個 mounted component 收到新的 props 之前被觸發，會回傳更新過的 props，並可用 setState 來更新 state。
- `UNSAFE_componentWillUpdate()`：在 component 準備執行 `render()` 之前觸發。

## 請問 class component 與 function component 的差別是什麼？
- 在熟悉物件導向的前題下，我覺得 class component 有更好的可讀性，同一個功能在實作上，function component 則比較抽象，且實作方法靈活多變，好處是可以自定義 hook 來做出各種功能，但也要思考協作時大家是不是有看懂彼此的 function。
- Function component 可以捕獲 props。而在 class component 中，因為 this 會改變，所以永遠會調用到最新的 props，需要使用閉包才能捕獲 props。


## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
是不是 controlled component 取決是資料是否受 React 控制，如 input、textarea 等表單相關的 element，，Client 端可以輸入值來更新資料，即是 uncontrolled component，若把這個資料的控制權交給 React，此時 element 就是 controlled component。
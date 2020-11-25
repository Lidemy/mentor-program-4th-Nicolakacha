## 為什麼我們需要 Redux？

當 App 的 states 是需要在不同的 components 之間共用，或是需要進行一連串複雜的更新時，就可使用 Redux 來管理共同的 states。在 React 中，雖然使用 React Context 也能解決 prop drilling，但 Redux 有進行額外的效能優化，且能讓 state 管理從 components 獨立出來，讓專案的目錄結構變得更清晰，還能額外使用 Redux 提供的 devtool 來管理 state。

適合使用 Redux 的時機：
- 有很多四散在各處的 state 要管理時
- state 需要頻繁更新時
- 更新 state 的邏輯複雜時
- 中大型架構的 App 需要多人協作時


## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是一個狀態管理工具，由 Redux 所管理的狀態，只能夠過不同的 action 觸發 reducer 來更新，並且因為 reducer 必須是純函數，可以避免產生預期之外的 side effect，讓 debug、測試或是重構都變得更加容易。

### store：
一個存放 App state tree 的容器，可以透過 `createStore()` 來建立，需要傳進一個 `rootReducer`，讓裡面的 `reducer` 來告訴它 state tree 該怎麼被建立和更新：

```js
import { createStore } from 'redux';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
);
```

建立出來的 store 是一個 JavaScript 物件，有以下 methods：

- `getState()`：可以拿到最新的 state tree。
- `dispatch(action)`：唯一會觸發更新 state 的方法，`action` 是用來描述 state 該怎麼更新的 JavaScript 物件，執行 `dispatch(action)` 會把 action 傳給 reducer，讓 reducer 根據不同的 action 來更新 state。
- `subscribe(listener)`：會在每次 action 被 dispatch 的時候被執行，例如可以在裡面呼叫 `getState()` 來拿到每次更新的 state。
- `replaceReducer(nextReducer)`：取代 store 現在使用的 reducer。

### rootReducer

上面提到的 `rootReducer` 是透過 `combineReducers()` 來結合不同的 `reducer` 函式：

/reducers/index.js
```js
import { combineReducers } from 'redux';
import counter from './counter';
import users from './users';

export default combineReducers({
  counterState: counter,
  userState: users,
});
```

### reducer

而每個 `reducer` 函式中，第一個參數是初始化的 state，第二個參數就是要接收的 action，reducer 會根據收到不同的 action 來更新 state，再返回給新的 state 給 store。

/reducers/counter.js
```js
const initialState = { value: 0 };

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...state, value: state.value + 1 };
    }

    default: {
      return state;
    }
  }
}
```

### action

上面提過 `dispatch(action)` 會把 action 物件傳給 reducer，因為 reducer 需要根據 action 的 type 來決定要執行什麼更新，所以 action 一定要有 type 這個屬性來定義這個 action 的種類，可以透過 action creator 的方式建立 action。把 action 的 type 建立成 const 變數來方便 debug，除了 type 之外，action 其他部份的結構可以自行定義，參考沿用 Flux 的 action 結構，一般會建立一個 payload 屬性用來傳參數給 reducer。

/actionTypes.js
```js
export const INCREMENT = 'INCREMENT';
```

/action.js
```js
import {
  INCREMENT
} from './actionTypes';

export function deleteTodoState(id) {
  return {
    type: INCREMENT,
    payload: { id },
  };
}
```

以上就是 Redux 基本架構的元件及資料流，可以使用官方文件得這個流程圖來看資料流的方向會更清楚：
![](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)
 
## 該怎麼把 React 跟 Redux 串起來？
需要透過 react-redux 這個 library 把 React 和 Redux 串起來，並用 connect() 方法來連結，也可以透過 react-redux 提供的 hooks API 或是 redux toolkit 來讓設定 redux 變得更方便。

### connect()
使用 `connect()` 可以把連結 React component 和 Redux store，並在最頂層使用 `<Provider store={store}>` 傳入 store，讓所有 `connect()` 包住的 component 都拿得到 store。

```js
function connect(mapStateToProps, mapDispatchToProps, mergeProps, options)
```

connect 提供四種參數：
- `mapStateToProps`：此參數要是一個函式，會將 state 轉換成為 component 的 props，`mapStateToProps( (state, ownProps) => (stateProps))` 的第一個參數 state 是當前的 state，第二個參數（可選用）是一個物件，是 component 自己的 props，可以用來幫助定義 stateProps 要怎麼回傳，每一次 state 更新或 onwProps 改變時，都會呼叫 `mapStateToProps`，並 return 最新的 stateProps 物件。當 stateProps 或 ownProps 改動時，都會觸發其綁定 component 的 re-render。

- `mapDispatchToProp`：此餐數可以是一個函式或物件，將 dispatch 以 props 的方式傳給 component。
    - 如果 `connect()` 的第二個參數為 null 時，component 會預設收到 dispatch，
    - 如果 `mapDispatchToProp` 被定義為 function，第一個參數會是 store 的 dispatch 而第二個參數（可選用）是 component 自己的 props，用法和 mapStateToProps 的 ownProps 相近，可以用來自動傳入 action 的 payload 參數。
    - 如果 `mapDispatchToProp` 被定義為物件，可以直接放進 action creator。

- `mergeProps`：此參數會是一個函式，決定最後綁定的 component 的 props 物件會長什麼樣子，如果沒有提供此參數，預設的 props 會是：`{ ...ownProps, ...stateProps, ...dispatchProps }`。`mergeProps((stateProps, dispatchProps, ownProps) => ( mergedProps))`，可以接收三個參數，分別是 `mapStateToProps()` 的回傳結果、`mapDispatchToProps()` 的回傳結果，以及要綁定的 component 自己的 props，mergeProps 回傳值 mergedProps 成為 `connect()` 所綁定的 component 最後的 props。

- `options`：此參數要是物件，可以為綁定的 component 提供自訂的 context。

用 higher order component 的方法將 store 和 component 綁定：

```js
const connectToStore = connect(mapStateToProps, mapDispatchToProp);
const ConnectedComponent = connectToStore(Component);
export default ConnectedComponent;
```

可以簡化成：

```js
export default connect(mapStateToProps, mapDispatchToProp)(Component);
```

這樣在 Component 的 props 裡就拿得到 dispatch 和 state 了，可以把串接的部份包成 container component，而原來 component 就只是單純的 presentational component。


### Redux Hooks API

- 利用 `<Provider store={store}>` 在頂層把 store 傳進 App。
- 在 component 中使用 `useDispatch` 來拿到 dispatch，引入 action creator 之後就可以直接使用 dispatch(action) 來觸發更新 state。
- 在 component 中使用 `useSelector` 就可以根據不同的自訂 selector 來拿到需要 state。

### Redux Toolkit
- 利用 `<Provider store={store}>` 在頂層把 store 傳進 App。
- 不用設置 Redux 複雜的 boilerplate，在 Redux 使用 `createSlice` 定義好 slice，slice 裡面整合了 action creator、actionTypes 以及 reducers，可以直接把 selector 和 action creator 直接傳出去給 component 使用，在 component 中利用 `useDispatch` 的 dispatch 來觸發更新 state。
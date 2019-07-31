import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
      ],
      inputValue: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleBtnClick  = this.handleBtnClick.bind(this);
  }

  handleBtnClick() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
  }
  handleInputChange(e) {
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleItemDelete(index) {
    // 相当于将this.state.list 的内容拷贝一份到list中
    // 当你要改变state的值，建议复制一份副本，这样子在引入其他框架，调错方便都是不错的。
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {list};
    })
  }

  getTodoItems() {
    return (
      this.state.list.map((item, index) => {
        return (
          <TodoItem 
            key={index}
            index={index}
            content={item} 
            delete={this.handleItemDelete}
          />
        )
      })
    )
  }

  render() {
    return (
      <div>
        <div>
          {/* 下面是一个注释 */}
          <label htmlFor="insertArea">输入内容：</label>
          <input id="insertArea" value={this.state.inputValue} onChange={this.handleInputChange}/>
          <button onClick={this.handleBtnClick}>add</button>
        </div>
        <ul>{this.getTodoItems()}</ul>
      </div>
    );
  }
}

export default TodoList;

import React from 'react';
import TodoItem from './TodoItem';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = store.getState();

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
      <div style={{marginTop: '10px', marginLeft: '10px'}}>
        <div>
          {/* 下面是一个注释 */}
          <label htmlFor="insertArea">输入内容：</label>
          <Input id="insertArea" placeholder="write something" value={this.state.inputValue} onChange={this.handleInputChange} style={{width: '200px', marginRight: '10px'}}/>
          <Button onClick={this.handleBtnClick} type='primary'>提交</Button>
        </div>
        <ul>{this.getTodoItems()}</ul>
        <List
          style={{marginTop: '10px', marginLeft: '10px'}}
          bordered
          dataSource={this.state.list}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default TodoList;

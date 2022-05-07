class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}



class Stack {
  constructor(value = null) {
    this.top = new Node(value);
    this.bottom = this.top;
  }
  
  push(number) {
    if(!this.min_stack) {
      this.min_stack = new Stack(number)
    }
    this.mainPush(number, this);
    if(number <= this.peek(this.min_stack)) this.mainPush(number, this.min_stack);
  }

  mainPush(number, node=this) {
    const newNode = new Node(number);
    if(node.top.value === null) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      [node.top, node.top.next] = [newNode, node.top];
    }
  }
  
  pop() {
    let popValue = this.mainPop(this);
    if(popValue <= this.peek(this.min_stack)) this.mainPop(this.min_stack);
    return popValue;
  }

  peek(node = this) {
    return  node.top.value;
  }
  
  mainPop(node = this) {
    if(node.top.value === null) {
      return null
    }

    let popValue;
    [popValue, node.top] = [node.top.value, node.top.next]
    return popValue;    
  }
  
  min() {
    return this.peek(this.min_stack)
  }
}

const stack = new Stack()

stack.push(3)
stack.push(5)
console.log(stack.min())
// => 3

stack.pop()
stack.push(7)
console.log(stack.min())
// => 3

stack.push(2)
console.log(stack.min())
// => 2

stack.pop()
console.log(stack.min())
// => 3

module.exports = Stack

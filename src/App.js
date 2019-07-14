import React from 'react';
import { pipelineTopicExpression } from '@babel/types';

function App() {
  const profiles = [
    {name: "Taro", age:10},
    {name: "Hanako", age:5},
    {name: "Noname"}

  ]
  return ( 
    <div>
      {
        profiles.map((profiles,index) => {
          return <User name={profiles.name} age={profiles.age} key={index}/>
        })
      }
    </div>
    )
}

const User = (props) => {
  return <div>Hi, I am {props.name}, and {props.age} years old!</div>
}

User.defaultProps = {
  age: 1
}
export default App;
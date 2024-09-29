
react

3. 元素渲染   render
4. 组件 & Props
5. State & 生命周期    
6. 事件处理   onclick onchange
11. 组合 vs 继承


- 他自己的生命周期

  didMount ( 获取数据源  setstate  redux props)
  render   (第一次挂载期也就是初次,  数据更新期, 比如在输入文本 props state setstate  )

  willReceiveProps(props, nextProps)





- 他解决了什么问题,他的优势 , ( DIFF算法 虚拟DOM == VDOM,  组件化思维) 结合第五点

- 他怎么用, 怎么写


- 他需要哪些框架组件配合
   react自己的库(react  react-dom  命令行cli的话 create-react-app)
   项目复杂了 全局数据流 概念 类似vuex  ||  redux / mobx
   路由库 react-router

- 他和VUE什么差别
   面试题
     1: 技术形态   1.1 打包的大小, 打包快慢, 兼容性,   客观  
      2: 生态  移动端, 插件数 客观
      3: 表达自己的看法 自己主观感受

- 组件的类型 及 怎么通信
    父子组件 (bODY 里面的 指示按钮) 本页 state 局部变量更新

    兄弟组件 登录按钮和注册按钮 回调函数 或者 全局数据流 利用props去改变


    https://www.jianshu.com/p/6977281c6007






-  父子组件的通信 (回调 及 willReceiveProps使用)
   why: 组件化, 举例 父: 提交页  子: 大表单
   通信指的是 2种,

    1 我父组件变化的时候 我希望子组件也变化,
      如 提交页拿到数据 , 透传给子组件使用(比如编辑回填个人信息 - 父组件拿到值作为props传下去, 子组件去用willReceiveProps使用拿到 一直变化的Props级联更新去做逻辑)

    2 我子组件变化的时候 我喜欢父组件有所变化
    Form完成了操作 我想告诉父亲它该做什么,
    父组件 传递 回调函数下来


   <SubmitPage >
      <Form callback={} info={SubmitPage.state  == SubmitPage didMount setstate } >
        <Btn onclick={() => {
            this.props.callback()
          }}> </Btn>
      </Form>
  </SubmitPage>

<Router  xxx >
xxxx   <User />
</Router>

<Router>
  <Good />
</Router>

<Router>
  <Student />
</Router>

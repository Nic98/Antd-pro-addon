import React, { Component } from 'react';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import { injectComponents } from '@alilc/lowcode-plugin-inject';



export default class Lowcode extends Component{
    static defaultProps = {
    }
    constructor(props){
        super(props)
    }
    state = {
        schema: {},
        components: []
    }
    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {

        const mockPkg =
    '[{"package":"moment","version":"2.24.0","urls":["https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js"],"library":"moment"},{"package":"lodash","library":"_","urls":["https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js"]},{"title":"fusion组件库","package":"@alifd/next","version":"1.26.4","urls":["https://g.alicdn.com/code/lib/alifd__next/1.26.4/next.min.css","https://g.alicdn.com/code/lib/alifd__next/1.26.4/next-with-locales.min.js"],"library":"Next"},{"title":"NextTable","package":"NextTable","version":"1.0.1","urls":["https://g.alicdn.com/fusion-platform/pro-table/1.0.1/next-table.js","https://g.alicdn.com/fusion-platform/pro-table/1.0.1/next-table.css"],"library":"NextTable"},{"package":"@alilc/lowcode-materials","version":"1.0.7","library":"AlilcLowcodeMaterials","urls":["https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.7/dist/AlilcLowcodeMaterials.js","https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.7/dist/AlilcLowcodeMaterials.css"],"editUrls":["https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.7/build/lowcode/view.js","https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.7/build/lowcode/view.css"]},{"package":"@alifd/layout","version":"2.4.1","library":"AlifdLayout","urls":["https://alifd.alicdn.com/npm/@alifd/layout@2.4.1/dist/AlifdLayout.js","https://alifd.alicdn.com/npm/@alifd/layout@2.4.1/dist/AlifdLayout.css"],"editUrls":["https://alifd.alicdn.com/npm/@alifd/layout@2.4.1/build/lowcode/view.js","https://alifd.alicdn.com/npm/@alifd/layout@2.4.1/build/lowcode/view.css"]},{"package":"@alifd/fusion-ui","version":"2.0.2","library":"AlifdFusionUi","urls":["https://alifd.alicdn.com/npm/@alifd/fusion-ui@2.0.2/dist/AlifdFusionUi.js","https://alifd.alicdn.com/npm/@alifd/fusion-ui@2.0.2/dist/AlifdFusionUi.css"],"editUrls":["https://alifd.alicdn.com/npm/@alifd/fusion-ui@2.0.2/build/lowcode/view.js","https://alifd.alicdn.com/npm/@alifd/fusion-ui@2.0.2/build/lowcode/view.css"]}]';
        const mockSchema = `{"version":"1.0.0","componentsMap":[{"package":"@alifd/layout","version":"2.4.1","exportName":"Page","main":"lib/index.js","destructuring":true,"componentName":"FDPage"},{"devMode":"lowCode","componentName":"Page"},{"package":"@alifd/fusion-ui","version":"2.0.2","exportName":"EditTable","main":"lib/index.js","destructuring":true,"subName":"","componentName":"EditTable"},{"package":"@alifd/next","version":"1.25.23","exportName":"Form","main":"","destructuring":true,"subName":"Submit","componentName":"Form.Submit"},{"package":"@alifd/next","version":"1.25.23","exportName":"Form","main":"","destructuring":true,"subName":"Reset","componentName":"Form.Reset"},{"package":"@alifd/next","version":"1.25.23","exportName":"Form","main":"","destructuring":true,"subName":"Item","componentName":"Form.Item"},{"package":"@alifd/next","version":"1.25.23","exportName":"Form","main":"","destructuring":true,"subName":"","componentName":"Form"},{"package":"@alifd/fusion-ui","version":"2.0.2","exportName":"Filter","main":"lib/index.js","destructuring":true,"subName":"","componentName":"Filter"},{"package":"@alifd/fusion-ui","version":"2.0.2","exportName":"FormInput","main":"","destructuring":true,"subName":"","componentName":"FormInput"}],"componentsTree":[{"componentName":"Page","id":"node_dockcviv8fo1","props":{"ref":"outerView","style":{"height":"100%"}},"docId":"doclaqkk3b9","fileName":"/","dataSource":{"list":[{"type":"fetch","isInit":true,"options":{"params":{},"method":"GET","isCors":true,"timeout":5000,"headers":{},"uri":"mock/info.json"},"id":"info","shouldFetch":{"type":"JSFunction","value":"function() { \\n  console.log('should fetch.....');\\n  return true; \\n}"}}]},"state":{"text":{"type":"JSExpression","value":"\\"outer\\""},"isShowDialog":{"type":"JSExpression","value":"false"}},"css":"body {\\n  font-size: 12px;\\n}\\n\\n.button {\\n  width: 100px;\\n  color: #ff00ff\\n}","lifeCycles":{"componentDidMount":{"type":"JSFunction","value":"function componentDidMount() {\\n  console.log('did mount');\\n}"},"componentWillUnmount":{"type":"JSFunction","value":"function componentWillUnmount() {\\n  console.log('will unmount');\\n}"}},"methods":{"testFunc":{"type":"JSFunction","value":"function testFunc() {\\n  console.log('test func');\\n}"},"onClick":{"type":"JSFunction","value":"function onClick() {\\n  this.setState({\\n  isShowDialog: true\\n  });\\n}"},"closeDialog":{"type":"JSFunction","value":"function closeDialog() {\\n  this.setState({\\n  isShowDialog: false\\n  });\\n}"},"getHelloWorldText":{"type":"JSFunction","value":"function getHelloWorldText() {\\n  return this.i18n('i18n-jwg27yo4');\\n}"},"getHelloWorldText2":{"type":"JSFunction","value":"function getHelloWorldText2() {\\n  return this.i18n('i18n-jwg27yo3', {\\n  name: '絮黎'\\n  });\\n}"},"onTestConstantsButtonClicked":{"type":"JSFunction","value":"function onTestConstantsButtonClicked() {\\n  console.log('constants.ConstantA:', this.constants.ConstantA);\\n  console.log('constants.ConstantB:', this.constants.ConstantB);\\n}"},"onTestUtilsButtonClicked":{"type":"JSFunction","value":"function onTestUtilsButtonClicked() {\\n  this.utils.demoUtil('param1', 'param2');\\n}"}},"originCode":"class LowcodeComponent extends Component {\\n  state = {\\n    \\"text\\": \\"outer\\",\\n    \\"isShowDialog\\": false\\n  }\\n  componentDidMount() {\\n    console.log('did mount');\\n  }\\n  componentWillUnmount() {\\n    console.log('will unmount');\\n  }\\n  testFunc() {\\n    console.log('test func');\\n  }\\n  onClick() {\\n    this.setState({\\n      isShowDialog: true\\n    });\\n  }\\n  closeDialog() {\\n    this.setState({\\n      isShowDialog: false\\n    });\\n  }\\n  getHelloWorldText() {\\n    return this.i18n('i18n-jwg27yo4');\\n  }\\n  getHelloWorldText2() {\\n    return this.i18n('i18n-jwg27yo3', {\\n      name: '絮黎',\\n    });\\n  }\\n  onTestConstantsButtonClicked() {\\n    console.log('constants.ConstantA:', this.constants.ConstantA);\\n    console.log('constants.ConstantB:', this.constants.ConstantB);\\n\\t}\\n\\tonTestUtilsButtonClicked(){\\n    this.utils.demoUtil('param1', 'param2');\\n\\t}\\n}","hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"Form","id":"node_ocls1l2xaqa","props":{"labelCol":{"span":2},"wrapperCol":{"span":14},"labelAlign":"left"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"Form.Item","id":"node_ocls1l2xaqf","props":{"label":"\\b"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"Form.Submit","id":"node_ocls1l2xaqg","props":{"type":"primary","validate":true,"children":"Submit"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"Form.Reset","id":"node_ocls1l2xaqh","props":{"style":{"marginLeft":10},"children":"Reset","type":"primary","size":"small","iconSize":"xxs","ghost":true,"toDefault":false,"loading":false,"text":false,"warning":false,"disabled":false},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"Filter","id":"node_ockt5mo4jj1","props":{"labelAlign":"top","labelTextAlign":"right"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"FormInput","id":"node_ocls1l2xaq14","props":{"formItemProps":{"primaryKey":"8314","label":"表单项","size":"medium","device":"desktop","fullWidth":true},"placeholder":"请输入"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"FormInput","id":"node_ocls1l2xaq15","props":{"formItemProps":{"primaryKey":"4934","label":"表单项","size":"medium","device":"desktop","fullWidth":true},"placeholder":"请输入"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"FormInput","id":"node_ocls1l2xaq16","props":{"formItemProps":{"primaryKey":"9051","label":"表单项","size":"medium","device":"desktop","fullWidth":true},"placeholder":"请输入"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"FormInput","id":"node_ocls1l2xaq17","props":{"formItemProps":{"primaryKey":"6242","label":"表单项","size":"medium","device":"desktop","fullWidth":true},"placeholder":"请输入"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""}]}]}]},{"componentName":"EditTable","id":"node_ocls1l2xaq9","props":{"dataSource":[{"id":"id-2f5DdE2b-0","date":"2013-06-12","percent":1.862,"documentAmount":2022,"currency":"CNY","company":"支付宝科技有限公司"},{"id":"id-2f5DdE2b-1","date":"2013-06-12","percent":1.862,"documentAmount":2022,"currency":"CNY","company":"支付宝科技有限公司"},{"id":"id-2f5DdE2b-2","date":"2013-06-12","percent":1.862,"documentAmount":2022,"currency":"CNY","company":"支付宝科技有限公司"},{"id":"id-2f5DdE2b-3","date":"2013-06-12","percent":1.862,"documentAmount":2022,"currency":"CNY","company":"支付宝科技有限公司"},{"id":"id-2f5DdE2b-4","date":"2013-06-12","percent":1.862,"documentAmount":2022,"currency":"CNY","company":"支付宝科技有限公司"}],"actionColumnButtons":{"text":true,"visibleButtonCount":3},"actionBarButtons":{"dataSource":[{"type":"primary","children":"操作一"},{"type":"normal","children":"操作二"}],"visibleButtonCount":3},"paginationProps":{"pageSize":20,"current":1,"hidden":false},"settingButtons":true,"columns":[{"title":"公司","dataIndex":"company","width":160,"formatType":"link","searchable":true},{"title":"单据金额","dataIndex":"documentAmount","formatType":"money"},{"title":"币种","dataIndex":"currency","formatType":"currency","filters":[{"label":"CNY","value":"CNY"},{"label":"USD","value":"USD"},{"label":"JPY","value":"JPY"},{"label":"HKD","value":"HKD"}],"filterMode":"multiple","explanation":"提示信息","width":110},{"title":"完成进度","dataIndex":"percent","formatType":"progress"},{"title":"到账日期","dataIndex":"date","formatType":"date"}],"actionColumnProps":{"title":"操作"},"indexColumn":false,"hasBorder":false,"isZebra":false,"fixedHeader":false,"primaryKey":"id"},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"FDPage","id":"node_oclfjpfqjy5","props":{"contentProps":{"style":{"background":"rgba(255,255,255,0)"}},"ref":"fdpage-bb43fbb0"},"title":"页面","hidden":false,"isLocked":false,"condition":true,"conditionGroup":""}]}],"i18n":{"zh-CN":{"i18n-jwg27yo4":"你好 ","i18n-jwg27yo3":"{name} 博士"},"en-US":{"i18n-jwg27yo4":"Hello ","i18n-jwg27yo3":"Doctor {name}"}}}`

        const packages = JSON.parse(mockPkg || '');
        const projectSchema = JSON.parse(mockSchema || '');
        const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
        const componentsMap = {};
        componentsMapArray.forEach((component) => {
            componentsMap[component.componentName] = component;
        });
        const schema = componentsTree[0];

        const libraryMap = {};
        const libraryAsset = [];
        packages.forEach(({ package: _package, library, urls, renderUrls }) => {
            libraryMap[_package] = library;
            if (renderUrls) {
                libraryAsset.push(renderUrls);
            } else if (urls) {
                libraryAsset.push(urls);
            }
        });

        const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];
        const assetLoader = new AssetLoader();
        await assetLoader.load(libraryAsset);
        const components = await injectComponents(buildComponents(libraryMap, componentsMap));

        this.setState({
            schema,
            components,
        });

    }
    render(){
        return(
            <div className="lowcode-plugin-sample-preview">
                <span>121</span>
                <ReactRenderer
                    className="lowcode-plugin-sample-preview-content"
                    schema={this.state.schema}
                    components={this.state.components}
                />
            </div>
        )
    }
}

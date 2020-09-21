import React, { Fragment } from 'react';
import '@/ui/assets/style/index.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { DownloadFileHelper } from '@/util/util';

// export interface CssTypeInterface {};

export default class App extends React.Component {
  state = {
    css_list: [
      {
        name: 'css',
        value: 'css',
      },
      {
        name: 'scss&sass',
        value: 'scss',
      },
      {
        name: 'less',
        value: 'less',
      },
    ],
    css_active: 'css', // 选中
    // 代码类型
    code_list: ['RGBA', 'HEX', 'HEXA', 'HSLA'],
    code_active: 'RGBA',
    css_code: '', // 代码
    show: true,
  };
  constructor(props) {
    super(props);
    onmessage = (msg) => {
      const { type, code } = msg.data.pluginMessage;
      switch (type) {
        case 'code:preview-code':
          this.setState({
            css_code: code,
          });
          break;
      }
    };
  }

  // 样式类型
  handleCssTabbar(item: { name: string; value: string }) {
    this.setState(
      {
        css_active: item.value,
        show: false,
      },
      () => {
        this.handlePreview();
        this.setState({
          show: true,
        });
      },
    );
  }
  // 代码类型
  handleCodeTabbar(item: string) {
    this.setState(
      {
        code_active: item,
      },
      () => {
        this.handlePreview();
      },
    );
  }

  // 复制代码
  copyCode() {
    const input = document.createElement('input');
    input.value = this.state.css_code;
    document.body.append(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    alert('复制成功!');
  }
  // 生成代码
  handleGenerateCode() {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'ui:generate-code',
          css: this.state.css_active,
          code: this.state.code_active.toLowerCase(),
        },
      },
      '*',
    );
  }
  // 预览
  handlePreview() {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'ui:preview-code',
          css: this.state.css_active,
          code: this.state.code_active.toLowerCase(),
        },
      },
      '*',
    );
  }
  downFile() {
    DownloadFileHelper('constant.' + this.state.css_active, this.state.css_code);
  }

  render() {
    const cssTabs = this.state.css_list.map((v) => (
      <div
        key={v.name}
        className={`${v.value === this.state.css_active ? 'tab--active' : ''}`}
        onClick={this.handleCssTabbar.bind(this, v)}
      >
        {v.name}
      </div>
    ));

    const codeTabs = this.state.code_list.map((v) => (
      <div
        key={v}
        className={`${v === this.state.code_active ? 'tab--active' : ''}`}
        onClick={this.handleCodeTabbar.bind(this, v)}
      >
        {v}
      </div>
    ));

    return (
      <Fragment>
        <header>
          <div className='tab-bars css-tab'>{cssTabs}</div>
          <div className='tab-bars code-tab'>{codeTabs}</div>
        </header>
        <SyntaxHighlighter
          className='code-content content'
          id='css-code'
          style={vs2015}
          language={this.state.code_active}
        >
          {this.state.css_code}
        </SyntaxHighlighter>
        <div className='bottom-fixed'>
          <button btn-type='primary' onClick={this.copyCode.bind(this, event)}>
            Copy
          </button>
          <button btn-type='primary' className='alpan' onClick={this.downFile.bind(this, event)}>
            Download
          </button>
          {/* <button btn-type='primary' className='alpan' onClick={this.handleGenerateCode.bind(this, event)}>
            生成代码
          </button> */}
        </div>
      </Fragment>
    );
  }
}

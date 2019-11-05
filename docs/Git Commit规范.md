# Commit 规范

## 如何提交 Commit

> git commit 需要符合`Commit Message 格式`，且需要经过 eslint 校验，否则无法正常提交

```bash
yarn run commit
# or
git commit -m 'commit message'
```

```bash
## 无需经过eslint，使用前必须正常提交一次，便于代码自动格式
git commit -m 'commit message' --no-verify
```

### Commit Message 的格式

每次提交，Commit message 都包括三个部分：header，body 和 footer

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

```
fix(View): minor typos in code

see the issue for details on the typos fixed

fixes issue #12
```

其中，Header 是必需的，Body 和 Footer 可以省略。

#### Header

Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和 subject（必需）。

##### type

- `feat`：新功能（feature）
- `fix`：修补 bug
- `docs`：文档（documentation）
- `style`： 格式（不影响代码运行的变动）
- `refactor`：重构（即不是新增功能，也不是修改 bug 的代码变动）
- `test`：增加测试
- `chore`：构建过程或辅助工具的变动

如果 type 为 feat 和 fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

##### scope

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同

##### subject

subject 是 commit 目的的简短描述，不超过 50 个字符。

#### 示例

##### Ant Design

![屏幕快照 2019-04-24 下午5.14.50.png](https://i.loli.net/2019/04/24/5cc0297135dd4.png)

<hr/>

![屏幕快照 2019-04-24 下午5.15.22.png](https://i.loli.net/2019/04/24/5cc02952bd5f7.png)

##### Angular

![屏幕快照 2019-04-24 下午7.10.10.png](https://i.loli.net/2019/04/24/5cc04451d229e.png)

<hr/>

![屏幕快照 2019-04-24 下午7.10.52.png](https://i.loli.net/2019/04/24/5cc04451dd798.png)

#### 参考

[git commit 规范指南](https://segmentfault.com/a/1190000009048911)

# 校运会信息管理系统

该项目是一个简单的前端校运会信息管理系统，实现了用户和比赛相关的增删改查（CRUD）功能。

## 功能

- 用户管理：
  - 新增、查看、更新和删除用户。
- 比赛管理：
  - 新增、查看、更新和删除比赛信息。

## 技术栈

- **Vue 3**：用于构建前端 UI 组件。
- **Element Plus**：基于 Vue 3 的 UI 库，用于布局和表单组件。

## 环境要求

- Node.js 版本：>= 14.x
- npm 版本：>= 6.x

## 项目结构

```
ssm_front/
│── public/               # 静态资源
│── src/
│   ├── assets/           # 项目资源文件
│   ├── components/       # 公共组件
│   ├── views/            # 页面视图（用户和比赛相关）
│   ├── router/           # 路由配置
│   ├── store/            # 状态管理
│   ├── App.vue           # 入口组件
│   └── main.js           # 项目入口文件
└── package.json          # 项目依赖及配置信息
```


## 安装步骤
### 安装依赖
```
npm install
```

### 启动项目
```
npm run serve
```

### 访问地址
```
http://localhost:5173/
```

## 声明

此项目底层基于GitHub开源项目：https://github.com/lin-xin/vue-manage-system